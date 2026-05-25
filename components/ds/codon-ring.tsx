const BASE_FILL: Record<string, string> = {
  A: "var(--ds-base-a)",
  C: "var(--ds-base-c)",
  G: "var(--ds-base-g)",
  T: "var(--ds-base-t)",
  I: "var(--ds-mark-graphite)",
  D: "var(--ds-mark-graphite)",
};

/**
 * 28×28 SVG ring showing two inherited alleles as left/right hemispheres,
 * with H (heterozygous) or = (homozygous) glyph in the center.
 */
export function CodonRing({
  value,
  size = 28,
}: {
  value: string;
  size?: number;
}) {
  if (!value || value === "—" || value === "-" || value === "--") {
    return (
      <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden>
        <circle
          cx="14"
          cy="14"
          r="12"
          fill="none"
          stroke="var(--ds-rule)"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
      </svg>
    );
  }
  const [a, b] = value.toUpperCase();
  const leftFill = BASE_FILL[a] ?? "var(--ds-mark-graphite)";
  const rightFill = BASE_FILL[b ?? a] ?? leftFill;
  const hetero = (b ?? a) !== a;
  const glyph = hetero ? "H" : "=";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      aria-label={`Genotype ${value}`}
    >
      <path
        d="M14 2 a12 12 0 0 0 0 24 z"
        fill={leftFill}
        opacity={0.85}
      />
      <path
        d="M14 2 a12 12 0 0 1 0 24 z"
        fill={rightFill}
        opacity={0.85}
      />
      <circle
        cx="14"
        cy="14"
        r="12"
        fill="none"
        stroke="var(--ds-rule-strong)"
        strokeWidth="1"
      />
      <text
        x="14"
        y="17.5"
        textAnchor="middle"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="9"
        fontWeight="600"
        fill="white"
      >
        {glyph}
      </text>
    </svg>
  );
}
