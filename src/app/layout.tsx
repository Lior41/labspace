import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ArrowUpRight } from "lucide-react";
import "./globals.css";
export const metadata: Metadata = {
  title: { default: "LABSPACE — Little questions. Big discoveries.", template: "%s · LABSPACE" },
  description:
    "A playful virtual science lab for curious kids and their grown-ups. Explore motion, pendulums and light together.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <header className="header">
          <Link className="brand" href="/">
            <Sparkles size={26} />
            labspace
          </Link>
          <nav aria-label="Main navigation">
            <Link href="/explore">The experiments</Link>
            <Link href="/notebook">Our discoveries</Link>
            <Link href="/grown-ups">For grown-ups</Link>
          </nav>
          <Link className="button small" href="/explore">
            Explore together <ArrowUpRight size={16} />
          </Link>
        </header>
        <main id="main">{children}</main>
        <footer>
          <Link href="/" className="brand">
            <Sparkles size={22} />
            labspace
          </Link>
          <p>Little questions. Big discoveries. Together.</p>
          <div>
            <Link href="/how-it-works">How it works</Link>
            <Link href="/grown-ups">Privacy & grown-ups</Link>
          </div>
          <small>Virtual experiments. Real curiosity. No account needed.</small>
        </footer>
      </body>
    </html>
  );
}
