import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Common = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const BASE =
  "inline-flex items-center justify-center gap-1.5 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-accent-soft)] focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:cursor-not-allowed disabled:opacity-50";

export function PrimaryButton({
  children,
  className,
  ...rest
}: Common) {
  return (
    <button
      {...rest}
      className={cn(
        BASE,
        "bg-[var(--ds-accent)] px-4 py-2.5 text-[var(--ds-vellum)] hover:bg-[var(--ds-accent-deep)] active:bg-[var(--ds-accent-deep)]",
        className
      )}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  className,
  ...rest
}: Common) {
  return (
    <button
      {...rest}
      className={cn(
        BASE,
        "border border-rule bg-transparent px-4 py-2.5 text-ink hover:bg-vellum-shaded",
        className
      )}
    >
      {children}
    </button>
  );
}

export function QuietButton({
  children,
  className,
  withArrow = true,
  ...rest
}: Common & { withArrow?: boolean }) {
  return (
    <button
      {...rest}
      className={cn(
        "inline-flex items-center gap-1 text-sm font-medium text-mark-ink underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      {children}
      {withArrow && <ArrowRight className="h-3.5 w-3.5" />}
    </button>
  );
}

export function IconButton({
  children,
  className,
  ariaLabel,
  ...rest
}: Common & { ariaLabel: string }) {
  return (
    <button
      {...rest}
      aria-label={ariaLabel}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-md border border-rule bg-vellum text-ink-muted transition-colors hover:bg-vellum-shaded hover:text-ink",
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabBar({
  tabs,
  active,
  onChange,
  className,
}: {
  tabs: { id: string; label: string }[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-rule bg-vellum p-1",
        className
      )}
    >
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onChange(t.id)}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
            t.id === active
              ? "bg-[var(--ds-accent)] text-[var(--ds-vellum)]"
              : "text-ink-muted hover:text-ink"
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
