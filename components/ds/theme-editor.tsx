"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  BookmarkPlus,
  Check,
  ChevronRight,
  Copy,
  Crosshair,
  Download,
  Link as LinkIcon,
  RotateCcw,
  SlidersHorizontal,
  Trash2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ALL_TOKENS,
  ANCHOR_LIST,
  buildCssExport,
  buildJsonExport,
  buildShareUrl,
  DEFAULT_RADIUS,
  FONT_OPTIONS,
  THEME_PRESETS,
  TOKEN_GROUPS,
  useTheme,
  type AnchorId,
  type FontOptionId,
  type SavedTheme,
  type ThemePreset,
  type ThemeState,
  type ThemeTokenId,
} from "@/lib/use-theme";
import { derivePalette } from "@/lib/derive-palette";

// ─────────────────────────────────────────────────────────────────
// Inspector types + helpers
// ─────────────────────────────────────────────────────────────────

type MatchProp = "background" | "text" | "border";

type ColorMatch = {
  token: ThemeTokenId;
  property: MatchProp;
  hex: string;
};

type InspectionResult = {
  element: HTMLElement;
  description: string;
  matches: ColorMatch[];
};

function rgbToHex(rgb: string): string | null {
  if (!rgb || rgb === "rgba(0, 0, 0, 0)" || rgb === "transparent") return null;
  const m = rgb.match(/-?\d+(?:\.\d+)?/g);
  if (!m || m.length < 3) return null;
  const [r, g, b] = m.map((v) =>
    Math.max(0, Math.min(255, Math.round(parseFloat(v))))
  );
  return (
    "#" +
    [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("").toUpperCase()
  );
}

function normalizeHex(v: string): string {
  return v.trim().toUpperCase();
}

function colorsEqual(a: string | null, b: string): boolean {
  if (!a) return false;
  return normalizeHex(a) === normalizeHex(b);
}

function describeElement(el: HTMLElement): string {
  const tag = el.tagName.toLowerCase();
  const role = el.getAttribute("role");
  const aria = el.getAttribute("aria-label");
  const text = (el.textContent ?? "").trim().slice(0, 40);
  let cls = "";
  if (typeof el.className === "string") {
    const classes = el.className.split(/\s+/).filter(Boolean).slice(0, 2);
    if (classes.length) cls = "." + classes.join(".");
  }
  const meta = aria ? ` "${aria}"` : text ? ` "${text}"` : "";
  return `${tag}${cls}${role ? `[${role}]` : ""}${meta}`;
}

function findMatchesForElement(
  el: HTMLElement,
  tokens: Record<ThemeTokenId, string>
): ColorMatch[] {
  const cs = window.getComputedStyle(el);
  const bg = rgbToHex(cs.backgroundColor);
  const fg = rgbToHex(cs.color);
  const bd =
    rgbToHex(cs.borderTopColor) ??
    rgbToHex(cs.borderLeftColor) ??
    rgbToHex(cs.borderRightColor) ??
    rgbToHex(cs.borderBottomColor);

  const matches: ColorMatch[] = [];
  const seen = new Set<string>();
  function push(token: ThemeTokenId, property: MatchProp, hex: string) {
    const key = `${token}:${property}`;
    if (seen.has(key)) return;
    seen.add(key);
    matches.push({ token, property, hex });
  }

  for (const token of ALL_TOKENS) {
    const v = tokens[token];
    if (!v) continue;
    if (colorsEqual(bg, v)) push(token, "background", v);
    if (colorsEqual(fg, v)) push(token, "text", v);
    if (colorsEqual(bd, v)) push(token, "border", v);
  }
  return matches;
}

// ─────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────

export function ThemeEditor() {
  const [open, setOpen] = useState(false);
  const {
    theme,
    hydrated,
    savedThemes,
    setAnchor,
    setFont,
    setRadius,
    reset,
    setTheme,
    saveCurrentAs,
    deleteSaved,
  } = useTheme();
  const [copied, setCopied] = useState<"share" | "css" | null>(null);

  // Compute the derived palette once per render — used by inspector + preview
  const palette = derivePalette(theme.anchors);

  // Inspector state
  const [inspected, setInspected] = useState<InspectionResult | null>(null);
  const [overlayRect, setOverlayRect] = useState<DOMRect | null>(null);
  const [pulsingAnchor, setPulsingAnchor] = useState<AnchorId | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const paletteRef = useRef(palette);
  paletteRef.current = palette;

  // Active preset = exact anchor + font + radius match
  const activePresetId = THEME_PRESETS.find((p) =>
    presetMatches(p, theme.anchors, theme.font, theme.radius)
  )?.id;

  function applyPreset(preset: ThemePreset) {
    setTheme({
      anchors: { ...preset.theme.anchors },
      font: preset.theme.font,
      radius: preset.theme.radius,
    });
  }

  const pulseAnchor = useCallback((id: AnchorId) => {
    setPulsingAnchor(id);
    window.setTimeout(() => setPulsingAnchor(null), 1500);
  }, []);

  const onTokenClick = useCallback(
    (token: ThemeTokenId) => {
      // Map the matched token back to its driving anchor
      const anchor: AnchorId =
        token === "canvas" ||
        token === "canvas-deep" ||
        token === "vellum" ||
        token === "vellum-shaded" ||
        token === "rule" ||
        token === "rule-strong"
          ? "canvas"
          : token === "ink" ||
              token === "ink-muted" ||
              token === "ink-faint"
            ? "ink"
            : token === "mark-terra"
              ? "alarm"
              : "accent";
      const row = document.getElementById(`anchor-row-${anchor}`);
      if (row) {
        const scroller = row.closest(
          "[data-theme-scroller]"
        ) as HTMLElement | null;
        if (scroller) {
          const rowRect = row.getBoundingClientRect();
          const sRect = scroller.getBoundingClientRect();
          const target =
            scroller.scrollTop +
            (rowRect.top - sRect.top) -
            scroller.clientHeight / 2 +
            row.clientHeight / 2;
          scroller.scrollTo({ top: target, behavior: "smooth" });
        }
      }
      pulseAnchor(anchor);
    },
    [pulseAnchor]
  );

  // Click interception for inspector
  useEffect(() => {
    if (!open) return;
    function isInsideEditor(target: EventTarget | null): boolean {
      if (!(target instanceof Node)) return false;
      if (drawerRef.current?.contains(target)) return true;
      if (launcherRef.current?.contains(target)) return true;
      const portalRoot = document.querySelector(
        "[data-radix-popper-content-wrapper]"
      );
      if (portalRoot?.contains(target)) return true;
      return false;
    }
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target || isInsideEditor(target)) return;
      e.preventDefault();
      e.stopPropagation();
      const matches = findMatchesForElement(target, paletteRef.current);
      const result: InspectionResult = {
        element: target,
        description: describeElement(target),
        matches,
      };
      setInspected(result);
      if (matches.length > 0) onTokenClick(matches[0].token);
    }
    document.addEventListener("click", handleClick, { capture: true });
    return () =>
      document.removeEventListener("click", handleClick, { capture: true });
  }, [open, onTokenClick]);

  // Lock overlay to inspected element on scroll/resize
  useEffect(() => {
    if (!inspected) {
      setOverlayRect(null);
      return;
    }
    const el = inspected.element;
    function update() {
      if (!el.isConnected) {
        setOverlayRect(null);
        return;
      }
      const r = el.getBoundingClientRect();
      const inView =
        r.bottom > 0 &&
        r.top < window.innerHeight &&
        r.right > 0 &&
        r.left < window.innerWidth;
      setOverlayRect(inView ? r : null);
    }
    update();
    window.addEventListener("scroll", update, { passive: true, capture: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update, { capture: true });
      window.removeEventListener("resize", update);
    };
  }, [inspected]);

  useEffect(() => {
    if (!open) setInspected(null);
  }, [open]);

  function copy(text: string, key: "share" | "css") {
    if (typeof navigator === "undefined") return;
    navigator.clipboard.writeText(text);
    setCopied(key);
    window.setTimeout(() => setCopied(null), 1400);
  }

  function downloadJson() {
    const json = buildJsonExport(theme);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "blueprint-portal-theme.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <>
      {/* Launcher button */}
      {!open && (
        <button
          ref={launcherRef}
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full border border-rule bg-vellum px-4 py-2.5 text-sm font-medium text-ink shadow-md transition-all hover:bg-canvas-deep hover:shadow-lg"
          aria-label="Open theme editor"
        >
          <SlidersHorizontal className="h-4 w-4 text-mark-ink" />
          Theme editor
        </button>
      )}

      {/* Inspector overlay ring */}
      {overlayRect && (
        <div
          className="pointer-events-none fixed z-[45]"
          style={{
            left: overlayRect.left,
            top: overlayRect.top,
            width: overlayRect.width,
            height: overlayRect.height,
            boxShadow: `0 0 0 2px var(--ds-accent)`,
            borderRadius: "var(--radius)",
          }}
          aria-hidden
        />
      )}

      {/* Drawer */}
      <aside
        ref={drawerRef}
        className={cn(
          "shrink-0 overflow-hidden border-l border-rule bg-vellum",
          "fixed inset-y-0 right-0 z-40 max-w-md shadow-xl transition-transform duration-200 ease-out",
          "md:static md:max-w-none md:transform-none md:shadow-none md:transition-[width] md:duration-200",
          open
            ? "w-full md:w-[28rem] translate-x-0"
            : "w-full md:w-0 translate-x-full md:translate-x-0"
        )}
        aria-hidden={!open}
        role="dialog"
        aria-label="Theme editor"
      >
        <div className="flex h-full w-full max-w-md md:w-[28rem] flex-col">
          {/* Header */}
          <header className="flex items-center justify-between border-b border-rule px-5 py-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-mark-ink" />
              <p className="ds-title-2 text-ink">Theme editor</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close theme editor"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-rule bg-vellum text-ink-muted hover:bg-canvas-deep hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          {/* Scrollable content */}
          <div
            data-theme-scroller
            className="flex-1 overflow-y-auto px-5 py-5 space-y-7"
          >
            {/* Presets */}
            <PresetPicker
              activeId={activePresetId}
              onApply={applyPreset}
              disabled={!hydrated}
            />

            {/* Saved themes */}
            <SavedThemesSection
              saved={savedThemes}
              onApply={(t) => setTheme(t)}
              onSave={saveCurrentAs}
              onDelete={deleteSaved}
              disabled={!hydrated}
            />

            {/* Inspector */}
            <InspectorSection
              inspected={inspected}
              onTokenClick={onTokenClick}
              onClear={() => setInspected(null)}
            />

            {/* Anchors */}
            <Section title="Anchor colors">
              <p className="text-xs text-ink-muted leading-relaxed mb-3">
                Edit only these four. Every other color in the system derives
                from these — no ugly combos possible.
              </p>
              <div className="space-y-2">
                {ANCHOR_LIST.map((a) => (
                  <AnchorRow
                    key={a.id}
                    id={a.id}
                    label={a.label}
                    help={a.help}
                    value={theme.anchors[a.id]}
                    onChange={(v) => setAnchor(a.id, v)}
                    disabled={!hydrated}
                    pulsing={pulsingAnchor === a.id}
                  />
                ))}
              </div>
            </Section>

            {/* Derived palette preview (read-only) */}
            <Section title="Derived palette">
              <p className="text-xs text-ink-muted leading-relaxed mb-3">
                Auto-generated from the anchors above. Inspector references
                these.
              </p>
              <div className="space-y-4">
                {TOKEN_GROUPS.map((group) => (
                  <div key={group.label}>
                    <p className="kicker mb-2 text-ink-faint">{group.label}</p>
                    <div className="grid grid-cols-6 gap-1.5">
                      {group.items.map((item) => (
                        <div
                          key={item.id}
                          className="group relative"
                          title={`--ds-${item.id} · ${palette[item.id]}`}
                          id={`theme-color-row-${item.id}`}
                        >
                          <span
                            className="block h-9 rounded-sm border border-rule"
                            style={{ backgroundColor: palette[item.id] }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Font picker */}
            <Section title="Serif typeface">
              <FontPicker
                value={theme.font}
                onChange={setFont}
                disabled={!hydrated}
              />
            </Section>

            {/* Radius */}
            <Section title={`Corner radius · ${Math.round(theme.radius)}px`}>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={0}
                  max={24}
                  step={1}
                  value={theme.radius}
                  disabled={!hydrated}
                  onChange={(e) => setRadius(Number(e.target.value))}
                  className="flex-1 accent-[var(--ds-accent)]"
                />
                <button
                  type="button"
                  onClick={() => setRadius(DEFAULT_RADIUS)}
                  disabled={!hydrated}
                  className="text-xs text-ink-muted underline hover:text-ink"
                >
                  Default
                </button>
              </div>
              <div className="mt-2 flex items-center gap-2">
                {[
                  { rad: 0, label: "Sharp" },
                  { rad: 4, label: "Cut" },
                  { rad: 8, label: "Soft" },
                  { rad: 13.6, label: "Default" },
                  { rad: 20, label: "Bubbly" },
                ].map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setRadius(p.rad)}
                    className={cn(
                      "kicker rounded-full border px-2 py-0.5 transition-colors",
                      Math.abs(theme.radius - p.rad) < 0.5
                        ? "border-[var(--ds-accent)] bg-[var(--ds-accent)] text-[var(--ds-vellum)]"
                        : "border-rule bg-vellum text-ink-muted hover:bg-canvas-deep"
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </Section>
          </div>

          {/* Footer */}
          <footer className="border-t border-rule bg-canvas-deep/40 px-5 py-4 space-y-2.5">
            <div className="grid grid-cols-2 gap-2">
              <ActionButton
                icon={
                  copied === "share" ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <LinkIcon className="h-3.5 w-3.5" />
                  )
                }
                label={copied === "share" ? "Link copied" : "Share URL"}
                onClick={() => copy(buildShareUrl(theme), "share")}
              />
              <ActionButton
                icon={
                  copied === "css" ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )
                }
                label={copied === "css" ? "CSS copied" : "Copy CSS"}
                onClick={() => copy(buildCssExport(theme), "css")}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <ActionButton
                icon={<Download className="h-3.5 w-3.5" />}
                label="Download JSON"
                onClick={downloadJson}
              />
              <ActionButton
                icon={<RotateCcw className="h-3.5 w-3.5" />}
                label="Reset"
                onClick={reset}
                destructive
              />
            </div>
            <p className="kicker pt-2 text-ink-faint">
              Inspector mode active · Click any element to probe its tokens
            </p>
          </footer>
        </div>
      </aside>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────

function presetMatches(
  preset: ThemePreset,
  anchors: Record<AnchorId, string>,
  font: string,
  radius: number
): boolean {
  if (preset.theme.font !== font) return false;
  if (Math.abs(preset.theme.radius - radius) > 0.5) return false;
  for (const key of ["canvas", "ink", "accent", "alarm"] as AnchorId[]) {
    if (
      (preset.theme.anchors[key] ?? "").toUpperCase() !==
      (anchors[key] ?? "").toUpperCase()
    ) {
      return false;
    }
  }
  return true;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="kicker mb-3 text-ink-faint">{title}</p>
      {children}
    </div>
  );
}

function AnchorRow({
  id,
  label,
  help,
  value,
  onChange,
  disabled,
  pulsing,
}: {
  id: AnchorId;
  label: string;
  help: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  pulsing?: boolean;
}) {
  const inputId = `anchor-input-${id}`;
  return (
    <div
      id={`anchor-row-${id}`}
      className={cn(
        "flex items-start gap-3 rounded-md p-2 -mx-2 transition-all",
        pulsing &&
          "ring-1 ring-[color:color-mix(in_oklch,var(--ds-accent)_40%,transparent)]"
      )}
      style={{
        animationName: pulsing ? "token-pulse" : undefined,
        animationDuration: pulsing ? "1.5s" : undefined,
        animationTimingFunction: pulsing ? "ease-out" : undefined,
      }}
    >
      <label
        htmlFor={inputId}
        className="relative h-12 w-14 shrink-0 cursor-pointer overflow-hidden rounded-md border border-rule"
        style={{ backgroundColor: value }}
      >
        <input
          id={inputId}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          aria-label={label}
        />
      </label>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-sm font-medium text-ink">{label}</p>
          <input
            type="text"
            value={value.toUpperCase()}
            onChange={(e) => {
              const v = e.target.value.trim();
              if (/^#[0-9A-Fa-f]{6}$/.test(v)) onChange(v);
              else if (/^[0-9A-Fa-f]{6}$/.test(v)) onChange(`#${v}`);
            }}
            disabled={disabled}
            className="w-20 rounded-md border border-rule bg-vellum px-2 py-0.5 ds-data text-ink focus:outline-none focus:ring-2 focus:ring-[var(--ds-accent-soft)]"
          />
        </div>
        <p className="mt-1 text-xs text-ink-muted leading-relaxed">{help}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Preset picker
// ─────────────────────────────────────────────────────────────────

const PRESET_FONT_FAMILY: Record<string, string> = {
  fraunces: "Fraunces, Georgia, serif",
  cormorant: "'Cormorant Garamond', Georgia, serif",
  "instrument-serif": "'Instrument Serif', Georgia, serif",
};

function PresetPicker({
  activeId,
  onApply,
  disabled,
}: {
  activeId: string | undefined;
  onApply: (preset: ThemePreset) => void;
  disabled?: boolean;
}) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <p className="kicker text-mark-ink">Theme presets</p>
        <p className="kicker text-ink-faint">Tap to apply</p>
      </div>
      <div className="space-y-2">
        {THEME_PRESETS.map((preset) => {
          const active = preset.id === activeId;
          const fontFamily =
            PRESET_FONT_FAMILY[preset.theme.font] ?? "serif";
          const previewPalette = derivePalette(preset.theme.anchors);
          return (
            <button
              key={preset.id}
              type="button"
              disabled={disabled}
              onClick={() => onApply(preset)}
              className={cn(
                "group flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all",
                "disabled:cursor-not-allowed disabled:opacity-50",
                active
                  ? "border-[color:color-mix(in_oklch,var(--ds-accent)_45%,transparent)] bg-[color:color-mix(in_oklch,var(--ds-accent)_8%,transparent)]"
                  : "border-rule hover:border-[color:color-mix(in_oklch,var(--ds-accent)_30%,transparent)]"
              )}
              style={{
                backgroundColor: active ? undefined : previewPalette.vellum,
                borderColor: active ? undefined : previewPalette.rule,
              }}
            >
              <div
                className="flex shrink-0 overflow-hidden rounded-md border"
                style={{ borderColor: previewPalette.rule }}
              >
                {preset.swatches.map((hex, i) => (
                  <span
                    key={i}
                    className="block h-12 w-3"
                    style={{ backgroundColor: hex }}
                  />
                ))}
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className="text-lg leading-tight"
                  style={{ fontFamily, color: previewPalette.ink }}
                >
                  {preset.name}
                </p>
                <p
                  className="kicker mt-1"
                  style={{ color: previewPalette["ink-faint"] }}
                >
                  {preset.tagline}
                </p>
              </div>
              {active && (
                <span
                  className="shrink-0 rounded-full px-2 py-0.5 kicker"
                  style={{
                    backgroundColor: previewPalette.accent,
                    color: previewPalette.vellum,
                  }}
                >
                  Active
                </span>
              )}
            </button>
          );
        })}
      </div>
      <p className="kicker mt-3 text-ink-faint">
        Custom anchor edits below override the preset
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Saved themes section
// ─────────────────────────────────────────────────────────────────

function SavedThemesSection({
  saved,
  onApply,
  onSave,
  onDelete,
  disabled,
}: {
  saved: SavedTheme[];
  onApply: (t: ThemeState) => void;
  onSave: (name: string) => string;
  onDelete: (id: string) => void;
  disabled?: boolean;
}) {
  const [naming, setNaming] = useState(false);
  const [draftName, setDraftName] = useState("");

  function commit() {
    const name = draftName.trim();
    if (!name) {
      setNaming(false);
      return;
    }
    onSave(name);
    setDraftName("");
    setNaming(false);
  }

  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <p className="kicker text-mark-ink">Your themes</p>
        {!naming && (
          <button
            type="button"
            onClick={() => setNaming(true)}
            disabled={disabled}
            className="inline-flex items-center gap-1 kicker text-mark-ink hover:underline disabled:opacity-50"
          >
            <BookmarkPlus className="h-3 w-3" />
            Save current
          </button>
        )}
      </div>

      {/* Naming input */}
      {naming && (
        <div className="mb-3 flex items-center gap-2 rounded-lg border border-rule bg-vellum px-2 py-1.5">
          <input
            autoFocus
            type="text"
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") commit();
              if (e.key === "Escape") {
                setNaming(false);
                setDraftName("");
              }
            }}
            placeholder="Name this theme…"
            className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none"
          />
          <button
            type="button"
            onClick={commit}
            className="kicker rounded-sm bg-[var(--ds-accent)] px-2 py-1 text-[var(--ds-vellum)]"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              setNaming(false);
              setDraftName("");
            }}
            className="kicker text-ink-faint hover:text-ink"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Empty state or list */}
      {saved.length === 0 ? (
        !naming && (
          <p className="rounded-lg border border-dashed border-rule px-4 py-3 text-center text-xs text-ink-muted leading-relaxed">
            Customize the anchors below, then{" "}
            <button
              type="button"
              onClick={() => setNaming(true)}
              disabled={disabled}
              className="underline text-mark-ink"
            >
              save the current theme
            </button>{" "}
            to keep it across preset switches.
          </p>
        )
      ) : (
        <div className="space-y-2">
          {saved.map((s) => {
            const palette = derivePalette(s.theme.anchors);
            const fontFamily =
              PRESET_FONT_FAMILY[s.theme.font] ??
              (s.theme.font === "inter"
                ? "Inter, system-ui, sans-serif"
                : "serif");
            return (
              <div
                key={s.id}
                className="group relative flex items-center gap-3 rounded-lg border p-3"
                style={{
                  backgroundColor: palette.vellum,
                  borderColor: palette.rule,
                }}
              >
                <button
                  type="button"
                  onClick={() => onApply(s.theme)}
                  disabled={disabled}
                  className="flex flex-1 items-center gap-3 text-left disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <div
                    className="flex shrink-0 overflow-hidden rounded-md border"
                    style={{ borderColor: palette.rule }}
                  >
                    {(
                      [
                        s.theme.anchors.canvas,
                        s.theme.anchors.ink,
                        s.theme.anchors.accent,
                        s.theme.anchors.alarm,
                      ] as string[]
                    ).map((hex, i) => (
                      <span
                        key={i}
                        className="block h-10 w-3"
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-base leading-tight truncate"
                      style={{ fontFamily, color: palette.ink }}
                    >
                      {s.name}
                    </p>
                    <p
                      className="kicker mt-1"
                      style={{ color: palette["ink-faint"] }}
                    >
                      Saved · {new Date(s.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(s.id)}
                  disabled={disabled}
                  aria-label={`Delete ${s.name}`}
                  className="shrink-0 rounded-md p-1.5 text-ink-faint opacity-0 transition-opacity hover:bg-[color:color-mix(in_oklch,var(--ds-mark-terra)_10%,transparent)] hover:text-mark-terra group-hover:opacity-100 focus:opacity-100"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Inspector section
// ─────────────────────────────────────────────────────────────────

const PROPERTY_LABEL: Record<MatchProp, string> = {
  background: "Background",
  text: "Text",
  border: "Border",
};

function InspectorSection({
  inspected,
  onTokenClick,
  onClear,
}: {
  inspected: InspectionResult | null;
  onTokenClick: (id: ThemeTokenId) => void;
  onClear: () => void;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Crosshair className="h-3.5 w-3.5 text-mark-ink" />
          <p className="kicker text-mark-ink">Inspector</p>
        </div>
        {inspected && (
          <button
            type="button"
            onClick={onClear}
            className="kicker text-ink-faint hover:text-ink"
          >
            Clear
          </button>
        )}
      </div>
      {!inspected ? (
        <div className="rounded-lg border border-dashed border-rule px-4 py-4 text-center">
          <p className="text-xs text-ink-muted leading-relaxed">
            Click <em>any element</em> on the page to find which design tokens
            drive its color.
          </p>
        </div>
      ) : (
        <div className="rounded-lg border border-[color:color-mix(in_oklch,var(--ds-accent)_30%,transparent)] bg-[color:color-mix(in_oklch,var(--ds-accent)_5%,transparent)] px-4 py-3">
          <p
            className="ds-data text-ink-faint truncate"
            title={inspected.description}
          >
            {inspected.description}
          </p>
          {inspected.matches.length === 0 ? (
            <p className="mt-2 text-xs text-ink-muted leading-relaxed">
              No design-system tokens directly matched this element. It may use
              a derived (color-mix) color or third-party styling.
            </p>
          ) : (
            <div className="mt-3 space-y-1.5">
              {inspected.matches.map((m, i) => (
                <button
                  key={`${m.token}-${m.property}-${i}`}
                  type="button"
                  onClick={() => onTokenClick(m.token)}
                  className="group flex w-full items-center gap-2.5 rounded-md border border-rule bg-vellum px-2 py-1.5 text-left transition-colors hover:bg-canvas-deep"
                >
                  <span
                    className="h-4 w-4 shrink-0 rounded-sm border border-rule"
                    style={{ backgroundColor: m.hex }}
                  />
                  <span className="flex-1 min-w-0">
                    <span className="block ds-data text-ink truncate">
                      --ds-{m.token}
                    </span>
                    <span className="kicker text-ink-faint">
                      {PROPERTY_LABEL[m.property]} · {m.hex}
                    </span>
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-ink-faint group-hover:text-mark-ink" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Font picker + actions
// ─────────────────────────────────────────────────────────────────

function FontPicker({
  value,
  onChange,
  disabled,
}: {
  value: FontOptionId;
  onChange: (id: FontOptionId) => void;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      {FONT_OPTIONS.map((opt) => {
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            disabled={disabled}
            className={cn(
              "group flex w-full items-center justify-between gap-3 rounded-md border px-3 py-2 text-left transition-colors",
              "disabled:cursor-not-allowed disabled:opacity-50",
              active
                ? "border-[color:color-mix(in_oklch,var(--ds-accent)_40%,transparent)] bg-[color:color-mix(in_oklch,var(--ds-accent)_8%,transparent)]"
                : "border-rule bg-vellum hover:bg-canvas-deep"
            )}
          >
            <div className="min-w-0 flex-1">
              <p
                className="text-lg leading-tight text-ink"
                style={{ fontFamily: `"${opt.family}", Georgia, serif` }}
              >
                {opt.label}
              </p>
              <p className="kicker mt-1 text-ink-faint">{opt.feel}</p>
            </div>
            {active && (
              <ChevronRight className="h-4 w-4 shrink-0 text-mark-ink" />
            )}
          </button>
        );
      })}
    </div>
  );
}

function ActionButton({
  icon,
  label,
  onClick,
  destructive,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  destructive?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-md border px-3 py-2 text-xs font-medium transition-colors",
        destructive
          ? "border-[color:color-mix(in_oklch,var(--ds-mark-terra)_30%,transparent)] bg-vellum text-mark-terra hover:bg-[color:color-mix(in_oklch,var(--ds-mark-terra)_8%,transparent)]"
          : "border-rule bg-vellum text-ink hover:bg-canvas-deep"
      )}
    >
      {icon}
      {label}
    </button>
  );
}
