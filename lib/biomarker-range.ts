import type { Biomarker, BiomarkerStatus } from "@/lib/mock-data";
import type { StatusTier } from "@/components/ds/status-pill";

export type BiomarkerRange = {
  min: number;
  max: number;
  optimalStart: number;
  optimalEnd: number;
  value: number;
};

/**
 * Parses a biomarker's `currentValue` and `optimalRange` strings into a
 * normalized numeric range suitable for a RangeStrip / gauge.
 * Handles "< 60", "2–5", "70-90", "<0.20", etc.
 * Returns null if the marker has no numeric value.
 */
export function getBiomarkerRange(b: Biomarker): BiomarkerRange | null {
  const valueNum = parseFloat(
    String(b.currentValue).replace(/[<>≤≥]/g, "").trim()
  );
  if (Number.isNaN(valueNum)) return null;

  const range = b.optimalRange.replace(/[^\d.\-–<>≤≥ ]/g, "").trim();

  // "< 60" → [0, 60]
  const lessThan = range.match(/^[<≤]\s*([\d.]+)/);
  if (lessThan) {
    const max = parseFloat(lessThan[1]);
    return {
      min: 0,
      max: Math.max(max * 1.6, valueNum * 1.15),
      optimalStart: 0,
      optimalEnd: max,
      value: valueNum,
    };
  }

  // "> 50" → [50, value*1.5]
  const greaterThan = range.match(/^[>≥]\s*([\d.]+)/);
  if (greaterThan) {
    const min = parseFloat(greaterThan[1]);
    return {
      min: 0,
      max: Math.max(min * 2, valueNum * 1.5),
      optimalStart: min,
      optimalEnd: min * 2,
      value: valueNum,
    };
  }

  // "2–5" / "50-150"
  const rangeMatch = range.match(/([\d.]+)\s*[-–]\s*([\d.]+)/);
  if (rangeMatch) {
    const lo = parseFloat(rangeMatch[1]);
    const hi = parseFloat(rangeMatch[2]);
    const span = hi - lo;
    const pad = Math.max(span * 0.6, 1);
    return {
      min: Math.min(lo - pad, valueNum * 0.6),
      max: Math.max(hi + pad, valueNum * 1.15),
      optimalStart: lo,
      optimalEnd: hi,
      value: valueNum,
    };
  }

  return null;
}

const STATUS_TO_TIER: Record<BiomarkerStatus, StatusTier> = {
  primary_focus: "primary",
  secondary_focus: "secondary",
  supporting: "supporting",
  within_optimal: "optimal",
  monitored: "monitored",
  elevated: "elevated",
};

export function statusToTier(s: BiomarkerStatus): StatusTier {
  return STATUS_TO_TIER[s] ?? "monitored";
}

const ROLE_TO_TIER: Record<
  "primary" | "secondary" | "supporting" | "monitored",
  StatusTier
> = {
  primary: "primary",
  secondary: "secondary",
  supporting: "supporting",
  monitored: "monitored",
};

export function roleToTier(
  r: "primary" | "secondary" | "supporting" | "monitored"
): StatusTier {
  return ROLE_TO_TIER[r];
}
