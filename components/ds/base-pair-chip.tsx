import { cn } from "@/lib/utils";

type Base = "A" | "C" | "G" | "T" | "I" | "D";

const BASE_BG: Record<Base, string> = {
  A: "var(--ds-base-a)",
  C: "var(--ds-base-c)",
  G: "var(--ds-base-g)",
  T: "var(--ds-base-t)",
  I: "var(--ds-mark-graphite)",
  D: "var(--ds-mark-graphite)",
};

/** Single 16×16px base chip */
export function BaseChip({
  base,
  size = 16,
}: {
  base: string;
  size?: number;
}) {
  const b = (base.toUpperCase() as Base) || "I";
  const bg = BASE_BG[b] ?? "var(--ds-mark-graphite)";
  const fontSize = Math.max(9, Math.round(size * 0.6));
  return (
    <span
      className="inline-flex items-center justify-center font-mono font-semibold text-white"
      style={{
        width: size,
        height: size,
        backgroundColor: bg,
        fontSize,
        lineHeight: 1,
      }}
      aria-hidden
    >
      {b}
    </span>
  );
}

/** Two base chips edge-to-edge — a genotype */
export function GenotypePair({
  value,
  size = 16,
  className,
}: {
  value: string;
  size?: number;
  className?: string;
}) {
  if (!value || value === "—" || value === "-" || value === "--") {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center font-mono text-ink-faint",
          className
        )}
        style={{ width: size * 2, height: size, fontSize: size * 0.55 }}
      >
        —
      </span>
    );
  }
  const [a, b] = value.toUpperCase();
  return (
    <span
      className={cn("inline-flex overflow-hidden rounded-sm", className)}
      aria-label={`Genotype ${value}`}
      title={`Genotype ${value}`}
    >
      <BaseChip base={a} size={size} />
      <BaseChip base={b ?? a} size={size} />
    </span>
  );
}
