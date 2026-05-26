"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { VellumCard } from "@/components/ds/card";
import { Kicker } from "@/components/ds/kicker";
import { cn } from "@/lib/utils";
import { HABITS, isoDate, weekDates } from "@/lib/tracker-data";
import { useTracker } from "@/lib/use-tracker";

type Props = {
  date?: string;
  /** Optional: enables a day-of-week scrubber across the week's 7 dates. */
  cycleStartDate?: string;
  weekNumber?: number;
};

export function DailyCheckin({ date, cycleStartDate, weekNumber }: Props) {
  const todayISO = isoDate();
  const [selectedDate, setSelectedDate] = useState(date ?? todayISO);
  const dateISO = selectedDate;
  const { hydrated, getDay, toggleHabit, setAllHabits, dayCompletePct } =
    useTracker();
  const entry = getDay(dateISO);
  const pct = dayCompletePct(dateISO);
  const isToday = dateISO === todayISO;
  const allDone = HABITS.every((h) => entry[h.id]);

  const chipDates =
    cycleStartDate && weekNumber
      ? weekDates(cycleStartDate, weekNumber)
      : null;

  return (
    <VellumCard>
      <div className="mb-6 flex items-baseline justify-between">
        <div>
          <Kicker tone="accent">
            {isToday ? "Today's check-in" : "Check-in"}
          </Kicker>
          <p className="ds-title-2 mt-2 text-ink">{formatDate(dateISO)}</p>
        </div>
        <div className="text-right">
          <p className="ds-numeric-L text-ink">
            {hydrated ? pct : 0}
            <span className="ds-data text-ink-muted ml-1">%</span>
          </p>
          <p className="kicker mt-1 text-ink-faint">
            {hydrated
              ? `${HABITS.filter((h) => entry[h.id]).length} of ${HABITS.length}`
              : "—"}
          </p>
          <button
            type="button"
            onClick={() => setAllHabits(dateISO, !allDone)}
            disabled={!hydrated}
            className="mt-2 text-xs font-medium text-mark-ink hover:underline disabled:cursor-not-allowed disabled:opacity-50"
          >
            {allDone ? "Clear all" : "Mark all done"}
          </button>
        </div>
      </div>

      {chipDates && (
        <div className="mb-5 flex flex-wrap gap-1.5">
          {chipDates.map((d) => {
            const isFuture = d > todayISO;
            const isSelected = d === dateISO;
            const isTodayChip = d === todayISO;
            const dayPct = hydrated ? dayCompletePct(d) : 0;
            return (
              <button
                key={d}
                type="button"
                disabled={isFuture}
                onClick={() => setSelectedDate(d)}
                className={cn(
                  "flex min-w-[44px] flex-col items-center gap-0.5 rounded-md border px-2 py-1.5 transition-colors",
                  "disabled:cursor-not-allowed disabled:opacity-40",
                  isSelected
                    ? "border-[color:color-mix(in_oklch,var(--ds-accent)_50%,transparent)] bg-[color:color-mix(in_oklch,var(--ds-accent)_8%,transparent)]"
                    : "border-rule bg-vellum hover:border-[color:color-mix(in_oklch,var(--ds-accent)_30%,transparent)] hover:bg-canvas-deep/40"
                )}
                aria-label={`Check-in for ${d}${isFuture ? " (future)" : ""}`}
              >
                <span
                  className={cn(
                    "kicker",
                    isTodayChip ? "text-mark-ink" : "text-ink-faint"
                  )}
                >
                  {chipLabel(d)}
                </span>
                <span className="ds-data text-[11px] text-ink tabular-nums">
                  {new Date(d + "T00:00:00").getDate()}
                </span>
                {!isFuture && (
                  <span
                    className={cn(
                      "h-0.5 w-full rounded-full",
                      dayPct === 100
                        ? "bg-mark-forest"
                        : dayPct > 0
                          ? "bg-[var(--ds-accent)]"
                          : "bg-rule"
                    )}
                    style={{
                      opacity: dayPct === 100 ? 1 : dayPct > 0 ? 0.5 + dayPct / 200 : 1,
                    }}
                    aria-hidden
                  />
                )}
              </button>
            );
          })}
        </div>
      )}

      <div className="grid gap-2 md:grid-cols-2">
        {HABITS.map((h) => {
          const on = !!entry[h.id];
          return (
            <HabitToggle
              key={h.id}
              label={h.label}
              detail={h.detail}
              on={on}
              onToggle={() => toggleHabit(dateISO, h.id)}
              disabled={!hydrated}
            />
          );
        })}
      </div>
    </VellumCard>
  );
}

function HabitToggle({
  label,
  detail,
  on,
  onToggle,
  disabled,
}: {
  label: string;
  detail: string;
  on: boolean;
  onToggle: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      className={cn(
        "group flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-all",
        "disabled:cursor-not-allowed disabled:opacity-50",
        on
          ? "border-[color:color-mix(in_oklch,var(--ds-accent)_30%,transparent)] bg-[color:color-mix(in_oklch,var(--ds-accent)_5%,transparent)]"
          : "border-rule bg-vellum hover:border-[color:color-mix(in_oklch,var(--ds-accent)_30%,transparent)] hover:bg-canvas-deep/40"
      )}
    >
      <span
        className={cn(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors",
          on
            ? "border-[var(--ds-accent)] bg-[var(--ds-accent)] text-[var(--ds-vellum)]"
            : "border-rule bg-vellum group-hover:border-[color:color-mix(in_oklch,var(--ds-accent)_60%,transparent)]"
        )}
      >
        {on && <Check className="h-3 w-3" strokeWidth={3} />}
      </span>
      <span className="flex-1">
        <span className="block text-sm font-medium text-ink">{label}</span>
        <span className="mt-0.5 block text-xs text-ink-muted">{detail}</span>
      </span>
    </button>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function chipLabel(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, { weekday: "short" }).slice(0, 3);
}
