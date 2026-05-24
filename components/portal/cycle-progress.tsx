import { cn } from "@/lib/utils";

type Props = {
  totalWeeks: number;
  elapsedWeeks: number;
  daysRemaining: number;
};

export function CycleProgress({
  totalWeeks,
  elapsedWeeks,
  daysRemaining,
}: Props) {
  const pct = Math.min(100, Math.round((elapsedWeeks / totalWeeks) * 100));
  const radius = 56;
  const stroke = 8;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (circumference * pct) / 100;

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-center">
      <div className="relative h-36 w-36 shrink-0">
        <svg
          viewBox="0 0 140 140"
          className="h-full w-full -rotate-90"
          aria-hidden
        >
          <circle
            cx="70"
            cy="70"
            r={radius}
            className="fill-none stroke-muted"
            strokeWidth={stroke}
          />
          <circle
            cx="70"
            cy="70"
            r={radius}
            className="fill-none stroke-primary transition-[stroke-dashoffset] duration-700 ease-out"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="editorial-title text-3xl text-foreground">
            {pct}%
          </span>
          <span className="editorial-eyebrow text-muted-foreground">
            Cycle
          </span>
        </div>
      </div>

      <div className="flex-1 space-y-3">
        <div>
          <p className="editorial-eyebrow text-muted-foreground">
            12-week blueprint
          </p>
          <p className="mt-1 text-base text-foreground">
            <span className="editorial-title text-2xl">
              Week {elapsedWeeks}
            </span>
            <span className="ml-2 text-muted-foreground">
              of {totalWeeks}
            </span>
          </p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {daysRemaining} days until your recheck
          </p>
        </div>

        <WeekGrid total={totalWeeks} elapsed={elapsedWeeks} />
      </div>
    </div>
  );
}

function WeekGrid({ total, elapsed }: { total: number; elapsed: number }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {Array.from({ length: total }, (_, i) => {
        const week = i + 1;
        const done = week <= elapsed;
        const current = week === elapsed + 1;
        return (
          <div
            key={week}
            className={cn(
              "group/week relative flex h-7 w-9 items-center justify-center rounded-md text-[10px] font-medium transition-all",
              done && "bg-primary text-primary-foreground",
              current &&
                "border border-primary/40 bg-primary/10 text-primary",
              !done && !current && "bg-muted text-muted-foreground"
            )}
            title={`Week ${week}${done ? " — complete" : current ? " — current" : ""}`}
          >
            {week}
          </div>
        );
      })}
    </div>
  );
}
