import { cn } from "@/lib/utils";
import type { Biomarker } from "@/lib/mock-data";

/**
 * Parses the biomarker's current value to a number, and its optimalRange
 * to a [min, max] tuple. Handles formats like "2–5", "50–150", "< 60",
 * "< 1.0 mg/L", "70-90", "< 5.4%", "<0.20", and similar.
 * Returns null if it can't determine a meaningful gauge.
 */
function parseGaugeMath(b: Biomarker) {
  const valueNum = parseFloat(
    String(b.currentValue).replace(/[<>≤≥]/g, "").trim()
  );
  if (Number.isNaN(valueNum)) return null;

  const range = b.optimalRange.replace(/[^\d.\-–<>≤≥ ]/g, "").trim();

  // "< 60" → [0, 60]
  const lessThan = range.match(/^[<≤]\s*([\d.]+)/);
  if (lessThan) {
    const max = parseFloat(lessThan[1]);
    return { min: 0, max, value: valueNum, kind: "less-than" as const };
  }

  // "> 50" → [50, value+50%] (rare)
  const greaterThan = range.match(/^[>≥]\s*([\d.]+)/);
  if (greaterThan) {
    const min = parseFloat(greaterThan[1]);
    return {
      min,
      max: Math.max(min * 2, valueNum * 1.5),
      value: valueNum,
      kind: "greater-than" as const,
    };
  }

  // "2–5" / "2-5" / "50–150"
  const rangeMatch = range.match(/([\d.]+)\s*[-–]\s*([\d.]+)/);
  if (rangeMatch) {
    const lo = parseFloat(rangeMatch[1]);
    const hi = parseFloat(rangeMatch[2]);
    return { min: lo, max: hi, value: valueNum, kind: "range" as const };
  }

  return null;
}

export function BiomarkerGauge({
  biomarker,
  className,
}: {
  biomarker: Biomarker;
  className?: string;
}) {
  const math = parseGaugeMath(biomarker);
  if (!math) return null;

  const { min, max, value, kind } = math;

  // Build a display axis. For "less than" we show [0, 1.6*max] so the
  // optimal zone covers the left ~60%. For "range" we pad either side by 60%.
  let axisStart: number;
  let axisEnd: number;
  let optimalStart: number;
  let optimalEnd: number;

  if (kind === "less-than") {
    axisStart = 0;
    axisEnd = Math.max(max * 1.6, value * 1.15);
    optimalStart = 0;
    optimalEnd = max;
  } else if (kind === "greater-than") {
    axisStart = 0;
    axisEnd = Math.max(max, value * 1.15);
    optimalStart = min;
    optimalEnd = max;
  } else {
    const span = max - min;
    const pad = Math.max(span * 0.6, 1);
    axisStart = Math.min(min - pad, value * 0.6);
    axisEnd = Math.max(max + pad, value * 1.15);
    optimalStart = min;
    optimalEnd = max;
  }

  const total = axisEnd - axisStart;
  const pct = (n: number) => `${((n - axisStart) / total) * 100}%`;
  const valuePct = ((value - axisStart) / total) * 100;
  const isInOptimal = value >= optimalStart && value <= optimalEnd;
  const isAbove = value > optimalEnd;
  const isBelow = value < optimalStart;

  return (
    <div className={cn("w-full", className)}>
      <div className="relative h-2 w-full overflow-visible rounded-full bg-muted">
        {/* Optimal range band */}
        <div
          className="absolute inset-y-0 rounded-full bg-chart-2/40"
          style={{
            left: pct(optimalStart),
            width: `calc(${pct(optimalEnd)} - ${pct(optimalStart)})`,
          }}
        />
        {/* Current value marker */}
        <div
          className={cn(
            "absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-background",
            "h-3.5 w-3.5",
            isInOptimal && "bg-chart-2",
            isAbove && "bg-destructive",
            isBelow && "bg-chart-4"
          )}
          style={{
            left: `${Math.min(99, Math.max(1, valuePct))}%`,
          }}
          aria-label={`Current: ${biomarker.currentValue} ${biomarker.unit}`}
        />
      </div>
      <div className="mt-1.5 flex items-center justify-between text-[10px] text-muted-foreground">
        <span className="font-mono">
          {Number.isFinite(axisStart) ? niceNum(axisStart) : ""}
        </span>
        <span className="font-mono">
          optimal {biomarker.optimalRange.replace(/[^\d.\-–<>≤≥ ]/g, "").trim()}
        </span>
        <span className="font-mono">
          {Number.isFinite(axisEnd) ? niceNum(axisEnd) : ""}
        </span>
      </div>
    </div>
  );
}

function niceNum(n: number) {
  if (n >= 100) return n.toFixed(0);
  if (n >= 10) return n.toFixed(0);
  return n.toFixed(1).replace(/\.0$/, "");
}
