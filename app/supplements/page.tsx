import { AlertTriangle, Clock, Pill } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/portal/page-header";
import { Disclaimer } from "@/components/portal/disclaimer";
import { supplements } from "@/lib/mock-data";

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
          <Card key={s.id} className="flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Pill className="h-4 w-4" />
                  </div>
                  <CardTitle className="editorial-title text-xl">
                    {s.name}
                  </CardTitle>
                </div>
                {s.providerDependent && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-chart-4/40 bg-chart-4/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-chart-5">
                    <AlertTriangle className="h-3 w-3" />
                    Provider
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4">
              <div className="grid grid-cols-2 gap-3 rounded-lg bg-muted/40 p-3">
                <KV label="Daily dose" value={s.dailyDose} />
                <KV label="Purpose" value={s.primaryPurpose} />
                <div className="col-span-2">
                  <p className="mb-0.5 flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    <Clock className="h-3 w-3" /> Timing
                  </p>
                  <p className="text-xs text-foreground">{s.timing}</p>
                </div>
              </div>

              <div>
                <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Why it's included
                </p>
                <p className="text-sm leading-relaxed text-foreground">
                  {s.whyIncluded}
                </p>
              </div>

              <div>
                <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Practical notes
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {s.practicalNotes}
                </p>
              </div>

              {s.safetyNote && (
                <div className="mt-auto flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive">
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <p>{s.safetyNote}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Disclaimer>
        Supplements above are part of your uploaded blueprint, not independent
        recommendations from this portal. Discuss any changes with a qualified
        provider, especially items marked provider-dependent or items that may
        interact with medications.
      </Disclaimer>
    </>
  );
}

function KV({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-0.5 text-xs text-foreground">{value}</p>
    </div>
  );
}
