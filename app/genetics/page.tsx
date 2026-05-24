"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/portal/page-header";
import { Disclaimer } from "@/components/portal/disclaimer";
import { geneticMarkers } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function GeneticsPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

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

  return (
    <>
      <PageHeader
        eyebrow={`${geneticMarkers.length} SNPs analyzed`}
        title="Genetic appendix"
        description="Your raw genotype results across 10 biological categories. Genetics describe tendencies — not certainties. Always interpret alongside labs, history, and a provider."
      />

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
                      colSpan={5}
                      className="px-5 py-10 text-center text-sm text-muted-foreground"
                    >
                      No matches for that search.
                    </td>
                  </tr>
                ) : (
                  filtered.map((g) => (
                    <tr key={g.id} className="hover:bg-muted/30">
                      <td className="px-5 py-3 font-mono text-xs font-semibold text-foreground">
                        {g.gene}
                      </td>
                      <td className="px-5 py-3 font-mono text-xs text-muted-foreground">
                        {g.rsNumber}
                      </td>
                      <td className="px-5 py-3 text-xs text-muted-foreground">
                        {g.category}
                      </td>
                      <td className="px-5 py-3 text-foreground">
                        {g.whatItAffects}
                      </td>
                      <td className="px-5 py-3">
                        <span className="inline-flex rounded-md bg-muted/60 px-2 py-0.5 font-mono text-xs font-medium text-foreground">
                          {g.userResult}
                        </span>
                      </td>
                    </tr>
                  ))
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
        Genotype results indicate tendencies that may shape how systems respond
        — they do not determine outcomes. "—" means the variant was not
        successfully called or was not part of this panel. This is not a
        clinical genetic test.
      </Disclaimer>
    </>
  );
}
