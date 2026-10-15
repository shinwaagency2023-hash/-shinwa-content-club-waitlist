// Put the official logo file at /public/logo.png (or .svg), then set LOGO_SRC below.
// Until then a plain wordmark is shown. The image is never resized non-proportionally.
const LOGO_SRC: string | null = null; // e.g. "/logo.png"

export default function Logo({ height = 40 }: { height?: number }) {
  if (LOGO_SRC) return <img src={LOGO_SRC} alt="Shinwa Agency" style={{ height, width: "auto" }} />;
  return <span className="font-display text-xl tracking-[0.18em] text-gold">SHINWA</span>;
}
