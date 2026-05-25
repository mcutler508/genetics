import { Kicker } from "@/components/ds/kicker";

/**
 * Footer colophon — the educational-only disclaimer that sits at the bottom
 * of every page. Uses kicker styling in ink-faint for a quiet, journal-like
 * close to the page.
 */
export function Disclaimer({ children }: { children: React.ReactNode }) {
  return (
    <footer className="mt-12 border-t border-rule pt-6">
      <Kicker className="text-ink-faint">{children}</Kicker>
    </footer>
  );
}
