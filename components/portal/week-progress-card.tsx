"use client";

import { ChevronRight, Sparkles } from "lucide-react";
import { VellumCard } from "@/components/ds/card";
import { Kicker } from "@/components/ds/kicker";
import { cn } from "@/lib/utils";
import {
  HABITS,
  derivedTaskProgress,
  isTaskComplete,
  isoDate,
  weekDates,
  type WeekTemplate,
} from "@/lib/tracker-data";
import { useTracker } from "@/lib/use-tracker";

type Props = {
  week: WeekTemplate;
  cycleStartDate: string;
  onOpenWeek: () => void;
};

export function WeekProgressCard({ week, cycleStartDate, onOpenWeek }: Props) {
  const { hydrated, state } = useTracker();

  const today = isoDate();
  const dates = weekDates(cycleStartDate, week.number);
  const elapsedDates = dates.filter((d) => d <= today);

  let checked = 0;
  for (const d of elapsedDates) {
    const day = state.dailyEntries[d] ?? {};
    checked += HABITS.filter((h) => day[h.id]).length;
  }
  const wtdPct = elapsedDates.length
    ? Math.round((checked / (HABITS.length * elapsedDates.length)) * 100)
    : 0;

  const derivedTasks = week.tasks.filter((t) => t.derived);
  const manualTasks = week.tasks.filter((t) => !t.derived);
  const nextManual = manualTasks.find(
    (t) => !isTaskComplete(t, week.number, cycleStartDate, state)
  );

  return (
    <VellumCard>
      <Kicker tone="accent">This week</Kicker>
      <p className="ds-title-2 mt-2 text-ink">{week.theme}</p>
      <p className="kicker mt-1 text-ink-faint">
        Week {week.number} · {week.focus}
      </p>

      {/* Week-to-date adherence */}
      <div className="mt-5 border-t border-rule pt-4">
        <div className="flex items-baseline justify-between gap-3">
          <Kicker tone="accent">Week-to-date</Kicker>
          <span className="kicker text-ink-faint">
            day {elapsedDates.length || "–"} of 7
          </span>
        </div>
        <p className="ds-numeric-L text-ink mt-1">
          {hydrated ? wtdPct : 0}
          <span className="ds-data text-ink-muted ml-1">%</span>
        </p>
        <p className="kicker text-ink-faint mt-0.5">
          Habit adherence so far
        </p>
      </div>

      {/* Derived goal progress */}
      {derivedTasks.length > 0 && (
        <div className="mt-5 border-t border-rule pt-4">
          <div className="flex items-center gap-1.5">
            <Kicker tone="accent">Goals this week</Kicker>
            <Sparkles
              className="h-2.5 w-2.5 text-ink-faint"
              aria-label="Auto-tracked from daily check-ins"
            />
          </div>
          <ul className="mt-3 space-y-2.5">
            {derivedTasks.map((t) => {
              const prog = derivedTaskProgress(
                t,
                week.number,
                cycleStartDate,
                state.dailyEntries
              );
              if (!prog) return null;
              const pct = Math.min(
                100,
                Math.round((prog.hit / prog.threshold) * 100)
              );
              const hit = prog.hit >= prog.threshold;
              const habitDef = HABITS.find((h) => h.id === t.derived!.habitId);
              return (
                <li key={t.id}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-xs text-ink truncate">
                      {habitDef?.short ?? t.label}
                    </span>
                    <span
                      className={cn(
                        "ds-data text-[11px] tabular-nums shrink-0",
                        hit ? "text-mark-forest" : "text-ink-muted"
                      )}
                    >
                      {hydrated ? prog.hit : 0}/{prog.threshold}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-vellum-shaded">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        hit ? "bg-mark-forest" : "bg-[var(--ds-accent)]"
                      )}
                      style={{ width: hydrated ? `${pct}%` : "0%" }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Manual outstanding task CTA */}
      {hydrated && nextManual && (
        <button
          type="button"
          onClick={onOpenWeek}
          className="mt-5 flex w-full items-center justify-between gap-2 rounded-lg border border-rule px-3 py-2.5 text-left transition-colors hover:border-[color:color-mix(in_oklch,var(--ds-accent)_40%,transparent)] hover:bg-canvas-deep/40"
        >
          <div className="min-w-0">
            <span className="kicker text-ink-faint">Outstanding task</span>
            <p className="mt-0.5 text-xs text-ink truncate">
              {nextManual.label}
            </p>
          </div>
          <ChevronRight className="h-4 w-4 shrink-0 text-ink-faint" />
        </button>
      )}

      <button
        type="button"
        onClick={onOpenWeek}
        className="mt-4 text-xs font-medium text-mark-ink hover:underline"
      >
        Open weekly view →
      </button>
    </VellumCard>
  );
}
