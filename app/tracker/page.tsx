"use client";

import { useState } from "react";
import { PageHeader } from "@/components/portal/page-header";
import { Disclaimer } from "@/components/portal/disclaimer";
import { DailyCheckin } from "@/components/portal/daily-checkin";
import { WeekDetail } from "@/components/portal/week-detail";
import { WeekGantt } from "@/components/portal/week-gantt";
import { WeekProgressCard } from "@/components/portal/week-progress-card";
import { CycleSummaryStrip } from "@/components/portal/cycle-summary-strip";
import { Plate } from "@/components/ds/card";
import { Kicker } from "@/components/ds/kicker";
import { TabBar } from "@/components/ds/button";
import { currentWeekNumber, WEEKS } from "@/lib/tracker-data";
import { customer } from "@/lib/mock-data";

type Tab = "today" | "week" | "twelve";

export default function TrackerPage() {
  const [tab, setTab] = useState<Tab>("today");
  const currentWeek = currentWeekNumber(customer.cycleStartDate);
  const [activeWeek, setActiveWeek] = useState(currentWeek);
  const week = WEEKS.find((w) => w.number === activeWeek) ?? WEEKS[0];

  return (
    <>
      <PageHeader
        eyebrow={`Cycle ${customer.cycleStartDate} → ${customer.cycleEndDate}`}
        title="12-week tracker"
        description="The operating system for your blueprint. Daily habits build the trend. Weekly tasks keep you on the arc. The whole cycle ladders up to your twelve-week recheck."
      />

      {/* Tab bar from DS */}
      <div className="mb-7">
        <TabBar
          tabs={[
            { id: "today", label: "Today" },
            { id: "week", label: "This week" },
            { id: "twelve", label: "12-week plan" },
          ]}
          active={tab}
          onChange={(id) => setTab(id as Tab)}
        />
      </div>

      {tab === "today" && (
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DailyCheckin
              cycleStartDate={customer.cycleStartDate}
              weekNumber={currentWeek}
            />
          </div>
          <aside className="space-y-5">
            <WeekProgressCard
              week={week}
              cycleStartDate={customer.cycleStartDate}
              onOpenWeek={() => setTab("week")}
            />
            <Plate>
              <Kicker tone="accent">Why this matters</Kicker>
              <p className="ds-title-2 mt-2 text-ink">
                Don't break the chain.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Your retest reflects the last eight to twelve weeks of behavior,
                not the last eight days. Daily check-ins compound.
              </p>
              <p className="kicker mt-5 text-ink-faint">— Editor's note</p>
            </Plate>
          </aside>
        </div>
      )}

      {tab === "week" && (
        <WeekDetail
          week={week}
          isCurrent={week.number === currentWeek}
          cycleStartDate={customer.cycleStartDate}
        />
      )}

      {tab === "twelve" && (
        <div className="space-y-5">
          <CycleSummaryStrip
            cycleStartDate={customer.cycleStartDate}
            cycleEndDate={customer.cycleEndDate}
            currentWeek={currentWeek}
          />
          <WeekGantt
            cycleStartDate={customer.cycleStartDate}
            currentWeek={currentWeek}
            activeWeek={activeWeek}
            onSelect={(n) => setActiveWeek(n)}
          />
          <WeekDetail
            week={week}
            isCurrent={week.number === currentWeek}
            cycleStartDate={customer.cycleStartDate}
          />
        </div>
      )}

      <Disclaimer>
        Adherence data is stored locally in your browser for this demo · Habits
        and tasks describe behaviors, not clinical outcomes
      </Disclaimer>
    </>
  );
}
