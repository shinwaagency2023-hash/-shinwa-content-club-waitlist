import Logo from "./components/Logo";
import WaitlistForm from "./components/WaitlistForm";

const CONTACT = import.meta.env.VITE_CONTACT_EMAIL || "hello@example.com";

const problems = [
  "Finding content ideas week after week",
  "Creating graphics that look like your brand",
  "Writing captions and choosing hashtags",
  "Posting consistently, even in busy weeks",
  "Making sense of Facebook and Instagram marketing",
  "Finding time to build a marketing plan"
];

const features = [
  ["Personalised 6-month Meta marketing strategy", "A clear plan for Facebook and Instagram, built around your business and your customers."],
  ["20 branded social media posts", "Fresh posts designed for your brand in every four-week cycle."],
  ["Ready-to-use captions and hashtags", "Copy written for each post, with a call to action, so you can publish without starting from a blank page."],
  ["Monthly content calendar", "See what to post and when, with recommended posting days and times."],
  ["Meta advertising guidance", "Planning recommendations to help you think through your Meta ad campaigns."],
  ["Private content dashboard", "Your strategy, posts and calendar in one secure place."]
];

const steps = [
  "Create your account and tell us about your business.",
  "Receive a personalised marketing strategy.",
  "Access your branded content and monthly calendar.",
  "Download your posts and publish them to your social media accounts."
];

const faqs = [
  ["What is Shinwa Content Club?", "An upcoming subscription platform from Shinwa Agency that gives small businesses a personalised Meta marketing strategy and ready-to-post branded social media content."],
  ["Is the platform available yet?", "Not yet. We are collecting early-access sign-ups now and will email you when registration opens. We haven't set a launch date."],
  ["What will my subscription include?", "The plan is a personalised six-month Meta strategy, twenty branded posts per four-week cycle, captions, hashtags and calls to action, a monthly content calendar, recommended posting times, Meta advertising guidance and a private dashboard. Details may change before launch."],
  ["Will the content be personalised to my business?", "Yes. That is the intention. You will tell us about your business and your strategy and content will be built around it."],
  ["Does the platform manage or publish my social media?", "No. You download your content and publish it yourself. Version 1 does not post to Facebook or Instagram for you."],
  ["How do I join early access?", "Join the waitlist using the form on this page. We'll send launch updates and an invitation when registration opens."],
  ["Is joining the waitlist free?", "Yes. Joining the waitlist is free and doesn't commit you to buying anything."]
];

const nav = [["#problem", "The problem"], ["#features", "What's coming"], ["#how", "How it works"], ["#faq", "FAQ"]];

