"use client";

import { Flag } from "lucide-react";
import { VellumCard } from "@/components/ds/card";
import { Kicker } from "@/components/ds/kicker";
import { cn } from "@/lib/utils";
import {
  WEEKS,
  PHASES,
  isTaskComplete,
  type CyclePhase,
} from "@/lib/tracker-data";
import { useTracker } from "@/lib/use-tracker";

const TONE_STYLES: Record<CyclePhase["tone"], { bar: string; rail: string; text: string }> = {
  accent: {
    bar: "bg-[color:color-mix(in_oklch,var(--ds-accent)_55%,transparent)]",
    rail: "bg-[color:color-mix(in_oklch,var(--ds-accent)_18%,transparent)]",
    text: "text-ink",
  },
  forest: {
    bar: "bg-[color:color-mix(in_oklch,var(--ds-mark-forest)_60%,transparent)]",
    rail: "bg-[color:color-mix(in_oklch,var(--ds-mark-forest)_15%,transparent)]",
    text: "text-ink",
  },
  clay: {
    bar: "bg-[color:color-mix(in_oklch,var(--ds-mark-clay)_55%,transparent)]",
    rail: "bg-[color:color-mix(in_oklch,var(--ds-mark-clay)_15%,transparent)]",
    text: "text-ink",
  },
  indigo: {
    bar: "bg-[color:color-mix(in_oklch,var(--ds-mark-ink)_45%,transparent)]",
    rail: "bg-[color:color-mix(in_oklch,var(--ds-mark-ink)_12%,transparent)]",
    text: "text-ink",
  },
  muted: {
    bar: "bg-[color:color-mix(in_oklch,var(--ds-ink-faint)_45%,transparent)]",
    rail: "bg-[color:color-mix(in_oklch,var(--ds-ink-faint)_15%,transparent)]",
    text: "text-ink",
  },
};

function addDays(iso: string, days: number): Date {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d;
}

