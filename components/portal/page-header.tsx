type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="mb-10 max-w-3xl space-y-3 md:mb-12">
      {eyebrow && (
        <p className="editorial-eyebrow text-primary">{eyebrow}</p>
      )}
      <h1 className="editorial-title text-4xl leading-tight text-foreground md:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      )}
    </header>
  );
}
