import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/portal/page-header";
import { RoleBadge } from "@/components/portal/status-badge";
import { Disclaimer } from "@/components/portal/disclaimer";
import { systemFocus } from "@/lib/mock-data";

export default function SystemsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Your Blueprint"
        title="Biological systems"
        description="A systems-level view of your blueprint — primary, secondary, supporting, and monitored. Each entry connects genetics, biomarkers, and the 12-week plan."
      />

      <div className="space-y-5">
        {systemFocus.map((sys) => (
          <Card key={sys.id}>
            <CardHeader className="flex flex-row items-start justify-between gap-4 pb-4">
              <div className="space-y-3">
                <RoleBadge role={sys.role} />
                <CardTitle className="editorial-title text-2xl md:text-3xl">
                  {sys.systemName}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{sys.summary}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="editorial-eyebrow text-muted-foreground">
                  {sys.biomarkerName}
                </p>
                <p className="editorial-title mt-1 text-2xl text-foreground">
                  {sys.currentValue}
                </p>
                <p className="text-xs text-muted-foreground">
                  Target: {sys.targetValue}
                </p>
              </div>
            </CardHeader>
            <CardContent className="grid gap-5 md:grid-cols-3">
              <Section title="Why it matters" body={sys.whyItMatters} />
              <Section
                title="What happens if ignored"
                body={sys.whatHappensIfIgnored}
              />
              <Section
                title="How we're addressing it"
                body={sys.howAddressingIt}
              />
              <div className="md:col-span-3">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Related genes
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {sys.relatedGenes.map((g) => (
                    <span
                      key={g}
                      className="rounded-md border border-border bg-muted/40 px-2 py-0.5 text-xs font-mono text-foreground"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Disclaimer>
        Genetic context is provided as one input among many. Variants describe
        tendencies, not certainties. Always interpret alongside labs, history,
        and a qualified provider.
      </Disclaimer>
    </>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <p className="editorial-eyebrow mb-2 text-muted-foreground">{title}</p>
      <p className="text-sm leading-relaxed text-foreground">{body}</p>
    </div>
  );
}
