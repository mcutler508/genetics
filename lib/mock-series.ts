export type SparklineTrend = "improving" | "stable" | "worsening";

/**
 * Generates a plausible mock trend series given a seed and trend direction.
 * Used purely for visual demo; not real historical data.
 */
export function mockSeries(seed: number, trend: SparklineTrend): number[] {
  const len = 8;
  const out: number[] = [];
  const rand = mulberry32(seed);
  const start = trend === "improving" ? 1 : trend === "worsening" ? 0.4 : 0.6;
  const end = trend === "improving" ? 0.35 : trend === "worsening" ? 0.95 : 0.55;
  for (let i = 0; i < len; i++) {
    const t = i / (len - 1);
    const base = start + (end - start) * t;
    const noise = (rand() - 0.5) * 0.18;
    out.push(Math.max(0.05, base + noise));
  }
  return out;
}

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
