"use client";

import { useState } from "react";
import {
  ArrowRight,
  CalendarCheck,
  ChevronDown,
  Microscope,
  Pill,
  Salad,
} from "lucide-react";
import { Kicker, SectionHeader } from "@/components/ds/kicker";
import {
  FeatureCard,
  InsetCard,
  Plate,
  VellumCard,
} from "@/components/ds/card";
import { StatusDot, StatusPill, type StatusTier } from "@/components/ds/status-pill";
import { GenotypePair, BaseChip } from "@/components/ds/base-pair-chip";
import { CodonRing } from "@/components/ds/codon-ring";
import { HelixAccent } from "@/components/ds/helix-accent";
import { DeltaIndicator } from "@/components/ds/delta-indicator";
import { RangeStrip } from "@/components/ds/range-strip";
import { RecheckPill } from "@/components/ds/recheck-pill";
import {
  GhostButton,
  IconButton,
  PrimaryButton,
  QuietButton,
  TabBar,
} from "@/components/ds/button";
import { EmptyState } from "@/components/ds/empty-state";
import { Skeleton, SkeletonBody } from "@/components/ds/skeleton";

const PALETTE_SWATCHES = [
  { group: "Canvas", items: [
    { token: "canvas", hex: "#F5EFE0", note: "Page background" },
    { token: "canvas-deep", hex: "#EAE2CC", note: "Inset zones, footers" },
    { token: "vellum", hex: "#FCF9F1", note: "Card surface" },
    { token: "vellum-shaded", hex: "#F0E8D3", note: "Nested surfaces" },
  ]},
  { group: "Ink", items: [
    { token: "ink", hex: "#2A2520", note: "Primary text" },
    { token: "ink-muted", hex: "#7C6E5C", note: "Secondary text" },
    { token: "ink-faint", hex: "#A19383", note: "Tertiary / footnote" },
    { token: "rule", hex: "#D6CBB1", note: "Hairline borders" },
    { token: "rule-strong", hex: "#B8A98E", note: "Emphasis rules" },
  ]},
  { group: "Botanical ink — brand accent", items: [
    { token: "accent", hex: "#1F5B5E", note: "Primary brand color" },
    { token: "accent-soft", hex: "#D3E5E2", note: "Backgrounds + focus rings" },
    { token: "accent-deep", hex: "#143F45", note: "Hover + active" },
  ]},
  { group: "Health status marks", items: [
    { token: "mark-ink", hex: "#1F5B5E", note: "Primary Focus" },
    { token: "mark-clay", hex: "#B07343", note: "Secondary Focus" },
    { token: "mark-sage", hex: "#86A480", note: "Supporting" },
    { token: "mark-forest", hex: "#5C8C5F", note: "Within Optimal" },
    { token: "mark-graphite", hex: "#7A7468", note: "Monitored" },
    { token: "mark-terra", hex: "#B05038", note: "Elevated / Out" },
  ]},
  { group: "Genetics — base-pair palette", items: [
    { token: "base-a", hex: "#4A6DA0", note: "Adenine" },
    { token: "base-c", hex: "#B5754A", note: "Cytosine" },
    { token: "base-g", hex: "#A8884A", note: "Guanine" },
    { token: "base-t", hex: "#6D8E6E", note: "Thymine" },
  ]},
];

const TYPE_SAMPLES = [
  { token: "ds-display-1", spec: "Fraunces · 64–72 / 1.05 · −2.5%", sample: "Welcome back, Stacey." },
  { token: "ds-display-2", spec: "Fraunces · 48–56 / 1.08 · −2%", sample: "Eight biomarkers." },
  { token: "ds-title-1", spec: "Fraunces · 32 / 1.15 · −2%", sample: "System focus" },
  { token: "ds-title-2", spec: "Fraunces · 24 / 1.2 · −1.5%", sample: "Fasting insulin" },
  { token: "ds-numeric-L", spec: "Fraunces · 32 · tabular nums", sample: "8.92" },
  { token: "ds-lead", spec: "Geist Sans · 18 / 1.55 · −0.5%", sample: "Sixty-six SNPs. One arc to your next recheck." },
  { token: "ds-data-L", spec: "Geist Mono · 18 / 1 · tabular", sample: "8.92 μIU/mL" },
  { token: "ds-data", spec: "Geist Mono · 13 / 1.4 · tabular", sample: "APOE rs429358 + rs7412 — CT" },
  { token: "kicker", spec: "Geist Mono · 11 · UPPERCASE · 0.18em", sample: "CYCLE 02 · WEEK 02 OF 12" },
];

