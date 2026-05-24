# PRD: Impact Blueprint Customer Portal

## 1. Product Summary

Build a customer-facing frontend application for customers who receive an Impact Health Systems Blueprint-style report. The app should ingest the report output, display it as an interactive dashboard, and give customers a long-term place to keep using their genetics, biomarkers, supplement protocol, nutrition archetype, and 12-week plan.

The app should turn a static PDF report into a living customer portal.

The uploaded sample report shows a 24-page blueprint organized around:
- A 12-week systems blueprint
- Primary, secondary, and supporting biomarker priorities
- Genetic context by biological system
- Nutrition archetype
- Supplement protocol
- Peptide considerations
- Lifestyle, stress, sleep, and recovery guidance
- Blood work reference table
- Genetic appendix with analyzed SNPs
- A generated plan date and recheck-oriented structure

The product should preserve that structure but make it easier for the customer to act on, revisit, track, and discuss with providers.

This product should not diagnose, treat, cure, or guarantee prevention of disease. It should provide educational, wellness-support, and provider-discussion tools unless a licensed clinical workflow is formally added.

---

## 2. Working Product Name

Internal name: `impact-blueprint-portal`

Customer-facing name options:
- Blueprint Portal
- Impact Blueprint Dashboard
- True North Blueprint Portal
- My Systems Blueprint
- Impact Health Companion

---

## 3. Product Positioning

### Current Report Experience

The customer receives a long PDF with a personalized 12-week plan. The report is valuable, but it is static and easy to forget after the first read.

### Target App Experience

The customer logs in and sees:
- What their primary 12-week focus is
- Which biomarkers matter most right now
- Which genes are relevant to each system
- What supplements and lifestyle actions are part of the protocol
- What to track daily/weekly
- What to ask a provider
- What to recheck after 12 weeks
- How their blueprint evolves over time

The app should make the report feel like an operating system for the customer’s health optimization plan.

---

## 4. Primary Users

## 4.1 Customer

A person who purchased the Impact Health Systems Blueprint or similar full genome + biomarker plan.

Needs:
- Understand their current 12-week focus.
- Know what actions to take.
- Understand why those actions were selected.
- Track adherence.
- Save notes and questions.
- Revisit genetic insights over time.
- Compare current biomarkers to targets.
- Prepare for provider or coach conversations.
- See updated plan cycles after retesting.

## 4.2 Coach / Advisor

A wellness advisor helping the customer execute the 12-week plan.

Needs:
- See customer-authorized plan sections.
- Track adherence and friction.
- Add coaching notes.
- Avoid medical claims.
- Escalate provider-review items.

## 4.3 Provider / Clinician — Future Role

A licensed provider reviewing labs, medications, peptides, contraindications, and clinical risk items.

Needs:
- Review flagged sections.
- Approve or adjust protocols.
- Add notes.
- Track biomarker targets and follow-up testing.
- Review medication/supplement/peptide considerations.

## 4.4 Admin

Internal business user managing customers, uploads, support, and report-processing status.

Needs:
- Upload or import reports.
- Review parsing results.
- Search customer profiles.
- Manage consent.
- Audit access.
- Handle failed report imports.

---

## 5. Product Goals

## 5.1 MVP Goals

1. Ingest or simulate ingestion of an Impact-style PDF report.
2. Convert the static report into structured frontend sections.
3. Display the customer’s 12-week system focus.
4. Display primary, secondary, supporting, and monitored biomarkers.
5. Display gene/SNP information by biological category.
6. Display supplement protocol with dose, timing, purpose, and notes.
7. Display nutrition archetype and plan rationale.
8. Display lifestyle, stress, sleep, and recovery recommendations.
9. Display peptide considerations as provider-discussion-only content.
10. Give customers a daily/weekly execution tracker.
11. Give customers a 12-week recheck roadmap.
12. Create a foundation for coach/provider workflows later.

## 5.2 Business Goals

1. Increase perceived value of the genetic/bloodwork product.
2. Reduce customer overwhelm after receiving the report.
3. Improve adherence to the 12-week protocol.
4. Create recurring engagement around 12-week plan cycles.
5. Create upsell paths for coaching, provider consults, labs, supplements, and retesting.
6. Differentiate from generic genetic reports by giving users an actionable portal.

