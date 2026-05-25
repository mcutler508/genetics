# Blueprint Portal — Design System

**Codename:** `Periodical`
**Direction:** Editorial Scientific · Light-first warm canvas
**Positioning:** A premium longevity intelligence platform that reads like a periodical you keep, not a SaaS app you tab through.

---

## 1. Brand personality

Blueprint Portal is the **periodical you receive at the start of each twelve-week cycle** — a journal of your biology, edited for clarity, formatted for ritual. It is not a wellness app, not a dashboard, not a tracker. It is the document of record for your body's last twelve weeks, written so you can quote it back to your doctor.

**Voice attributes** — *precise, considered, durable, calm, journal-like, evidence-forward, anti-sensational.* Never breathless, never gamified, never "you have!", never countdown-timer urgency. Adopts the cadence of long-form medical writing — short paragraphs, em dashes, single-sentence headlines, footnotes welcome.

**Visual attributes** — *paper, ink, hairline rules, generous whitespace, monospaced data, serif headlines, kicker labels in caps, a single restrained accent.* The page should look composed rather than designed; the eye should land where the editor placed it.

**What it is not** — not a teal-cards SaaS app, not a beige admin dashboard, not a startup landing page, not a fitness tracker, not a fintech app, not Whoop or Eight Sleep (those are instruments — we are a journal of an instrument).

---

## 2. Color palette

All colors expressed in OKLCH for accuracy; hex values are sRGB approximations.

### Canvas

| Token              | Role                      | OKLCH                         | Hex (≈)   |
| ------------------ | ------------------------- | ----------------------------- | --------- |
| `canvas`           | Page background           | `oklch(0.975 0.012 85)`       | `#F5EFE0` |
| `canvas-deep`      | Inset zones, footers      | `oklch(0.94 0.018 80)`        | `#EAE2CC` |
| `vellum`           | Card surface              | `oklch(0.995 0.006 85)`       | `#FCF9F1` |
| `vellum-shaded`    | Nested card surface       | `oklch(0.96 0.014 80)`        | `#F0E8D3` |

### Ink

| Token              | Role                      | OKLCH                         | Hex (≈)   |
| ------------------ | ------------------------- | ----------------------------- | --------- |
| `ink`              | Primary text              | `oklch(0.22 0.018 60)`        | `#2A2520` |
| `ink-muted`        | Secondary text            | `oklch(0.48 0.025 65)`        | `#7C6E5C` |
| `ink-faint`        | Tertiary / footnote       | `oklch(0.62 0.020 70)`        | `#A19383` |
| `rule`             | Hairlines, dividers       | `oklch(0.88 0.018 80)`        | `#D6CBB1` |
| `rule-strong`      | Section / emphasis rules  | `oklch(0.78 0.020 75)`        | `#B8A98E` |

### Brand accent — *Botanical Ink*

The brand accent is a deep botanical green-teal, drawn from the underside of a magnolia leaf — saturated enough to feel alive, dark enough to read as ink, never bright enough to feel "wellness teal."

| Token                | OKLCH                         | Hex (≈)   |
| -------------------- | ----------------------------- | --------- |
| `accent`             | `oklch(0.42 0.085 190)`       | `#1F5B5E` |
| `accent-soft`        | `oklch(0.91 0.04 195)`        | `#D3E5E2` |
| `accent-deep`        | `oklch(0.30 0.075 195)`       | `#143F45` |

### Health status marks

Named tiers — never call these "good/bad" colors.

| Tier                  | Token            | OKLCH                       | Hex (≈)   | Used for                                  |
| --------------------- | ---------------- | --------------------------- | --------- | ----------------------------------------- |
| **Primary Focus**     | `mark-ink`       | `oklch(0.42 0.085 190)`     | `#1F5B5E` | The single biomarker driving this cycle   |
| **Secondary Focus**   | `mark-clay`      | `oklch(0.58 0.13 50)`       | `#B07343` | Layered support biomarker                 |
| **Supporting**        | `mark-sage`      | `oklch(0.62 0.07 145)`      | `#86A480` | Tertiary support                          |
| **Within Optimal**    | `mark-forest`    | `oklch(0.55 0.11 150)`      | `#5C8C5F` | Healthy / on-target                       |
| **Monitored**         | `mark-graphite`  | `oklch(0.50 0.012 70)`      | `#7A7468` | Tracked for context, no action            |
| **Elevated / Out**    | `mark-terra`     | `oklch(0.55 0.15 28)`       | `#B05038` | Outside optimal range — provider context  |

