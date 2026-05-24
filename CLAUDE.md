# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository status

This repo is **spec-only**. There is no application code, no `package.json`, and no build/test/lint commands yet. The single source of truth is `prd_impact_blueprint_portal_revised.md` — read it before doing any implementation work.

Internal project name: `impact-blueprint-portal`.

## What this product is

A customer-facing frontend that turns a static 24-page "Impact Health Systems Blueprint" PDF (genetics + biomarkers + 12-week plan) into an interactive portal. The PDF format the app must support is described in PRD §7. The MVP uses **mock structured data** — it does not perform real PDF parsing or medical interpretation (PRD §6, §8.3).

## Stack (when scaffolding)

Per PRD §14, use Next.js + TypeScript + Tailwind + shadcn/ui + lucide-react + Recharts, with local mock data. Optional: Zustand, React Hook Form, Zod. Do not introduce a backend, database, or auth provider for the MVP — auth can be mocked (§8.1).

## Build order

When implementing, follow the priority tiers in PRD §15 — don't build deep features before the shell exists:

1. **Core prototype**: app shell, sidebar, dashboard, upload/processing flow, systems, biomarkers, supplements, nutrition archetype, provider questions, reports library, privacy center.
2. **Retention layer**: 12-week tracker, weekly tasks, daily adherence, recovery/supplement trackers, recheck countdown.
3. **Depth layer**: SNP appendix search/filter, system detail pages, peptide considerations, timeline, export.
4. **Future role views**: coach, provider review, admin, audit log, consent management (placeholders only).

Data models for every entity (BlueprintReport, SystemFocus, Biomarker, GeneticMarker, NutritionArchetype, SupplementProtocolItem, PeptideConsideration, PlanTask, ProviderQuestion, ConsentSettings) are defined in PRD §9 — use those types verbatim. Seed mock data is in §10.

## Non-negotiable safety guardrails

This is medical-adjacent wellness content. PRD §12 is binding for all generated copy, UI strings, and AI templates:

- **Never** write "you have…", "this means you will…", "start taking…", "you need…", "this prevents/cures…", or any deterministic genetic language.
- **Always** frame as "may be associated with", "consider discussing with a qualified provider", "this is not a diagnosis".
- **Peptide and GLP-1 content** (§8.10, §12.2): informational only, provider-required badge, no purchase CTAs, no dosing unless provider-authorized. The CTA is "Discuss with provider", never "Start".
- **Supplements** (§8.9, §12.3): presented as report-derived protocol, not app recommendations. Berberine and iron must carry provider-dependent flags.
- **Genetics** (§12.4): always paired with uncertainty and "what this does not mean". Genes link to systems and biomarkers, not outcomes.
- **AI features** (§11): MVP is template-based only. No autonomous medical interpretation.

The disclaimer text for peptides is quoted verbatim in §8.10 — use it as-is.

## UI direction

PRD §13: premium, calm, trustworthy, medical-adjacent. Navy/charcoal text, soft off-white background, muted teal/green/blue accents, rounded cards, status badges. Avoid fear-based warnings, dense raw-data tables, biohacker clutter.

## When in doubt

The PRD is detailed and opinionated. If a question is answered there, follow it. If it isn't, prefer the more conservative interpretation on anything that touches medical, genetic, supplement, or peptide content.
