import { useMemo, useState, type FormEvent } from "react";
import { INDUSTRIES, validateSignup, type FieldErrors } from "../lib/validate";

type Status = "idle" | "loading" | "success" | "error";
const CONSENT = "I agree to receive Shinwa Content Club launch updates and early-access marketing emails. I understand I can unsubscribe at any time.";

export default function WaitlistForm() {
  const loadedAt = useMemo(() => Date.now(), []);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      email: fd.get("email"), businessName: fd.get("businessName"), industry: fd.get("industry"),
      country: fd.get("country"), consent: fd.get("consent") === "on", website: fd.get("website"), t: loadedAt
    };
    const { errors: local } = validateSignup(payload);
    setErrors(local);
    if (Object.keys(local).length) { setStatus("error"); setMessage("Please fix the highlighted fields."); return; }

    setStatus("loading"); setMessage("");
    try {
      const res = await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok === true) { setStatus("success"); setMessage(data.message); return; }
      setErrors(data?.errors ?? {});
      setStatus("error"); setMessage(data?.message ?? "Something went wrong. Please try again.");
    } catch {
      setStatus("error"); setMessage("We couldn't connect. Check your internet connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="border border-gold p-8">
        <h3 className="font-display text-2xl">Thank you.</h3>
        <p className="mt-3 text-muted leading-relaxed">{message}</p>
      </div>
    );
  }

  const err = (id: keyof FieldErrors) => errors[id] && <p id={`${id}-err`} className="mt-2 text-sm text-[#ff9b8a]">{errors[id]}</p>;
  const d = (id: keyof FieldErrors) => (errors[id] ? `${id}-err` : undefined);

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6" aria-describedby={status === "error" ? "form-msg" : undefined}>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>Leave this empty<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div>
        <label htmlFor="email" className="block mb-2 font-medium">Email address <span className="text-gold">(required)</span></label>
        <input id="email" name="email" type="email" autoComplete="email" required className="field" aria-invalid={!!errors.email} aria-describedby={d("email")} />
        {err("email")}
      </div>
      <div>
        <label htmlFor="businessName" className="block mb-2 font-medium">Business name <span className="text-muted">(optional)</span></label>
        <input id="businessName" name="businessName" type="text" autoComplete="organization" maxLength={120} className="field" />
      </div>
      <div>
        <label htmlFor="industry" className="block mb-2 font-medium">Industry <span className="text-gold">(required)</span></label>
        <select id="industry" name="industry" defaultValue="" required className="field" aria-invalid={!!errors.industry} aria-describedby={d("industry")}>
          <option value="" disabled>Choose one</option>
          {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
        </select>
        {err("industry")}
      </div>
      <div>
        <label htmlFor="country" className="block mb-2 font-medium">Country <span className="text-muted">(optional)</span></label>
        <input id="country" name="country" type="text" autoComplete="country-name" maxLength={80} className="field" />
      </div>
      <div>
        <div className="flex gap-3 items-start">
          <input id="consent" name="consent" type="checkbox" className="mt-1 h-5 w-5 accent-[#c9a24b] shrink-0" aria-invalid={!!errors.consent} aria-describedby={d("consent")} />
          <label htmlFor="consent" className="text-sm text-muted leading-relaxed">
            {CONSENT} Read our <a href="/privacy" className="text-gold underline">Privacy Policy</a>.
          </label>
        </div>
        {err("consent")}
      </div>
      <button type="submit" className="btn-gold" disabled={status === "loading"}>
        {status === "loading" ? "Joining…" : "Join the free waitlist"}
      </button>
      <p id="form-msg" role={status === "error" ? "alert" : undefined} className="min-h-[1.5rem] text-sm text-[#ff9b8a]">{status === "error" ? message : ""}</p>
    </form>
  );
}
