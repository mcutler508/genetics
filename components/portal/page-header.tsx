import { Kicker } from "@/components/ds/kicker";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

/**
 * The editorial page header used on every page.
 * Kicker (in accent ink) + ds-display-2 serif title + ds-lead description,
 * separated from the page body by a single hairline rule.
 */
export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="mb-10 max-w-3xl space-y-3 border-b border-rule pb-10 md:mb-12 md:pb-12">
      {eyebrow && <Kicker tone="accent">{eyebrow}</Kicker>}
      <h1 className="ds-display-2 text-ink">{title}</h1>
      {description && (
        <p className="ds-lead text-ink-muted">{description}</p>
      )}
    </header>
  );
}
