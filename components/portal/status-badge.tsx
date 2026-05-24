import { cn } from "@/lib/utils";
import type { BiomarkerStatus } from "@/lib/mock-data";

const STATUS_STYLES: Record<
  BiomarkerStatus,
  { label: string; className: string }
> = {
  primary_focus: {
    label: "Primary Focus",
    className: "bg-primary text-primary-foreground",
  },
  secondary_focus: {
    label: "Secondary Focus",
    className: "bg-chart-3/15 text-chart-3 border border-chart-3/30",
  },
  supporting: {
    label: "Supporting",
    className: "bg-chart-4/20 text-chart-5 border border-chart-4/30",
  },
  elevated: {
    label: "Elevated",
    className: "bg-destructive/10 text-destructive border border-destructive/30",
  },
  within_optimal: {
    label: "Within Optimal",
    className: "bg-chart-2/15 text-chart-2 border border-chart-2/30",
  },
  monitored: {
    label: "Monitored",
    className: "bg-muted text-muted-foreground border border-border",
  },
};

export function StatusBadge({ status }: { status: BiomarkerStatus }) {
  const { label, className } = STATUS_STYLES[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        className
      )}
    >
      {label}
    </span>
  );
}

const ROLE_STYLES: Record<
  "primary" | "secondary" | "supporting" | "monitored",
  { label: string; className: string }
> = {
  primary: {
    label: "Primary",
    className: "bg-primary text-primary-foreground",
  },
  secondary: {
    label: "Secondary",
    className: "bg-chart-3/15 text-chart-3 border border-chart-3/30",
  },
  supporting: {
    label: "Supporting",
    className: "bg-chart-4/20 text-chart-5 border border-chart-4/30",
  },
  monitored: {
    label: "Monitored",
    className: "bg-muted text-muted-foreground border border-border",
  },
};

export function RoleBadge({
  role,
}: {
  role: "primary" | "secondary" | "supporting" | "monitored";
}) {
  const { label, className } = ROLE_STYLES[role];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider",
        className
      )}
    >
      {label}
    </span>
  );
}