---

## 6. MVP Non-Goals

The MVP should not:
- Diagnose disease.
- Provide prescription decisions.
- Recommend peptides, GLP-1s, hormones, or medications directly to the user.
- Allow customers to change prescription/medical protocols without provider review.
- Perform real clinical interpretation from raw VCF files.
- Store real raw genome files unless production-grade privacy and security are implemented.
- Replace a provider or genetic counselor.
- Make claims that supplements or interventions treat disease.
- Use scary or deterministic genetic language.

---

## 7. Sample Report Structure To Support

The uploaded example report should be treated as the first known source format.

The app should support extracting or manually entering the following sections.

## 7.1 Report Metadata

Fields:
- Customer name
- Report title
- Report system name
- Generated date
- Current 12-week cycle start date
- Current 12-week cycle end date
- Report version
- Source PDF

Example:
- Title: Impact Health Systems Blueprint
- Generated date: 2026-05-12
- Plan type: 12-week systems blueprint

## 7.2 System Focus Summary

The report uses a hierarchy:
- Primary system focus
- Secondary system focus
- Supporting systems
- Monitored systems

Example from sample:
- Primary: Glucose & Insulin Control via fasting insulin
- Secondary: Iron Status via ferritin
- Supporting: Lipoprotein & Cardiovascular Risk via ApoB
- Foundational support: Vitamin D-related markers
- Other monitored biomarkers: hs-CRP, fasting glucose, HbA1c, homocysteine, vitamin D

The dashboard should show this hierarchy prominently.

## 7.3 Biomarker Targets

Each biomarker should include:
- Name
- Current value
- Unit
- Optimal range
- 12-week target
- Status
- Role in current plan
- Related system
- Related genes/SNPs
- Suggested recheck timing

Example biomarkers to support:
- hs-CRP
- Fasting insulin
- Fasting glucose
- HbA1c
- Homocysteine
- Ferritin
- ApoB
- Vitamin D

## 7.4 Biological Systems

The app should structure insights around biological systems, not just genes.

Initial system categories:
- Systemic inflammation
- Glucose & insulin control
- Lipoprotein & cardiovascular risk
- Methylation & cellular repair
- Foundational support / vitamin D
- Iron status
- Lifestyle, stress & recovery
- Circadian rhythm & sleep
- Caffeine metabolism
- Stress & cortisol
- Mitochondrial function
- Gut/digestion
- Appetite/metabolism
- Connective tissue
- Oxidative stress
- Omega-3 metabolism

Each system should support:
- Why it matters
- What happens if ignored
- How the plan addresses it
- Genetic context
- Related biomarkers
- Related action items
- Provider discussion prompts

## 7.5 Genetic Appendix / SNP Library

The sample report includes a genetic appendix with 66 SNPs across 10 biological categories.

The app should support a searchable SNP library.

Each SNP record should include:
- Gene
- RS number
- Category
- What it affects
- User result/genotype
- Effect allele, if available
- Plain-English explanation
- Related system
- Related biomarker
- Evidence level
- Actionability level
- Review status

Categories from sample:
- Lipid handling
- Inflammation
- Methylation
- Insulin/glucose
- Vitamin D
- Iron metabolism
- Omega-3 metabolism
- Gut/digestion
- Appetite/metabolism
- Connective tissue
- Stress & recovery
- Oxidative stress
- Caffeine metabolism
- Circadian rhythm & sleep
- Stress & cortisol
- Mitochondrial function
- Other

---

## 8. Core MVP Screens

## 8.1 Login / Signup

Basic auth UI:
- Email
- Password
- Forgot password
- Account creation

For prototype, auth can be mocked.

## 8.2 Onboarding

Flow:
1. Welcome
2. Consent
3. Profile confirmation
4. Upload/import report
5. Processing
6. Blueprint generated
7. Dashboard intro

## 8.3 Report Upload / Ingestion

Users or admins can upload:
- PDF blueprint report
- CSV biomarker file
- JSON structured report, future
- Manual entry, future

For MVP:
- Accept PDF upload.
- Show upload file metadata.
- Simulate processing states.
- Populate app using mock structured data based on the sample report format.
- Do not perform real medical interpretation.

