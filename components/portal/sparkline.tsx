"use client";

import { Area, AreaChart } from "recharts";
import type { SparklineTrend } from "@/lib/mock-series";

type SparklineProps = {
  /** A short series of points (typically 6–12). Last point is "current". */
  data: number[];
  trend?: SparklineTrend;
  width?: number;
  height?: number;
};

const COLOR: Record<SparklineTrend, string> = {
  improving: "var(--chart-2)",
  stable: "var(--muted-foreground)",
  worsening: "var(--destructive)",
};

export function Sparkline({
  data,
  trend = "stable",
  width = 110,
  height = 28,
}: SparklineProps) {
  const chartData = data.map((v, i) => ({ i, v }));
  const stroke = COLOR[trend];
  const gradientId = `spark-${trend}`;

  return (
    <div style={{ width, height }} className="inline-block">
      <AreaChart
        data={chartData}
        width={width}
        height={height}
        margin={{ top: 2, right: 2, bottom: 2, left: 2 }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stroke} stopOpacity={0.35} />
            <stop offset="100%" stopColor={stroke} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="v"
          stroke={stroke}
          strokeWidth={1.5}
          fill={`url(#${gradientId})`}
          isAnimationActive={false}
          dot={false}
          activeDot={false}
        />
      </AreaChart>
    </div>
  );
}
