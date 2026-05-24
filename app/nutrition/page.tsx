import { Salad, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/portal/page-header";
import { Disclaimer } from "@/components/portal/disclaimer";
import { nutritionArchetype } from "@/lib/mock-data";

export default function NutritionPage() {
  const arch = nutritionArchetype;
  return (
    <>
      <PageHeader
        eyebrow="Nutrition Archetype"
        title={arch.name}
        description={arch.tagline}
      />

      <Card className="mb-6 overflow-hidden">
        <div className="flex flex-col gap-6 px-6 py-6 md:flex-row md:items-start">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Salad className="h-7 w-7" />
          </div>
          <div className="flex-1 space-y-3">
            <p className="text-sm leading-relaxed text-foreground">
              {arch.summary}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">Why this fits: </span>
              {arch.whyItFits}
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-5 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Core principles</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {arch.corePrinciples.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="text-foreground">{p}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Why this archetype</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Related biomarkers
              </p>
              <div className="flex flex-wrap gap-1.5">
                {arch.relatedBiomarkers.map((b) => (
                  <span
                    key={b}
                    className="rounded-md border border-border bg-muted/40 px-2 py-0.5 text-xs text-foreground"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Related genes
              </p>
              <div className="flex flex-wrap gap-1.5">
                {arch.relatedGenes.map((g) => (
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
      </div>

      <Card className="mt-5 border-chart-4/30 bg-chart-4/5">
        <CardContent className="flex items-start gap-3 py-4">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-chart-5" />
          <div>
            <p className="text-sm font-medium text-foreground">
              Cardiovascular optimization note
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {arch.cardiovascularNote}
            </p>
          </div>
        </CardContent>
      </Card>

      <Disclaimer>
        Nutrition guidance is general dietary education tailored to the
        archetype in your report — not a meal plan, prescription, or clinical
        diet. Consider working with a registered dietitian for individualized
        planning.
      </Disclaimer>
    </>
  );
}
