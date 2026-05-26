// Hex ↔ OKLCH conversion utilities + simple color ops.
// Implemented with the standard sRGB ↔ Linear sRGB ↔ Oklab ↔ OKLCH math.
// All public functions are pure.

export type OKLCH = { l: number; c: number; h: number };

// ─────────────────────────────────────────────────────────────────
// sRGB ↔ Linear sRGB
// ─────────────────────────────────────────────────────────────────

function srgbToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function linearToSrgb(c: number): number {
  return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

// ─────────────────────────────────────────────────────────────────
// Linear sRGB ↔ Oklab
// ─────────────────────────────────────────────────────────────────

function linearRgbToOklab(r: number, g: number, b: number): [number, number, number] {
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

  const lp = Math.cbrt(l);
  const mp = Math.cbrt(m);
  const sp = Math.cbrt(s);

  return [
    0.2104542553 * lp + 0.793617785 * mp - 0.0040720468 * sp,
    1.9779984951 * lp - 2.428592205 * mp + 0.4505937099 * sp,
    0.0259040371 * lp + 0.7827717662 * mp - 0.808675766 * sp,
  ];
}

function oklabToLinearRgb(L: number, a: number, b: number): [number, number, number] {
  const lp = L + 0.3963377774 * a + 0.2158037573 * b;
  const mp = L - 0.1055613458 * a - 0.0638541728 * b;
  const sp = L - 0.0894841775 * a - 1.291485548 * b;

  const l = lp * lp * lp;
  const m = mp * mp * mp;
  const s = sp * sp * sp;

  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

// ─────────────────────────────────────────────────────────────────
// Oklab ↔ OKLCH
// ─────────────────────────────────────────────────────────────────

function oklabToOklch(L: number, a: number, b: number): OKLCH {
  const c = Math.sqrt(a * a + b * b);
  let h = (Math.atan2(b, a) * 180) / Math.PI;
  if (h < 0) h += 360;
  return { l: L, c, h };
}

function oklchToOklab(L: number, C: number, H: number): [number, number, number] {
  const rad = (H * Math.PI) / 180;
  return [L, C * Math.cos(rad), C * Math.sin(rad)];
}

// ─────────────────────────────────────────────────────────────────
// Hex ↔ OKLCH (top-level API)
// ─────────────────────────────────────────────────────────────────

export function hexToRgb(hex: string): [number, number, number] | null {
  let v = hex.trim().replace(/^#/, "");
  if (v.length === 3) {
    v = v
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (!/^[0-9a-fA-F]{6}$/.test(v)) return null;
  const n = parseInt(v, 16);
  return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n));
}

function rgbToHex(r: number, g: number, b: number): string {
  const to = (n: number) =>
    clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0");
  return ("#" + to(r) + to(g) + to(b)).toUpperCase();
}

export function hexToOklch(hex: string): OKLCH {
  const rgb = hexToRgb(hex);
  if (!rgb) return { l: 0, c: 0, h: 0 };
  const [r, g, b] = rgb.map((v) => srgbToLinear(v / 255)) as [
    number,
    number,
    number,
  ];
  const [L, a, B] = linearRgbToOklab(r, g, b);
  return oklabToOklch(L, a, B);
}

export function oklchToHex({ l, c, h }: OKLCH): string {
  const [L, a, B] = oklchToOklab(l, c, h);
  const [r, g, b] = oklabToLinearRgb(L, a, B);
  const sr = clamp(linearToSrgb(r), 0, 1) * 255;
  const sg = clamp(linearToSrgb(g), 0, 1) * 255;
  const sb = clamp(linearToSrgb(b), 0, 1) * 255;
  return rgbToHex(sr, sg, sb);
}

// ─────────────────────────────────────────────────────────────────
// Color operations (in OKLCH space, perceptually uniform)
// ─────────────────────────────────────────────────────────────────

/** Adjust lightness by `delta` (additive). Clamped to [0, 1]. */
export function shiftL(hex: string, delta: number): string {
  const o = hexToOklch(hex);
  return oklchToHex({ ...o, l: clamp(o.l + delta, 0, 1) });
}

/** Mix two hex colors in OKLCH space. weight = 0 → a, 1 → b. */
export function mix(a: string, b: string, weight: number): string {
  const A = hexToOklch(a);
  const B = hexToOklch(b);
  const w = clamp(weight, 0, 1);
  // Shortest-path hue interpolation
  let h: number;
  const dh = B.h - A.h;
  if (Math.abs(dh) > 180) {
    h =
      dh > 0
        ? (A.h + (dh - 360) * w + 360) % 360
        : (A.h + (dh + 360) * w + 360) % 360;
  } else {
    h = A.h + dh * w;
  }
  // If either has near-zero chroma, take the other's hue
  if (A.c < 0.01) h = B.h;
  else if (B.c < 0.01) h = A.h;
  return oklchToHex({
    l: A.l + (B.l - A.l) * w,
    c: A.c + (B.c - A.c) * w,
    h,
  });
}

/** Build a color at a specific hue, with L/C from a reference color. */
export function withHue(hex: string, hue: number): string {
  const o = hexToOklch(hex);
  return oklchToHex({ ...o, h: hue });
}

/** Build a fully-specified OKLCH color. */
export function oklch(l: number, c: number, h: number): string {
  return oklchToHex({ l, c, h });
}

/** Detect whether a hex is closer to dark or light (L < 0.5 = dark). */
export function isDarkHex(hex: string): boolean {
  return hexToOklch(hex).l < 0.5;
}

/** Lightness component of a hex color, in OKLCH (0–1). */
export function lightnessOf(hex: string): number {
  return hexToOklch(hex).l;
}

/** Chroma component of a hex color, in OKLCH. */
export function chromaOf(hex: string): number {
  return hexToOklch(hex).c;
}