### Genetics — base-pair palette

The four DNA bases get their own quiet color. Used inside genotype chips, base-pair indicators, and helix accents. Restrained, never primary-grade saturation.

| Base | Name      | OKLCH                       | Hex (≈)   |
| ---- | --------- | --------------------------- | --------- |
| A    | Adenine   | `oklch(0.55 0.10 235)`      | `#4A6DA0` |
| C    | Cytosine  | `oklch(0.58 0.12 50)`       | `#B5754A` |
| G    | Guanine   | `oklch(0.62 0.11 80)`       | `#A8884A` |
| T    | Thymine   | `oklch(0.55 0.09 145)`      | `#6D8E6E` |

---

## 3. Typography scale

A three-family system. Serif for voice, sans for utility, mono for data.

- **Display serif** — `Fraunces` (variable, opsz + SOFT axes). Editorial titles, biomarker numerals, hero moments.
- **UI sans** — `Geist Sans`. Body text, navigation, labels.
- **Data mono** — `Geist Mono`. Kicker labels, gene symbols, RS numbers, units, tabular numerics.

### Scale

| Token       | Size / line-height       | Family   | Tracking  | Used for                                  |
| ----------- | ------------------------ | -------- | --------- | ----------------------------------------- |
| `display-1` | 64–72 / 1.05             | Fraunces | -0.025em  | Style-guide hero, marketing               |
| `display-2` | 48–56 / 1.08             | Fraunces | -0.02em   | Page titles                               |
| `title-1`   | 32 / 1.15                | Fraunces | -0.02em   | Section headlines                         |
| `title-2`   | 24 / 1.2                 | Fraunces | -0.015em  | Card titles                               |
| `title-3`   | 20 / 1.25                | Fraunces | -0.01em   | Sub-section titles                        |
| `numeric-L` | 32 / 1.0                 | Fraunces | -0.02em   | Featured biomarker numerals               |
| `lead`      | 18 / 1.55                | Geist    | -0.005em  | Hero descriptions                         |
| `body`      | 15 / 1.65                | Geist    | 0         | Default body text                         |
| `body-s`    | 13 / 1.55                | Geist    | 0         | Secondary copy                            |
| `caption`   | 12 / 1.5                 | Geist    | 0         | Footnotes, captions                       |
| `kicker`    | 11 / 1.0 · UPPERCASE     | Mono     | 0.18em    | Eyebrow labels above titles               |
| `data-L`    | 18 / 1.0                 | Mono     | 0         | Featured data readouts                    |
| `data`      | 13 / 1.4                 | Mono     | 0         | Gene symbols, units, table data           |
| `data-S`    | 11 / 1.3                 | Mono     | 0         | Tooltip metadata                          |

### Type rules

- Headings always serif. Body always sans. Numbers in tables and gene symbols always mono. Three families, no exceptions.
- **Kickers** sit above every titled module. They are the editorial voice — read them aloud: *"Cycle 02 · Week 02 of 12."*
- **Em dashes** with hair spaces (`—`) inside body copy. Never the ASCII `--`.
- **One ligature pass** — Fraunces `ss01` for swashes is enabled in body.
- Numerals use **tabular figures** in any table; **lining figures** in body prose; **oldstyle figures** never in this product (too magazine-like for biology).

---

## 4. Card styles

Four card archetypes — each one carries a job, not a vibe.

### a. Vellum card *(default)*

Background `vellum`, hairline `rule` border, no shadow, `radius-md` (14px). Used for 80% of content modules. Internal padding 24px (compact) or 28px (default).

### b. Inset card

Background `canvas-deep`, no border, used inside a vellum card to demarcate metadata blocks (e.g., the gauge metadata under a biomarker row). Always lives *inside* another card.

### c. Feature card

Background `vellum`, `rule-strong` top border (1px), no other borders, dramatic serif title at `title-1`, generous internal padding (40px+). Reserved for the **one hero on a page** — a primary biomarker, the cycle-open headline, the recheck CTA.

