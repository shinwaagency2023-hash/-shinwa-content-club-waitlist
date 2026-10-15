# Shinwa Content Club: pre-launch waitlist (Phase 1)

React + TypeScript + Tailwind + Vite landing page, with a Netlify Function (`netlify/functions/waitlist.ts`) that sends signups to Brevo. The Brevo API key lives only in Netlify environment variables.

## What you need
Free accounts: GitHub, Netlify, Brevo. Optional: a verified sender address in Brevo (for admin alerts and branded sending).

## 1. Put the project on GitHub
1. github.com > New repository > name it `shinwa-content-club-waitlist` > Create (leave it empty).
2. On the empty repo page click "uploading an existing file", unzip this project and drag in **all the files and folders inside it** (not the zip itself). Do not upload a `.env` file. Commit.

## 2. Set up Brevo (manual, I can't do this for you)
1. Contacts > Lists > create a list called "Content Club Waitlist". Note its numeric **ID**.
2. Contacts > Settings > Contact attributes: create these as **Text**: `BUSINESS_NAME`, `INDUSTRY`, `COUNTRY`, `CONSENT_AT`, `SIGNUP_SOURCE`. (Signups fail if they're missing.)
3. SMTP & API > API keys > create a key. Copy it once.
4. Double opt-in (recommended): Contacts > Forms > Double opt-in templates (or Campaigns > Templates) > create a template from `emails/00-double-optin-confirmation.html`; it must contain the `{{ doubleoptin }}` link. Note its template ID.
5. Senders: add and verify your sender email/domain (Senders, domains & dedicated IPs).

## 3. Deploy on Netlify
1. Netlify > Add new site > Import from GitHub > pick the repo.
2. Build settings are read from `netlify.toml` (build `npm run build`, publish `dist`, functions `netlify/functions`).
3. Site configuration > Environment variables: add the values listed in `.env.example`. At minimum `BREVO_API_KEY`, `BREVO_LIST_ID`. Add `BREVO_DOI_TEMPLATE_ID` and `BREVO_DOI_REDIRECT_URL` to turn on double opt-in. Redeploy after changing variables.
4. Your site is live at `something.netlify.app`. You can rename it in Domain management.

## 4. Welcome automation and admin alerts (manual)
- Brevo > Automations > create from scratch, trigger "Contact added to list" (your waitlist list). With double opt-in, contacts only join the list after confirming, so this fires post-confirmation.
- Steps: send `emails/01-welcome.html`, wait 2 days, send `02-the-problem.html`, wait 2 days, send `03-inside-the-club.html`. Do **not** add email 4 to the automation; send it manually when early access is truly open.
- Replace `[Your registered address]` in the emails (edit `scripts/build-emails.mjs`, run `npm run emails`). Sender address and a working unsubscribe link are required by anti-spam law; Brevo replaces `{{ unsubscribe }}`.
- Test by sending to yourself **before** you activate the automation.
- Admin alerts: set `ADMIN_NOTIFY_EMAIL` and `BREVO_SENDER_EMAIL` in Netlify (function sends one transactional email per signup). Or build a second Brevo automation. Needs a verified sender.

## Free subdomain limits
On `*.netlify.app` you can't authenticate a domain with Netlify DNS records, but sending domain authentication (SPF/DKIM/DMARC) is about your **email** domain, not the website. Without your own domain, send from a Brevo-verified address; free Gmail-type senders often land in spam. Buy a domain before the real launch.

## Logo
Copy the official logo to `public/logo.png` and set `LOGO_SRC = "/logo.png"` in `src/components/Logo.tsx`. Add `public/og-image.png` (1200x630) for link previews.

## Local development
`npm install`, then `npx netlify dev` (so the function runs) or `npm run dev` (page only).

## Before launch: legal review
The privacy policy (`src/pages/Privacy.tsx`) is a draft with `[bracketed]` gaps: registered address, Information Officer, retention period, transfer mechanisms, provider DPAs. Have a professional review it for POPIA and GDPR.

## Test checklist (not yet run live)
- [ ] Submit with empty/invalid email, no industry, no consent: errors show, nothing sent
- [ ] Valid signup: confirmation email arrives, contact appears in the list only after confirming
- [ ] Submit the same email again: "already on the waitlist"
- [ ] Unsubscribe then re-submit: not resubscribed
- [ ] View page source/network tab: no API key anywhere
- [ ] Welcome email has unsubscribe link and renders on phone
- [ ] Rapid 6+ submits: rate-limited
- [ ] Mobile, tablet and desktop layout; keyboard-only use
