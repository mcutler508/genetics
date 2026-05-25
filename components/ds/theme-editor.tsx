"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Check,
  ChevronRight,
  Copy,
  Crosshair,
  Download,
  Link as LinkIcon,
  RotateCcw,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ALL_TOKENS,
  buildCssExport,
  buildJsonExport,
  buildShareUrl,
  DEFAULT_RADIUS,
  FONT_OPTIONS,
  TOKEN_GROUPS,
  useTheme,
  type FontOptionId,
  type ThemeTokenId,
} from "@/lib/use-theme";

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
  // ignore alpha for now
  const [r, g, b] = m.map((v) => Math.max(0, Math.min(255, Math.round(parseFloat(v)))));
  return (
    "#" +
    [r, g, b]
      .map((c) => c.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
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
  const { theme, hydrated, setToken, setFont, setRadius, reset } = useTheme();
  const [copied, setCopied] = useState<"share" | "css" | null>(null);

  // Inspector state
  const [inspected, setInspected] = useState<InspectionResult | null>(null);
  const [overlayRect, setOverlayRect] = useState<DOMRect | null>(null);
  const [pulsingToken, setPulsingToken] = useState<ThemeTokenId | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const tokensRef = useRef(theme.tokens);
  tokensRef.current = theme.tokens;

  // Keep the overlay ring locked to its element as the user scrolls/resizes
  useEffect(() => {
    if (!inspected) {
      setOverlayRect(null);
      return;
    }
    const el = inspected.element;

    function update() {
      // If element is detached or hidden, drop the overlay
      if (!el.isConnected) {
        setOverlayRect(null);
        return;
      }
      const r = el.getBoundingClientRect();
      // Hide if completely off-screen
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

  const scrollToToken = useCallback((id: ThemeTokenId) => {
    const row = document.getElementById(`theme-color-row-${id}`);
    if (row) {
      // Scroll ONLY the drawer's inner scroller — never the page body.
      // Default scrollIntoView walks all scrollable ancestors, which causes
      // the whole page to jump if the token is far down the editor list.
      const scroller = row.closest(
        "[data-theme-scroller]"
      ) as HTMLElement | null;
      if (scroller) {
        const rowRect = row.getBoundingClientRect();
        const scrollerRect = scroller.getBoundingClientRect();
        const target =
          scroller.scrollTop +
          (rowRect.top - scrollerRect.top) -
          scroller.clientHeight / 2 +
          row.clientHeight / 2;
        scroller.scrollTo({ top: target, behavior: "smooth" });
      }
    }
    setPulsingToken(id);
    window.setTimeout(() => setPulsingToken(null), 1500);
  }, []);

  // Global click interception for inspector
  useEffect(() => {
    if (!open) return;

    function isInsideEditor(target: EventTarget | null): boolean {
      if (!(target instanceof Node)) return false;
      if (drawerRef.current?.contains(target)) return true;
      if (launcherRef.current?.contains(target)) return true;
      // Radix portal content (tooltips, popovers): skip inspection on these
      const portalRoot = document.querySelector("[data-radix-popper-content-wrapper]");
      if (portalRoot?.contains(target)) return true;
      return false;
    }

    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target || isInsideEditor(target)) return;

      // Hijack click → inspect instead of navigating
      e.preventDefault();
      e.stopPropagation();

      // Find the element with a meaningful background or border —
      // many text nodes have inherited transparent bg, so walk up if needed.
      const matches = findMatchesForElement(target, tokensRef.current);
      const result: InspectionResult = {
        element: target,
        description: describeElement(target),
        matches,
      };
      setInspected(result);

      if (matches.length > 0) {
        scrollToToken(matches[0].token);
      }
    }

    document.addEventListener("click", handleClick, { capture: true });
    return () =>
      document.removeEventListener("click", handleClick, { capture: true });
  }, [open, scrollToToken]);

  // Clear inspector overlay when editor closes
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
      {/* Launcher button — fixed, only when drawer is closed */}
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

      {/* Inspector overlay ring — tracks the element on scroll/resize */}
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

      {/* Drawer — in flex flow on desktop (pushes main), fixed overlay on mobile */}
      <aside
        ref={drawerRef}
        className={cn(
          "shrink-0 overflow-hidden border-l border-rule bg-vellum",
          // Mobile: fixed overlay sliding from the right
          "fixed inset-y-0 right-0 z-40 max-w-md shadow-xl transition-transform duration-200 ease-out",
          // Desktop: part of flex flow, width transitions instead of translate
          "md:static md:max-w-none md:transform-none md:shadow-none md:transition-[width] md:duration-200",
          open
            ? "w-full md:w-[28rem] translate-x-0"
            : "w-full md:w-0 translate-x-full md:translate-x-0"
        )}
        aria-hidden={!open}
        role="dialog"
        aria-label="Theme editor"
      >
        {/* Inner wrapper at fixed width so content doesn't reflow during width transition */}
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
          {/* Inspector */}
          <InspectorSection
            inspected={inspected}
            onTokenClick={scrollToToken}
            onClear={() => setInspected(null)}
          />

          {/* Font picker */}
          <Section title="Serif typeface">
            <FontPicker
              value={theme.font}
              onChange={setFont}
              disabled={!hydrated}
            />
          </Section>

          {/* Radius slider */}
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

          {/* Color tokens, grouped */}
          {TOKEN_GROUPS.map((group) => (
            <Section key={group.label} title={group.label}>
              <div className="space-y-2">
                {group.items.map((item) => (
                  <ColorRow
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    value={theme.tokens[item.id]}
                    onChange={(v) => setToken(item.id, v)}
                    disabled={!hydrated}
                    pulsing={pulsingToken === item.id}
                    matched={
                      inspected?.matches.some((m) => m.token === item.id) ??
                      false
                    }
                  />
                ))}
              </div>
            </Section>
          ))}
        </div>

        {/* Footer actions */}
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
            Click <em>any element</em> on the page (sidebar, card, button,
            text) to see which design tokens drive its color.
          </p>
        </div>
      ) : (
        <div className="rounded-lg border border-[color:color-mix(in_oklch,var(--ds-accent)_30%,transparent)] bg-[color:color-mix(in_oklch,var(--ds-accent)_5%,transparent)] px-4 py-3">
          <p className="ds-data text-ink-faint truncate" title={inspected.description}>
            {inspected.description}
          </p>
          {inspected.matches.length === 0 ? (
            <p className="mt-2 text-xs text-ink-muted leading-relaxed">
              No design-system tokens directly matched this element. It may be
              using a derived color (color-mix), opacity, or a non-DS color
              from a third-party component.
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
// Reusable sub-components
// ─────────────────────────────────────────────────────────────────

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

function ColorRow({
  id,
  label,
  value,
  onChange,
  disabled,
  pulsing,
  matched,
}: {
  id: ThemeTokenId;
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  pulsing?: boolean;
  matched?: boolean;
}) {
  const inputId = `theme-color-${id}`;
  const rowId = `theme-color-row-${id}`;
  return (
    <div
      id={rowId}
      className={cn(
        "flex items-center gap-3 rounded-md p-1 -mx-1 transition-all",
        matched && "ring-1 ring-[color:color-mix(in_oklch,var(--ds-accent)_40%,transparent)]",
        pulsing && "animate-[token-pulse_1.5s_ease-out]"
      )}
      style={{
        animationName: pulsing ? "token-pulse" : undefined,
      }}
    >
      <label
        htmlFor={inputId}
        className="relative h-8 w-12 shrink-0 cursor-pointer overflow-hidden rounded-md border border-rule"
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
        <p className="text-sm text-ink">{label}</p>
        <p className="ds-data text-ink-faint">--ds-{id}</p>
      </div>
      <input
        type="text"
        value={value.toUpperCase()}
        onChange={(e) => {
          const v = e.target.value.trim();
          if (/^#[0-9A-Fa-f]{6}$/.test(v)) onChange(v);
          else if (/^[0-9A-Fa-f]{6}$/.test(v)) onChange(`#${v}`);
        }}
        disabled={disabled}
        className="w-20 rounded-md border border-rule bg-vellum px-2 py-1 ds-data text-ink focus:outline-none focus:ring-2 focus:ring-[var(--ds-accent-soft)]"
      />
    </div>
  );
}

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
