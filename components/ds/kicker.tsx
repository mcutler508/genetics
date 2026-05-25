import { cn } from "@/lib/utils";

/**
 * The editorial eyebrow label that sits above every titled module.
 * Always mono, uppercase, wide tracking. Reads aloud:
 * "Cycle 02 · Week 02 of 12 · Primary Focus"
 */
export function Kicker({
  children,
  tone = "muted",
  className,
}: {
  children: React.ReactNode;
  tone?: "muted" | "accent" | "ink";
  className?: string;
}) {
  const toneClass = {
    muted: "text-ink-faint",
    accent: "text-mark-ink",
    ink: "text-ink",
  }[tone];
  return (
    <p className={cn("kicker", toneClass, className)}>{children}</p>
  );
}

/**
 * A section header that pairs a kicker with a serif title and an
 * optional caption beneath. The kicker sets the editorial voice.
 */
export function SectionHeader({
  kicker,
  title,
  caption,
  className,
}: {
  kicker?: string;
  title: string;
  caption?: string;
  className?: string;
}) {
  return (
    <header className={cn("mb-6 space-y-2", className)}>
      {kicker && <Kicker tone="accent">{kicker}</Kicker>}
      <h2 className="ds-title-1 text-ink">{title}</h2>
      {caption && <p className="text-ink-muted text-sm">{caption}</p>}
    </header>
  );
}
