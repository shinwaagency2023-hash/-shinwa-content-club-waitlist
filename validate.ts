// Shared by the browser form and the Netlify Function so both apply identical rules.
export const INDUSTRIES = ["Beauty and Wellness", "Cleaning Services", "Other"] as const;
export type FieldName = "email" | "industry" | "consent" | "businessName" | "country";
export type FieldErrors = Partial<Record<FieldName, string>>;
export interface CleanSignup { email: string; businessName: string; industry: string; country: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function clean(v: unknown, max: number): string {
  // eslint-disable-next-line no-control-regex
  return typeof v === "string" ? v.replace(/[\u0000-\u001F\u007F<>]/g, "").trim().slice(0, max) : "";
}

export function validateSignup(raw: Record<string, unknown>): { errors: FieldErrors; value: CleanSignup } {
  const value: CleanSignup = {
    email: clean(raw.email, 254).toLowerCase(),
    businessName: clean(raw.businessName, 120),
    industry: clean(raw.industry, 40),
    country: clean(raw.country, 80)
  };
  const errors: FieldErrors = {};
  if (!value.email) errors.email = "Enter your email address.";
  else if (!EMAIL_RE.test(value.email)) errors.email = "Enter a valid email address, like name@example.com.";
  if (!(INDUSTRIES as readonly string[]).includes(value.industry)) errors.industry = "Choose the industry that fits your business best.";
  if (raw.consent !== true) errors.consent = "Tick the box to agree to launch emails, or we can't add you to the waitlist.";
  return { errors, value };
}
