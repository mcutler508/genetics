"use client";

import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { HABITS, type HabitId, isoDate } from "@/lib/tracker-data";
import { useTracker } from "@/lib/use-tracker";

type Props = {
  /** ISO date to check in for. Defaults to today. */
  date?: string;
};

export function DailyCheckin({ date }: Props) {
  const dateISO = date ?? isoDate();
  const { hydrated, getDay, toggleHabit, dayCompletePct } = useTracker();
  const entry = getDay(dateISO);
  const pct = dayCompletePct(dateISO);
  const isToday = dateISO === isoDate();

  return (
    <Card className="overflow-hidden">
      <CardContent className="py-6">
        <div className="mb-5 flex items-baseline justify-between">
          <div>
            <p className="editorial-eyebrow text-muted-foreground">
              {isToday ? "Today's check-in" : "Check-in"}
            </p>
            <p className="editorial-title mt-1 text-2xl text-foreground">
              {formatDate(dateISO)}
            </p>
          </div>
          <div className="text-right">
            <p className="editorial-title text-3xl text-foreground">
              {hydrated ? pct : 0}
              <span className="text-base text-muted-foreground">%</span>
            </p>
            <p className="text-xs text-muted-foreground">
              {hydrated
                ? `${HABITS.filter((h) => entry[h.id]).length} of ${HABITS.length} habits`
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
      </CardContent>
    </Card>
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
          ? "border-primary/30 bg-primary/5"
          : "border-border bg-background hover:border-primary/30 hover:bg-muted/40"
      )}
    >
      <span
        className={cn(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors",
          on
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-background group-hover:border-primary/60"
        )}
      >
        {on && <Check className="h-3 w-3" strokeWidth={3} />}
      </span>
      <span className="flex-1">
        <span
          className={cn(
            "block text-sm font-medium",
            on ? "text-foreground" : "text-foreground"
          )}
        >
          {label}
        </span>
        <span className="mt-0.5 block text-xs text-muted-foreground">
          {detail}
        </span>
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
