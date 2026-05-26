// Derive the full 22-token DS palette from 4 anchor colors.
// Mode-aware: light themes recess by darkening, dark themes recess by lifting
// less. This prevents the "void box" effect we saw on Inkwell Night where
// canvas-deep was much darker than canvas, creating a hole inside cards.

import {
  hexToOklch,
  isDarkHex,
  lightnessOf,
  mix,
  oklch,
  oklchToHex,
  shiftL,
} from "@/lib/color";

export type ThemeAnchors = {
  canvas: string;
  ink: string;
  accent: string;
  alarm: string;
};

export type DerivedPalette = {
  canvas: string;
  "canvas-deep": string;
  vellum: string;
  "vellum-shaded": string;
  ink: string;
  "ink-muted": string;
  "ink-faint": string;
  rule: string;
  "rule-strong": string;
  accent: string;
  "accent-soft": string;
  "accent-deep": string;
  "mark-ink": string;
  "mark-clay": string;
  "mark-sage": string;
  "mark-forest": string;
  "mark-graphite": string;
  "mark-terra": string;
  "base-a": string;
  "base-c": string;
  "base-g": string;
  "base-t": string;
};

/**
 * Derive the full 22-token palette from 4 anchor colors.
 * Elevation hierarchy: canvas-deep (most recessed) ← canvas ← vellum-shaded ← vellum (most lifted).
 * In both light and dark modes, vellum is lighter than canvas (cards lift)
 * and canvas-deep is slightly darker than canvas (recessed) — but the deltas
 * are tuned to mode so dark themes don't get "void" recesses.
 */
export function derivePalette(anchors: ThemeAnchors): DerivedPalette {
  const { canvas, ink, accent, alarm } = anchors;
  const dark = isDarkHex(canvas);

  // ── Neutrals: derived from canvas + ink with mode-aware deltas ─────
  // For light themes: vellum brighter, canvas-deep slightly darker
  // For dark themes: vellum lifted more aggressively, canvas-deep barely darker
  const canvasDeep = dark
    ? shiftL(canvas, -0.025) // tiny recession (no void)
    : shiftL(canvas, -0.045); // clear recession
  const vellum = dark
    ? shiftL(canvas, 0.06) // clearly lifted card
    : shiftL(canvas, 0.022); // subtle paper-lift
  const vellumShaded = dark
    ? shiftL(canvas, 0.035) // mid-lift, between canvas and vellum
    : shiftL(canvas, -0.018); // slight recession (used for hover/nested)

  // ── Ink family: mix from ink toward canvas to fade ─────────────────
  const inkMuted = mix(ink, canvas, 0.38);
  const inkFaint = mix(ink, canvas, 0.6);
  const rule = mix(ink, canvas, 0.78);
  const ruleStrong = mix(ink, canvas, 0.65);

  // ── Accent family ─────────────────────────────────────────────────
  const accentL = lightnessOf(accent);
  const accentSoft = dark
    ? // For dark themes, soft is a dim version near canvas brightness
      mix(accent, canvas, 0.7)
    : // For light themes, soft is a pale tinted version near canvas
      mix(accent, canvas, 0.82);
  const accentDeep = shiftL(accent, dark ? +0.08 : -0.1);

  // ── Status marks (fixed hues, calibrated L/C to theme mode) ────────
  const markBase = hexToOklch(accent);
  const markL = dark ? 0.72 : 0.55;
  const markC = dark ? 0.105 : 0.105;

  const markInk = accent; // primary mark = brand accent
  const markClay = oklch(markL, markC * 1.15, 50); // warm orange-brown
  const markSage = oklch(markL, markC * 0.7, 145); // muted green
  const markForest = oklch(markL - 0.06, markC, 150); // forest green
  const markGraphite = oklch(markL - 0.18, 0.012, 70); // warm gray
  const markTerra = alarm; // use the alarm anchor directly

  // ── Base pairs (DNA letters): 4 distinct hues, calibrated to theme ──
  const baseL = dark ? 0.7 : 0.55;
  const baseC = dark ? 0.115 : 0.105;
  const baseA = oklch(baseL, baseC, 235); // blue
  const baseC2 = oklch(baseL, baseC * 1.2, 50); // orange
  const baseG = oklch(baseL + 0.04, baseC, 80); // amber
  const baseT = oklch(baseL, baseC * 0.85, 145); // green

  void markBase; // (unused but kept for future hue-calibration tweaks)

  return {
    canvas,
    "canvas-deep": canvasDeep,
    vellum,
    "vellum-shaded": vellumShaded,
    ink,
    "ink-muted": inkMuted,
    "ink-faint": inkFaint,
    rule,
    "rule-strong": ruleStrong,
    accent,
    "accent-soft": accentSoft,
    "accent-deep": accentDeep,
    "mark-ink": markInk,
    "mark-clay": markClay,
    "mark-sage": markSage,
    "mark-forest": markForest,
    "mark-graphite": markGraphite,
    "mark-terra": markTerra,
    "base-a": baseA,
    "base-c": baseC2,
    "base-g": baseG,
    "base-t": baseT,
  };
}

void oklchToHex; // re-export not needed; kept available
