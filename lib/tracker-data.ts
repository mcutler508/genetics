// 12-week tracker templates derived from PRD §8.12 and tailored to Stacey's
// Carb Controller + Glucose-focused blueprint. Educational only.

export type HabitId =
  | "supplements_taken"
  | "protein_target"
  | "fiber_target"
  | "carb_timing"
  | "zone_2_cardio"
  | "sleep_target"
  | "caffeine_cutoff"
  | "stress_off_ramp";

export type HabitDef = {
  id: HabitId;
  label: string;
  detail: string;
  /** Short copy for the dashboard mini-summary */
  short: string;
};

export const HABITS: HabitDef[] = [
  {
    id: "supplements_taken",
    label: "Supplements taken",
    detail: "All scheduled supplements for the day",
    short: "Supplements",
  },
  {
    id: "protein_target",
    label: "Protein target",
    detail: "≥30g protein per meal, ~0.8g per lb body weight daily",
    short: "Protein",
  },
  {
    id: "fiber_target",
    label: "Fiber target",
    detail: "30g+ total fiber, with soluble sources split across meals",
    short: "Fiber",
  },
  {
    id: "carb_timing",
    label: "Carb timing",
    detail: "Carbs intentional and timed around training",
    short: "Carb timing",
  },
  {
    id: "zone_2_cardio",
    label: "Zone 2 / movement",
    detail: "Steady-state cardio or structured movement session",
    short: "Movement",
  },
  {
    id: "sleep_target",
    label: "Sleep target",
    detail: "7+ hours, consistent sleep window",
    short: "Sleep",
  },
  {
    id: "caffeine_cutoff",
    label: "Caffeine cutoff",
    detail: "No caffeine after 12 PM (slow CYP1A2 metabolism)",
    short: "Caffeine",
  },
  {
    id: "stress_off_ramp",
    label: "Stress off-ramp",
    detail: "10–20 min NSDR / breathwork / meditation",
    short: "Off-ramp",
  },
];

export type WeekTask = {
  id: string;
  label: string;
  /**
   * If present, completion is computed from daily check-ins instead of a
   * manual toggle. The task is complete when the user has hit `habitId` on
   * at least `threshold` of the 7 days in that week.
   */
  derived?: {
    habitId: HabitId;
    threshold: number;
  };
};

export type WeekTemplate = {
  number: number;
  focus: string;
  /** One-line theme rendered as serif headline */
  theme: string;
  description: string;
  tasks: WeekTask[];
  milestone?: "midpoint" | "retest_planning" | "recheck";
};

