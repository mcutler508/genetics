import { PageHeader } from "@/components/portal/page-header";
import { Disclaimer } from "@/components/portal/disclaimer";
import { VellumCard } from "@/components/ds/card";
import { Kicker } from "@/components/ds/kicker";
import { StatusPill } from "@/components/ds/status-pill";
import { RangeStrip } from "@/components/ds/range-strip";
import { Sparkline } from "@/components/portal/sparkline";
import { mockSeries } from "@/lib/mock-series";
import { biomarkers, customer, type Biomarker } from "@/lib/mock-data";
import { getBiomarkerRange, statusToTier } from "@/lib/biomarker-range";

export default function BiomarkersPage() {
  return (
    <>
      <PageHeader
        eyebrow={`Drawn ${customer.generatedDate}`}
        title="Biomarkers"
        description="Your eight analyzed biomarkers with current values, optimal ranges, and twelve-week targets. Reference values for provider discussion — not a diagnosis."
      />

      <div className="space-y-4">
        {biomarkers.map((b, idx) => (
          <BiomarkerRow key={b.id} biomarker={b} index={idx} />
        ))}
      </div>

      <section className="mt-10">
        <div className="mb-4 border-b border-rule pb-3">
          <Kicker tone="accent">Tier legend</Kicker>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <LegendItem
            tier="primary"
            label="Primary Focus"
            detail="The main twelve-week target."
          />
          <LegendItem
            tier="secondary"
            label="Secondary Focus"
            detail="Layered intervention; monitored with supports."
          />
          <LegendItem
            tier="monitored"
            label="Monitored"
            detail="Within range or context-tracked; rechecked at 12 weeks."
          />
        </div>
      </section>

      <Disclaimer>
        Sparkline trends shown are illustrative placeholders · Add new lab
        results to track your real trajectory
      </Disclaimer>
    </>
  );
}

function BiomarkerRow({
  biomarker,
  index,
}: {
  biomarker: Biomarker;
  index: number;
}) {
  const range = getBiomarkerRange(biomarker);
  const tier = statusToTier(biomarker.status);

  return (
    <VellumCard>
      <div className="grid gap-5 md:grid-cols-[1.1fr_2fr_auto] md:items-center md:gap-8">
        {/* Identity */}
        <div className="flex items-start justify-between gap-3 md:block">
          <div>
            <Kicker className="text-ink-faint">
              System · {biomarker.systemName}
            </Kicker>
            <p className="ds-title-2 mt-1.5 text-ink">{biomarker.name}</p>
            <p className="mt-2 flex items-baseline gap-1.5">
              <span className="ds-numeric-L text-ink">
                {biomarker.currentValue}
              </span>
              <span className="ds-data text-ink-muted">{biomarker.unit}</span>
            </p>
          </div>
          <div className="md:hidden">
            <StatusPill tier={tier} />
          </div>
        </div>

        {/* Range + sparkline */}
        <div className="space-y-3">
          {range ? (
            <RangeStrip
              min={range.min}
              max={range.max}
              optimalStart={range.optimalStart}
              optimalEnd={range.optimalEnd}
              value={range.value}
              tier={tier}
            />
          ) : (
            <div className="h-2 w-full rounded-full bg-vellum-shaded" />
          )}
          <div className="flex items-center justify-between text-xs text-ink-faint">
            <span className="ds-data">
              → Target{" "}
              <span className="text-ink">{biomarker.target12Week}</span>
            </span>
            <Sparkline
              data={mockSeries(index + 1, biomarker.trendDirection ?? "stable")}
              trend={biomarker.trendDirection}
            />
          </div>
        </div>

        {/* Status (md+) */}
        <div className="hidden md:block">
          <StatusPill tier={tier} />
        </div>
      </div>
    </VellumCard>
  );
}

function LegendItem({
  tier,
  label,
  detail,
}: {
  tier: "primary" | "secondary" | "monitored";
  label: string;
  detail: string;
}) {
  return (
    <div className="rounded-xl border border-rule bg-vellum px-4 py-3">
      <StatusPill tier={tier} label={label} />
      <p className="mt-2 text-xs text-ink-muted">{detail}</p>
    </div>
  );
}
