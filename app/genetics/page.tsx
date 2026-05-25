"use client";

import { useMemo, useState } from "react";
import { BookOpen, ChevronDown, Search } from "lucide-react";
import { PageHeader } from "@/components/portal/page-header";
import { Disclaimer } from "@/components/portal/disclaimer";
import { VellumCard } from "@/components/ds/card";
import { Kicker } from "@/components/ds/kicker";
import { GenotypeChip } from "@/components/portal/genotype-chip";
import { HelixAccent } from "@/components/ds/helix-accent";
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
        description="Your raw genotype results across ten biological categories. Genetics describe tendencies — not certainties. Always interpret alongside labs, history, and a provider."
      />

      {/* Glossary callout with helix accent */}
      <div className="mb-6 flex items-start gap-4 border-y border-rule py-4">
        <HelixAccent />
        <div className="flex-1">
          <Kicker tone="accent">Interactive glossary</Kicker>
          <p className="mt-2 text-sm text-ink leading-relaxed">
            Hover any result code to read what those DNA letters mean. Click any
            highlighted row to read a plain-English description of what that
            gene does — {glossaryCount} of {geneticMarkers.length} genes are
            interpreted in your report.
          </p>
        </div>
      </div>

      {/* Search + categories */}
      <VellumCard className="mb-5">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <input
              type="text"
              placeholder="Search by gene, RS number, or pathway…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-md border border-rule bg-vellum py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-[var(--ds-accent-soft)]"
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
                      ? "border-[var(--ds-accent)] bg-[var(--ds-accent)] text-[var(--ds-vellum)]"
                      : "border-rule bg-vellum text-ink-muted hover:bg-canvas-deep hover:text-ink"
                  )}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </VellumCard>

      {/* Table */}
      <VellumCard padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-rule">
              <tr>
                <th className="w-8 px-2 py-3" aria-label="Expand" />
                <th className="px-5 py-3 text-left kicker text-ink-faint">
                  Gene
                </th>
                <th className="px-5 py-3 text-left kicker text-ink-faint">
                  RS Number
                </th>
                <th className="px-5 py-3 text-left kicker text-ink-faint">
                  Category
                </th>
                <th className="px-5 py-3 text-left kicker text-ink-faint">
                  What it affects
                </th>
                <th className="px-5 py-3 text-left kicker text-ink-faint">
                  Result
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-sm text-ink-muted"
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
                      onToggle={() => setExpanded(isOpen ? null : g.id)}
                    />
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </VellumCard>

      <p className="mt-3 kicker text-ink-faint">
        Showing {filtered.length} of {geneticMarkers.length} markers
      </p>

      <Disclaimer>
        Glossary describes the gene's role in research generally · Not an
        interpretation of your specific genotype · "—" means the variant was
        not successfully called
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
            ? "cursor-pointer hover:bg-[color:color-mix(in_oklch,var(--ds-accent)_5%,transparent)]"
            : "hover:bg-canvas-deep/50",
          isOpen &&
            "bg-[color:color-mix(in_oklch,var(--ds-accent)_5%,transparent)]"
        )}
        onClick={hasExplanation ? onToggle : undefined}
      >
        <td className="w-8 px-2 py-3 text-ink-faint">
          {hasExplanation && (
            <button
              type="button"
              aria-label={isOpen ? "Collapse" : "Expand"}
              aria-expanded={isOpen}
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              className="flex h-6 w-6 items-center justify-center rounded-md text-mark-ink hover:bg-[color:color-mix(in_oklch,var(--ds-accent)_10%,transparent)]"
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
        <td className="px-5 py-3 ds-data font-semibold text-ink">
          {marker.gene}
        </td>
        <td className="px-5 py-3 ds-data text-ink-faint">{marker.rsNumber}</td>
        <td className="px-5 py-3 text-xs text-ink-muted">{marker.category}</td>
        <td className="px-5 py-3 text-ink text-sm">{marker.whatItAffects}</td>
        <td className="px-5 py-3">
          <GenotypeChip value={marker.userResult} />
        </td>
      </tr>
      {isOpen && hasExplanation && (
        <tr className="bg-[color:color-mix(in_oklch,var(--ds-accent)_5%,transparent)]">
          <td />
          <td colSpan={5} className="px-5 pb-5 pt-1">
            <div className="rounded-lg border border-[color:color-mix(in_oklch,var(--ds-accent)_20%,transparent)] bg-vellum px-5 py-4">
              <div className="flex items-baseline gap-2">
                <BookOpen className="h-3.5 w-3.5 shrink-0 text-mark-ink" />
                <Kicker tone="accent">About {marker.gene}</Kicker>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-ink">
                {explanation}
              </p>
              <p className="mt-3 text-xs italic text-ink-muted">
                This describes the gene's role in research generally — it does
                not interpret your specific{" "}
                <span className="ds-data not-italic">{marker.userResult}</span>{" "}
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
