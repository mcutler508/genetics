import { AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/portal/page-header";
import { Disclaimer } from "@/components/portal/disclaimer";
import { VellumCard, InsetCard } from "@/components/ds/card";
import { Kicker } from "@/components/ds/kicker";
import { supplements, type SupplementItem } from "@/lib/mock-data";

export default function SupplementsPage() {
  return (
    <>
      <PageHeader
        eyebrow="From Your Blueprint"
        title="Supplement protocol"
        description="The protocol defined in your uploaded blueprint. Items marked provider-dependent should be discussed with a qualified provider before starting, adjusting, or stopping."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {supplements.map((s) => (
          <SupplementCard key={s.id} supplement={s} />
        ))}
      </div>

      <Disclaimer>
        Supplements above are part of your uploaded blueprint, not independent
        recommendations · Discuss any changes with a qualified provider
      </Disclaimer>
    </>
  );
}

function SupplementCard({ supplement: s }: { supplement: SupplementItem }) {
  return (
    <VellumCard className="flex flex-col gap-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Kicker className="text-ink-faint">
            {s.providerDependent ? "Provider-dependent" : "Daily"}
          </Kicker>
          <h3 className="ds-title-1 mt-2 text-ink">{s.name}</h3>
        </div>
        {s.providerDependent && (
          <span className="inline-flex items-center gap-1 rounded-sm border border-[color:color-mix(in_oklch,var(--ds-mark-clay)_30%,transparent)] bg-[color:color-mix(in_oklch,var(--ds-mark-clay)_12%,transparent)] px-2 py-0.5 kicker text-mark-clay">
            <AlertTriangle className="h-3 w-3" />
            Provider
          </span>
        )}
      </div>

      <InsetCard>
        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <Kicker className="text-ink-faint">Daily dose</Kicker>
            <p className="mt-1 ds-data text-ink">{s.dailyDose}</p>
          </div>
          <div>
            <Kicker className="text-ink-faint">Timing</Kicker>
            <p className="mt-1 ds-data text-ink">{s.timing}</p>
          </div>
          <div>
            <Kicker className="text-ink-faint">Purpose</Kicker>
            <p className="mt-1 text-xs text-ink-muted">{s.primaryPurpose}</p>
          </div>
        </div>
      </InsetCard>

      <div className="space-y-4">
        <div>
          <Kicker className="text-ink-faint mb-1.5">Why it's included</Kicker>
          <p className="text-sm leading-relaxed text-ink">{s.whyIncluded}</p>
        </div>
        <div>
          <Kicker className="text-ink-faint mb-1.5">Practical notes</Kicker>
          <p className="text-sm leading-relaxed text-ink-muted">
            {s.practicalNotes}
          </p>
        </div>
      </div>

      {s.safetyNote && (
        <div className="mt-auto flex items-start gap-2 rounded-lg border border-[color:color-mix(in_oklch,var(--ds-mark-terra)_30%,transparent)] bg-[color:color-mix(in_oklch,var(--ds-mark-terra)_8%,transparent)] px-3 py-2.5">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mark-terra" />
          <p className="text-xs leading-relaxed text-mark-terra">
            {s.safetyNote}
          </p>
        </div>
      )}
    </VellumCard>
  );
}
