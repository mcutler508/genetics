"use client";

import { useCallback, useEffect, useState } from "react";
import { derivePalette, type ThemeAnchors } from "@/lib/derive-palette";

// ─────────────────────────────────────────────────────────────────
// Token registry — names of the 22 derived tokens. Used by the
// editor's inspector and CSS variable application. The values are
// always derived from the 4 anchors below.
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

// ─────────────────────────────────────────────────────────────────
// Anchors — the 4 colors the user actually picks. Everything else
// is derived. This is what eliminates ugly combos: you literally
// can't pick 22 conflicting hexes anymore.
// ─────────────────────────────────────────────────────────────────

export type AnchorId = "canvas" | "ink" | "accent" | "alarm";

export const ANCHOR_LIST: { id: AnchorId; label: string; help: string }[] = [
  {
    id: "canvas",
    label: "Canvas",
    help: "Page background. Pick light for a paper feel, dark for a night feel.",
  },
  {
    id: "ink",
    label: "Ink",
    help: "Primary text color. Should sit opposite the canvas (dark on light, light on dark).",
  },
  {
    id: "accent",
    label: "Accent",
    help: "Brand color — drives active states, primary status, and the primary button.",
  },
  {
    id: "alarm",
    label: "Alarm",
    help: "Elevated / out-of-range hue. Used sparingly for safety-critical signals.",
  },
];

// ─────────────────────────────────────────────────────────────────
// Fonts + radius
// ─────────────────────────────────────────────────────────────────

export type FontOptionId =
  | "inter"
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
    id: "inter",
    label: "Inter",
    family: "Inter",
    googleParams: "Inter:wght@400;500;600;700",
    feel: "Sans · modern clinical",
  },
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

export const DEFAULT_RADIUS = 13.6; // 0.85rem at 16px

// ─────────────────────────────────────────────────────────────────
// Theme state — anchors + font + radius (everything else derived)
// ─────────────────────────────────────────────────────────────────

export type ThemeState = {
  anchors: ThemeAnchors;
  font: FontOptionId;
  radius: number;
};

// ─────────────────────────────────────────────────────────────────
// Curated presets — anchors only. The derivation guarantees harmony.
// Contrast tuned for clear hierarchy in both modes.
// ─────────────────────────────────────────────────────────────────

export type ThemePresetId = "periodical" | "oxblood" | "inkwell" | "clinic";

export type ThemePreset = {
  id: ThemePresetId;
  name: string;
  tagline: string;
  /** Preview swatches in display order: canvas, ink, accent, alarm. */
  swatches: string[];
  theme: ThemeState;
};

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: "periodical",
    name: "Periodical",
    tagline: "Editorial · botanical · cream",
    swatches: ["#EFE6CF", "#1A150F", "#0F5A60", "#A8442B"],
    theme: {
      anchors: {
        canvas: "#EFE6CF", // warm cream, slightly deeper for hierarchy
        ink: "#1A150F", // deep warm charcoal, high contrast
        accent: "#0F5A60", // deep botanical teal, full presence
        alarm: "#A8442B", // terracotta
      },
      font: "fraunces",
      radius: 13.6,
    },
  },
  {
    id: "oxblood",
    name: "Oxblood Library",
    tagline: "Luxe wine · bone · serif",
    swatches: ["#EFE3CC", "#1C100E", "#6E1F23", "#9C3F2D"],
    theme: {
      anchors: {
        canvas: "#EFE3CC", // warm bone
        ink: "#1C100E", // deep oxblood-tinted ink
        accent: "#6E1F23", // deep wine
        alarm: "#9C3F2D", // brick
      },
      font: "cormorant",
      radius: 8,
    },
  },
  {
    id: "inkwell",
    name: "Inkwell Night",
    tagline: "Dark · paper ink · electric teal",
    swatches: ["#13110E", "#F1EAD6", "#5BCBD6", "#E5825A"],
    theme: {
      anchors: {
        canvas: "#13110E", // warm pitch
        ink: "#F1EAD6", // paper cream
        accent: "#5BCBD6", // electric teal, more saturation for dark
        alarm: "#E5825A", // warm coral
      },
      font: "instrument-serif",
      radius: 13.6,
    },
  },
  {
    id: "clinic",
    name: "Clinic",
    tagline: "Cool slate · vivid blue · sans",
    swatches: ["#F8FAFC", "#0F172A", "#3B82F6", "#EF4444"],
    theme: {
      anchors: {
        canvas: "#F8FAFC", // cool slate-50
        ink: "#0F172A", // slate-900
        accent: "#3B82F6", // blue-500
        alarm: "#EF4444", // red-500
      },
      font: "inter",
      radius: 8,
    },
  },
];

export const DEFAULT_THEME: ThemeState = THEME_PRESETS[0].theme;
export const DEFAULT_FONT: FontOptionId = DEFAULT_THEME.font;
export const DEFAULT_ANCHORS: ThemeAnchors = DEFAULT_THEME.anchors;

export function getPreset(id: ThemePresetId): ThemePreset {
  return THEME_PRESETS.find((p) => p.id === id) ?? THEME_PRESETS[0];
}

// ─────────────────────────────────────────────────────────────────
// Persistence + URL encoding (anchors-only format, v2)
// ─────────────────────────────────────────────────────────────────

const STORAGE_KEY = "blueprint-portal:theme:v2";
const SAVED_THEMES_KEY = "blueprint-portal:saved-themes:v1";
const URL_HASH_KEY = "theme";

// ─────────────────────────────────────────────────────────────────
// Saved themes — user-named theme snapshots persisted to localStorage.
// Survive preset clicks; clickable like presets.
// ─────────────────────────────────────────────────────────────────