Processing states:
- Uploaded
- Reading report
- Detecting sections
- Extracting biomarkers
- Extracting genetic categories
- Building 12-week plan
- Ready for review

## 8.4 Dashboard Overview

The dashboard should show:

### Header
- Customer name
- Current blueprint cycle
- Days remaining in 12-week plan
- Generated date
- Plan status

### Top Cards
1. Primary Focus
2. Secondary Focus
3. Supporting System
4. Next Recheck

### Progress Module
- 12-week progress bar
- Weekly check-in status
- Supplement adherence
- Nutrition adherence
- Movement/recovery adherence

### Priority Snapshot
- Current fasting insulin vs target
- Current ferritin vs target
- Current ApoB vs target
- Vitamin D status
- Monitored biomarkers

### Next Best Actions
- Start/continue supplement protocol
- Track protein/fiber/carbs
- Log sleep/recovery
- Prepare provider questions
- Schedule 12-week retest

## 8.5 Systems Page

A systems-level view of the customer’s blueprint.

Each system card:
- System name
- Status: primary, secondary, supporting, monitored
- Primary biomarker
- Current value
- Target value
- Related genes
- Main strategy
- View details button

Detail page sections:
- Why it matters
- What happens if ignored
- How we’re addressing it
- Genetic context
- Action summary
- Related supplement/lifestyle steps
- Provider questions

## 8.6 Biomarkers Page

Display a table and cards for all biomarkers.

Table columns:
- Biomarker
- Current result
- Optimal range
- 12-week target
- Status
- System
- Last tested
- Recheck due

Add visual states:
- Primary focus
- Secondary focus
- Elevated / below optimal
- Within optimal range
- Monitored

Charts:
- For MVP, include simple placeholder line charts for future trend tracking.
- Allow "Add new result" placeholder.

## 8.7 Genetics Page

A searchable/filterable genetic appendix.

Filters:
- Category
- Gene
- RS number
- System
- Actionability
- Requires provider review

Each row:
- Gene
- RS number
- What it affects
- User result
- Category
- Related system

Clicking a row opens:
- Plain-English explanation
- Related biomarkers
- Related plan actions
- Evidence/limitations
- Provider discussion prompt

## 8.8 Nutrition Archetype Page

The sample report includes a nutrition archetype, such as "Carb Controller."

The app should support:
- Archetype name
- Short tagline
- Why this fits the user
- Core principles
- Foods/practices to emphasize
- Foods/practices to moderate
- Carb timing guidance
- Cardiovascular optimization note
- Weekly adherence tracker

Example archetype fields:
- Name: Carb Controller
- Goal: Stabilize blood sugar and restore metabolic flexibility
- Strategy: Structured carbohydrate intake, higher protein emphasis, controlled portions, strategic carb timing around training
- Related biomarkers: fasting insulin, fasting glucose, HbA1c, ApoB
- Related genes: TCF7L2, PPARG, SLC2A2, FTO, MTNR1B

## 8.9 Supplement Protocol Page

The sample report includes a protocol with:
- Omega-3s
- Berberine
- Methylated B-complex
- Soluble fiber
- Iron per provider recommendation

Each supplement card should include:
- Name
- Dose
- Timing
- Primary purpose
- Why included
- Practical notes
- Related system
- Related biomarker
- Safety note
- Provider review flag
- Adherence checkbox/log

Important:
- Supplements should be presented as part of the uploaded blueprint, not independently prescribed by the app.
- Iron and medication-interacting supplements should be flagged as provider-dependent.
- Berberine should include a warning to discuss with a provider if using diabetes medications or glucose-lowering therapy.

## 8.10 Peptide Considerations Page

The sample report includes a "Peptide Considerations" section.

This must be handled cautiously.

The app should:
- Display this as informational/provider-discussion-only.
- Require a prominent disclaimer.
- Avoid direct calls to buy or start peptides.
- Include "Discuss with provider" CTA, not "Start."
- Distinguish between report content and app-generated advice.

Example peptide categories:
- Metabolic support
- Recovery & neurological support

Example items from sample:
- Semaglutide
- Tirzepatide
- Retatrutide
- MOTS-C
- DSIP
- Semax / Selank

Required disclaimer:
> Peptide and prescription-related content is informational only and requires provider evaluation, prescription where applicable, and monitoring. Nothing in this portal is a recommendation or prescription.

