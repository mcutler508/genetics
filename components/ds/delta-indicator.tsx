import { ChevronDown, ChevronUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

type Direction = "improving" | "stable" | "worsening";

const STYLE: Record<Direction, { color: string; Icon: typeof ChevronUp }> = {
  improving: { color: "text-mark-forest", Icon: ChevronDown },
  stable: { color: "text-mark-graphite", Icon: Minus },
  worsening: { color: "text-mark-terra", Icon: ChevronUp },
};

/**
 * Δ readout. Use for cycle-over-cycle change.
 * "Improving" uses ▼ because for most biomarkers a *lower* number is better
 * (insulin, ApoB, CRP). Callers can flip this by using `worsening` for cases
 * where a higher number is desired (ferritin, vit D).
 */
export function DeltaIndicator({
  value,
  direction,
  window,
  className,
}: {
  value: string;
  direction: Direction;
  window?: string;
  className?: string;
}) {
  const { color, Icon } = STYLE[direction];
  return (
    <span className={cn("inline-flex flex-col items-end", className)}>
      <span className={cn("inline-flex items-center gap-0.5 ds-data", color)}>
        <Icon className="h-3 w-3" />
        {value}
      </span>
      {window && (
        <span className="kicker text-ink-faint mt-0.5">{window}</span>
      )}
    </span>
  );
}
