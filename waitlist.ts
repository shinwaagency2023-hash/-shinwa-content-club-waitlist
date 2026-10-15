import { validateSignup } from "../../src/lib/validate";

// Netlify Functions v2. Reached at /api/waitlist. All secrets come from environment variables.
export const config = { path: "/api/waitlist" };

const BREVO = "https://api.brevo.com/v3";
const hits = new Map<string, number[]>(); // best-effort per-instance rate limit
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });

function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_HITS;
}

async function brevo(path: string, method: string, body?: unknown) {
  const res = await fetch(`${BREVO}${path}`, {
    method,
    headers: { "api-key": process.env.BREVO_API_KEY ?? "", accept: "application/json", "content-type": "application/json" },
    body: body ? JSON.stringify(body) : undefined
  });
  const text = await res.text();
  let data: any = null;
  try { data = text ? JSON.parse(text) : null; } catch { /* non-JSON body */ }
  return { status: res.status, ok: res.ok, data };
}

export default async (req: Request): Promise<Response> => {
  if (req.method !== "POST") return json(405, { ok: false, message: "Method not allowed." });

  const allowed = process.env.ALLOWED_ORIGIN;
  const origin = req.headers.get("origin");
  if (allowed && origin && origin !== allowed) return json(403, { ok: false, message: "Request not allowed." });

  const listId = Number(process.env.BREVO_LIST_ID);
  if (!process.env.BREVO_API_KEY || !Number.isInteger(listId)) {
    console.error("waitlist: BREVO_API_KEY or BREVO_LIST_ID is not configured");
    return json(500, { ok: false, message: "Signups are temporarily unavailable. Please try again later." });
  }

  const ip = req.headers.get("x-nf-client-connection-ip") ?? req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return json(429, { ok: false, message: "Too many attempts. Please wait a few minutes and try again." });

  let raw: Record<string, unknown>;
  try {
    const text = await req.text();
    if (text.length > 4000) return json(413, { ok: false, message: "Request too large." });
    raw = JSON.parse(text);
  } catch {
    return json(400, { ok: false, message: "We couldn't read that request." });
  }

  // Bot checks: a hidden field humans never fill, and a minimum time-on-form.
  const elapsed = Date.now() - Number(raw.t);
  if (raw.website || !Number.isFinite(elapsed) || elapsed < 3000 || elapsed > 24 * 3600 * 1000) {
    return json(400, { ok: false, message: "We couldn't verify that submission. Please reload the page and try again." });
  }

  const { errors, value } = validateSignup(raw);
  if (Object.keys(errors).length) return json(422, { ok: false, message: "Please fix the highlighted fields.", errors });

  try {
    const attributes = {
      BUSINESS_NAME: value.businessName, INDUSTRY: value.industry, COUNTRY: value.country,
      CONSENT_AT: new Date().toISOString(), SIGNUP_SOURCE: "waitlist-landing"
    };

    const existing = await brevo(`/contacts/${encodeURIComponent(value.email)}`, "GET");
    if (existing.status === 200) {
      // Never silently resubscribe someone who unsubscribed.
      if (existing.data?.emailBlacklisted) {
        return json(409, { ok: false, code: "previously_unsubscribed", message: "This address previously unsubscribed from our emails, so we can't add it again automatically. Contact us and we'll help." });
      }
      if (Array.isArray(existing.data?.listIds) && existing.data.listIds.includes(listId)) {
        return json(200, { ok: true, code: "already_joined", message: "You're already on the waitlist. We'll be in touch at launch." });
      }
    } else if (existing.status !== 404) {
      console.error("waitlist: Brevo lookup failed", existing.status);
      return json(502, { ok: false, message: "We couldn't reach our mailing service. Please try again shortly." });
    }

    const templateId = Number(process.env.BREVO_DOI_TEMPLATE_ID);
    let result;
    let message: string;
    if (Number.isInteger(templateId) && templateId > 0) {
      result = await brevo("/contacts/doubleOptinConfirmation", "POST", {
        email: value.email, attributes, includeListIds: [listId], templateId,
        redirectionUrl: process.env.BREVO_DOI_REDIRECT_URL || (origin ?? "https://example.com")
      });
      message = "Almost there. Check your inbox for an email asking you to confirm. You're only on the list once you do.";
    } else if (existing.status === 200) {
      result = await brevo(`/contacts/${encodeURIComponent(value.email)}`, "PUT", { attributes, listIds: [listId] });
      message = "You're on the waitlist. We'll email you when early access opens.";
    } else {
      result = await brevo("/contacts", "POST", { email: value.email, attributes, listIds: [listId], updateEnabled: false });
      message = "You're on the waitlist. We'll email you when early access opens.";
    }

    if (!result.ok) {
      console.error("waitlist: Brevo rejected signup", result.status, result.data?.code);
      return json(502, { ok: false, message: "We couldn't save your signup. Please try again shortly." });
    }

    // Optional admin alert (needs a sender verified in Brevo). Failure never affects the signup result.
    const notify = process.env.ADMIN_NOTIFY_EMAIL;
    const sender = process.env.BREVO_SENDER_EMAIL;
    if (notify && sender) {
      const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
      brevo("/smtp/email", "POST", {
        sender: { email: sender, name: process.env.BREVO_SENDER_NAME || "Shinwa Content Club" },
        to: [{ email: notify }],
        subject: "New Shinwa Content Club waitlist signup",
        htmlContent: `<p>Business: ${esc(value.businessName || "-")}<br>Email: ${esc(value.email)}<br>Industry: ${esc(value.industry)}<br>Country: ${esc(value.country || "-")}<br>Date: ${new Date().toISOString().slice(0, 10)}<br>Status: ${templateId > 0 ? "awaiting email confirmation" : "subscribed"}</p>`
      }).then((r) => { if (!r.ok) console.error("waitlist: admin notification failed", r.status); }).catch(() => console.error("waitlist: admin notification error"));
    }

    return json(200, { ok: true, code: templateId > 0 ? "confirm_email" : "joined", message });
  } catch (err) {
    console.error("waitlist: unexpected error", err instanceof Error ? err.message : "unknown");
    return json(500, { ok: false, message: "Something went wrong on our side. Please try again shortly." });
  }
};