## 8.11 Lifestyle, Stress & Recovery Page

The sample report includes a dedicated recovery section based on reported concern and genetic context.

Subsections:
- Neurotransmitter & stress recovery
- Caffeine metabolism
- Circadian rhythm & sleep
- Stress & cortisol response
- Mitochondrial & cellular energy

The app should support:
- Recovery profile summary
- Caffeine timing guidance
- Sleep timing / chronotype notes
- Stress off-ramp practice tracker
- Morning light exposure tracker
- NSDR/breathwork/meditation tracker
- Recovery notes

Important:
- Phrase as suggestions to test and discuss, not guaranteed outcomes.

## 8.12 12-Week Plan Tracker

This should be the core retention feature.

Weekly structure:
- Week 1: Baseline setup
- Week 2: Nutrition consistency
- Week 3: Supplement titration
- Week 4: Sleep/recovery checkpoint
- Week 5: Fiber/protein consistency
- Week 6: Midpoint review
- Week 7: Movement/cardio consistency
- Week 8: Stress off-ramp consistency
- Week 9: Provider question prep
- Week 10: Retest planning
- Week 11: Final push
- Week 12: Recheck and next-cycle planning

Each week should include:
- Focus
- Tasks
- Adherence checkboxes
- Notes
- Barriers
- Coach comments, future
- Provider escalation, future

Daily/weekly tracking:
- Supplements taken
- Protein target met
- Fiber target met
- Carb timing followed
- Zone 2/cardio completed
- Sleep target met
- Caffeine cutoff met
- Stress off-ramp completed

## 8.13 Provider Questions Page

Users can save and export questions.

Question sources:
- Biomarker cards
- Genetic insights
- Supplement protocol
- Peptide considerations
- Recovery plan
- User-created questions

Examples:
- "Given my fasting insulin and genetic context, what labs should we recheck in 12 weeks?"
- "Is berberine appropriate for me considering my medications and glucose levels?"
- "Does my ferritin level require further evaluation before starting iron?"
- "Given my ApoB and lipid-related genes, should I monitor ApoB, Lp(a), LDL-C, or other cardiovascular markers?"
- "Are any peptide or GLP-1 options medically appropriate for me, or should we focus on lifestyle first?"
- "Should I modify caffeine timing based on sleep quality and recovery?"

Export options:
- Copy to clipboard
- Download PDF placeholder
- Email to provider placeholder

## 8.14 Reports Library

Display:
- Original uploaded blueprint PDF
- Parsed structured blueprint
- Biomarker table
- Genetic appendix
- Supplement plan
- Provider questions
- 12-week summary
- Future annual or cycle reports

Fields:
- Title
- Type
- Date
- Status
- Source
- Download/view button

## 8.15 Privacy & Consent Center

Because the app handles genetic and health-related data, consent must be explicit.

Sections:
- Uploaded data
- Genetic data
- Bloodwork/biomarker data
- Supplement/protocol data
- Coach access
- Provider access
- AI summaries
- Data deletion request
- Download my data
- Sharing permissions

Consent toggles:
- Allow AI summaries
- Allow coach access
- Allow provider access
- Allow admin support access
- Allow anonymized product improvement
- Allow marketing communication
- Allow data retention for future plan cycles

---

## 9. Data Models

## 9.1 BlueprintReport

```ts
type BlueprintReport = {
  id: string;
  userId: string;
  title: string;
  sourceFileName?: string;
  generatedDate?: string;
  cycleStartDate?: string;
  cycleEndDate?: string;
  status: "uploaded" | "processing" | "processed" | "needs_review" | "failed";
  reportVersion?: string;
  createdAt: string;
  updatedAt: string;
};
```

## 9.2 SystemFocus

```ts
type SystemFocus = {
  id: string;
  reportId: string;
  systemName: string;
  role: "primary" | "secondary" | "supporting" | "monitored";
  biomarkerName?: string;
  currentValue?: string;
  targetValue?: string;
  summary: string;
  whyItMatters?: string;
  whatHappensIfIgnored?: string;
  howAddressingIt?: string;
  relatedGeneIds?: string[];
  relatedActionIds?: string[];
};
```

## 9.3 Biomarker

