import { cn } from "@/lib/utils";

/**
 * Vellum card — default. Hairline border, no shadow.
 */
export function VellumCard({
  children,
  className,
  padded = true,
}: {
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-rule bg-vellum",
        padded && "px-6 py-6 md:px-7 md:py-7",
        className
      )}
    >
      {children}
    </section>
  );
}

/**
 * Inset card — sits inside a vellum card. Deeper canvas, no border.
 */
export function InsetCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl bg-canvas-deep px-4 py-3.5",
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * Feature card — the single hero on a page.
 * Top hairline-strong rule, no other borders, dramatic padding.
 */
export function FeatureCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "border-t border-rule-strong bg-vellum px-8 py-10 md:px-12 md:py-14",
        className
      )}
    >
      {children}
    </section>
  );
}

/**
 * Plate — no background, single hairline rule above. Reads like a magazine spread.
 */
export function Plate({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("border-t border-rule pt-8", className)}>
      {children}
    </section>
  );
}
