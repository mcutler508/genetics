"use client";

import { useMemo, useState } from "react";
import { BookOpen, ChevronDown, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/portal/page-header";
import { Disclaimer } from "@/components/portal/disclaimer";
import { GenotypeChip } from "@/components/portal/genotype-chip";
import {
  geneticMarkers,
  getGeneExplanation,
  GENE_EXPLANATIONS,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function GeneticsPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set(geneticMarkers.map((g) => g.category));
    return ["All", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return geneticMarkers.filter((g) => {
      const matchCat =
        activeCategory === "All" || g.category === activeCategory;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        g.gene.toLowerCase().includes(q) ||
        g.rsNumber.toLowerCase().includes(q) ||
        g.whatItAffects.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q)
      );
    });
  }, [query, activeCategory]);

  const glossaryCount = Object.keys(GENE_EXPLANATIONS).length;

  return (
    <>
      <PageHeader
        eyebrow={`${geneticMarkers.length} SNPs analyzed`}
        title="Genetic appendix"
        description="Your raw genotype results across 10 biological categories. Genetics describe tendencies — not certainties. Always interpret alongside labs, history, and a provider."
      />

      {/* Glossary callout */}
      <div className="mb-4 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm">
        <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p className="text-foreground">
          <span className="font-medium">Interactive glossary.</span>{" "}
          <span className="text-muted-foreground">
            Hover any result code to read what those DNA letters mean. Click
            any highlighted row to read a plain-English description of what
            that gene does — {glossaryCount} of {geneticMarkers.length} genes
            are interpreted in your report.
          </span>
        </p>
      </div>

      {/* Search + categories */}
      <Card className="mb-4">
        <CardContent className="space-y-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by gene, RS number, or pathway…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => {
              const active = c === activeCategory;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActiveCategory(c)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs transition-colors",
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:bg-muted"
                  )}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="w-8 px-2 py-3" aria-label="Expand" />
                  <th className="px-5 py-3 text-left font-medium">Gene</th>
                  <th className="px-5 py-3 text-left font-medium">RS Number</th>
                  <th className="px-5 py-3 text-left font-medium">Category</th>
                  <th className="px-5 py-3 text-left font-medium">
                    What it affects
                  </th>
                  <th className="px-5 py-3 text-left font-medium">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-10 text-center text-sm text-muted-foreground"
                    >
                      No matches for that search.
                    </td>
                  </tr>
                ) : (
                  filtered.map((g) => {
                    const explanation = getGeneExplanation(g.gene);
                    const hasExplanation = !!explanation;
                    const isOpen = expanded === g.id;
                    return (
                      <ExpandableRow
                        key={g.id}
                        marker={g}
                        explanation={explanation}
                        hasExplanation={hasExplanation}
                        isOpen={isOpen}
                        onToggle={() =>
                          setExpanded(isOpen ? null : g.id)
                        }
                      />
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <p className="mt-3 text-xs text-muted-foreground">
        Showing {filtered.length} of {geneticMarkers.length} markers.
      </p>

      <Disclaimer>
        Glossary descriptions explain what each gene generally does, based on
        established research — they are not interpretations of your specific
        genotype. "—" means the variant was not successfully called or was not
        part of this panel. This is not a clinical genetic test.
      </Disclaimer>
    </>
  );
}

function ExpandableRow({
  marker,
  explanation,
  hasExplanation,
  isOpen,
  onToggle,
}: {
  marker: (typeof geneticMarkers)[number];
  explanation: string | undefined;
  hasExplanation: boolean;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <>
      <tr
        className={cn(
          "transition-colors",
          hasExplanation
            ? "cursor-pointer hover:bg-primary/5"
            : "hover:bg-muted/30",
          isOpen && "bg-primary/5"
        )}
        onClick={hasExplanation ? onToggle : undefined}
      >
        <td className="w-8 px-2 py-3 text-muted-foreground">
          {hasExplanation && (
            <button
              type="button"
              aria-label={isOpen ? "Collapse" : "Expand"}
              aria-expanded={isOpen}
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              className="flex h-6 w-6 items-center justify-center rounded-md text-primary hover:bg-primary/10"
            >
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </button>
          )}
        </td>
        <td
          className={cn(
            "px-5 py-3 font-mono text-xs font-semibold text-foreground",
            hasExplanation && "underline-offset-4 decoration-primary/30 group-hover:underline"
          )}
        >
          {marker.gene}
        </td>
        <td className="px-5 py-3 font-mono text-xs text-muted-foreground">
          {marker.rsNumber}
        </td>
        <td className="px-5 py-3 text-xs text-muted-foreground">
          {marker.category}
        </td>
        <td className="px-5 py-3 text-foreground">{marker.whatItAffects}</td>
        <td className="px-5 py-3">
          <GenotypeChip value={marker.userResult} />
        </td>
      </tr>
      {isOpen && hasExplanation && (
        <tr className="bg-primary/5">
          <td />
          <td colSpan={5} className="px-5 pb-5 pt-1">
            <div className="rounded-lg border border-primary/20 bg-card px-5 py-4">
              <div className="flex items-baseline gap-2">
                <BookOpen className="h-3.5 w-3.5 shrink-0 text-primary" />
                <p className="editorial-eyebrow text-primary">
                  About {marker.gene}
                </p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-foreground">
                {explanation}
              </p>
              <p className="mt-3 text-xs italic text-muted-foreground">
                This describes the gene's role in research generally — it
                does not interpret your specific{" "}
                <span className="font-mono not-italic">{marker.userResult}</span>{" "}
                result. Discuss your full genetic context with a qualified
                provider before drawing conclusions.
              </p>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
