import { PageHeader } from "@/components/portal/page-header";
import { Disclaimer } from "@/components/portal/disclaimer";
import { VellumCard, InsetCard } from "@/components/ds/card";
import { Kicker } from "@/components/ds/kicker";
import { StatusPill } from "@/components/ds/status-pill";
import { systemFocus } from "@/lib/mock-data";
import { roleToTier } from "@/lib/biomarker-range";

export default function SystemsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Your Blueprint"
        title="Biological systems"
        description="A systems-level view of your blueprint — primary, secondary, supporting, and monitored. Each entry connects genetics, biomarkers, and the twelve-week plan."
      />

      <div className="space-y-6">
        {systemFocus.map((sys) => (
          <VellumCard key={sys.id}>
            {/* Header row */}
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div className="flex-1 space-y-3">
                <StatusPill tier={roleToTier(sys.role)} />
                <h2 className="ds-title-1 text-ink">{sys.systemName}</h2>
                <p className="text-sm text-ink-muted max-w-2xl">
                  {sys.summary}
                </p>
              </div>
              <InsetCard className="shrink-0 md:text-right md:min-w-[180px]">
                <Kicker className="text-ink-faint">{sys.biomarkerName}</Kicker>
                <p className="ds-numeric-L mt-1.5 text-ink">
                  {sys.currentValue}
                </p>
                <p className="kicker mt-1 text-ink-faint">
                  → Target {sys.targetValue}
                </p>
              </InsetCard>
            </div>

            {/* Three editorial sections */}
            <div className="mt-7 grid gap-6 border-t border-rule pt-6 md:grid-cols-3">
              <Section title="Why it matters" body={sys.whyItMatters} />
              <Section
                title="What happens if ignored"
                body={sys.whatHappensIfIgnored}
              />
              <Section
                title="How we're addressing it"
                body={sys.howAddressingIt}
              />
            </div>

            {/* Related genes */}
            <div className="mt-6 border-t border-rule pt-6">
              <Kicker className="mb-3 text-ink-faint">Related genes</Kicker>
              <div className="flex flex-wrap gap-1.5">
                {sys.relatedGenes.map((g) => (
                  <span
                    key={g}
                    className="ds-data rounded-md border border-rule bg-canvas-deep px-2 py-0.5 text-ink"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </VellumCard>
        ))}
      </div>

      <Disclaimer>
        Genetic context is one input among many · Variants describe tendencies,
        not certainties · Interpret alongside labs, history, and a qualified
        provider
      </Disclaimer>
    </>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <Kicker className="mb-2 text-ink-faint">{title}</Kicker>
      <p className="text-sm leading-relaxed text-ink">{body}</p>
    </div>
  );
}
