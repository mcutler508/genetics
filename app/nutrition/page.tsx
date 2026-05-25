import { ShieldAlert } from "lucide-react";
import { PageHeader } from "@/components/portal/page-header";
import { Disclaimer } from "@/components/portal/disclaimer";
import { FeatureCard, Plate, VellumCard } from "@/components/ds/card";
import { Kicker } from "@/components/ds/kicker";
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

      {/* Hero: the archetype as the page's single feature */}
      <FeatureCard className="rounded-2xl border border-rule">
        <Kicker tone="accent">Your archetype</Kicker>
        <h2 className="ds-title-1 mt-3 text-ink">
          A measured approach to carbohydrate.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink">
          {arch.summary}
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted">
          <span className="ds-data text-ink">Why this fits — </span>
          {arch.whyItFits}
        </p>
      </FeatureCard>

      {/* Core principles + context grid */}
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <VellumCard>
          <Kicker tone="accent">Core principles</Kicker>
          <ul className="mt-4 space-y-3">
            {arch.corePrinciples.map((p, i) => (
              <li key={p} className="flex items-start gap-3 text-sm">
                <span className="kicker text-ink-faint mt-0.5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-ink leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </VellumCard>

        <VellumCard className="flex flex-col gap-5">
          <div>
            <Kicker tone="accent">Related biomarkers</Kicker>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {arch.relatedBiomarkers.map((b) => (
                <span
                  key={b}
                  className="rounded-md border border-rule bg-canvas-deep px-2.5 py-1 text-xs text-ink"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
          <div>
            <Kicker tone="accent">Related genes</Kicker>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {arch.relatedGenes.map((g) => (
                <span
                  key={g}
                  className="ds-data rounded-md border border-rule bg-canvas-deep px-2.5 py-1 text-ink"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>
        </VellumCard>
      </div>

      {/* Cardiovascular note as a Plate (no background, hairline above) */}
      <div className="mt-8">
        <Plate>
          <div className="flex items-start gap-4">
            <ShieldAlert className="mt-1 h-5 w-5 shrink-0 text-mark-clay" />
            <div>
              <Kicker tone="accent">Cardiovascular optimization note</Kicker>
              <p className="mt-2 text-base leading-relaxed text-ink max-w-3xl">
                {arch.cardiovascularNote}
              </p>
              <p className="kicker mt-5 text-ink-faint">
                — Layered guidance · Applies on top of the archetype
              </p>
            </div>
          </div>
        </Plate>
      </div>

      <Disclaimer>
        Nutrition guidance is general dietary education tailored to your
        archetype · Not a meal plan, prescription, or clinical diet
      </Disclaimer>
    </>
  );
}