### d. Plate card

A plain section of canvas with a single thin `rule` line as a header separator, no border around the content, no background fill. Used when you want the page to feel like spread-on-paper — typical for long-form sections (System detail, Provider Questions list).

### Rules across all cards

- **No drop shadows.** Hairline rules carry the elevation work. (One exception: hovering action elements may use a 1px ring shadow on `accent-soft`.)
- **Corner radius** is consistent across all cards at the same `radius-md`. No mixing radii.
- **Cards never nest more than two deep.** Vellum > Inset is fine. Vellum > Inset > Inset is not.

---

## 5. Data visualization

### Style baseline

- All charts use the brand neutral first, accent second. **Never a rainbow palette.**
- **Tabular numerics** in axis labels and tooltips.
- **No grid backgrounds.** Single hairline baseline, occasional dashed reference for "target."
- **No 3D, no glossy gradients.** Subtle linear gradient fills permitted for area shapes (transparent at base, 35% accent at top).
- Animation budget: 600ms ease-out on initial render; nothing afterward unless data updates.

### Specific visualizations

- **Range strip** — horizontal bar showing optimal band (filled with `mark-forest/40`), value marker as a circle in tier color, axis end caps in `data-S` mono. Default for biomarker pages.
- **Cycle ring** — single SVG ring, `accent` stroke, 8px stroke width, `rule` track. Serif percentage in the center at `numeric-L`. Used once per page, never repeated.
- **Sparkline** — area chart, no axes, area gradient using the trend color (`mark-forest` improving, `mark-graphite` stable, `mark-terra` worsening). Width 110px × 28px on table rows.
- **System radar** — single accent ring, dashed `rule` target ring, 4-axis radar. Limited to ≤6 systems before becoming illegible.
- **Δ Delta indicator** — small `data` mono readout with an up/down chevron in tier color: `▲ +12%` `▼ −0.4`.
- **Heatmap** — for adherence grids: 8 habits × 7 days. Cells fill at `accent` or `rule` only — never a heat gradient. Binary signal, binary color.

---

## 6. Buttons

Five button archetypes. No "rounded-full pill" buttons (those belong on landing pages).

| Variant      | Look                                                                                  | Use                                            |
| ------------ | ------------------------------------------------------------------------------------- | ---------------------------------------------- |
| **Primary**  | `accent` fill, `vellum` text, 14px text, 10px vertical padding, `radius-sm` (8px)     | The single most important action on a screen   |
| **Ghost**    | Transparent, `ink` text, `rule` border, same padding/radius as Primary                | Secondary actions                              |
| **Quiet**    | Underlined `accent` text with an inline `→` glyph. No padding, no border.             | "Open tracker →", "View all biomarkers →"      |
| **Icon**    | 32px square, `rule` border, icon centered. For chrome (theme toggle, expand).        | Toolbars, table-row affordances                |
| **Tabs**    | Inline group inside a `rule` border with `radius-full` outer / `radius-sm` inner.    | View switchers (Today / This week / 12-week)   |

States: hover lowers `accent` by 4% lightness; active uses `accent-deep`; focus shows a 2px `accent-soft` ring offset by 2px from the canvas.

---

## 7. Navigation

