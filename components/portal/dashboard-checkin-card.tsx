"use client";

import Link from "next/link";
import { ArrowUpRight, ClipboardList } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <ClipboardList className="h-4 w-4 text-primary" />
          <CardTitle className="editorial-title text-lg">
            Today's check-in
          </CardTitle>
        </div>
        <Link
          href="/tracker"
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          Open tracker <ArrowUpRight className="h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="mb-1.5 flex items-baseline justify-between">
            <p className="editorial-title text-2xl text-foreground">
              {pct}
              <span className="text-base text-muted-foreground">%</span>
            </p>
            <p className="text-xs text-muted-foreground">
              {hydrated ? `${done} of ${HABITS.length}` : "—"}
            </p>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <ul className="space-y-1">
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
                    "hover:bg-muted/40"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                      on
                        ? "border-primary bg-primary"
                        : "border-border bg-background group-hover:border-primary/60"
                    )}
                  >
                    {on && (
                      <svg
                        className="h-2.5 w-2.5 text-primary-foreground"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path d="M2 6l3 3 5-6" />
                      </svg>
                    )}
                  </span>
                  <span
                    className={cn(
                      "flex-1 text-xs",
                      on ? "text-muted-foreground" : "text-foreground"
                    )}
                  >
                    {h.short}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
