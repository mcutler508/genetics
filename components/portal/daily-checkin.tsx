"use client";

import { Check } from "lucide-react";
import { VellumCard } from "@/components/ds/card";
import { Kicker } from "@/components/ds/kicker";
import { cn } from "@/lib/utils";
import { HABITS, isoDate } from "@/lib/tracker-data";
import { useTracker } from "@/lib/use-tracker";

type Props = {
  date?: string;
};

export function DailyCheckin({ date }: Props) {
  const dateISO = date ?? isoDate();
  const { hydrated, getDay, toggleHabit, dayCompletePct } = useTracker();
  const entry = getDay(dateISO);
  const pct = dayCompletePct(dateISO);
  const isToday = dateISO === isoDate();

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
        </div>
      </div>

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