function shortDate(d: Date): string {
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

type Props = {
  cycleStartDate: string;
  currentWeek: number;
  activeWeek: number;
  onSelect: (week: number) => void;
};

export function WeekGantt({
  cycleStartDate,
  currentWeek,
  activeWeek,
  onSelect,
}: Props) {
  const { state, hydrated } = useTracker();

  const todayMs = Date.now();
  const cycleStartMs = new Date(cycleStartDate + "T00:00:00").getTime();
  const dayInCycle = Math.max(0, Math.floor((todayMs - cycleStartMs) / 86_400_000));
  const totalDays = 12 * 7;
  const todayPct = Math.min(100, Math.max(0, (dayInCycle / totalDays) * 100));

  return (
    <VellumCard>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Kicker tone="accent">Cycle timeline</Kicker>
          <p className="ds-title-2 mt-2 text-ink">Phases at a glance</p>
          <p className="kicker mt-1 text-ink-faint">
            Each bar is a focus phase. Click a week to load its detail below.
          </p>
        </div>
        <div className="flex items-center gap-4 kicker text-ink-faint">
          <LegendDot label="Phase" tone="accent" />
          <LegendDot label="Current week" tone="current" />
          <LegendDot label="Milestone" tone="flag" />
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <div className="min-w-[640px]">
          {/* Week header */}
          <div className="grid grid-cols-12 gap-px">
            {WEEKS.map((w) => {
              const start = addDays(cycleStartDate, (w.number - 1) * 7);
              const isCurrent = w.number === currentWeek;
              const isActive = w.number === activeWeek;
              return (
                <button
                  key={w.number}
                  type="button"
                  onClick={() => onSelect(w.number)}
                  className={cn(
                    "group flex flex-col items-center gap-0.5 rounded-md border px-1 py-1.5 text-center transition-colors",
                    isActive
                      ? "border-[color:color-mix(in_oklch,var(--ds-accent)_50%,transparent)] bg-[color:color-mix(in_oklch,var(--ds-accent)_8%,transparent)]"
                      : "border-transparent hover:border-rule hover:bg-canvas-deep/40"
                  )}
                >
                  <span
                    className={cn(
                      "kicker",
                      isCurrent ? "text-mark-ink" : "text-ink-faint"
                    )}
                  >
                    W{w.number}
                  </span>
                  <span className="text-[10px] tabular-nums text-ink-faint">
                    {shortDate(start)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Phase rows */}
          <div className="relative mt-3 space-y-2.5">
            {/* Today vertical line */}
            <div
              className="pointer-events-none absolute top-0 bottom-0 z-10 w-px"
              style={{
                left: `${todayPct}%`,
                background:
                  "linear-gradient(to bottom, color-mix(in oklch, var(--ds-accent) 65%, transparent), color-mix(in oklch, var(--ds-accent) 25%, transparent))",
              }}
              aria-hidden
            >
              <span
                className="absolute -top-1.5 -translate-x-1/2 rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[var(--ds-vellum)]"
                style={{ backgroundColor: "var(--ds-accent)" }}
              >
                Today
              </span>
            </div>

            {PHASES.map((phase) => {
              const styles = TONE_STYLES[phase.tone];
              const span = phase.endWeek - phase.startWeek + 1;
              // Compute aggregate adherence for the phase's weeks
              const phaseWeeks = WEEKS.filter(
                (w) => w.number >= phase.startWeek && w.number <= phase.endWeek
              );
              const totalTasks = phaseWeeks.reduce(
                (acc, w) => acc + w.tasks.length,
                0
              );
              const doneTasks = phaseWeeks.reduce((acc, w) => {
                return (
                  acc +
                  w.tasks.filter((t) =>
                    isTaskComplete(t, w.number, cycleStartDate, state)
                  ).length
                );
              }, 0);
              const pct = totalTasks
                ? Math.round((doneTasks / totalTasks) * 100)
                : 0;

              return (
                <div key={phase.id} className="grid grid-cols-12 gap-px">
                  {/* Rail (full row) */}
                  <div
                    className={cn(
                      "col-span-12 relative h-9 rounded-md",
                      styles.rail
                    )}
                  >
                    {/* Phase bar */}
                    <button
                      type="button"
                      onClick={() => onSelect(phase.startWeek)}
                      className={cn(
                        "absolute inset-y-0 flex items-center gap-2 rounded-md px-3 text-left transition-transform hover:translate-y-[-1px]",
                        styles.bar,
                        styles.text
                      )}
                      style={{
                        left: `${((phase.startWeek - 1) / 12) * 100}%`,
                        width: `${(span / 12) * 100}%`,
                      }}
                      aria-label={`${phase.label}, weeks ${phase.startWeek} to ${phase.endWeek}`}
                    >
                      <span className="truncate text-xs font-medium">
                        {phase.label}
                      </span>
                      {hydrated && pct > 0 && (
                        <span className="ds-data text-[10px] text-ink-muted">
                          {pct}%
                        </span>
                      )}
                    </button>

                    {/* Milestone flags */}
                    {phaseWeeks.map((w) =>
                      w.milestone ? (
                        <span
                          key={w.number}
                          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                          style={{
                            left: `${((w.number - 0.5) / 12) * 100}%`,
                          }}
                          aria-label={`Milestone: week ${w.number}`}
                        >
                          <Flag className="h-3 w-3 text-mark-clay drop-shadow-sm" />
                        </span>
                      ) : null
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer: cycle endpoints */}
          <div className="mt-3 flex items-center justify-between kicker text-ink-faint">
            <span>{shortDate(addDays(cycleStartDate, 0))} · Week 1</span>
            <span>Week 12 · {shortDate(addDays(cycleStartDate, 12 * 7 - 1))}</span>
          </div>
        </div>
      </div>
    </VellumCard>
  );
}

function LegendDot({
  label,
  tone,
}: {
  label: string;
  tone: "accent" | "current" | "flag";
}) {
  if (tone === "flag") {
    return (
      <span className="inline-flex items-center gap-1.5">
        <Flag className="h-3 w-3 text-mark-clay" />
        {label}
      </span>
    );
  }
  if (tone === "current") {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: "var(--ds-accent)" }}
        />
        {label}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-2 w-4 rounded-sm bg-[color:color-mix(in_oklch,var(--ds-accent)_55%,transparent)]" />
      {label}
    </span>
  );
}
