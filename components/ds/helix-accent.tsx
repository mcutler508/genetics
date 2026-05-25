/**
 * 1px decorative double-helix glyph. Sized at 24×16 by default, scales with `size`.
 * Used as a header-side accent on genetics-related sections (max once per page).
 */
export function HelixAccent({
  width = 28,
  height = 16,
  stroke = "var(--ds-rule-strong)",
}: {
  width?: number;
  height?: number;
  stroke?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 16"
      fill="none"
      stroke={stroke}
      strokeWidth="1"
      aria-hidden
    >
      {/* two interlocking sine paths */}
      <path d="M1 1 C 5 8, 9 8, 14 1 S 23 -6, 27 1" />
      <path d="M1 15 C 5 8, 9 8, 14 15 S 23 22, 27 15" />
      {/* rungs */}
      <line x1="6" y1="5" x2="6" y2="11" />
      <line x1="14" y1="3" x2="14" y2="13" />
      <line x1="22" y1="5" x2="22" y2="11" />
    </svg>
  );
}
