"use client";

import { CheckCircle2, Flag } from "lucide-react";
import { VellumCard } from "@/components/ds/card";
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
    <VellumCard padded={false}>
      <div className="space-y-0.5 py-3 px-3">
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
                "group relative flex w-full items-start gap-4 rounded-lg border px-3 py-3 text-left transition-all",
                isActive
                  ? "border-[color:color-mix(in_oklch,var(--ds-accent)_40%,transparent)] bg-[color:color-mix(in_oklch,var(--ds-accent)_5%,transparent)]"
                  : "border-transparent hover:border-rule hover:bg-canvas-deep/40"
              )}
            >
              {isActive && (
                <span
                  className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full"
                  style={{ backgroundColor: "var(--ds-accent)" }}
                  aria-hidden
                />
              )}
              <WeekIcon week={w} status={status} pct={hydrated ? pct : 0} />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="kicker text-ink-faint">
                    Week {w.number}
                  </span>
                  {status === "current" && (
                    <span
                      className="inline-flex items-center rounded-sm px-1.5 py-0.5 kicker"
                      style={{
                        backgroundColor: "var(--ds-accent)",
                        color: "var(--ds-vellum)",
                      }}
                    >
                      Current
                    </span>
                  )}
                  {w.milestone && <Flag className="h-3 w-3 text-mark-clay" />}
                </div>
                <p className="ds-title-2 mt-1 text-base leading-tight text-ink">
                  {w.theme}
                </p>
                <p className="kicker mt-1 text-ink-faint">{w.focus}</p>
                {hydrated && pct > 0 && (
                  <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-vellum-shaded">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        status === "done"
                          ? "bg-mark-forest"
                          : "bg-[var(--ds-accent)]"
                      )}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </VellumCard>
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
        "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ds-data",
        done
          ? "border-[var(--ds-mark-forest)] bg-[var(--ds-mark-forest)] text-[var(--ds-vellum)]"
          : status === "current"
            ? "border-[var(--ds-accent)] bg-[var(--ds-accent)] text-[var(--ds-vellum)]"
            : "border-rule bg-vellum text-ink-faint"
      )}
    >
      {done ? <CheckCircle2 className="h-4 w-4" /> : week.number}
    </span>
  );
}
