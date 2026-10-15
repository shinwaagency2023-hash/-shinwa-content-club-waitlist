// Generates responsive black-and-gold HTML emails into /emails. Run: npm run emails
import { writeFileSync } from "node:fs";

const SENDER = "Shinwa Agency (Pty) Ltd · [Your registered address]";
const wrap = (preheader, body) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Shinwa Content Club</title></head>
<body style="margin:0;background:#151515;font-family:Arial,Helvetica,sans-serif;color:#f3ebdd;">
<span style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#151515;"><tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#1e1d1b;border:1px solid #3a352b;">
<tr><td style="padding:28px 32px;border-bottom:1px solid #c9a24b;font-family:Georgia,serif;font-size:20px;letter-spacing:3px;color:#c9a24b;">SHINWA CONTENT CLUB</td></tr>
<tr><td style="padding:32px;font-size:16px;line-height:1.65;color:#f3ebdd;">${body}</td></tr>
<tr><td style="padding:24px 32px;border-top:1px solid #3a352b;font-size:12px;line-height:1.6;color:#b9af9d;">
You're receiving this because you joined the Shinwa Content Club waitlist.<br>${SENDER}<br>
<a href="{{ unsubscribe }}" style="color:#c9a24b;">Unsubscribe</a></td></tr>
</table></td></tr></table></body></html>`;

const h = (t) => `<h1 style="font-family:Georgia,serif;font-weight:normal;font-size:28px;line-height:1.25;margin:0 0 18px;color:#f3ebdd;">${t}</h1>`;
const p = (t) => `<p style="margin:0 0 16px;">${t}</p>`;
const li = (items) => `<ul style="margin:0 0 16px;padding-left:20px;">${items.map((i) => `<li style="margin-bottom:8px;">${i}</li>`).join("")}</ul>`;
const btn = (href, label) => `<p style="margin:24px 0;"><a href="${href}" style="background:#c9a24b;color:#151515;text-decoration:none;font-weight:bold;padding:14px 26px;display:inline-block;">${label}</a></p>`;

const emails = {
  "00-double-optin-confirmation": {
    subject: "Please confirm your place on the Shinwa Content Club waitlist",
    html: wrap("One click to confirm.", h("Confirm your place on the list") + p("Thanks for your interest in Shinwa Content Club. Please confirm your email address so we can send you launch updates.") + btn("{{ doubleoptin }}", "Confirm my email") + p("If you didn't sign up, ignore this email and nothing will happen."))
  },
  "01-welcome": {
    subject: "You're on the list. Welcome to Shinwa Content Club.",
    html: wrap("Thanks for joining the waitlist.", h("You're on the list.") + p("Thank you for joining the Shinwa Content Club waitlist.") + p("Shinwa Content Club is an upcoming subscription platform from Shinwa Agency. It's being built to give small businesses a personalised Meta marketing strategy and ready-to-post branded social media content, all in one dashboard.") + p("It isn't open yet. We'll email you when early access opens, and share a little about what we're building in the meantime.") + p("Warm regards,<br>The Shinwa Content Club team"))
  },
  "02-the-problem": {
    subject: "Your business deserves better than last-minute content.",
    html: wrap("The content treadmill, and why we're building this.", h("Last-minute content costs more than time.") + p("When you run a business, social media tends to happen in the gaps: a rushed post, a caption written on your phone, then a quiet fortnight because the week got away from you.") + p("Most small business owners we talk to struggle with the same things:") + li(["Knowing what to post", "Creating branded graphics", "Writing captions and choosing hashtags", "Posting consistently", "Understanding Facebook and Instagram marketing"]) + p("That's the problem Shinwa Content Club is being designed to solve. More on how in a couple of days.") + p("The Shinwa Content Club team"))
  },
  "03-inside-the-club": {
    subject: "Here's what's coming inside Shinwa Content Club.",
    html: wrap("What we're planning to include.", h("What's planned inside the club") + p("Here is what we're currently planning to include (details may change before launch):") + li(["A personalised six-month Meta marketing strategy for your business", "Twenty branded social media posts in every four-week cycle", "Ready-to-use captions, hashtags and calls to action", "A monthly content calendar with recommended posting days and times", "Meta advertising guidance", "A private dashboard for all of it"]) + p("You'll download your posts and publish them yourself. Version 1 won't post to your accounts for you.") + p("We'll email you again when early access is ready.") + p("The Shinwa Content Club team"))
  },
  "04-founding-member-invitation": {
    subject: "Your invitation to Shinwa Content Club.",
    html: wrap("Early access is now open.", h("Early access is open.") + p("You joined the waitlist, so you're among the first we're inviting.") + p("[Add the real details here: how to register, what's available now, and any dates. Only send this email once registration is genuinely open.]") + btn("[REGISTRATION_URL]", "Create my account") + p("The Shinwa Content Club team"))
  }
};

for (const [name, { subject, html }] of Object.entries(emails)) {
  writeFileSync(`emails/${name}.html`, `<!-- Subject: ${subject} -->\n${html}\n`);
  console.log("wrote", name);
}
