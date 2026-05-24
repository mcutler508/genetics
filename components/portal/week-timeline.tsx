"use client";

import { CheckCircle2, Circle, Flag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { WEEKS, type WeekTemplate } from "@/lib/tracker-data";
import { useTracker } from "@/lib/use-tracker";

type Props = {
  currentWeek: number;
  onSelect: (week: number) => void;
  activeWeek: number;
};

export function WeekTimeline({ currentWeek, onSelect, activeWeek }: Props) {
  const { state, hydrated } = useTracker();

  return (
    <Card>
      <CardContent className="space-y-1 py-4">
        {WEEKS.map((w) => {
          const taskState = state.weekTasks[w.number] ?? {};
          const completed = w.tasks.filter((t) => taskState[t.id]).length;
          const pct = Math.round((completed / w.tasks.length) * 100);
          const status: "done" | "current" | "future" =
            w.number < currentWeek
              ? "done"
              : w.number === currentWeek
                ? "current"
                : "future";
          const isActive = activeWeek === w.number;

          return (
            <button
              key={w.number}
              type="button"
              onClick={() => onSelect(w.number)}
              className={cn(
                "group flex w-full items-start gap-4 rounded-lg border px-3 py-3 text-left transition-all",
                isActive
                  ? "border-primary/40 bg-primary/5"
                  : "border-transparent hover:border-border hover:bg-muted/40"
              )}
            >
              <WeekIcon week={w} status={status} pct={hydrated ? pct : 0} />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    Week {w.number}
                  </p>
                  {status === "current" && (
                    <span className="inline-flex items-center rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-primary-foreground">
                      Current
                    </span>
                  )}
                  {w.milestone && (
                    <Flag className="h-3 w-3 text-chart-5" />
                  )}
                </div>
                <p className="editorial-title mt-0.5 text-base leading-tight text-foreground">
                  {w.theme}
                </p>
                <p className="text-xs text-muted-foreground">{w.focus}</p>
                {hydrated && pct > 0 && (
                  <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        status === "done"
                          ? "bg-chart-2"
                          : "bg-primary"
                      )}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
}

function WeekIcon({
  week,
  status,
  pct,
}: {
  week: WeekTemplate;
  status: "done" | "current" | "future";
  pct: number;
}) {
  const done = status === "done" || pct === 100;
  return (
    <span
      className={cn(
        "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-mono",
        done
          ? "border-chart-2 bg-chart-2 text-background"
          : status === "current"
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-background text-muted-foreground"
      )}
    >
      {done ? <CheckCircle2 className="h-4 w-4" /> : week.number}
    </span>
  );
}
