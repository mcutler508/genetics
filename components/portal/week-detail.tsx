"use client";

import { Check, Flag, Sparkles } from "lucide-react";
import { VellumCard } from "@/components/ds/card";
import { Kicker } from "@/components/ds/kicker";
import { cn } from "@/lib/utils";
import {
  HABITS,
  derivedTaskProgress,
  isTaskComplete,
  lastNDates,
  type WeekTemplate,
} from "@/lib/tracker-data";
import { useTracker } from "@/lib/use-tracker";

type Props = {
  week: WeekTemplate;
  isCurrent: boolean;
  cycleStartDate: string;
};

const MILESTONE_LABEL: Record<NonNullable<WeekTemplate["milestone"]>, string> = {
  midpoint: "Midpoint review",
  retest_planning: "Retest planning",
  recheck: "Recheck week",
};

export function WeekDetail({ week, isCurrent, cycleStartDate }: Props) {
  const { hydrated, state, toggleTask, setWeekNote, getDay } = useTracker();
  const noteValue = state.weekNotes[week.number] ?? "";
  const completedTasks = week.tasks.filter((t) =>
    isTaskComplete(t, week.number, cycleStartDate, state)
  ).length;
  const taskPct = Math.round((completedTasks / week.tasks.length) * 100);

  const last7 = lastNDates(7);

  return (
    <div className="space-y-5">
      {/* Header */}
      <VellumCard>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Kicker tone="accent">Week {week.number} of 12</Kicker>
              {isCurrent && (
                <span
                  className="inline-flex items-center rounded-sm px-2 py-0.5 kicker"
                  style={{
                    backgroundColor: "var(--ds-accent)",
                    color: "var(--ds-vellum)",
                  }}
                >
                  Current
                </span>
              )}
              {week.milestone && (
                <span className="inline-flex items-center gap-1 rounded-sm border border-[color:color-mix(in_oklch,var(--ds-mark-clay)_30%,transparent)] bg-[color:color-mix(in_oklch,var(--ds-mark-clay)_12%,transparent)] px-2 py-0.5 kicker text-mark-clay">
                  <Flag className="h-3 w-3" />
                  {MILESTONE_LABEL[week.milestone]}
                </span>
              )}
            </div>
            <h2 className="ds-title-1 text-ink">{week.theme}</h2>
            <p className="text-sm text-ink-muted">{week.focus}</p>
          </div>
          <div className="text-right">
            <p className="ds-numeric-L text-ink">
              {hydrated ? taskPct : 0}
              <span className="ds-data text-ink-muted ml-1">%</span>
            </p>
            <p className="kicker mt-1 text-ink-faint">
              {hydrated
                ? `${completedTasks} of ${week.tasks.length} tasks`
                : "—"}
            </p>
          </div>
        </div>
        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-ink">
          {week.description}
        </p>
      </VellumCard>

      {/* Tasks + heatmap */}
      <div className="grid gap-5 lg:grid-cols-5">
        <VellumCard className="lg:col-span-3">
          <Kicker tone="accent">This week's tasks</Kicker>
          <ul className="mt-4 space-y-2">
            {week.tasks.map((t) => {
              const complete = hydrated
                ? isTaskComplete(t, week.number, cycleStartDate, state)
                : false;
              const progress = t.derived
                ? derivedTaskProgress(
                    t,
                    week.number,
                    cycleStartDate,
                    state.dailyEntries
                  )
                : null;

              if (t.derived && progress) {
                const pct = Math.min(
                  100,
                  Math.round((progress.hit / progress.threshold) * 100)
                );
                return (
                  <li key={t.id}>
                    <div
                      className={cn(
                        "flex w-full items-start gap-3 rounded-lg border p-3 text-left",
                        complete
                          ? "border-[color:color-mix(in_oklch,var(--ds-mark-forest)_30%,transparent)] bg-[color:color-mix(in_oklch,var(--ds-mark-forest)_6%,transparent)]"
                          : "border-rule bg-vellum"
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border",
                          complete
                            ? "border-[var(--ds-mark-forest)] bg-[var(--ds-mark-forest)] text-[var(--ds-vellum)]"
                            : "border-rule bg-vellum text-ink-faint"
                        )}
                      >
                        {complete && (
                          <Check className="h-3 w-3" strokeWidth={3} />
                        )}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={cn(
                              "text-sm leading-relaxed",
                              complete ? "text-ink-muted" : "text-ink"
                            )}
                          >
                            {t.label}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-sm border border-rule bg-canvas-deep/40 px-1.5 py-0.5 kicker text-ink-faint">
                            <Sparkles className="h-2.5 w-2.5" />
                            Auto-tracked
                          </span>
                        </div>
                        <div className="mt-2 flex items-center gap-3">
                          <div className="h-1 flex-1 overflow-hidden rounded-full bg-vellum-shaded">
                            <div
                              className={cn(
                                "h-full rounded-full transition-all",
                                complete
                                  ? "bg-mark-forest"
                                  : "bg-[var(--ds-accent)]"
                              )}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="ds-data text-[11px] text-ink-muted tabular-nums shrink-0">
                            {progress.hit} of {progress.threshold} days
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              }

              return (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => toggleTask(week.number, t.id)}
                    disabled={!hydrated}
                    className={cn(
                      "group flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-all",
                      "disabled:cursor-not-allowed disabled:opacity-50",
                      complete
                        ? "border-[color:color-mix(in_oklch,var(--ds-accent)_30%,transparent)] bg-[color:color-mix(in_oklch,var(--ds-accent)_5%,transparent)]"
                        : "border-rule bg-vellum hover:border-[color:color-mix(in_oklch,var(--ds-accent)_30%,transparent)] hover:bg-canvas-deep/40"
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                        complete
                          ? "border-[var(--ds-accent)] bg-[var(--ds-accent)] text-[var(--ds-vellum)]"
                          : "border-rule bg-vellum group-hover:border-[color:color-mix(in_oklch,var(--ds-accent)_60%,transparent)]"
                      )}
                    >
                      {complete && (
                        <Check className="h-3 w-3" strokeWidth={3} />
                      )}
                    </span>
                    <span
                      className={cn(
                        "text-sm leading-relaxed",
                        complete ? "text-ink-muted line-through" : "text-ink"
                      )}
                    >
                      {t.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </VellumCard>

        <VellumCard className="lg:col-span-2">
          <Kicker tone="accent">Last 7 days</Kicker>
          {hydrated ? (
            <div className="mt-4 space-y-2">
              <div className="grid grid-cols-[88px_repeat(7,minmax(0,1fr))] items-center gap-1.5">
                <div />
                {last7.map((d) => (
                  <div
                    key={d}
                    className="text-center kicker text-ink-faint"
                  >
                    {dayLabel(d)}
                  </div>
                ))}
              </div>
              {HABITS.map((h) => (
                <div
                  key={h.id}
                  className="grid grid-cols-[88px_repeat(7,minmax(0,1fr))] items-center gap-1.5"
                >
                  <span className="truncate text-xs text-ink">{h.short}</span>
                  {last7.map((d) => {
                    const on = !!getDay(d)[h.id];
                    return (
                      <span
                        key={d}
                        className={cn(
                          "h-5 rounded-sm",
                          on
                            ? "bg-[var(--ds-accent)]"
                            : "bg-[color:color-mix(in_oklch,var(--ds-rule)_50%,transparent)]"
                        )}
                        title={`${h.label} — ${d} — ${on ? "yes" : "no"}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-xs text-ink-muted">
              Loading adherence data…
            </p>
          )}
        </VellumCard>
      </div>

      {/* Notes */}
      <VellumCard>
        <Kicker tone="accent">Notes &amp; barriers</Kicker>
        <textarea
          value={noteValue}
          onChange={(e) => setWeekNote(week.number, e.target.value)}
          placeholder="What's working? What got in the way? Bring this to your next provider or coach check-in."
          rows={4}
          className="mt-4 w-full resize-y rounded-lg border border-rule bg-vellum px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-[var(--ds-accent-soft)]"
          disabled={!hydrated}
        />
      </VellumCard>
    </div>
  );
}

function dayLabel(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, { weekday: "short" }).slice(0, 1);
}
