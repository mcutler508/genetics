import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/portal/page-header";
import { StatusBadge } from "@/components/portal/status-badge";
import { Disclaimer } from "@/components/portal/disclaimer";
import { BiomarkerGauge } from "@/components/portal/biomarker-gauge";
import { Sparkline } from "@/components/portal/sparkline";
import { mockSeries } from "@/lib/mock-series";
import { biomarkers, customer } from "@/lib/mock-data";

export default function BiomarkersPage() {
  return (
    <>
      <PageHeader
        eyebrow={`Drawn ${customer.generatedDate}`}
        title="Biomarkers"
        description="Your 8 analyzed biomarkers with current values, optimal ranges, and 12-week targets. Reference values for provider discussion — not a diagnosis."
      />

      <div className="space-y-3">
        {biomarkers.map((b, idx) => (
          <Card key={b.id} className="overflow-hidden">
            <CardContent className="grid gap-5 py-5 md:grid-cols-[1.1fr_2fr_auto] md:items-center md:gap-8">
              {/* Identity */}
              <div className="flex items-start justify-between gap-3 md:block">
                <div>
                  <p className="editorial-eyebrow text-muted-foreground">
                    {b.systemName}
                  </p>
                  <p className="editorial-title mt-1 text-2xl text-foreground">
                    {b.name}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    <span className="editorial-title text-base text-foreground">
                      {b.currentValue}
                    </span>{" "}
                    {b.unit}
                  </p>
                </div>
                <div className="md:hidden">
                  <StatusBadge status={b.status} />
                </div>
              </div>

              {/* Gauge */}
              <div className="space-y-3">
                <BiomarkerGauge biomarker={b} />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    Target{" "}
                    <span className="text-foreground">{b.target12Week}</span>
                  </span>
                  <Sparkline
                    data={mockSeries(idx + 1, b.trendDirection ?? "stable")}
                    trend={b.trendDirection}
                  />
                </div>
              </div>

              {/* Status (md+) */}
              <div className="hidden md:block">
                <StatusBadge status={b.status} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-3">
        <LegendItem label="Primary Focus" detail="The main 12-week target." />
        <LegendItem
          label="Secondary Focus"
          detail="Layered intervention; monitored with supports."
        />
        <LegendItem
          label="Monitored"
          detail="Within range or context-tracked; rechecked at 12 weeks."
        />
      </div>

      <Disclaimer>
        Sparkline trends shown are illustrative placeholders. Add new lab
        results to track your real trajectory. Always interpret values
        alongside symptoms, history, and your provider's guidance.
      </Disclaimer>
    </>
  );
}

function LegendItem({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="rounded-xl border border-border bg-card/60 px-4 py-3">
      <p className="text-sm font-medium text-foreground">{label}</p>
      <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
    </div>
  );
}
