import type { ReactNode } from "react";
const CONTACT = import.meta.env.VITE_CONTACT_EMAIL || "hello@example.com";

// DRAFT for legal review before launch. See README for the list of items to confirm.
export default function Privacy() {
  const H = ({ children }: { children: string }) => <h2 className="font-display text-2xl mt-12 mb-3">{children}</h2>;
  const P = ({ children }: { children: ReactNode }) => <p className="text-muted leading-relaxed mb-3">{children}</p>;
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <a href="/" className="text-gold underline">Back to Shinwa Content Club</a>
      <h1 className="font-display text-5xl mt-8">Privacy Policy</h1>
      <P>Last updated: [insert date before launch]. This policy covers the Shinwa Content Club waitlist website only.</P>

      <H>Who we are</H>
      <P>Shinwa Content Club is a product of Shinwa Agency (Pty) Ltd, a company based in South Africa ("we", "us"). We are the responsible party (POPIA) and controller (GDPR) for the information described here. Contact: <a className="text-gold underline" href={`mailto:${CONTACT}`}>{CONTACT}</a>. [Add registered address and Information Officer details.]</P>

      <H>What we collect</H>
      <P>Only what the waitlist needs: your email address (required), your industry (required), your business name and country (optional), the date and time you consented, and the consent you gave. We do not ask for payment details or any sensitive personal information.</P>

      <H>Why we collect it</H>
      <P>To add you to the early-access waitlist and send you launch updates, an invitation when registration opens, and related marketing emails about Shinwa Content Club. We use your industry and country to understand who is interested. Our legal basis is your consent.</P>

      <H>Marketing consent and unsubscribing</H>
      <P>You must actively tick the consent box to join. Every marketing email includes an unsubscribe link. You can also email us to withdraw consent. If you unsubscribe, we keep your address on a suppression list so we don't email you again.</P>

      <H>Service providers</H>
      <P>We use Brevo (email marketing and delivery) and Netlify (website hosting and serverless functions) to process this information on our behalf. [Confirm each provider's current data processing terms.]</P>

      <H>International transfers</H>
      <P>Our service providers may process data outside South Africa and outside your country, including in the European Union and the United States. Where required, we rely on appropriate safeguards such as standard contractual clauses. [Legal review needed to confirm transfer mechanisms.]</P>

      <H>How long we keep it</H>
      <P>We keep waitlist information until you unsubscribe or ask us to delete it, or until [insert retention period] after the product launches, whichever comes first. A minimal record may be retained to honour your unsubscribe request.</P>

      <H>Your rights</H>
      <P>Depending on where you live, you may have the right to access, correct, delete or restrict use of your information, to object to marketing, to withdraw consent, and to complain to a regulator. In South Africa that is the Information Regulator; in the EU or UK, your local data protection authority. Email us to exercise any right.</P>

      <H>Cookies and analytics</H>
      <P>This page does not set tracking cookies and does not run analytics. If that changes we will update this policy. Fonts are loaded from Google Fonts, which receives your IP address when you visit. [Consider self-hosting fonts.]</P>

      <H>Changes</H>
      <P>We may update this policy and will change the date above when we do.</P>
      <P><strong>Note:</strong> this is a practical draft, not legal advice, and does not guarantee compliance with POPIA, GDPR or any other law. Have it reviewed by a qualified professional before launch.</P>
    </main>
  );
}