```ts
type Biomarker = {
  id: string;
  reportId: string;
  name: string;
  currentValue: number | string;
  unit?: string;
  optimalRange?: string;
  target12Week?: string;
  status: "primary_focus" | "secondary_focus" | "supporting" | "monitored" | "within_optimal" | "elevated" | "below_optimal";
  systemName?: string;
  lastTestedAt?: string;
  recheckDueAt?: string;
};
```

## 9.4 GeneticMarker

```ts
type GeneticMarker = {
  id: string;
  reportId: string;
  category: string;
  gene: string;
  rsNumber: string;
  whatItAffects: string;
  userResult: string;
  effectAllele?: string;
  explanation?: string;
  relatedSystem?: string;
  relatedBiomarkers?: string[];
  evidenceLevel?: "strong" | "moderate" | "limited" | "mixed" | "unknown";
  actionabilityLevel?: "informational" | "lifestyle_context" | "lab_context" | "provider_discussion" | "provider_review_required";
};
```

## 9.5 NutritionArchetype

```ts
type NutritionArchetype = {
  id: string;
  reportId: string;
  name: string;
  tagline: string;
  summary: string;
  whyItFits: string;
  corePrinciples: string[];
  cardiovascularNote?: string;
  relatedBiomarkers: string[];
  relatedGenes: string[];
};
```

## 9.6 SupplementProtocolItem

```ts
type SupplementProtocolItem = {
  id: string;
  reportId: string;
  name: string;
  dailyDose: string;
  timing: string;
  primaryPurpose: string;
  whyIncluded?: string;
  practicalNotes?: string;
  relatedSystems: string[];
  relatedBiomarkers: string[];
  providerDependent: boolean;
  safetyNote?: string;
};
```

## 9.7 PeptideConsideration

```ts
type PeptideConsideration = {
  id: string;
  reportId: string;
  name: string;
  category: "metabolic_support" | "recovery_neurological_support" | "other";
  triggerReason?: string;
  description: string;
  providerRequired: true;
  disclaimer: string;
};
```

## 9.8 PlanTask

```ts
type PlanTask = {
  id: string;
  reportId: string;
  weekNumber?: number;
  title: string;
  category: "nutrition" | "supplement" | "movement" | "sleep" | "stress" | "provider" | "labs" | "education";
  description?: string;
  frequency: "daily" | "weekly" | "one_time";
  completed?: boolean;
  completedAt?: string;
};
```

## 9.9 ProviderQuestion

```ts
type ProviderQuestion = {
  id: string;
  reportId: string;
  sourceType: "biomarker" | "genetic_marker" | "supplement" | "peptide" | "system" | "user_created";
  sourceId?: string;
  question: string;
  status: "saved" | "asked" | "answered";
  providerResponse?: string;
  createdAt: string;
  updatedAt: string;
};
```

## 9.10 ConsentSettings

```ts
type ConsentSettings = {
  userId: string;
  allowAISummaries: boolean;
  allowCoachAccess: boolean;
  allowProviderAccess: boolean;
  allowAdminSupportAccess: boolean;
  allowAnonymizedImprovement: boolean;
  allowMarketing: boolean;
  allowDataRetentionForFutureCycles: boolean;
  consentVersion: string;
  updatedAt: string;
};
```

---

## 10. Mock Data For MVP

Use the following seed data based on the sample report structure. Values are examples and must be clearly marked as mock/demo unless using real parsed customer data.

```ts
export const mockBiomarkers = [
  {
    id: "bio_fast_insulin",
    name: "Fasting Insulin",
    currentValue: 8.92,
    unit: "µIU/mL",
    optimalRange: "2–5 µIU/mL",
    target12Week: "2–5 µIU/mL",
    status: "primary_focus",
    systemName: "Glucose & Insulin Control"
  },
  {
    id: "bio_ferritin",
    name: "Ferritin",
    currentValue: 21.7,
    unit: "ng/mL",
    optimalRange: "50–150 ng/mL",
    target12Week: "50–150 ng/mL",
    status: "secondary_focus",
    systemName: "Iron Status"
  },
  {
    id: "bio_apob",
    name: "ApoB",
    currentValue: 81,
    unit: "mg/dL",
    optimalRange: "< 60 mg/dL",
    target12Week: "< 60 mg/dL",
    status: "supporting",
    systemName: "Lipoprotein & Cardiovascular Risk"
  },
  {
    id: "bio_vitamin_d",
    name: "Vitamin D",
    currentValue: 65.19,
    unit: "ng/mL",
    optimalRange: "50–70 ng/mL",
    target12Week: "50–70 ng/mL",
    status: "within_optimal",
    systemName: "Foundational Support"
  }
];
```