export default function App() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-gold focus:text-ink focus:px-4 focus:py-2">Skip to content</a>
      <header className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between gap-6">
          <a href="/" aria-label="Shinwa Content Club home"><Logo /></a>
          <nav aria-label="Primary" className="hidden md:flex gap-8 text-sm text-muted">
            {nav.map(([h, l]) => <a key={h} href={h} className="hover:text-gold">{l}</a>)}
          </nav>
          <a href="#waitlist" className="btn-line !py-2 !px-5 text-sm">Join waitlist</a>
        </div>
      </header>

      <main id="main">
        <section className="mx-auto max-w-6xl px-6 pt-20 pb-28 md:pt-28">
          <p className="text-gold font-medium">Shinwa Content Club · Coming soon, early access opening</p>
          <h1 className="mt-8 font-display font-semibold text-5xl sm:text-7xl md:text-8xl leading-[0.98] uppercase">
            Your strategy.<br />Your content.<br />Your growth plan.
          </h1>
          <p className="mt-10 font-display text-3xl text-gold">Your content. Sorted.</p>
          <p className="mt-6 max-w-xl text-lg text-muted leading-relaxed">
            Personalised Meta marketing strategies and ready-to-post branded social media content. All organised in one simple dashboard.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#waitlist" className="btn-gold">Join the free waitlist</a>
            <a href="#features" className="btn-line">Discover what's coming</a>
          </div>
        </section>

        <section id="problem" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-6 py-24 grid md:grid-cols-2 gap-14">
            <h2 className="font-display text-4xl md:text-5xl leading-tight">Running your business is enough work. Your content shouldn't be.</h2>
            <div>
              <p className="text-muted leading-relaxed">Most small business owners know social media matters. Few have the hours to keep up with it. The same struggles come up again and again:</p>
              <ul className="mt-6 divide-y divide-line border-y border-line">
                {problems.map((p) => <li key={p} className="py-4">{p}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t border-line bg-panel">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <h2 className="font-display text-4xl md:text-5xl max-w-3xl leading-tight">Your marketing essentials. One organised space.</h2>
            <p className="mt-6 max-w-2xl text-muted leading-relaxed text-lg">
              Shinwa Content Club is an upcoming subscription platform that simplifies social media marketing for small businesses: a plan, the posts and the calendar, all in one dashboard, so you spend less time figuring out what to post.
            </p>
          </div>
        </section>

        <section id="features" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <h2 className="font-display text-4xl md:text-5xl">What's coming inside</h2>
            <p className="mt-4 text-muted">Planned features for launch. Details may change as we build.</p>
            <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 border-l border-t border-line">
              {features.map(([t, d]) => (
                <li key={t} className="border-r border-b border-line p-8">
                  <h3 className="font-display text-2xl leading-snug">{t}</h3>
                  <p className="mt-4 text-muted leading-relaxed">{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="how" className="border-t border-line bg-panel">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <h2 className="font-display text-4xl md:text-5xl">How it will work</h2>
            <p className="mt-4 text-muted">This is the planned customer experience. The platform isn't open yet.</p>
            <ol className="mt-12 grid md:grid-cols-4 gap-8">
              {steps.map((s, i) => (
                <li key={s} className="border-t border-gold pt-5">
                  <span className="font-display text-gold text-lg">Step {i + 1}</span>
                  <p className="mt-3 leading-relaxed">{s}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <h2 className="font-display text-4xl md:text-5xl">Who it's for</h2>
            <div className="mt-10 grid sm:grid-cols-2 gap-6">
              <div className="border border-line p-8"><h3 className="font-display text-2xl">Beauty &amp; wellness</h3><p className="mt-3 text-muted">Nail technicians, salons, spas and skincare studios.</p></div>
              <div className="border border-line p-8"><h3 className="font-display text-2xl">Cleaning services</h3><p className="mt-3 text-muted">Residential and commercial cleaning companies.</p></div>
            </div>
            <p className="mt-6 text-muted">More industries are planned.</p>
          </div>
        </section>

        <section className="border-t border-line bg-panel">
          <div className="mx-auto max-w-3xl px-6 py-24">
            <h2 className="font-display text-4xl md:text-5xl">Be among the first in the club.</h2>
            <p className="mt-6 text-muted leading-relaxed text-lg">
              People on the early-access list get product updates and an invitation when registration opens. That's all we're promising for now.
            </p>
          </div>
        </section>

        <section id="waitlist" className="border-t border-line">
          <div className="mx-auto max-w-xl px-6 py-24">
            <h2 className="font-display text-4xl md:text-5xl">Join the free waitlist</h2>
            <p className="mt-4 mb-10 text-muted">Free to join. No payment details needed.</p>
            <WaitlistForm />
          </div>
        </section>

        <section id="faq" className="border-t border-line bg-panel">
          <div className="mx-auto max-w-3xl px-6 py-24">
            <h2 className="font-display text-4xl md:text-5xl">Frequently asked questions</h2>
            <div className="mt-10 divide-y divide-line border-y border-line">
              {faqs.map(([q, a]) => (
                <details key={q} className="py-5 group">
                  <summary className="cursor-pointer font-medium text-lg list-none flex justify-between gap-4">{q}<span aria-hidden="true" className="text-gold group-open:rotate-45 transition-transform">+</span></summary>
                  <p className="mt-3 text-muted leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="font-display text-2xl text-gold">Shinwa Content Club</p>
            <p className="mt-2 text-muted text-sm">A product by Shinwa Agency (Pty) Ltd</p>
            <p className="mt-6 text-muted text-sm">© {new Date().getFullYear()} Shinwa Agency (Pty) Ltd. All rights reserved.</p>
          </div>
          <nav aria-label="Footer" className="flex gap-6 text-sm">
            <a href="/privacy" className="hover:text-gold">Privacy Policy</a>
            <a href={`mailto:${CONTACT}`} className="hover:text-gold">Contact</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