export type SavedTheme = {
  id: string;
  name: string;
  createdAt: string; // ISO date
  theme: ThemeState;
};

function safeReadSavedThemes(): SavedTheme[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SAVED_THEMES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (t): t is SavedTheme =>
        t && typeof t.id === "string" && typeof t.name === "string" && t.theme
    );
  } catch {
    return [];
  }
}

function safeWriteSavedThemes(items: SavedTheme[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SAVED_THEMES_KEY, JSON.stringify(items));
  } catch {
    /* ignore */
  }
}

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
    /* ignore */
  }
}

function encodeForUrl(theme: ThemeState): string {
  if (typeof window === "undefined") return "";
  const json = JSON.stringify(theme);
  return btoa(unescape(encodeURIComponent(json)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function decodeFromUrl(encoded: string): Partial<ThemeState> | null {
  try {
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
    anchors: { ...base.anchors, ...(override.anchors ?? {}) },
    font: (override.font as FontOptionId) ?? base.font,
    radius: typeof override.radius === "number" ? override.radius : base.radius,
  };
}

// ─────────────────────────────────────────────────────────────────
// DOM application — derive tokens from anchors, set CSS vars
// ─────────────────────────────────────────────────────────────────

function applyTokens(anchors: ThemeAnchors) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const palette = derivePalette(anchors);
  for (const [id, value] of Object.entries(palette)) {
    root.style.setProperty(`--ds-${id}`, value);
  }
  // Mirror DS tokens onto legacy shadcn surface so every component follows.
  root.style.setProperty("--background", palette.canvas);
  root.style.setProperty("--foreground", palette.ink);
  root.style.setProperty("--card", palette.vellum);
  root.style.setProperty("--card-foreground", palette.ink);
  root.style.setProperty("--popover", palette.vellum);
  root.style.setProperty("--popover-foreground", palette.ink);
  root.style.setProperty("--primary", palette.accent);
  root.style.setProperty("--primary-foreground", palette.vellum);
  root.style.setProperty("--secondary", palette["vellum-shaded"]);
  root.style.setProperty("--secondary-foreground", palette.ink);
  root.style.setProperty("--muted", palette["vellum-shaded"]);
  root.style.setProperty("--muted-foreground", palette["ink-muted"]);
  root.style.setProperty("--accent", palette["accent-soft"]);
  root.style.setProperty("--accent-foreground", palette["accent-deep"]);
  root.style.setProperty("--border", palette.rule);
  root.style.setProperty("--input", palette.rule);
  root.style.setProperty("--ring", palette.accent);
  root.style.setProperty("--destructive", palette["mark-terra"]);
  root.style.setProperty("--sidebar", palette["vellum-shaded"]);
  root.style.setProperty("--sidebar-foreground", palette.ink);
  root.style.setProperty("--sidebar-primary", palette.accent);
  root.style.setProperty("--sidebar-accent", palette["accent-soft"]);
  root.style.setProperty(
    "--sidebar-accent-foreground",
    palette["accent-deep"]
  );
  root.style.setProperty("--sidebar-border", palette.rule);
  root.style.setProperty("--sidebar-ring", palette.accent);
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
  applyTokens(theme.anchors);
  applyFont(theme.font);
  applyRadius(theme.radius);
}

// ─────────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────────

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeState>(DEFAULT_THEME);
  const [savedThemes, setSavedThemes] = useState<SavedTheme[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const fromUrl = readUrlHash();
    const fromStorage = safeReadStorage();
    const merged = mergeTheme(DEFAULT_THEME, fromUrl ?? fromStorage ?? null);
    setThemeState(merged);
    applyTheme(merged);
    setSavedThemes(safeReadSavedThemes());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    applyTheme(theme);
    safeWriteStorage(theme);
  }, [theme, hydrated]);

  // Listen for cross-tab / cross-hook storage updates so a save from one
  // useTheme caller is seen by the other (ThemeApplier vs ThemeEditor).
  useEffect(() => {
    if (typeof window === "undefined") return;
    function onStorage(e: StorageEvent) {
      if (e.key === SAVED_THEMES_KEY) {
        setSavedThemes(safeReadSavedThemes());
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setAnchor = useCallback((id: AnchorId, value: string) => {
    setThemeState((t) => ({
      ...t,
      anchors: { ...t.anchors, [id]: value },
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

  const saveCurrentAs = useCallback(
    (name: string) => {
      const id = `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const newItem: SavedTheme = {
        id,
        name: name.trim() || "Untitled",
        createdAt: new Date().toISOString(),
        theme: {
          anchors: { ...theme.anchors },
          font: theme.font,
          radius: theme.radius,
        },
      };
      const next = [newItem, ...savedThemes];
      setSavedThemes(next);
      safeWriteSavedThemes(next);
      return id;
    },
    [theme, savedThemes]
  );

  const deleteSaved = useCallback(
    (id: string) => {
      const next = savedThemes.filter((s) => s.id !== id);
      setSavedThemes(next);
      safeWriteSavedThemes(next);
    },
    [savedThemes]
  );

  return {
    theme,
    hydrated,
    savedThemes,
    setAnchor,
    setFont,
    setRadius,
    reset,
    setTheme: setThemeReplace,
    saveCurrentAs,
    deleteSaved,
  };
}

// ─────────────────────────────────────────────────────────────────
// Export helpers
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
  const palette = derivePalette(theme.anchors);
  const lines: string[] = [
    "/* Generated by Blueprint Portal theme editor */",
    ":root {",
  ];
  for (const [id, value] of Object.entries(palette)) {
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
