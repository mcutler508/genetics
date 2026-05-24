"use client";

import { Check, Flag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  HABITS,
  lastNDates,
  type WeekTemplate,
} from "@/lib/tracker-data";
import { useTracker } from "@/lib/use-tracker";

type Props = {
  week: WeekTemplate;
  isCurrent: boolean;
};

const MILESTONE_LABEL: Record<NonNullable<WeekTemplate["milestone"]>, string> = {
  midpoint: "Midpoint review",
  retest_planning: "Retest planning",
  recheck: "Recheck week",
};

export function WeekDetail({ week, isCurrent }: Props) {
  const { hydrated, state, toggleTask, setWeekNote, getDay } = useTracker();
  const taskState = state.weekTasks[week.number] ?? {};
  const noteValue = state.weekNotes[week.number] ?? "";
  const completedTasks = week.tasks.filter((t) => taskState[t.id]).length;
  const taskPct = Math.round((completedTasks / week.tasks.length) * 100);

  const last7 = lastNDates(7);

  return (
    <div className="space-y-5">
      {/* Header */}
      <Card>
        <CardContent className="py-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="editorial-eyebrow text-muted-foreground">
                  Week {week.number} of 12
                </span>
                {isCurrent && (
                  <span className="inline-flex items-center rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary-foreground">
                    Current
                  </span>
                )}
                {week.milestone && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-chart-4/40 bg-chart-4/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-chart-5">
                    <Flag className="h-3 w-3" />
                    {MILESTONE_LABEL[week.milestone]}
                  </span>
                )}
              </div>
              <h2 className="editorial-title text-3xl text-foreground md:text-4xl">
                {week.theme}
              </h2>
              <p className="text-sm text-muted-foreground">{week.focus}</p>
            </div>
            <div className="text-right">
              <p className="editorial-title text-3xl text-foreground">
                {hydrated ? taskPct : 0}
                <span className="text-base text-muted-foreground">%</span>
              </p>
              <p className="text-xs text-muted-foreground">
                {hydrated
                  ? `${completedTasks} of ${week.tasks.length} tasks`
                  : "—"}
              </p>
            </div>
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground">
            {week.description}
          </p>
        </CardContent>
      </Card>

      {/* Tasks + heatmap row */}
      <div className="grid gap-5 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader className="pb-3">
            <CardTitle className="editorial-title text-lg">
              This week's tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {week.tasks.map((t) => {
                const on = !!taskState[t.id];
                return (
                  <li key={t.id}>
                    <button
                      type="button"
                      onClick={() => toggleTask(week.number, t.id)}
                      disabled={!hydrated}
                      className={cn(
                        "group flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-all",
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
                      <span
                        className={cn(
                          "text-sm leading-relaxed",
                          on
                            ? "text-muted-foreground line-through"
                            : "text-foreground"
                        )}
                      >
                        {t.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="editorial-title text-lg">
              Last 7 days
            </CardTitle>
          </CardHeader>
          <CardContent>
            {hydrated ? (
              <div className="space-y-2">
                <div className="grid grid-cols-[88px_repeat(7,minmax(0,1fr))] items-center gap-1.5">
                  <div />
                  {last7.map((d) => (
                    <div
                      key={d}
                      className="text-center text-[10px] font-mono uppercase tracking-wider text-muted-foreground"
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
                    <span className="truncate text-xs text-foreground">
                      {h.short}
                    </span>
                    {last7.map((d) => {
                      const on = !!getDay(d)[h.id];
                      return (
                        <span
                          key={d}
                          className={cn(
                            "h-5 rounded-sm border",
                            on
                              ? "border-primary/40 bg-primary"
                              : "border-border bg-muted/40"
                          )}
                          title={`${h.label} — ${d} — ${on ? "yes" : "no"}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">
                Loading adherence data…
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Notes */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="editorial-title text-lg">
            Notes &amp; barriers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            value={noteValue}
            onChange={(e) => setWeekNote(week.number, e.target.value)}
            placeholder="What's working? What got in the way? Bring this to your next provider or coach check-in."
            rows={4}
            className="w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            disabled={!hydrated}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function dayLabel(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, { weekday: "short" }).slice(0, 1);
}
