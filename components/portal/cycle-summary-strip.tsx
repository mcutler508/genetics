"use client";

import { VellumCard } from "@/components/ds/card";
import { Kicker } from "@/components/ds/kicker";
import {
  HABITS,
  PHASES,
  isoDate,
  type CyclePhase,
} from "@/lib/tracker-data";
import { useTracker } from "@/lib/use-tracker";

type Props = {
  cycleStartDate: string;
  cycleEndDate: string;
  currentWeek: number;
};

const TOTAL_DAYS = 12 * 7;

export function CycleSummaryStrip({
  cycleStartDate,
  cycleEndDate,
  currentWeek,
}: Props) {
  const { state, hydrated } = useTracker();

  const todayMs = Date.now();
  const startMs = new Date(cycleStartDate + "T00:00:00").getTime();
  const dayInCycle = Math.min(
    TOTAL_DAYS,
    Math.max(1, Math.floor((todayMs - startMs) / 86_400_000) + 1)
  );
  const daysRemaining = Math.max(0, TOTAL_DAYS - dayInCycle);

  // Cycle-to-date adherence: habits checked / (HABITS.length * elapsed days)
  const todayISO = isoDate();
  const startISO = cycleStartDate;
  let checked = 0;
  for (const [date, day] of Object.entries(state.dailyEntries)) {
    if (date < startISO || date > todayISO) continue;
    checked += HABITS.filter((h) => day[h.id]).length;
  }
  const adherencePct = dayInCycle
    ? Math.round((checked / (HABITS.length * dayInCycle)) * 100)
    : 0;

  // Active phase(s) — overlapping phases that contain the current week
  const activePhases: CyclePhase[] = PHASES.filter(
    (p) => currentWeek >= p.startWeek && currentWeek <= p.endWeek
  );
  const primaryPhase = activePhases[activePhases.length - 1] ?? null;
  const phaseDaysRemaining = primaryPhase
    ? Math.max(0, (primaryPhase.endWeek - currentWeek + 1) * 7 - (dayInCycle - (currentWeek - 1) * 7))
    : 0;

  return (
    <VellumCard>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryStat
          kicker="Cycle progress"
          value={hydrated ? `${dayInCycle}` : "—"}
          suffix={`of ${TOTAL_DAYS} days`}
          caption={
            hydrated
              ? `${daysRemaining} day${daysRemaining === 1 ? "" : "s"} to recheck`
              : cycleEndDate
          }
        />
        <SummaryStat
          kicker="Current week"
          value={hydrated ? `${currentWeek}` : "—"}
          suffix="of 12"
          caption={
            primaryPhase ? `Phase: ${primaryPhase.label}` : "Between phases"
          }
        />
        <SummaryStat
          kicker="Adherence to date"
          value={hydrated ? `${adherencePct}` : "—"}
          suffix="%"
          caption="Mean across elapsed days"
        />
        <SummaryStat
          kicker="This phase"
          value={
            hydrated && primaryPhase
              ? `${phaseDaysRemaining}`
              : "—"
          }
          suffix={
            hydrated && primaryPhase
              ? `day${phaseDaysRemaining === 1 ? "" : "s"} left`
              : ""
          }
          caption={
            activePhases.length > 1
              ? `Also active: ${activePhases
                  .filter((p) => p.id !== primaryPhase?.id)
                  .map((p) => p.label)
                  .join(" · ")}`
              : primaryPhase
                ? `Through week ${primaryPhase.endWeek}`
                : ""
          }
        />
      </div>
    </VellumCard>
  );
}

function SummaryStat({
  kicker,
  value,
  suffix,
  caption,
}: {
  kicker: string;
  value: string;
  suffix: string;
  caption: string;
}) {
  return (
    <div>
      <Kicker tone="accent">{kicker}</Kicker>
      <p className="ds-numeric-L text-ink mt-1.5">
        {value}
        {suffix && (
          <span className="ds-data text-ink-muted ml-1.5 text-sm">
            {suffix}
          </span>
        )}
      </p>
      {caption && (
        <p className="kicker mt-1 text-ink-faint">{caption}</p>
      )}
    </div>
  );
}
