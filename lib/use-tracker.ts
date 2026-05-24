"use client";

import { useCallback, useEffect, useState } from "react";
import { HABITS, type HabitId } from "@/lib/tracker-data";

const STORAGE_KEY = "blueprint-portal:tracker:v1";

type DailyEntry = Partial<Record<HabitId, boolean>>;

export type TrackerState = {
  dailyEntries: Record<string, DailyEntry>;
  weekTasks: Record<number, Record<string, boolean>>;
  weekNotes: Record<number, string>;
};

function emptyState(): TrackerState {
  return { dailyEntries: {}, weekTasks: {}, weekNotes: {} };
}

function safeRead(): TrackerState {
  if (typeof window === "undefined") return emptyState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw);
    return {
      dailyEntries: parsed.dailyEntries ?? {},
      weekTasks: parsed.weekTasks ?? {},
      weekNotes: parsed.weekNotes ?? {},
    };
  } catch {
    return emptyState();
  }
}

function safeWrite(state: TrackerState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore quota errors silently for MVP
  }
}

export function useTracker() {
  const [state, setState] = useState<TrackerState>(emptyState);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setState(safeRead());
    setHydrated(true);
  }, []);

  // Persist on change (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    safeWrite(state);
  }, [state, hydrated]);

  const toggleHabit = useCallback(
    (date: string, habit: HabitId) => {
      setState((s) => {
        const day = s.dailyEntries[date] ?? {};
        return {
          ...s,
          dailyEntries: {
            ...s.dailyEntries,
            [date]: { ...day, [habit]: !day[habit] },
          },
        };
      });
    },
    []
  );

  const toggleTask = useCallback((weekNum: number, taskId: string) => {
    setState((s) => {
      const w = s.weekTasks[weekNum] ?? {};
      return {
        ...s,
        weekTasks: {
          ...s.weekTasks,
          [weekNum]: { ...w, [taskId]: !w[taskId] },
        },
      };
    });
  }, []);

  const setWeekNote = useCallback((weekNum: number, note: string) => {
    setState((s) => ({
      ...s,
      weekNotes: { ...s.weekNotes, [weekNum]: note },
    }));
  }, []);

  const getDay = useCallback(
    (date: string): DailyEntry => state.dailyEntries[date] ?? {},
    [state]
  );

  const dayCompletePct = useCallback(
    (date: string): number => {
      const entry = state.dailyEntries[date] ?? {};
      const checked = HABITS.filter((h) => entry[h.id]).length;
      return Math.round((checked / HABITS.length) * 100);
    },
    [state]
  );

  return {
    state,
    hydrated,
    toggleHabit,
    toggleTask,
    setWeekNote,
    getDay,
    dayCompletePct,
  };
}
