"use client";

import { useState } from "react";
import { PageHeader } from "@/components/portal/page-header";
import { Disclaimer } from "@/components/portal/disclaimer";
import { DailyCheckin } from "@/components/portal/daily-checkin";
import { WeekDetail } from "@/components/portal/week-detail";
import { WeekTimeline } from "@/components/portal/week-timeline";
import { currentWeekNumber, WEEKS } from "@/lib/tracker-data";
import { customer } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

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
        description="The operating system for your blueprint. Daily habits build the trend. Weekly tasks keep you on the arc. The whole cycle ladders up to your 12-week recheck."
      />

      {/* Tabs */}
      <div className="mb-6 flex items-center gap-1 rounded-full border border-border bg-card p-1 w-fit">
        <TabButton active={tab === "today"} onClick={() => setTab("today")}>
          Today
        </TabButton>
        <TabButton active={tab === "week"} onClick={() => setTab("week")}>
          This week
        </TabButton>
        <TabButton active={tab === "twelve"} onClick={() => setTab("twelve")}>
          12-week plan
        </TabButton>
      </div>

      {tab === "today" && (
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DailyCheckin />
          </div>
          <aside className="space-y-5">
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="editorial-eyebrow text-muted-foreground">
                Current focus
              </p>
              <p className="editorial-title mt-1 text-xl text-foreground">
                {week.theme}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Week {week.number} · {week.focus}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground">
                {week.description}
              </p>
              <button
                type="button"
                onClick={() => setTab("week")}
                className="mt-4 text-xs font-medium text-primary hover:underline"
              >
                Open weekly view →
              </button>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="editorial-eyebrow text-muted-foreground">
                Why this matters
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Your retest reflects the last 8–12 weeks of behavior, not the
                last 8 days. Daily check-ins compound. Don&apos;t break the
                chain.
              </p>
            </div>
          </aside>
        </div>
      )}

      {tab === "week" && (
        <WeekDetail week={week} isCurrent={week.number === currentWeek} />
      )}

      {tab === "twelve" && (
        <div className="grid gap-5 lg:grid-cols-[1fr_2fr]">
          <WeekTimeline
            currentWeek={currentWeek}
            activeWeek={activeWeek}
            onSelect={(n) => setActiveWeek(n)}
          />
          <WeekDetail week={week} isCurrent={week.number === currentWeek} />
        </div>
      )}

      <Disclaimer>
        Adherence data is stored locally in your browser for this demo. Habits
        and tasks describe behaviors, not clinical outcomes — interpret
        progress alongside symptoms, labs, and provider guidance.
      </Disclaimer>
    </>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}
