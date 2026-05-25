import { cn } from "@/lib/utils";

export function RecheckPill({
  date,
  className,
}: {
  date: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border border-rule px-2 py-0.5 kicker text-ink-muted",
        className
      )}
    >
      <span aria-hidden>◷</span>
      Recheck · {date}
    </span>
  );
}
