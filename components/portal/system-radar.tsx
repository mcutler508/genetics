"use client";

import { useEffect, useRef, useState } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
} from "recharts";
import type { SystemFocus } from "@/lib/mock-data";

function roleScore(role: SystemFocus["role"]): number {
  switch (role) {
    case "primary":
      return 35;
    case "secondary":
      return 50;
    case "supporting":
      return 65;
    case "monitored":
      return 90;
  }
}

export function SystemRadar({ systems }: { systems: SystemFocus[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(320);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.floor(entry.contentRect.width);
        if (w > 0) setWidth(w);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const data = systems.map((s) => ({
    system: shortLabel(s.systemName),
    current: roleScore(s.role),
    target: 100,
  }));

  const height = 256;

  return (
    <div ref={ref} className="h-64 w-full">
      <RadarChart
        data={data}
        width={width}
        height={height}
        outerRadius={Math.min(width, height) / 2.8}
        margin={{ top: 8, right: 24, bottom: 8, left: 24 }}
      >
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis
          dataKey="system"
          tick={{
            fill: "var(--muted-foreground)",
            fontSize: 11,
            fontFamily: "var(--font-geist-sans)",
          }}
        />
        <Radar
          name="Target"
          dataKey="target"
          stroke="var(--border)"
          strokeDasharray="3 3"
          fill="transparent"
          isAnimationActive={false}
        />
        <Radar
          name="Current"
          dataKey="current"
          stroke="var(--primary)"
          strokeWidth={2}
          fill="var(--primary)"
          fillOpacity={0.18}
          isAnimationActive={false}
        />
      </RadarChart>
    </div>
  );
}

function shortLabel(name: string) {
  return name
    .replace(/Lipoprotein & Cardiovascular Risk/i, "Cardio")
    .replace(/Glucose & Insulin Control/i, "Glucose")
    .replace(/Foundational Support/i, "Foundational")
    .replace(/Iron Status/i, "Iron");
}
