"use client";

import { useCallback, useEffect, useState } from "react";

// ─────────────────────────────────────────────────────────────────
// Token registry — the editable surface of the Periodical system.
// Defaults mirror the values in app/globals.css (light mode).
// Values are stored as hex (sRGB) — the CSS custom properties
// accept any valid CSS color, and color-mix() handles oklch math
// at the consumer side regardless of input format.
// ─────────────────────────────────────────────────────────────────

export type ThemeTokenId =
  // Canvas
  | "canvas"
  | "canvas-deep"
  | "vellum"
  | "vellum-shaded"
  // Ink
  | "ink"
  | "ink-muted"
  | "ink-faint"
  | "rule"
  | "rule-strong"
  // Brand accent
  | "accent"
  | "accent-soft"
  | "accent-deep"
  // Status marks
  | "mark-ink"
  | "mark-clay"
  | "mark-sage"
  | "mark-forest"
  | "mark-graphite"
  | "mark-terra"
  // Base pairs
  | "base-a"
  | "base-c"
  | "base-g"
  | "base-t";

export type TokenGroup = {
  label: string;
  items: { id: ThemeTokenId; label: string }[];
};

export const TOKEN_GROUPS: TokenGroup[] = [
  {
    label: "Canvas",
    items: [
      { id: "canvas", label: "Canvas" },
      { id: "canvas-deep", label: "Canvas deep" },
      { id: "vellum", label: "Vellum" },
      { id: "vellum-shaded", label: "Vellum shaded" },
    ],
  },
  {
    label: "Ink",
    items: [
      { id: "ink", label: "Ink" },
      { id: "ink-muted", label: "Ink muted" },
      { id: "ink-faint", label: "Ink faint" },
      { id: "rule", label: "Rule" },
      { id: "rule-strong", label: "Rule strong" },
    ],
  },
  {
    label: "Brand accent",
    items: [
      { id: "accent", label: "Accent" },
      { id: "accent-soft", label: "Accent soft" },
      { id: "accent-deep", label: "Accent deep" },
    ],
  },
  {
    label: "Health status marks",
    items: [
      { id: "mark-ink", label: "Primary" },
      { id: "mark-clay", label: "Secondary" },
      { id: "mark-sage", label: "Supporting" },
      { id: "mark-forest", label: "Within optimal" },
      { id: "mark-graphite", label: "Monitored" },
      { id: "mark-terra", label: "Elevated" },
    ],
  },
  {
    label: "Genetics base pairs",
    items: [
      { id: "base-a", label: "Adenine" },
      { id: "base-c", label: "Cytosine" },
      { id: "base-g", label: "Guanine" },
      { id: "base-t", label: "Thymine" },
    ],
  },
];

export const ALL_TOKENS: ThemeTokenId[] = TOKEN_GROUPS.flatMap((g) =>
  g.items.map((i) => i.id)
);

// Defaults as hex — derived from the OKLCH values in globals.css.
export const DEFAULT_TOKENS: Record<ThemeTokenId, string> = {
  canvas: "#F5EFE0",
  "canvas-deep": "#EAE2CC",
  vellum: "#FCF9F1",
  "vellum-shaded": "#F0E8D3",
  ink: "#2A2520",
  "ink-muted": "#7C6E5C",
  "ink-faint": "#A19383",
  rule: "#D6CBB1",
  "rule-strong": "#B8A98E",
  accent: "#1F5B5E",
  "accent-soft": "#D3E5E2",
  "accent-deep": "#143F45",
  "mark-ink": "#1F5B5E",
  "mark-clay": "#B07343",
  "mark-sage": "#86A480",
  "mark-forest": "#5C8C5F",
  "mark-graphite": "#7A7468",
  "mark-terra": "#B05038",
  "base-a": "#4A6DA0",
  "base-c": "#B5754A",
  "base-g": "#A8884A",
  "base-t": "#6D8E6E",
};

// Curated serif options. The first is the system default.
export type FontOptionId =
  | "fraunces"
  | "instrument-serif"
  | "eb-garamond"
  | "spectral"
  | "cormorant"
  | "playfair"
  | "dm-serif"
  | "lora";

