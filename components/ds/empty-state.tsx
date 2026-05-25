import { cn } from "@/lib/utils";
import { PrimaryButton } from "./button";

export function EmptyState({
  motif,
  title,
  body,
  ctaLabel,
  onCta,
  className,
}: {
  motif?: React.ReactNode;
  title: string;
  body?: string;
  ctaLabel?: string;
  onCta?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto flex max-w-md flex-col items-center gap-4 px-6 py-16 text-center",
        className
      )}
    >
      {motif ?? (
        <div className="h-[2px] w-12 bg-rule-strong" aria-hidden />
      )}
      <h3 className="ds-title-2 text-ink">{title}</h3>
      {body && (
        <p className="text-sm leading-relaxed text-ink-muted">{body}</p>
      )}
      {ctaLabel && onCta && (
        <PrimaryButton onClick={onCta} className="mt-2">
          {ctaLabel}
        </PrimaryButton>
      )}
    </div>
  );
}
