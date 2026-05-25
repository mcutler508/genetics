import { cn } from "@/lib/utils";

export type StatusTier =
  | "primary"
  | "secondary"
  | "supporting"
  | "optimal"
  | "monitored"
  | "elevated";

const TIER: Record<
  StatusTier,
  { label: string; color: string; bg: string; border: string }
> = {
  primary: {
    label: "Primary Focus",
    color: "text-mark-ink",
    bg: "bg-[color:color-mix(in_oklch,var(--ds-mark-ink)_12%,transparent)]",
    border:
      "border-[color:color-mix(in_oklch,var(--ds-mark-ink)_30%,transparent)]",
  },
  secondary: {
    label: "Secondary Focus",
    color: "text-mark-clay",
    bg: "bg-[color:color-mix(in_oklch,var(--ds-mark-clay)_12%,transparent)]",
    border:
      "border-[color:color-mix(in_oklch,var(--ds-mark-clay)_30%,transparent)]",
  },
  supporting: {
    label: "Supporting",
    color: "text-mark-sage",
    bg: "bg-[color:color-mix(in_oklch,var(--ds-mark-sage)_12%,transparent)]",
    border:
      "border-[color:color-mix(in_oklch,var(--ds-mark-sage)_30%,transparent)]",
  },
  optimal: {
    label: "Within Optimal",
    color: "text-mark-forest",
    bg: "bg-[color:color-mix(in_oklch,var(--ds-mark-forest)_12%,transparent)]",
    border:
      "border-[color:color-mix(in_oklch,var(--ds-mark-forest)_30%,transparent)]",
  },
  monitored: {
    label: "Monitored",
    color: "text-mark-graphite",
    bg: "bg-[color:color-mix(in_oklch,var(--ds-mark-graphite)_10%,transparent)]",
    border:
      "border-[color:color-mix(in_oklch,var(--ds-mark-graphite)_28%,transparent)]",
  },
  elevated: {
    label: "Elevated",
    color: "text-mark-terra",
    bg: "bg-[color:color-mix(in_oklch,var(--ds-mark-terra)_12%,transparent)]",
    border:
      "border-[color:color-mix(in_oklch,var(--ds-mark-terra)_30%,transparent)]",
  },
};

export function StatusPill({
  tier,
  label,
  className,
}: {
  tier: StatusTier;
  label?: string;
  className?: string;
}) {
  const t = TIER[tier];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 kicker",
        t.color,
        t.bg,
        t.border,
        className
      )}
    >
      <StatusDot tier={tier} />
      {label ?? t.label}
    </span>
  );
}

export function StatusDot({
  tier,
  size = 6,
  className,
}: {
  tier: StatusTier;
  size?: number;
  className?: string;
}) {
  const colorVar: Record<StatusTier, string> = {
    primary: "var(--ds-mark-ink)",
    secondary: "var(--ds-mark-clay)",
    supporting: "var(--ds-mark-sage)",
    optimal: "var(--ds-mark-forest)",
    monitored: "var(--ds-mark-graphite)",
    elevated: "var(--ds-mark-terra)",
  };
  return (
    <span
      className={cn("inline-block rounded-full", className)}
      style={{
        width: size,
        height: size,
        backgroundColor: colorVar[tier],
      }}
      aria-hidden
    />
  );
}