export type FontOption = {
  id: FontOptionId;
  label: string;
  family: string;
  googleParams: string;
  feel: string;
};

export const FONT_OPTIONS: FontOption[] = [
  {
    id: "fraunces",
    label: "Fraunces",
    family: "Fraunces",
    googleParams: "Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400",
    feel: "Editorial · default",
  },
  {
    id: "instrument-serif",
    label: "Instrument Serif",
    family: "Instrument Serif",
    googleParams: "Instrument+Serif:ital@0;1",
    feel: "Display · loose",
  },
  {
    id: "eb-garamond",
    label: "EB Garamond",
    family: "EB Garamond",
    googleParams: "EB+Garamond:ital,wght@0,400;0,500;1,400",
    feel: "Classical · literary",
  },
  {
    id: "spectral",
    label: "Spectral",
    family: "Spectral",
    googleParams: "Spectral:ital,wght@0,400;0,500;1,400",
    feel: "Editorial · book",
  },
  {
    id: "cormorant",
    label: "Cormorant Garamond",
    family: "Cormorant Garamond",
    googleParams: "Cormorant+Garamond:ital,wght@0,400;0,500;1,400",
    feel: "Elegant · luxe",
  },
  {
    id: "playfair",
    label: "Playfair Display",
    family: "Playfair Display",
    googleParams: "Playfair+Display:ital,wght@0,400;0,500;1,400",
    feel: "Magazine · high contrast",
  },
  {
    id: "dm-serif",
    label: "DM Serif Display",
    family: "DM Serif Display",
    googleParams: "DM+Serif+Display:ital@0;1",
    feel: "Display · bold",
  },
  {
    id: "lora",
    label: "Lora",
    family: "Lora",
    googleParams: "Lora:ital,wght@0,400;0,500;1,400",
    feel: "Readable · sturdy",
  },
];

export const DEFAULT_FONT: FontOptionId = "fraunces";
export const DEFAULT_RADIUS = 13.6; // 0.85rem at 16px base = 13.6px

export type ThemeState = {
  tokens: Record<ThemeTokenId, string>;
  font: FontOptionId;
  radius: number;
};

export const DEFAULT_THEME: ThemeState = {
  tokens: { ...DEFAULT_TOKENS },
  font: DEFAULT_FONT,
  radius: DEFAULT_RADIUS,
};

// ─────────────────────────────────────────────────────────────────
// Persistence + URL encoding
// ─────────────────────────────────────────────────────────────────

const STORAGE_KEY = "blueprint-portal:theme:v1";
const URL_HASH_KEY = "theme";

function safeReadStorage(): Partial<ThemeState> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function safeWriteStorage(theme: ThemeState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
  } catch {
    // ignore quota errors
  }
}