- **Sidebar** is a single column of editorial entries. Active state is a 2px `accent` left bar with `accent-soft` background tint — **never a full-width pill fill** (that's SaaS).
- **Section dividers** in the sidebar are kicker labels in caps (e.g., `BLUEPRINT`, `EXECUTION`, `ACCOUNT`) with a hairline rule beneath. Groups items semantically.
- **Brand mark** is a serif lowercase wordmark `blueprint.` with the period — never a logo lockup.
- **Theme toggle** lives in the sidebar header, never the page header.
- **Page headers** carry a kicker + serif `display-2` title + `lead` description. No icons in page titles.
- **Breadcrumbs** only appear two levels deep or more. Style: small mono with `›` separator.

---

## 8. Empty states

Empty states are an opportunity for editorial voice, not a forlorn illustration.

**Structure:**
1. A tiny illustrative motif (a single rule, a base-pair chip, a circle — not a mascot).
2. Serif headline in `title-2` — short, declarative. *"No labs yet."*
3. One paragraph of `body-s` prose explaining what will appear here.
4. One **Primary** button — the next action.

**Forbidden:** sad-cloud illustrations, cartoon doctors, large icon-only states, "Oops!" copy.

---

## 9. Loading states

- **Skeleton bars** — animated `vellum-shaded` bars, no shimmer, just a 1.2s ease-in-out opacity pulse between 60% and 100%. Bar heights match the content they replace (a title bar is `title-2` height; a body bar is `body` height).
- **No spinners.** Anywhere. Spinners are a SaaS tell.
- **Inline data loading** — show the previous value at 50% opacity with a kicker `· UPDATING` to its right.
- **Page-level loading** — render the skeleton of the entire layout (sidebar real, content skeleton). Never render a blank canvas.

---

## 10. Health status indicator system

Six named tiers. Each tier has three forms: **chip**, **dot**, and **bar fill.**

| Tier               | Chip (text on `mark` at 12% / border at 30%) | Dot (6px filled) | Bar fill        |
| ------------------ | -------------------------------------------- | ---------------- | --------------- |
| **Primary Focus**  | `Primary Focus` in `mark-ink`                | `mark-ink`       | `mark-ink`      |
| **Secondary Focus**| `Secondary Focus` in `mark-clay`             | `mark-clay`      | `mark-clay`     |
| **Supporting**     | `Supporting` in `mark-sage`                  | `mark-sage`      | `mark-sage`     |
| **Within Optimal** | `Within Optimal` in `mark-forest`            | `mark-forest`    | `mark-forest`   |
| **Monitored**      | `Monitored` in `mark-graphite`               | `mark-graphite`  | `mark-graphite` |
| **Elevated**       | `Elevated` in `mark-terra`                   | `mark-terra`     | `mark-terra`    |

Use the chip in tables and detail headers; the dot in tight layouts (sidebar legends, sparkline labels); the bar fill on range strips and gauges. Always pair the color with the **named label**, so the system is screen-reader-legible without color.

---

## 11. Genetics-specific visual motifs

### a. Gene symbol typography

Always in **Geist Mono** at `data` weight 600, slightly tightened (`-0.02em`). Inline reads `APOE rs429358` — gene symbol and RS number in the same family, RS number in `ink-faint`.

### b. Base-pair chip

A 16×16px filled square per base, color from the base-pair palette, with the base letter in white at `data-S`. Genotypes render as two chips edge-to-edge: `[C][T]`. Heterozygous shows two different fills; homozygous shows two identical fills. Used as an inline indicator inside genotype tooltips and per-gene cards.

### c. Codon ring

A 28×28px circle, `rule` stroke, with two filled arcs (left half + right half) representing the two inherited alleles. The arc fills use the base-pair palette. A small mono letter centered shows zygosity status: `H` (heterozygous) or `=` (homozygous). Compact alternative to the chip for tight rows.

### d. Helix accent

A 1px SVG double-helix glyph, used as a single decorative element in section headers for genetics-related pages. Always `rule-strong` color, always 24px wide, always to the left of a section kicker. Used once per page maximum.

### e. Effect-allele marker

A small filled arrow `▶` placed before the effect allele in interpretive copy. Read as "the variant the report flags."

---

## 12. Biomarker-specific visual motifs

### a. Numeric featured

Biomarker values get serif treatment — `numeric-L` Fraunces with the unit in `data` mono subscript, half-leading: `8.92` *μIU/mL*.

### b. Range strip

Horizontal bar, 8px tall, `radius-full`. Optimal band fills with `mark-forest/40`. Out-of-range zones (left, right) fill with diagonal hatch pattern at `mark-terra/15`. Value marker is a 14px filled circle in the value's tier color with a 2px `vellum` ring.

### c. Target arrow

The convention `current → target` is used everywhere. Format: `8.92 → 2–5 μIU/mL`. The arrow is `ink-faint`. Never use the word "Goal" — use "Target."

### d. Delta plate

When showing change over a cycle: `▲ +12%` in `mark-forest` (improving) or `▼ −0.4` in `mark-terra` (worsening). Always paired with the time window in `caption`: *"Δ since 2026-05-12."*

### e. Recheck pill

A small mono pill `RECHECK · 2026-08-04` — uppercase mono, `rule` border, no fill. Sits next to biomarker titles to anchor the cycle.

### f. System tag

A small kicker `SYSTEM · Glucose & Insulin` linking the biomarker back to its system. Always plain-text, never a colored badge — the system is context, not status.

---

## 13. Example dashboard layout

A page composed of these primitives — described as a vertical reading order so it can be implemented faithfully.

```
┌──────────────────────────────────────────────────────────────────────────┐
│ SIDEBAR (column)                                                          │
│  blueprint.        ☼/☾                                                    │
│  ─────────                                                                │
│  BLUEPRINT                                                                │
│   · Dashboard ◀━━ (active: left bar accent)                              │
│   · 12-Week Tracker                                                       │
│   · Systems                                                               │
│   · Biomarkers                                                            │
│   · Genetics                                                              │
│  EXECUTION                                                                │
│   · Supplements                                                           │
│   · Nutrition                                                             │
│   · Provider Questions                                                    │
│  ARCHIVE                                                                  │
│   · Reports                                                               │
│   · Privacy                                                               │
│   · Upload                                                                │
└──────────────────────────────────────────────────────────────────────────┘

MAIN COLUMN
  kicker     CYCLE 02  ·  WEEK 02 OF 12  ·  RECHECK 2026-08-04
  display-2  Welcome back, Stacey.
  lead       Eight biomarkers. Sixty-six SNPs. One arc to the next recheck.

  ── hairline rule, full width ──

  ─── HERO ROW ─── (Feature card + Vellum card, 3:2)
  ┌─────────────────────────────┐  ┌──────────────────────┐
  │ FEATURE CARD                 │  │ VELLUM CARD          │
  │ kicker  PRIMARY              │  │ kicker  FOCUS MAP    │
  │ title-1 Fasting Insulin      │  │ [System radar SVG]   │
  │                              │  │                      │
  │ numeric-L 8.92 μIU/mL       │  │                      │
  │ → Target 2–5                │  │                      │
  │                              │  │                      │
  │ [Range strip ────●─────]    │  │                      │
  │ [Cycle ring]    16%         │  │                      │
  │                              │  │                      │
  │ ▶ Berberine titration this  │  │                      │
  │ ▶ Caffeine cutoff 12 PM     │  │                      │
  └─────────────────────────────┘  └──────────────────────┘

  ─── kicker  SYSTEM FOCUS ───
  title-2  Four systems, ranked
  caption  Primary · Secondary · Supporting · Monitored

  4-column grid of Vellum cards, each:
  ┌──────────────────┐
  │ ● Primary chip   │
  │ title-2  System  │
  │ kicker  Biomark  │
  │ numeric-L  8.92  │
  │ → 2–5            │
  │ body-s summary   │
  └──────────────────┘

  ─── kicker  PRIORITY BIOMARKERS ───
  Vellum card, full width, ordered list of range strips, one per row:
  [Name · current · → target]   [Range strip]   [Status chip]

  ─── kicker  TODAY ───
  Two-column: Today's check-in (interactive 8 habits)  +  Editorial note ("Why this matters")

  ─── kicker  PROTOCOL ───
  Vellum card with 5 inset cards in a row — supplements summary.

  ── hairline rule, full width ──

  footer kicker  EDUCATIONAL PORTAL · NOT MEDICAL ADVICE
```

### Composition rules

- **One feature per page** — the largest, serif-dominant element. Don't compete with yourself.
- **Kickers above every section.** They give the page rhythm.
- **Hairline rules at section boundaries** instead of background blocks.
- **Mono numerics for tabular data**, serif numerics for featured data.
- **Bottom of every page** carries the educational disclaimer in `caption` weight — same place every time, like a colophon.

---

## Implementation map

- CSS tokens → `app/globals.css`
- Type utilities → `.editorial-title`, `.editorial-eyebrow` (existing), plus `.kicker`, `.numeric-L`, `.data` (added with this system)
- Primitives → `components/portal/*` (existing) extended with `status-pill.tsx`, `base-pair-chip.tsx`, `codon-ring.tsx`, `helix-accent.tsx`, `delta-indicator.tsx`, `recheck-pill.tsx`
- Showcase → `/style-guide` route. Live demonstration of every element in this document.