```ts
export const mockSupplementProtocol = [
  {
    id: "supp_omega3",
    name: "Omega-3s (EPA/DHA)",
    dailyDose: "2–3g combined EPA/DHA daily",
    timing: "With meals, can split AM/PM",
    primaryPurpose: "Anti-inflammatory, cardiovascular, recovery",
    providerDependent: false
  },
  {
    id: "supp_berberine",
    name: "Berberine",
    dailyDose: "500mg 2–3x daily with meals",
    timing: "With meals, titrate up from 500mg 1x daily",
    primaryPurpose: "Insulin sensitivity, metabolic support",
    providerDependent: true,
    safetyNote: "Discuss with a provider if taking diabetes medications or glucose-lowering therapy."
  },
  {
    id: "supp_bcomplex",
    name: "Methylated B-Complex",
    dailyDose: "1 capsule daily",
    timing: "Morning with food",
    primaryPurpose: "Methylation support, homocysteine clearance",
    providerDependent: false
  },
  {
    id: "supp_fiber",
    name: "Soluble Fiber",
    dailyDose: "7–10g/day",
    timing: "Split across meals, titrate slowly",
    primaryPurpose: "ApoB reduction, gut health, blood sugar",
    providerDependent: false
  },
  {
    id: "supp_iron",
    name: "Iron",
    dailyDose: "Per provider recommendation",
    timing: "As directed by provider",
    primaryPurpose: "Iron repletion",
    providerDependent: true
  }
];
```

```ts
export const mockNutritionArchetype = {
  id: "arch_carb_controller",
  name: "Carb Controller",
  tagline: "Stabilize Blood Sugar, Restore Metabolic Flexibility",
  summary:
    "Structured carbohydrate intake, higher protein emphasis, controlled portions, and strategic carb timing around training.",
  whyItFits:
    "This archetype matches the current insulin/glucose pattern and relevant genetic context.",
  relatedBiomarkers: ["Fasting Insulin", "Fasting Glucose", "HbA1c", "ApoB"],
  relatedGenes: ["TCF7L2", "PPARG", "SLC2A2", "FTO", "MTNR1B"]
};
```

---

## 11. AI Features

## 11.1 MVP

Use template-based explanations only.

Possible template outputs:
- Explain biomarker in plain English.
- Explain why a system is primary/secondary/supporting.
- Generate provider questions.
- Generate weekly check-in summary.
- Generate customer-friendly report summary.

Do not build autonomous medical interpretation.

## 11.2 Future AI

Future AI may:
- Summarize uploaded reports.
- Extract structured data from PDFs.
- Draft provider questions.
- Compare prior and current 12-week cycles.
- Detect missing information.
- Create coach-facing adherence summaries.
- Create provider-facing review summaries.

Future AI must include:
- Human review for clinical content.
- Strict prompt guardrails.
- Clear disclaimers.
- No independent prescribing/treatment instructions.
- Audit logs for generated content.

---

## 12. Safety, Compliance, and Language Guardrails

## 12.1 Required Safety Patterns

Use:
- "May be associated with"
- "Can help inform a discussion"
- "Consider discussing with a qualified provider"
- "This should be interpreted alongside labs, history, and symptoms"
- "This is not a diagnosis"
- "Do not change medications or prescribed treatment without a provider"

Avoid:
- "You have..."
- "This means you will..."
- "This cures..."
- "Start taking..."
- "You need..."
- "This prevents disease"
- "This replaces your doctor"

## 12.2 Peptide / Prescription Content

All peptide or GLP-1 related content must:
- Be separated from general wellness recommendations.
- Be marked provider-required.
- Use educational language only.
- Avoid direct purchasing prompts.
- Avoid dosage instructions unless the report includes provider-authorized dosing and the app has provider-review status.

## 12.3 Supplement Content

Supplement content must:
- Be shown as report-derived protocol content.
- Include safety notes.
- Flag provider-dependent items.
- Flag possible interaction areas.
- Not override medical care.

