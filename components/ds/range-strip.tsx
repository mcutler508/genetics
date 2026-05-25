import { cn } from "@/lib/utils";
import type { StatusTier } from "./status-pill";

const TIER_COLOR: Record<StatusTier, string> = {
  primary: "var(--ds-mark-ink)",
  secondary: "var(--ds-mark-clay)",
  supporting: "var(--ds-mark-sage)",
  optimal: "var(--ds-mark-forest)",
  monitored: "var(--ds-mark-graphite)",
  elevated: "var(--ds-mark-terra)",
};

type RangeStripProps = {
  /** axis start */
  min: number;
  /** axis end */
  max: number;
  /** start of the optimal band */
  optimalStart: number;
  /** end of the optimal band */
  optimalEnd: number;
  /** current value (positions the marker) */
  value: number;
  tier: StatusTier;
  /** Optional label to show under the strip */
  labelLeft?: string;
  labelCenter?: string;
  labelRight?: string;
  className?: string;
};

export function RangeStrip({
  min,
  max,
  optimalStart,
  optimalEnd,
  value,
  tier,
  labelLeft,
  labelCenter,
  labelRight,
  className,
}: RangeStripProps) {
  const total = max - min;
  const pct = (n: number) => `${((n - min) / total) * 100}%`;
  const valuePct = ((value - min) / total) * 100;

  return (
    <div className={cn("w-full", className)}>
      <div className="relative h-2 w-full">
        {/* Track */}
        <div className="absolute inset-0 rounded-full bg-vellum-shaded" />
        {/* Out-of-range zones — hatched */}
        <div
          className="absolute inset-y-0 left-0 rounded-l-full hatch-warning"
          style={{ width: pct(optimalStart) }}
        />
        <div
          className="absolute inset-y-0 right-0 rounded-r-full hatch-warning"
          style={{ left: pct(optimalEnd) }}
        />
        {/* Optimal band */}
        <div
          className="absolute inset-y-0 rounded-full"
          style={{
            left: pct(optimalStart),
            width: `calc(${pct(optimalEnd)} - ${pct(optimalStart)})`,
            backgroundColor:
              "color-mix(in oklch, var(--ds-mark-forest) 35%, transparent)",
          }}
        />
        {/* Value marker */}
        <div
          className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-vellum"
          style={{
            left: `${Math.min(99, Math.max(1, valuePct))}%`,
            backgroundColor: TIER_COLOR[tier],
          }}
          aria-label={`Value: ${value}`}
        />
      </div>
      {(labelLeft || labelCenter || labelRight) && (
        <div className="mt-1.5 flex items-center justify-between text-[10px] text-ink-faint">
          <span className="font-mono">{labelLeft}</span>
          <span className="font-mono">{labelCenter}</span>
          <span className="font-mono">{labelRight}</span>
        </div>
      )}
    </div>
  );
}