export const WEEKS: WeekTemplate[] = [
  {
    number: 1,
    focus: "Baseline setup",
    theme: "Set the stage",
    description:
      "Establish baseline habits, set up your environment, and start the supplement protocol at the lowest dose.",
    tasks: [
      { id: "w1_t1", label: "Buy supplements (Omega-3, Berberine, B-Complex, Soluble Fiber)" },
      { id: "w1_t2", label: "Set a consistent wake / sleep window" },
      { id: "w1_t3", label: "Track every meal for 3 days (just observation, no changes)" },
      { id: "w1_t4", label: "Start berberine at 500mg 1× daily with largest meal" },
    ],
  },
  {
    number: 2,
    focus: "Nutrition consistency",
    theme: "Anchor your plate",
    description:
      "Lock in the Carb Controller pattern: 30g+ protein per meal, fiber-forward sides, healthy fats prioritized.",
    tasks: [
      {
        id: "w2_t1",
        label: "Hit protein target 5 of 7 days",
        derived: { habitId: "protein_target", threshold: 5 },
      },
      {
        id: "w2_t2",
        label: "Hit fiber target 5 of 7 days (soluble sources split across meals)",
        derived: { habitId: "fiber_target", threshold: 5 },
      },
      { id: "w2_t3", label: "Swap one saturated fat source for olive oil or avocado" },
    ],
  },
  {
    number: 3,
    focus: "Supplement titration",
    theme: "Dial in the dose",
    description:
      "Titrate berberine up to 500mg 2× daily. Monitor GI tolerance and energy.",
    tasks: [
      { id: "w3_t1", label: "Titrate berberine to 500mg 2× daily" },
      { id: "w3_t2", label: "Take Omega-3 with at least one main meal" },
      { id: "w3_t3", label: "Confirm B-Complex is methylated form (5-MTHF + methylcobalamin)" },
    ],
  },
  {
    number: 4,
    focus: "Sleep/recovery checkpoint",
    theme: "Recover with intention",
    description:
      "Lock in caffeine cutoff and morning light exposure. Slow CYP1A2 means caffeine timing is a real lever.",
    tasks: [
      {
        id: "w4_t1",
        label: "Enforce caffeine cutoff at 12 PM all 7 days",
        derived: { habitId: "caffeine_cutoff", threshold: 7 },
      },
      { id: "w4_t2", label: "10 minutes of morning light within 60 min of waking" },
      { id: "w4_t3", label: "Start a 10-min NSDR or breathwork practice" },
    ],
  },
  {
    number: 5,
    focus: "Fiber/protein consistency",
    theme: "Compound what works",
    description:
      "Stack fiber to 30g+/day and keep protein consistent. Supports both ApoB and glucose targets.",
    tasks: [
      {
        id: "w5_t1",
        label: "Hit 30g+ total fiber for 5 of 7 days",
        derived: { habitId: "fiber_target", threshold: 5 },
      },
      {
        id: "w5_t2",
        label: "Protein target every meal, every day",
        derived: { habitId: "protein_target", threshold: 7 },
      },
      { id: "w5_t3", label: "Add psyllium husk or oat beta-glucan as a daily anchor" },
    ],
  },
  {
    number: 6,
    focus: "Midpoint review",
    theme: "Pause. Reflect. Adjust.",
    description:
      "You're halfway. Step back, review the data, and identify what's working and what to change for the back half.",
    tasks: [
      { id: "w6_t1", label: "Review adherence trends — what was easy, what was hard?" },
      { id: "w6_t2", label: "Note any subjective changes (energy, sleep, hunger)" },
      { id: "w6_t3", label: "Adjust one habit that consistently slipped" },
    ],
    milestone: "midpoint",
  },
  {
    number: 7,
    focus: "Movement/cardio consistency",
    theme: "Layer in Zone 2",
    description:
      "Add structured Zone 2 cardio — 45–60 min at a conversational pace, 2–3× this week. Supports lipid metabolism and insulin sensitivity.",
    tasks: [
      { id: "w7_t1", label: "Schedule 2 Zone 2 sessions (45–60 min each)" },
      { id: "w7_t2", label: "Track heart rate or RPE during each session" },
      { id: "w7_t3", label: "Keep daily movement >7,000 steps" },
    ],
  },
  {
    number: 8,
    focus: "Stress off-ramp consistency",
    theme: "Down-regulate on purpose",
    description:
      "Daily 10–20 min off-ramp practice. NR3C1 and ADRB2 patterns mean your system benefits from active down-regulation.",
    tasks: [
      {
        id: "w8_t1",
        label: "Daily off-ramp practice — 7 of 7 days",
        derived: { habitId: "stress_off_ramp", threshold: 7 },
      },
      { id: "w8_t2", label: "Identify 2 recurring stressors and a planned response" },
      { id: "w8_t3", label: "Phone out of bedroom for the week" },
    ],
  },
  {
    number: 9,
    focus: "Provider question prep",
    theme: "Get ready to ask",
    description:
      "Curate your provider questions, finalize what to discuss, and confirm any prescription-adjacent items (berberine, iron).",
    tasks: [
      { id: "w9_t1", label: "Review and edit your saved provider questions" },
      { id: "w9_t2", label: "Add any questions surfaced during weeks 1–8" },
      { id: "w9_t3", label: "Print or export the provider packet" },
    ],
  },
  {
    number: 10,
    focus: "Retest planning",
    theme: "Schedule the recheck",
    description:
      "Order the 12-week retest panel. Confirm fasted draw, timing, and lab. Communicate with provider.",
    tasks: [
      { id: "w10_t1", label: "Book fasting lab draw for week 12 (insulin, glucose, ferritin, ApoB, HbA1c, hs-CRP, homocysteine, vitamin D)" },
      { id: "w10_t2", label: "Confirm fasting window (12 hours, water OK)" },
      { id: "w10_t3", label: "Pause berberine 48 hours before draw if your provider recommends" },
    ],
    milestone: "retest_planning",
  },
  {
    number: 11,
    focus: "Final push",
    theme: "Stay the course",
    description:
      "Don't break the chain in the final week. Keep adherence high — the retest reflects the last 8–12 weeks, not the last 8 days.",
    tasks: [
      { id: "w11_t1", label: "Maintain full protocol adherence" },
      {
        id: "w11_t2",
        label: "Sleep ≥7 hours every night",
        derived: { habitId: "sleep_target", threshold: 7 },
      },
      { id: "w11_t3", label: "No new supplements or interventions this week" },
    ],
  },
  {
    number: 12,
    focus: "Recheck and next cycle",
    theme: "Close the loop",
    description:
      "Draw labs, review against targets, debrief with your provider, and plan cycle 2.",
    tasks: [
      { id: "w12_t1", label: "Complete fasting lab draw" },
      { id: "w12_t2", label: "Enter new lab values in the portal" },
      { id: "w12_t3", label: "Schedule provider review and confirm cycle 2 focus" },
    ],
    milestone: "recheck",
  },
];