## 12.4 Genetic Content

Genetic content must:
- Include uncertainty.
- Avoid deterministic interpretation.
- Link genes to systems and biomarkers.
- Provide plain-English explanations.
- Include "what this does not mean" where possible.

---

## 13. UI/UX Direction

The UI should feel:
- Premium
- Calm
- Trustworthy
- High-end wellness/medical-adjacent
- Clear and structured
- Less like a PDF viewer and more like a guided operating system

Style:
- Clean dashboard
- Navy/charcoal text
- Soft off-white background
- Muted teal/green/blue accents
- Rounded cards
- Status badges
- Progress bars
- Simple charts
- Clear section hierarchy

Avoid:
- Fear-based warnings
- Overly dense tables without summaries
- Raw genetic data as the primary experience
- Overpromising longevity claims
- Biohacker clutter

---

## 14. Recommended Frontend Stack

Use:
- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- lucide-react
- Recharts
- Local mock data for MVP

Optional:
- Zustand for local state
- React Hook Form for forms
- Zod for validation

---

## 15. Build Priorities For Claude/Cursor

## Priority 1 — Core Prototype

Build:
- App shell
- Sidebar nav
- Dashboard overview
- Upload/processing flow
- Systems page
- Biomarkers page
- Supplement protocol page
- Nutrition archetype page
- Provider questions page
- Reports library
- Privacy center

## Priority 2 — Retention Layer

Build:
- 12-week tracker
- Weekly tasks
- Daily adherence checkboxes
- Recovery tracker
- Supplement tracker
- Recheck countdown

## Priority 3 — Depth Layer

Build:
- Genetics/SNP appendix page
- Search/filter SNPs
- System detail pages
- Peptide considerations page
- Timeline page
- Export provider questions

## Priority 4 — Future Role Views

Build placeholders:
- Coach view
- Provider review view
- Admin import/review dashboard
- Audit log
- Consent management

---

## 16. Acceptance Criteria

The MVP is successful when:

1. A user can upload a PDF and see a simulated processing flow.
2. The app displays a structured dashboard based on the report format.
3. The app clearly shows primary, secondary, supporting, and monitored systems.
4. The app displays biomarkers with current values and targets.
5. The app displays a supplement protocol with dose, timing, purpose, and safety flags.
6. The app displays a nutrition archetype page.
7. The app displays lifestyle/recovery guidance.
8. The app displays provider questions.
9. The app includes a 12-week tracker.
10. The app includes a privacy/consent center.
11. The app avoids direct medical/prescriptive claims.
12. The app looks polished enough for a customer demo.

---

## 17. Future Product Opportunities

After MVP:
- Real PDF parsing
- Structured report import API
- Customer mobile app
- Coach dashboard
- Provider review workflow
- Lab retest ordering flow
- Supplement fulfillment integration
- 12-week progress report
- Annual blueprint review
- Wearable integration
- Meal planning integration
- Secure messaging
- Provider visit prep packet
- Customer referral program
- Multi-cycle biomarker trend analytics

---

## 18. Claude Implementation Prompt

Build a polished frontend MVP for an Impact-style health blueprint portal using Next.js, TypeScript, Tailwind, shadcn/ui, lucide-react, and Recharts.

The app should convert a static 12-week genetic + biomarker blueprint report into an interactive customer portal.

Do not build real medical interpretation. Use mock structured data.

Core pages:
- Dashboard
- Upload/processing
- Systems
- Biomarkers
- Genetics/SNP Appendix
- Nutrition Archetype
- Supplement Protocol
- Peptide Considerations
- Lifestyle/Stress/Recovery
- 12-Week Tracker
- Provider Questions
- Reports
- Privacy & Consent

Design:
- Premium, calm, trustworthy, medical-adjacent.
- Use cards, badges, tabs, progress bars, simple charts, and clean tables.
- Mobile responsive.
- Strong empty/loading states.
- Clear disclaimers.

Safety:
- No diagnosis.
- No treatment claims.
- No direct peptide or prescription recommendations.
- Mark provider-required content clearly.
- Present genetics as context, not destiny.
- Use provider-discussion language.

Use the mock data and data models in this PRD as the basis for the first prototype.
