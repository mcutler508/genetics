import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  FeatureCard,
  InsetCard,
  Plate,
  VellumCard,
} from "@/components/ds/card";
import { Kicker } from "@/components/ds/kicker";
import { StatusPill } from "@/components/ds/status-pill";
import { RangeStrip } from "@/components/ds/range-strip";
import { RecheckPill } from "@/components/ds/recheck-pill";
import { DeltaIndicator } from "@/components/ds/delta-indicator";
import { QuietButton } from "@/components/ds/button";
import { CycleProgress } from "@/components/portal/cycle-progress";
import { SystemRadar } from "@/components/portal/system-radar";
import { DashboardCheckinCard } from "@/components/portal/dashboard-checkin-card";
import {
  biomarkers,
  customer,
  supplements,
  systemFocus,
  type Biomarker,
} from "@/lib/mock-data";
import {
  getBiomarkerRange,
  roleToTier,
  statusToTier,
} from "@/lib/biomarker-range";

function daysBetween(start: string, end: string) {
  const ms = new Date(end).getTime() - new Date(start).getTime();
  return Math.max(0, Math.round(ms / 86_400_000));
}

export default function DashboardPage() {
  const elapsedWeeks = customer.cycleWeeksElapsed;
  const totalWeeks = customer.cycleWeeksTotal;
  const daysRemaining =
    daysBetween(customer.cycleStartDate, customer.cycleEndDate) -
    elapsedWeeks * 7;

  // Hero: the single primary-focus biomarker
  const primaryBiomarker = biomarkers.find((b) => b.status === "primary_focus");

  // Priority biomarkers (excluding the hero one, to avoid duplication)
  const priority = biomarkers.filter(
    (b) =>
      (b.status === "secondary_focus" ||
        b.status === "elevated" ||
        b.status === "supporting") &&
      b.id !== primaryBiomarker?.id
  );

  return (
    <div className="space-y-12">
      {/* ───── PAGE HEADER ───────────────────────────────────── */}
      <header className="space-y-4 border-b border-rule pb-10">
        <div className="flex flex-wrap items-center gap-3">
          <Kicker tone="accent">
            Cycle 02 · Week {elapsedWeeks} of {totalWeeks}
          </Kicker>
          <RecheckPill date={customer.cycleEndDate} />
        </div>
        <h1 className="ds-display-2 text-ink">
          Welcome back, {customer.name.split(" ")[0]}.
        </h1>
        <p className="ds-lead max-w-2xl text-ink-muted">
          Eight biomarkers. Sixty-six SNPs. One arc to your next recheck.
        </p>
      </header>

      {/* ───── HERO ROW ──────────────────────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-5">
        {primaryBiomarker && (
          <FeatureCard className="rounded-2xl border border-rule lg:col-span-3">
            <PrimaryBiomarkerHero biomarker={primaryBiomarker} />
          </FeatureCard>
        )}
        <VellumCard className="lg:col-span-2">
          <Kicker tone="accent">Cycle progress</Kicker>
          <div className="mt-5">
            <CycleProgress
              totalWeeks={totalWeeks}
              elapsedWeeks={elapsedWeeks}
              daysRemaining={daysRemaining}
            />
          </div>
        </VellumCard>
      </div>

      {/* ───── SYSTEM FOCUS ──────────────────────────────────── */}
      <section>
        <SectionDivider
          kicker="System focus"
          caption="Four systems, ranked by priority for this cycle"
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {systemFocus.map((sys) => (
            <VellumCard key={sys.id} className="flex flex-col gap-4">
              <StatusPill tier={roleToTier(sys.role)} />
              <div>
                <h3 className="ds-title-2 text-ink">{sys.systemName}</h3>
              </div>
              <div>
                <Kicker className="text-ink-faint">{sys.biomarkerName}</Kicker>
                <p className="ds-numeric-L mt-1 text-ink">{sys.currentValue}</p>
                <p className="kicker mt-1 text-ink-faint">
                  → Target {sys.targetValue}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-ink-muted">
                {sys.summary}
              </p>
            </VellumCard>
          ))}
        </div>
      </section>

      {/* ───── FOCUS MAP + PRIORITY BIOMARKERS ───────────────── */}
      <div className="grid gap-5 lg:grid-cols-5">
        <VellumCard className="lg:col-span-2">
          <Kicker tone="accent">Focus map</Kicker>
          <p className="ds-title-2 mt-2 text-ink">Systems at a glance</p>
          <div className="mt-4">
            <SystemRadar systems={systemFocus} />
          </div>
          <p className="mt-3 text-xs text-ink-faint">
            Current state vs target across the four focus systems. Outer ring is
            target; inner shape is now.
          </p>
        </VellumCard>

        <VellumCard className="lg:col-span-3">
          <div className="flex items-center justify-between">
            <Kicker tone="accent">Priority biomarkers</Kicker>
            <QuietButton>
              <Link href="/biomarkers" className="inline-flex items-center gap-1">
                View all
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </QuietButton>
          </div>
          <div className="mt-5 space-y-6">
            {priority.map((b) => (
              <PriorityRow key={b.id} biomarker={b} />
            ))}
          </div>
        </VellumCard>
      </div>

      {/* ───── TODAY + EDITORIAL NOTE ────────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DashboardCheckinCard />
        </div>
        <Plate className="lg:col-span-1">
          <Kicker tone="accent">Why this matters</Kicker>
          <p className="ds-title-2 mt-2 text-ink">
            Compounds, not heroics.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            Your retest at week twelve reflects the last eight to twelve weeks
            of behavior — not the last eight days. Small habits, held with
            consistency, become the trend.
          </p>
          <p className="kicker mt-5 text-ink-faint">
            — Editor's note
          </p>
        </Plate>
      </div>

      {/* ───── PROTOCOL ──────────────────────────────────────── */}
      <section>
        <div className="mb-5 flex items-baseline justify-between border-b border-rule pb-3">
          <Kicker tone="accent">Today's protocol</Kicker>
          <QuietButton>
            <Link href="/supplements" className="inline-flex items-center gap-1">
              Full protocol
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </QuietButton>
        </div>
        <VellumCard padded={false}>
          <div className="grid gap-px overflow-hidden rounded-2xl bg-rule md:grid-cols-2 xl:grid-cols-5">
            {supplements.map((s) => (
              <div
                key={s.id}
                className="bg-vellum px-5 py-5"
              >
                <Kicker className="text-ink-faint">
                  {s.providerDependent ? "Provider-dependent" : "Daily"}
                </Kicker>
                <p className="ds-title-2 mt-2 text-ink">{s.name}</p>
                <p className="mt-2 text-xs text-ink-muted">{s.dailyDose}</p>
              </div>
            ))}
          </div>
        </VellumCard>
      </section>

      {/* ───── FOOTER DISCLAIMER ─────────────────────────────── */}
      <footer className="border-t border-rule pt-6">
        <Kicker className="text-ink-faint">
          Educational portal · Not medical advice · Discuss changes with a
          qualified provider
        </Kicker>
      </footer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────

function SectionDivider({
  kicker,
  caption,
}: {
  kicker: string;
  caption?: string;
}) {
  return (
    <div className="mb-5 flex items-baseline justify-between border-b border-rule pb-3">
      <Kicker tone="accent">{kicker}</Kicker>
      {caption && (
        <span className="text-xs text-ink-faint">{caption}</span>
      )}
    </div>
  );
}

function PrimaryBiomarkerHero({ biomarker }: { biomarker: Biomarker }) {
  const range = getBiomarkerRange(biomarker);
  const tier = statusToTier(biomarker.status);

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <StatusPill tier={tier} />
        <Kicker className="text-ink-faint">
          System · {biomarker.systemName}
        </Kicker>
      </div>
      <h2 className="ds-title-1 mt-4 text-ink">{biomarker.name}</h2>
      <div className="mt-6 flex flex-wrap items-baseline gap-4">
        <span className="ds-numeric-L text-ink">{biomarker.currentValue}</span>
        <span className="ds-data text-ink-muted">{biomarker.unit}</span>
        <span className="ds-data text-ink-faint">
          → Target {biomarker.target12Week}
        </span>
        {biomarker.trendDirection && (
          <DeltaIndicator
            value={biomarker.trendDirection === "improving" ? "−0.4" : "+0"}
            direction={biomarker.trendDirection}
            window="Δ this week"
            className="ml-auto"
          />
        )}
      </div>
      {range && (
        <div className="mt-7">
          <RangeStrip
            min={range.min}
            max={range.max}
            optimalStart={range.optimalStart}
            optimalEnd={range.optimalEnd}
            value={range.value}
            tier={tier}
            labelLeft={fmt(range.min)}
            labelCenter={`optimal ${niceRange(biomarker)}`}
            labelRight={fmt(range.max)}
          />
        </div>
      )}
      <InsetCard className="mt-7">
        <Kicker className="text-ink-faint">This week's lever</Kicker>
        <p className="mt-2 text-sm leading-relaxed text-ink">
          Titrate berberine to 500mg twice daily with meals. Hold caffeine
          before 12 PM. Hit 30g fiber across the day. Small moves; the trend
          does the work.
        </p>
      </InsetCard>
    </>
  );
}

function PriorityRow({ biomarker }: { biomarker: Biomarker }) {
  const range = getBiomarkerRange(biomarker);
  const tier = statusToTier(biomarker.status);
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-ink">{biomarker.name}</p>
          <p className="text-xs text-ink-muted ds-data">
            {biomarker.currentValue} {biomarker.unit}
            <span className="mx-1.5 text-ink-faint">·</span>
            → {biomarker.target12Week}
          </p>
        </div>
        <StatusPill tier={tier} />
      </div>
      {range && (
        <RangeStrip
          min={range.min}
          max={range.max}
          optimalStart={range.optimalStart}
          optimalEnd={range.optimalEnd}
          value={range.value}
          tier={tier}
        />
      )}
    </div>
  );
}

function niceRange(b: Biomarker): string {
  return b.optimalRange.replace(/\s+/g, " ").trim();
}

function fmt(n: number): string {
  if (n >= 100) return n.toFixed(0);
  if (n >= 10) return n.toFixed(0);
  return n.toFixed(1).replace(/\.0$/, "");
}
