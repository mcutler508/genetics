"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { VellumCard } from "@/components/ds/card";
import { Kicker } from "@/components/ds/kicker";
import { cn } from "@/lib/utils";
import { HABITS, isoDate } from "@/lib/tracker-data";
import { useTracker } from "@/lib/use-tracker";

export function DashboardCheckinCard() {
  const today = isoDate();
  const { hydrated, getDay, dayCompletePct, toggleHabit } = useTracker();
  const entry = getDay(today);
  const pct = hydrated ? dayCompletePct(today) : 0;
  const done = HABITS.filter((h) => entry[h.id]).length;

  return (
    <VellumCard>
      <div className="flex items-center justify-between">
        <Kicker tone="accent">Today's check-in</Kicker>
        <Link
          href="/tracker"
          className="inline-flex items-center gap-1 text-xs font-medium text-mark-ink hover:underline"
        >
          Open tracker
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <p className="ds-numeric-L text-ink">
          {pct}
          <span className="ds-data text-ink-muted ml-1">%</span>
        </p>
        <p className="ds-data text-ink-muted">
          {hydrated ? `${done} of ${HABITS.length} habits` : "—"}
        </p>
      </div>

      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-vellum-shaded">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${pct}%`,
            backgroundColor: "var(--ds-accent)",
          }}
        />
      </div>

      <ul className="mt-5 grid grid-cols-2 gap-1">
        {HABITS.map((h) => {
          const on = !!entry[h.id];
          return (
            <li key={h.id}>
              <button
                type="button"
                onClick={() => toggleHabit(today, h.id)}
                disabled={!hydrated}
                className={cn(
                  "group flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  "hover:bg-vellum-shaded"
                )}
              >
                <span
                  className={cn(
                    "flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border transition-colors",
                    on
                      ? "border-[var(--ds-accent)] bg-[var(--ds-accent)]"
                      : "border-rule bg-vellum group-hover:border-[color:color-mix(in_oklch,var(--ds-accent)_60%,transparent)]"
                  )}
                >
                  {on && (
                    <svg
                      className="h-2.5 w-2.5"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="var(--ds-vellum)"
                      strokeWidth={3}
                    >
                      <path d="M2 6l3 3 5-6" />
                    </svg>
                  )}
                </span>
                <span
                  className={cn(
                    "flex-1 text-xs",
                    on ? "text-ink-muted line-through" : "text-ink"
                  )}
                >
                  {h.short}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </VellumCard>
  );
}