export default function StyleGuidePage() {
  const [tab, setTab] = useState("today");

  return (
    <div className="space-y-20 pb-24">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <header className="space-y-5 border-b border-rule-strong pb-12">
        <div className="flex items-center gap-2">
          <HelixAccent />
          <Kicker tone="accent">Design system · Periodical · v1</Kicker>
        </div>
        <h1 className="ds-display-1 text-ink max-w-3xl">
          A periodical you keep,
          <br />
          not a SaaS app you tab through.
        </h1>
        <p className="ds-lead text-ink-muted max-w-2xl">
          The visual language for Blueprint Portal. Editorial scientific.
          Light-first warm canvas. One brand accent. Six named health-status
          tiers. Four DNA bases that earn their own quiet color.
        </p>
      </header>

      {/* ─── 1. Brand personality ────────────────────────────── */}
      <Section number="01" title="Brand personality">
        <div className="grid gap-6 md:grid-cols-2">
          <VellumCard>
            <Kicker tone="accent">Voice</Kicker>
            <p className="mt-2 text-base leading-relaxed text-ink">
              Precise, considered, durable, calm. Journal-like. Evidence-forward.
              Anti-sensational. Never breathless, never gamified, never{" "}
              <em>"you have!"</em>, never countdown-timer urgency.
            </p>
          </VellumCard>
          <VellumCard>
            <Kicker tone="accent">Form</Kicker>
            <p className="mt-2 text-base leading-relaxed text-ink">
              Paper, ink, hairline rules, generous whitespace, monospaced data,
              serif headlines, kicker labels in caps, a single restrained accent.
              The page should look composed rather than designed.
            </p>
          </VellumCard>
        </div>
        <div className="mt-5 grid gap-3 text-sm md:grid-cols-2">
          <NotItem>not teal-cards SaaS</NotItem>
          <NotItem>not beige admin dashboard</NotItem>
          <NotItem>not startup landing page</NotItem>
          <NotItem>not fitness tracker / Whoop</NotItem>
        </div>
      </Section>

      {/* ─── 2. Color palette ────────────────────────────────── */}
      <Section number="02" title="Color palette">
        <div className="space-y-10">
          {PALETTE_SWATCHES.map((group) => (
            <div key={group.group}>
              <Kicker className="mb-3">{group.group}</Kicker>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
                {group.items.map((s) => (
                  <Swatch key={s.token} {...s} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── 3. Typography scale ─────────────────────────────── */}
      <Section number="03" title="Typography scale">
        <p className="mb-6 text-ink-muted text-sm max-w-2xl">
          Three families: <strong className="text-ink">Fraunces</strong> for
          voice, <strong className="text-ink">Geist Sans</strong> for utility,{" "}
          <strong className="text-ink">Geist Mono</strong> for data. No exceptions.
        </p>
        <div className="divide-y divide-rule overflow-hidden rounded-2xl border border-rule bg-vellum">
          {TYPE_SAMPLES.map((t) => (
            <div
              key={t.token}
              className="grid items-center gap-4 px-6 py-5 md:grid-cols-[200px_1fr]"
            >
              <div className="space-y-1">
                <Kicker>{t.token}</Kicker>
                <p className="text-xs text-ink-faint font-mono">{t.spec}</p>
              </div>
              <div className={`${t.token} text-ink`}>{t.sample}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── 4. Card styles ──────────────────────────────────── */}
      <Section number="04" title="Card styles">
        <div className="space-y-6">
          <Labeled label="Vellum card · default">
            <VellumCard>
              <Kicker tone="accent">Primary biomarker</Kicker>
              <p className="ds-title-2 mt-2 text-ink">Fasting insulin</p>
              <p className="mt-2 text-sm text-ink-muted">
                Default surface for 80% of content modules. Hairline border, no
                shadow.
              </p>
            </VellumCard>
          </Labeled>

          <Labeled label="Inset card · nests inside vellum">
            <VellumCard>
              <Kicker tone="accent">Adherence detail</Kicker>
              <p className="ds-title-2 mt-2 text-ink">Today</p>
              <InsetCard className="mt-4">
                <p className="ds-data text-ink-muted">
                  6 of 8 habits · 75%
                </p>
              </InsetCard>
            </VellumCard>
          </Labeled>

          <Labeled label="Feature card · one per page">
            <FeatureCard>
              <Kicker tone="accent">Cycle 02 · Week 02 of 12</Kicker>
              <p className="ds-display-2 mt-3 text-ink">
                Welcome back, Stacey.
              </p>
              <p className="ds-lead mt-3 max-w-xl text-ink-muted">
                Eight biomarkers. Sixty-six SNPs. One arc to your next recheck.
              </p>
            </FeatureCard>
          </Labeled>

          <Labeled label="Plate · no background, hairline above">
            <Plate>
              <Kicker tone="accent">Provider questions</Kicker>
              <p className="ds-title-1 mt-2 text-ink">
                Six questions worth asking.
              </p>
              <p className="mt-2 text-sm text-ink-muted max-w-xl">
                Used for long-form sections that should read like a magazine
                spread.
              </p>
            </Plate>
          </Labeled>
        </div>
      </Section>

      {/* ─── 5. Data viz ─────────────────────────────────────── */}
      <Section number="05" title="Data visualization">
        <div className="grid gap-5 md:grid-cols-2">
          <VellumCard>
            <Kicker className="mb-2">Range strip · primary</Kicker>
            <p className="ds-title-2 text-ink mb-4">Fasting insulin</p>
            <RangeStrip
              min={0}
              max={16}
              optimalStart={2}
              optimalEnd={5}
              value={8.92}
              tier="primary"
              labelLeft="0"
              labelCenter="optimal 2–5"
              labelRight="16"
            />
          </VellumCard>
          <VellumCard>
            <Kicker className="mb-2">Range strip · within optimal</Kicker>
            <p className="ds-title-2 text-ink mb-4">Vitamin D</p>
            <RangeStrip
              min={20}
              max={100}
              optimalStart={50}
              optimalEnd={70}
              value={65.19}
              tier="optimal"
              labelLeft="20"
              labelCenter="optimal 50–70"
              labelRight="100"
            />
          </VellumCard>
          <VellumCard>
            <Kicker className="mb-2">Cycle ring</Kicker>
            <div className="flex items-center gap-6">
              <CycleRing pct={16} />
              <div>
                <p className="kicker text-ink-faint">12-week blueprint</p>
                <p className="ds-numeric-L mt-1 text-ink">Week 2</p>
                <p className="text-sm text-ink-muted">70 days until recheck</p>
              </div>
            </div>
          </VellumCard>
          <VellumCard>
            <Kicker className="mb-2">Δ Delta plate</Kicker>
            <div className="flex items-center gap-8">
              <DeltaIndicator
                value="−2.3"
                direction="improving"
                window="Δ since 2026-02-12"
              />
              <DeltaIndicator
                value="+0"
                direction="stable"
                window="No change"
              />
              <DeltaIndicator
                value="+12"
                direction="worsening"
                window="Δ since 2026-02-12"
              />
            </div>
          </VellumCard>
          <VellumCard className="md:col-span-2">
            <Kicker className="mb-3">Heatmap · binary</Kicker>
            <BinaryHeatmap />
            <p className="mt-3 text-xs text-ink-faint">
              Adherence grid: 8 habits × 7 days. Filled at <code>accent</code>{" "}
              or <code>rule</code> — never a heat gradient.
            </p>
          </VellumCard>
        </div>
      </Section>

      {/* ─── 6. Buttons ──────────────────────────────────────── */}
      <Section number="06" title="Buttons">
        <div className="grid gap-5 md:grid-cols-2">
          <VellumCard>
            <Kicker className="mb-3">Primary · the one important action</Kicker>
            <PrimaryButton>
              Open tracker
              <ArrowRight className="h-3.5 w-3.5" />
            </PrimaryButton>
          </VellumCard>
          <VellumCard>
            <Kicker className="mb-3">Ghost · secondary</Kicker>
            <GhostButton>Export PDF</GhostButton>
          </VellumCard>
          <VellumCard>
            <Kicker className="mb-3">Quiet · inline link</Kicker>
            <QuietButton>View all biomarkers</QuietButton>
          </VellumCard>
          <VellumCard>
            <Kicker className="mb-3">Icon · chrome</Kicker>
            <div className="flex items-center gap-2">
              <IconButton ariaLabel="Expand">
                <ChevronDown className="h-4 w-4" />
              </IconButton>
              <IconButton ariaLabel="Open">
                <ArrowRight className="h-4 w-4" />
              </IconButton>
            </div>
          </VellumCard>
          <VellumCard className="md:col-span-2">
            <Kicker className="mb-3">Tabs · view switcher</Kicker>
            <TabBar
              tabs={[
                { id: "today", label: "Today" },
                { id: "week", label: "This week" },
                { id: "twelve", label: "12-week plan" },
              ]}
              active={tab}
              onChange={setTab}
            />
          </VellumCard>
        </div>
      </Section>

      {/* ─── 7. Navigation ───────────────────────────────────── */}
      <Section number="07" title="Navigation">
        <VellumCard padded={false}>
          <div className="flex">
            <aside className="w-64 shrink-0 border-r border-rule px-6 py-7">
              <p className="ds-title-2 text-ink">blueprint.</p>
              <div className="mt-8 space-y-6">
                <NavGroup
                  label="Blueprint"
                  items={[
                    { label: "Dashboard", icon: ChevronDown, active: true },
                    { label: "12-Week Tracker", icon: CalendarCheck },
                    { label: "Biomarkers", icon: ChevronDown },
                    { label: "Genetics", icon: Microscope },
                  ]}
                />
                <NavGroup
                  label="Execution"
                  items={[
                    { label: "Supplements", icon: Pill },
                    { label: "Nutrition", icon: Salad },
                  ]}
                />
              </div>
            </aside>
            <div className="flex-1 px-8 py-7">
              <Kicker>Active state · 2px accent left bar</Kicker>
              <p className="mt-2 text-sm text-ink-muted max-w-md">
                Never a full-width pill fill — that's SaaS. The active rail
                announces the section without dominating the nav.
              </p>
              <p className="kicker mt-6 text-ink-faint">
                Section dividers are kicker labels — read aloud:
                <em className="ds-data ml-1 text-ink not-italic">
                  BLUEPRINT · EXECUTION · ARCHIVE
                </em>
              </p>
            </div>
          </div>
        </VellumCard>
      </Section>

      {/* ─── 8. Empty states ─────────────────────────────────── */}
      <Section number="08" title="Empty states">
        <VellumCard padded={false}>
          <EmptyState
            title="No labs yet."
            body="Once you upload a lab panel or your blueprint PDF, your biomarkers will appear here with optimal ranges and 12-week targets."
            ctaLabel="Upload your report"
            onCta={() => {}}
          />
        </VellumCard>
      </Section>

      {/* ─── 9. Loading states ───────────────────────────────── */}
      <Section number="09" title="Loading states">
        <div className="grid gap-5 md:grid-cols-2">
          <VellumCard>
            <Kicker className="mb-3">Skeleton bars · no shimmer</Kicker>
            <Skeleton className="h-6 w-2/3 mb-3" />
            <Skeleton className="h-8 w-1/3 mb-4" />
            <SkeletonBody lines={3} />
          </VellumCard>
          <VellumCard>
            <Kicker className="mb-3">Inline · last value at 50%</Kicker>
            <div className="flex items-baseline gap-3">
              <p className="ds-numeric-L text-ink opacity-50">8.92</p>
              <p className="kicker text-ink-faint">· Updating</p>
            </div>
          </VellumCard>
        </div>
      </Section>

      {/* ─── 10. Health status indicators ────────────────────── */}
      <Section number="10" title="Health status indicators">
        <div className="space-y-6">
          <div>
            <Kicker className="mb-3">Pill form</Kicker>
            <div className="flex flex-wrap gap-2">
              {(["primary", "secondary", "supporting", "optimal", "monitored", "elevated"] as StatusTier[]).map((t) => (
                <StatusPill key={t} tier={t} />
              ))}
            </div>
          </div>
          <div>
            <Kicker className="mb-3">Dot form</Kicker>
            <div className="flex flex-wrap gap-5">
              {(["primary", "secondary", "supporting", "optimal", "monitored", "elevated"] as StatusTier[]).map((t) => (
                <span key={t} className="inline-flex items-center gap-2 text-sm text-ink">
                  <StatusDot tier={t} />
                  {labelOf(t)}
                </span>
              ))}
            </div>
          </div>
          <div>
            <Kicker className="mb-3">Bar fill form</Kicker>
            <div className="space-y-2">
              {(["primary", "secondary", "supporting", "optimal", "monitored", "elevated"] as StatusTier[]).map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <span className="w-32 text-xs text-ink">{labelOf(t)}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-vellum-shaded">
                    <div
                      className="h-full"
                      style={{
                        width: "60%",
                        backgroundColor: barColor(t),
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ─── 11. Genetics motifs ─────────────────────────────── */}
      <Section number="11" title="Genetics motifs">
        <div className="grid gap-5 md:grid-cols-2">
          <VellumCard>
            <Kicker className="mb-3">Gene symbol typography</Kicker>
            <p className="ds-data text-ink">
              <strong>APOE</strong>{" "}
              <span className="text-ink-faint">rs429358 + rs7412</span>{" "}
              <span className="text-ink">— CT</span>
            </p>
            <p className="mt-2 text-sm text-ink-muted">
              Mono, weight 600 on the symbol, RS number in ink-faint.
            </p>
          </VellumCard>
          <VellumCard>
            <Kicker className="mb-3">Base-pair chip</Kicker>
            <div className="flex items-center gap-3">
              <GenotypePair value="CT" size={24} />
              <GenotypePair value="GG" size={24} />
              <GenotypePair value="AA" size={24} />
              <GenotypePair value="—" size={24} />
            </div>
            <div className="mt-3 flex items-center gap-2">
              <BaseChip base="A" />
              <BaseChip base="C" />
              <BaseChip base="G" />
              <BaseChip base="T" />
              <span className="ml-2 text-xs text-ink-faint">single bases</span>
            </div>
          </VellumCard>
          <VellumCard>
            <Kicker className="mb-3">Codon ring</Kicker>
            <div className="flex items-center gap-4">
              <CodonRing value="CT" size={36} />
              <CodonRing value="GG" size={36} />
              <CodonRing value="AA" size={36} />
              <CodonRing value="—" size={36} />
            </div>
            <p className="mt-3 text-sm text-ink-muted">
              Compact alternative — two allele arcs + H/= zygosity glyph.
            </p>
          </VellumCard>
          <VellumCard>
            <Kicker className="mb-3">Helix accent · once per page max</Kicker>
            <div className="flex items-center gap-2 border-t border-rule pt-3">
              <HelixAccent />
              <Kicker tone="accent">Genetic context</Kicker>
            </div>
          </VellumCard>
        </div>
      </Section>

      {/* ─── 12. Biomarker motifs ────────────────────────────── */}
      <Section number="12" title="Biomarker motifs">
        <div className="space-y-5">
          <VellumCard>
            <div className="flex flex-wrap items-baseline gap-4">
              <span className="ds-numeric-L text-ink">8.92</span>
              <span className="ds-data text-ink-muted">μIU/mL</span>
              <span className="ds-data text-ink-faint">
                → Target 2–5 μIU/mL
              </span>
            </div>
            <p className="mt-2 text-sm text-ink-muted">
              Numeric featured. Serif numeral + mono unit + ink-faint target
              arrow.
            </p>
          </VellumCard>
          <div className="grid gap-3 md:grid-cols-2">
            <VellumCard>
              <Kicker className="mb-3">Recheck pill</Kicker>
              <RecheckPill date="2026-08-04" />
            </VellumCard>
            <VellumCard>
              <Kicker className="mb-3">System tag · context, not status</Kicker>
              <span className="kicker text-ink-muted">
                System · Glucose &amp; Insulin
              </span>
            </VellumCard>
          </div>
        </div>
      </Section>

      {/* ─── 13. Example dashboard layout ────────────────────── */}
      <Section number="13" title="Example dashboard composition">
        <p className="mb-6 max-w-2xl text-sm text-ink-muted">
          The primitives composed into the patterned vertical reading order. One
          feature per page. Kickers above every section. Hairline rules at
          boundaries.
        </p>
        <ExampleDashboard />
      </Section>

      <footer className="border-t border-rule pt-8">
        <Kicker className="text-ink-faint">
          Design system · Periodical · v1 · Educational portal only
        </Kicker>
      </footer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// helpers + sub-components
// ─────────────────────────────────────────────────────────────────

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-6">
      <div className="flex items-baseline gap-6 border-b border-rule pb-4">
        <span className="kicker text-ink-faint">{number}</span>
        <h2 className="ds-title-1 text-ink">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Swatch({
  token,
  hex,
  note,
}: {
  token: string;
  hex: string;
  note: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-rule bg-vellum">
      <div
        className="h-20 w-full"
        style={{ backgroundColor: `var(--ds-${token})` }}
      />
      <div className="px-3 py-2.5">
        <p className="ds-data text-ink">{token}</p>
        <p className="kicker mt-0.5 text-ink-faint">{hex}</p>
        <p className="mt-1 text-xs text-ink-muted">{note}</p>
      </div>
    </div>
  );
}

function NotItem({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-2 rounded-md border border-rule px-3 py-2 text-ink-muted">
      <span className="kicker text-mark-terra mt-0.5">Not</span>
      <span>{children}</span>
    </p>
  );
}

function Labeled({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Kicker className="mb-2">{label}</Kicker>
      {children}
    </div>
  );
}

function CycleRing({ pct }: { pct: number }) {
  const radius = 36;
  const stroke = 6;
  const c = 2 * Math.PI * radius;
  const offset = c - (c * pct) / 100;
  return (
    <div className="relative h-24 w-24">
      <svg viewBox="0 0 90 90" className="h-full w-full -rotate-90">
        <circle
          cx="45"
          cy="45"
          r={radius}
          fill="none"
          stroke="var(--ds-rule)"
          strokeWidth={stroke}
        />
        <circle
          cx="45"
          cy="45"
          r={radius}
          fill="none"
          stroke="var(--ds-accent)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="ds-numeric-L text-ink">{pct}%</span>
      </div>
    </div>
  );
}

function BinaryHeatmap() {
  const rows = [
    "Supplements", "Protein", "Fiber", "Carb timing",
    "Movement", "Sleep", "Caffeine", "Off-ramp",
  ];
  const seed = [
    1,1,1,1,1,0,1, 1,1,0,1,1,1,1, 0,1,1,1,1,1,0,
    1,1,1,0,1,1,1, 0,0,1,1,1,1,1, 1,1,1,1,0,1,1,
    1,1,1,1,1,1,1, 1,0,1,1,1,1,0,
  ];
  return (
    <div className="space-y-1.5">
      <div className="grid grid-cols-[100px_repeat(7,minmax(0,1fr))] gap-1.5">
        <div />
        {["M","T","W","T","F","S","S"].map((d, i) => (
          <div key={i} className="text-center kicker text-ink-faint">{d}</div>
        ))}
      </div>
      {rows.map((label, ri) => (
        <div key={label} className="grid grid-cols-[100px_repeat(7,minmax(0,1fr))] items-center gap-1.5">
          <span className="text-xs text-ink">{label}</span>
          {Array.from({ length: 7 }, (_, di) => {
            const on = seed[ri * 7 + di] === 1;
            return (
              <span
                key={di}
                className="h-5 rounded-sm"
                style={{
                  backgroundColor: on
                    ? "var(--ds-accent)"
                    : "color-mix(in oklch, var(--ds-rule) 50%, transparent)",
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

function NavGroup({
  label,
  items,
}: {
  label: string;
  items: { label: string; icon: typeof ChevronDown; active?: boolean }[];
}) {
  return (
    <div>
      <p className="kicker mb-2 text-ink-faint border-b border-rule pb-2">
        {label}
      </p>
      <ul className="space-y-0.5">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <li key={it.label}>
              <span
                className={`relative flex items-center gap-2.5 rounded-md px-3 py-2 text-sm ${
                  it.active
                    ? "bg-[color:color-mix(in_oklch,var(--ds-accent)_8%,transparent)] text-ink font-medium"
                    : "text-ink-muted"
                }`}
              >
                {it.active && (
                  <span
                    className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-full"
                    style={{ backgroundColor: "var(--ds-accent)" }}
                  />
                )}
                <Icon className="h-4 w-4" />
                {it.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function labelOf(t: StatusTier) {
  return {
    primary: "Primary Focus",
    secondary: "Secondary Focus",
    supporting: "Supporting",
    optimal: "Within Optimal",
    monitored: "Monitored",
    elevated: "Elevated",
  }[t];
}

function barColor(t: StatusTier) {
  return {
    primary: "var(--ds-mark-ink)",
    secondary: "var(--ds-mark-clay)",
    supporting: "var(--ds-mark-sage)",
    optimal: "var(--ds-mark-forest)",
    monitored: "var(--ds-mark-graphite)",
    elevated: "var(--ds-mark-terra)",
  }[t];
}

function ExampleDashboard() {
  return (
    <div className="space-y-10 rounded-2xl border border-rule bg-canvas px-8 py-10 md:px-12 md:py-12">
      {/* Page header */}
      <header className="space-y-3">
        <div className="flex items-center gap-3">
          <Kicker tone="accent">Cycle 02 · Week 02 of 12</Kicker>
          <RecheckPill date="2026-08-04" />
        </div>
        <h2 className="ds-display-2 text-ink">Welcome back, Stacey.</h2>
        <p className="ds-lead text-ink-muted max-w-2xl">
          Eight biomarkers. Sixty-six SNPs. One arc to your next recheck.
        </p>
      </header>

      {/* Hero row */}
      <div className="grid gap-5 lg:grid-cols-5">
        <FeatureCard className="lg:col-span-3 rounded-2xl border border-rule">
          <Kicker tone="accent">Primary focus</Kicker>
          <p className="ds-title-1 mt-3 text-ink">Fasting insulin</p>
          <div className="mt-6 flex flex-wrap items-baseline gap-4">
            <span className="ds-numeric-L text-ink">8.92</span>
            <span className="ds-data text-ink-muted">μIU/mL</span>
            <span className="ds-data text-ink-faint">→ Target 2–5</span>
            <DeltaIndicator
              value="−0.4"
              direction="improving"
              window="Δ this week"
            />
          </div>
          <div className="mt-6">
            <RangeStrip
              min={0}
              max={16}
              optimalStart={2}
              optimalEnd={5}
              value={8.92}
              tier="primary"
              labelLeft="0"
              labelCenter="optimal 2–5"
              labelRight="16"
            />
          </div>
        </FeatureCard>
        <VellumCard className="lg:col-span-2">
          <Kicker tone="accent">Cycle progress</Kicker>
          <div className="mt-6 flex items-center gap-6">
            <CycleRing pct={16} />
            <div>
              <p className="kicker text-ink-faint">12-week blueprint</p>
              <p className="ds-numeric-L mt-1 text-ink">Week 2</p>
              <p className="text-sm text-ink-muted">70 days until recheck</p>
            </div>
          </div>
        </VellumCard>
      </div>

      {/* System focus row */}
      <div>
        <div className="mb-4 flex items-baseline justify-between border-b border-rule pb-3">
          <Kicker tone="accent">System focus</Kicker>
          <span className="text-xs text-ink-faint">Four systems, ranked</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MiniSystemCard
            tier="primary"
            system="Glucose & Insulin"
            marker="Fasting Insulin"
            value="8.92"
            unit="μIU/mL"
            target="2–5"
          />
          <MiniSystemCard
            tier="secondary"
            system="Iron Status"
            marker="Ferritin"
            value="21.7"
            unit="ng/mL"
            target="50–150"
          />
          <MiniSystemCard
            tier="supporting"
            system="Cardiovascular"
            marker="ApoB"
            value="81"
            unit="mg/dL"
            target="< 60"
          />
          <MiniSystemCard
            tier="optimal"
            system="Foundational"
            marker="Vitamin D"
            value="65.19"
            unit="ng/mL"
            target="50–70"
          />
        </div>
      </div>

      {/* Footer disclaimer */}
      <div className="border-t border-rule pt-5">
        <Kicker className="text-ink-faint">
          Educational portal · Not medical advice
        </Kicker>
      </div>
    </div>
  );
}

function MiniSystemCard({
  tier,
  system,
  marker,
  value,
  unit,
  target,
}: {
  tier: StatusTier;
  system: string;
  marker: string;
  value: string;
  unit: string;
  target: string;
}) {
  return (
    <VellumCard>
      <StatusPill tier={tier} />
      <p className="ds-title-2 mt-3 text-ink">{system}</p>
      <p className="kicker mt-3 text-ink-faint">{marker}</p>
      <p className="ds-numeric-L mt-1 text-ink">
        {value}{" "}
        <span className="ds-data text-ink-muted text-base align-baseline">
          {unit}
        </span>
      </p>
      <p className="text-xs text-ink-faint">→ Target {target}</p>
    </VellumCard>
  );
}