/** Returns ISO date (YYYY-MM-DD) for a JS Date in local time. */
export function isoDate(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** 7 ISO dates ending at the given date, oldest first. */
export function lastNDates(n: number, end: Date = new Date()): string[] {
  const out: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setDate(end.getDate() - i);
    out.push(isoDate(d));
  }
  return out;
}

/** Cycle phases — overlapping ranges that group weeks by focus area. */
export type CyclePhase = {
  id: string;
  label: string;
  startWeek: number;
  endWeek: number;
  tone: "accent" | "forest" | "clay" | "indigo" | "muted";
};

export const PHASES: CyclePhase[] = [
  { id: "foundation", label: "Foundation", startWeek: 1, endWeek: 2, tone: "muted" },
  { id: "nutrition", label: "Nutrition consistency", startWeek: 2, endWeek: 5, tone: "accent" },
  { id: "recovery", label: "Recovery & sleep", startWeek: 4, endWeek: 8, tone: "indigo" },
  { id: "movement", label: "Movement layering", startWeek: 7, endWeek: 9, tone: "forest" },
  { id: "recheck", label: "Recheck prep", startWeek: 9, endWeek: 12, tone: "clay" },
];

/** Returns the 1-based week number relative to a cycle start date. */
export function currentWeekNumber(
  cycleStartISO: string,
  today: Date = new Date()
): number {
  const start = new Date(cycleStartISO + "T00:00:00");
  const diffDays = Math.floor(
    (today.getTime() - start.getTime()) / 86_400_000
  );
  return Math.max(1, Math.min(12, Math.floor(diffDays / 7) + 1));
}

/** ISO dates for the 7 days of a given week, in chronological order. */
export function weekDates(cycleStartISO: string, weekNum: number): string[] {
  const start = new Date(cycleStartISO + "T00:00:00");
  const out: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + (weekNum - 1) * 7 + i);
    out.push(isoDate(d));
  }
  return out;
}

/** Minimal shape of tracker state used by completion helpers. */
export type TaskCompletionState = {
  dailyEntries: Record<string, Partial<Record<HabitId, boolean>>>;
  weekTasks: Record<number, Record<string, boolean>>;
};

/**
 * Days the user hit the underlying habit, for a derived task. Returns null
 * for manual tasks.
 */
export function derivedTaskProgress(
  task: WeekTask,
  weekNum: number,
  cycleStartISO: string,
  dailyEntries: TaskCompletionState["dailyEntries"]
): { hit: number; threshold: number } | null {
  if (!task.derived) return null;
  const dates = weekDates(cycleStartISO, weekNum);
  const hit = dates.reduce((acc, d) => {
    const day = dailyEntries[d] ?? {};
    return acc + (day[task.derived!.habitId] ? 1 : 0);
  }, 0);
  return { hit, threshold: task.derived.threshold };
}

/**
 * Whether a task is complete. Derived tasks read from `dailyEntries`,
 * manual tasks from `weekTasks`.
 */
export function isTaskComplete(
  task: WeekTask,
  weekNum: number,
  cycleStartISO: string,
  state: TaskCompletionState
): boolean {
  if (task.derived) {
    const p = derivedTaskProgress(task, weekNum, cycleStartISO, state.dailyEntries);
    return p !== null && p.hit >= p.threshold;
  }
  return !!state.weekTasks[weekNum]?.[task.id];
}