function encodeForUrl(theme: ThemeState): string {
  const json = JSON.stringify(theme);
  if (typeof window === "undefined") return "";
  // Use URL-safe base64
  return btoa(unescape(encodeURIComponent(json)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function decodeFromUrl(encoded: string): Partial<ThemeState> | null {
  try {
    // Reverse URL-safe base64
    const b64 =
      encoded.replace(/-/g, "+").replace(/_/g, "/") +
      "=".repeat((4 - (encoded.length % 4)) % 4);
    const json = decodeURIComponent(escape(atob(b64)));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function readUrlHash(): Partial<ThemeState> | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.replace(/^#/, "");
  if (!hash) return null;
  const params = new URLSearchParams(hash);
  const encoded = params.get(URL_HASH_KEY);
  if (!encoded) return null;
  return decodeFromUrl(encoded);
}

function mergeTheme(
  base: ThemeState,
  override: Partial<ThemeState> | null
): ThemeState {
  if (!override) return base;
  return {
    tokens: { ...base.tokens, ...(override.tokens ?? {}) },
    font: (override.font as FontOptionId) ?? base.font,
    radius: typeof override.radius === "number" ? override.radius : base.radius,
  };
}

// ─────────────────────────────────────────────────────────────────
// DOM application
// ─────────────────────────────────────────────────────────────────

function applyTokens(tokens: Record<ThemeTokenId, string>) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  for (const [id, value] of Object.entries(tokens)) {
    root.style.setProperty(`--ds-${id}`, value);
  }
}

function applyRadius(radiusPx: number) {
  if (typeof document === "undefined") return;
  document.documentElement.style.setProperty(
    "--radius",
    `${radiusPx / 16}rem`
  );
}

const LOADED_FONTS = new Set<FontOptionId>();
function ensureFontLoaded(font: FontOption) {
  if (typeof document === "undefined") return;
  if (LOADED_FONTS.has(font.id)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${font.googleParams}&display=swap`;
  link.dataset.themeFont = font.id;
  document.head.appendChild(link);
  LOADED_FONTS.add(font.id);
}

function applyFont(fontId: FontOptionId) {
  if (typeof document === "undefined") return;
  const opt = FONT_OPTIONS.find((f) => f.id === fontId);
  if (!opt) return;
  ensureFontLoaded(opt);
  document.documentElement.style.setProperty(
    "--font-fraunces",
    `"${opt.family}", Georgia, "Times New Roman", serif`
  );
}

function applyTheme(theme: ThemeState) {
  applyTokens(theme.tokens);
  applyFont(theme.font);
  applyRadius(theme.radius);
}

// ─────────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────────

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeState>(DEFAULT_THEME);
  const [hydrated, setHydrated] = useState(false);

  // Initial load: URL hash > localStorage > defaults
  useEffect(() => {
    const fromUrl = readUrlHash();
    const fromStorage = safeReadStorage();
    const merged = mergeTheme(
      DEFAULT_THEME,
      fromUrl ?? fromStorage ?? null
    );
    setThemeState(merged);
    applyTheme(merged);
    setHydrated(true);
  }, []);

  // Persist + apply on change
  useEffect(() => {
    if (!hydrated) return;
    applyTheme(theme);
    safeWriteStorage(theme);
  }, [theme, hydrated]);

  const setToken = useCallback((id: ThemeTokenId, value: string) => {
    setThemeState((t) => ({
      ...t,
      tokens: { ...t.tokens, [id]: value },
    }));
  }, []);

  const setFont = useCallback((font: FontOptionId) => {
    setThemeState((t) => ({ ...t, font }));
  }, []);

  const setRadius = useCallback((radius: number) => {
    setThemeState((t) => ({ ...t, radius }));
  }, []);

  const reset = useCallback(() => {
    setThemeState({ ...DEFAULT_THEME });
  }, []);

  const setThemeReplace = useCallback((next: ThemeState) => {
    setThemeState(next);
  }, []);

  return {
    theme,
    hydrated,
    setToken,
    setFont,
    setRadius,
    reset,
    setTheme: setThemeReplace,
  };
}

// ─────────────────────────────────────────────────────────────────
// Export helpers (used by editor panel)
// ─────────────────────────────────────────────────────────────────

export function buildShareUrl(theme: ThemeState): string {
  if (typeof window === "undefined") return "";
  const encoded = encodeForUrl(theme);
  const base = `${window.location.origin}${window.location.pathname}`;
  return `${base}#${URL_HASH_KEY}=${encoded}`;
}

export function buildJsonExport(theme: ThemeState): string {
  return JSON.stringify(theme, null, 2);
}

export function buildCssExport(theme: ThemeState): string {
  const lines: string[] = [
    "/* Generated by Blueprint Portal theme editor */",
    ":root {",
  ];
  for (const [id, value] of Object.entries(theme.tokens)) {
    lines.push(`  --ds-${id}: ${value};`);
  }
  lines.push(`  --radius: ${(theme.radius / 16).toFixed(3)}rem;`);
  const fontOpt = FONT_OPTIONS.find((f) => f.id === theme.font);
  if (fontOpt) {
    lines.push(
      `  --font-fraunces: "${fontOpt.family}", Georgia, "Times New Roman", serif;`
    );
  }
  lines.push("}");
  return lines.join("\n");
}
