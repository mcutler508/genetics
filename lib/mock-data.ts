// Mock data derived from the Impact Health Systems Blueprint sample report
// (Stacey Cutler, generated 2026-05-12). Used to power the MVP portal.
// Educational only — no medical advice.

export type BiomarkerStatus =
  | "primary_focus"
  | "secondary_focus"
  | "supporting"
  | "monitored"
  | "elevated"
  | "within_optimal";

export type Biomarker = {
  id: string;
  name: string;
  currentValue: string;
  unit: string;
  optimalRange: string;
  target12Week: string;
  status: BiomarkerStatus;
  systemName: string;
  trendDirection?: "improving" | "stable" | "worsening";
};

export type SystemRole = "primary" | "secondary" | "supporting" | "monitored";

export type SystemFocus = {
  id: string;
  systemName: string;
  role: SystemRole;
  biomarkerName: string;
  currentValue: string;
  targetValue: string;
  summary: string;
  whyItMatters: string;
  whatHappensIfIgnored: string;
  howAddressingIt: string;
  relatedGenes: string[];
};

export type SupplementItem = {
  id: string;
  name: string;
  dailyDose: string;
  timing: string;
  primaryPurpose: string;
  whyIncluded: string;
  practicalNotes: string;
  relatedSystems: string[];
  providerDependent: boolean;
  safetyNote?: string;
};

export type NutritionArchetype = {
  id: string;
  name: string;
  tagline: string;
  summary: string;
  whyItFits: string;
  corePrinciples: string[];
  cardiovascularNote: string;
  relatedBiomarkers: string[];
  relatedGenes: string[];
};

export type GeneticMarker = {
  id: string;
  gene: string;
  rsNumber: string;
  category: string;
  whatItAffects: string;
  userResult: string;
};

export type PeptideConsideration = {
  id: string;
  name: string;
  category: "metabolic_support" | "recovery_neurological_support";
  description: string;
};

export const customer = {
  name: "Stacey Cutler",
  reportTitle: "Impact Health Systems Blueprint",
  generatedDate: "2026-05-12",
  cycleStartDate: "2026-05-12",
  cycleEndDate: "2026-08-04",
  cycleWeeksTotal: 12,
  cycleWeeksElapsed: 2,
  reportSystemName: "True North Operating System",
};

export const systemFocus: SystemFocus[] = [
  {
    id: "sys_glucose",
    systemName: "Glucose & Insulin Control",
    role: "primary",
    biomarkerName: "Fasting Insulin",
    currentValue: "8.92 μIU/mL",
    targetValue: "2–5 μIU/mL",
    summary: "Lower fasting insulin to restore metabolic flexibility.",
    whyItMatters:
      "Insulin is a key metabolic lever. When fasting insulin is elevated, the body stays in storage mode — making it harder to burn fat, regulate appetite, and sustain energy between meals.",
    whatHappensIfIgnored:
      "Elevated insulin quietly works against you. Fat loss stalls, hunger becomes harder to manage, and over time the pancreas works harder to compensate.",
    howAddressingIt:
      "Nutrition structure designed to reduce insulin demand — protein, fiber, and healthy fats with carbohydrate timing. Berberine to improve insulin sensitivity. Movement and meal-timing strategies to support glucose clearance.",
    relatedGenes: ["TCF7L2", "FTO", "SLC2A2", "PPARG", "MTNR1B", "GCK", "MC4R"],
  },
  {
    id: "sys_iron",
    systemName: "Iron Status",
    role: "secondary",
    biomarkerName: "Ferritin",
    currentValue: "21.7 ng/mL",
    targetValue: "50–150 ng/mL",
    summary: "Replete iron stores to restore energy and recovery capacity.",
    whyItMatters:
      "Ferritin reflects iron storage. When out of range — too low or too high — it quietly undermines oxygen delivery, energy production, and recovery capacity.",
    whatHappensIfIgnored:
      "If we address the primary target but ignore iron status, fatigue and poor recovery may persist regardless of other improvements.",
    howAddressingIt:
      "Iron management included based on current levels and genetic risk profile. Recheck at 12 weeks to confirm response.",
    relatedGenes: ["HFE", "TF"],
  },
  {
    id: "sys_cardio",
    systemName: "Lipoprotein & Cardiovascular Risk",
    role: "supporting",
    biomarkerName: "ApoB",
    currentValue: "81 mg/dL",
    targetValue: "< 60 mg/dL",
    summary: "Reduce atherogenic particle burden through fiber and fat quality.",
    whyItMatters:
      "ApoB counts the atherogenic particles in your blood — vehicles that deposit cholesterol into arterial walls. It's a more accurate predictor of cardiovascular risk than LDL cholesterol alone.",
    whatHappensIfIgnored:
      "Elevated ApoB is silent — plaque accumulates slowly but relentlessly, narrowing arteries and increasing risk over time.",
    howAddressingIt:
      "Soluble fiber to increase LDL receptor activity, omega-3s for lipid metabolism, manage saturated fat intake, consider Zone 2 cardio.",
    relatedGenes: ["APOE", "LDLR", "APOB", "CETP", "LPA", "PCSK9", "HMGCR", "SORT1"],
  },
  {
    id: "sys_foundational",
    systemName: "Foundational Support",
    role: "monitored",
    biomarkerName: "Vitamin D",
    currentValue: "65.19 ng/mL",
    targetValue: "50–70 ng/mL",
    summary: "Vitamin D within optimal range — maintain through current habits.",
    whyItMatters:
      "Vitamin D supports immune function, bone health, mood regulation, and methylation. Levels are dialed in.",
    whatHappensIfIgnored:
      "Drift from optimal range over winter months can quietly affect multiple systems.",
    howAddressingIt:
      "Maintain current sun exposure and dietary patterns. Recheck at 12 weeks.",
    relatedGenes: ["VDR", "DHCR7", "GC", "CYP2R1"],
  },
];

export const biomarkers: Biomarker[] = [
  {
    id: "bio_hscrp",
    name: "hs-CRP",
    currentValue: "<0.20",
    unit: "mg/L",
    optimalRange: "< 1.0 mg/L",
    target12Week: "< 1.0 mg/L",
    status: "monitored",
    systemName: "Systemic Inflammation",
    trendDirection: "stable",
  },
  {
    id: "bio_fast_insulin",
    name: "Fasting Insulin",
    currentValue: "8.92",
    unit: "μIU/mL",
    optimalRange: "2–5 μIU/mL",
    target12Week: "2–5 μIU/mL",
    status: "primary_focus",
    systemName: "Glucose & Insulin Control",
    trendDirection: "improving",
  },
  {
    id: "bio_fast_glucose",
    name: "Fasting Glucose",
    currentValue: "79",
    unit: "mg/dL",
    optimalRange: "70–90 mg/dL",
    target12Week: "70–90 mg/dL",
    status: "monitored",
    systemName: "Glucose & Insulin Control",
    trendDirection: "stable",
  },
  {
    id: "bio_hba1c",
    name: "HbA1c",
    currentValue: "5.3",
    unit: "%",
    optimalRange: "< 5.4%",
    target12Week: "< 5.4%",
    status: "monitored",
    systemName: "Glucose & Insulin Control",
    trendDirection: "stable",
  },
  {
    id: "bio_homocysteine",
    name: "Homocysteine",
    currentValue: "6.24",
    unit: "μmol/L",
    optimalRange: "< 9 μmol/L",
    target12Week: "< 9 μmol/L",
    status: "monitored",
    systemName: "Methylation",
    trendDirection: "stable",
  },
  {
    id: "bio_ferritin",
    name: "Ferritin",
    currentValue: "21.7",
    unit: "ng/mL",
    optimalRange: "50–150 ng/mL",
    target12Week: "50–150 ng/mL",
    status: "secondary_focus",
    systemName: "Iron Status",
    trendDirection: "improving",
  },
  {
    id: "bio_apob",
    name: "ApoB",
    currentValue: "81",
    unit: "mg/dL",
    optimalRange: "< 60 mg/dL",
    target12Week: "< 60 mg/dL",
    status: "elevated",
    systemName: "Lipoprotein & Cardiovascular Risk",
    trendDirection: "improving",
  },
  {
    id: "bio_vitamin_d",
    name: "Vitamin D",
    currentValue: "65.19",
    unit: "ng/mL",
    optimalRange: "50–70 ng/mL",
    target12Week: "50–70 ng/mL",
    status: "within_optimal",
    systemName: "Foundational Support",
    trendDirection: "stable",
  },
];

export const supplements: SupplementItem[] = [
  {
    id: "supp_omega3",
    name: "Omega-3s (EPA/DHA)",
    dailyDose: "2–3g combined EPA/DHA daily",
    timing: "With meals, can split AM/PM",
    primaryPurpose: "Anti-inflammatory, cardiovascular, recovery",
    whyIncluded:
      "Omega-3s are foundational for managing inflammation, supporting cardiovascular health, and optimizing cell membrane function. EPA and DHA modulate inflammatory signaling and improve lipid profiles.",
    practicalNotes:
      "Look for ≥1g EPA + 1g DHA combined per serving. Triglyceride form is better absorbed than ethyl ester. Taking with meals and freezing capsules helps with fishy burps. Algae-based EPA/DHA works for vegetarians.",
    relatedSystems: ["Lipoprotein & Cardiovascular Risk", "Systemic Inflammation"],
    providerDependent: false,
  },
  {
    id: "supp_berberine",
    name: "Berberine",
    dailyDose: "500mg 2–3x daily with meals",
    timing: "With meals, titrate up from 500mg 1x daily",
    primaryPurpose: "Insulin sensitivity, metabolic support",
    whyIncluded:
      "Berberine activates AMPK — the same metabolic switch triggered by exercise and caloric restriction. Research shows it meaningfully improves insulin sensitivity.",
    practicalNotes:
      "Start low and titrate — GI upset is common at full dose. Can take 2–4 weeks to see full effect on fasting insulin.",
    relatedSystems: ["Glucose & Insulin Control"],
    providerDependent: true,
    safetyNote:
      "May lower blood sugar. Discuss with a provider if taking diabetes medications or glucose-lowering therapy.",
  },
  {
    id: "supp_bcomplex",
    name: "Methylated B-Complex",
    dailyDose: "1 capsule daily (methylfolate + methylcobalamin)",
    timing: "Morning with food",
    primaryPurpose: "Methylation support, homocysteine clearance",
    whyIncluded:
      "Methylated B-vitamins support the methylation cycle — foundational for DNA repair, neurotransmitter production, homocysteine clearance, and cellular energy. Methylated forms bypass genetic limitations that can make standard B-vitamins less effective.",
    practicalNotes:
      "Look for 'methylfolate' (or 5-MTHF) and 'methylcobalamin' — not 'folic acid' or 'cyanocobalamin'. Worth rechecking homocysteine at 12 weeks.",
    relatedSystems: ["Methylation"],
    providerDependent: false,
  },
  {
    id: "supp_fiber",
    name: "Soluble Fiber",
    dailyDose: "7–10g/day (6–8g if gut-sensitive)",
    timing: "Split across meals, titrate from 3–4g/day",
    primaryPurpose: "ApoB reduction, gut health, blood sugar",
    whyIncluded:
      "Soluble fiber binds bile acids in the gut, forcing the liver to pull cholesterol from the bloodstream to make more bile. This directly supports LDL particle clearance and ApoB reduction.",
    practicalNotes:
      "Titrate slowly — jumping to full dose causes bloating. Take with plenty of water. Common sources: psyllium husk, PHGG, oat beta-glucan, apple pectin.",
    relatedSystems: ["Lipoprotein & Cardiovascular Risk", "Glucose & Insulin Control"],
    providerDependent: false,
  },
  {
    id: "supp_iron",
    name: "Iron",
    dailyDose: "Per provider recommendation",
    timing: "On empty stomach or with vitamin C",
    primaryPurpose: "Iron repletion",
    whyIncluded:
      "Iron supplementation supports ferritin replenishment and addresses the secondary focus in this cycle. Dosing and form should be guided by your provider given your current labs.",
    practicalNotes:
      "Vitamin C improves absorption. Avoid taking with calcium, dairy, or coffee within 2 hours.",
    relatedSystems: ["Iron Status"],
    providerDependent: true,
    safetyNote:
      "Iron should be dosed and monitored by your provider — over-supplementation carries real risk.",
  },
];

export const nutritionArchetype: NutritionArchetype = {
  id: "arch_carb_controller",
  name: "Carb Controller",
  tagline: "Stabilize Blood Sugar, Restore Metabolic Flexibility",
  summary:
    "Structured carbohydrate intake, higher protein emphasis, controlled portions, and strategic carb timing around training. Carbs are not eliminated — they're used intentionally.",
  whyItFits:
    "This archetype matches the current insulin and glucose pattern, supported by genes like TCF7L2, PPARG, and SLC2A2. The biomarker section explains why those matter; this plan is how to make them work in your favor.",
  corePrinciples: [
    "Protein at every meal (target 30g+ per sitting)",
    "Soluble and total fiber prioritized — aim for 30g+ daily",
    "Healthy fats from avocado, olive oil, nuts, fatty fish",
    "Carbs timed around training rather than spread thin all day",
    "Limit refined carbs, sugar-sweetened drinks, and ultra-processed foods",
    "Watch saturated fat: lean cuts, lighter dairy, skip coconut oil",
  ],
  cardiovascularNote:
    "Because ApoB is elevated, fat quality is layered on top of the archetype — limit saturated fats (fatty cuts of meat, butter, cheese, coconut oil) and prioritize monounsaturated and omega-3 sources (olive oil, avocado, nuts, fatty fish).",
  relatedBiomarkers: ["Fasting Insulin", "Fasting Glucose", "HbA1c", "ApoB"],
  relatedGenes: ["TCF7L2", "PPARG", "SLC2A2", "FTO", "MTNR1B"],
};

export const peptideConsiderations: PeptideConsideration[] = [
  {
    id: "pep_semaglutide",
    name: "Semaglutide",
    category: "metabolic_support",
    description:
      "A GLP-1 agonist commonly discussed for appetite regulation and glucose signaling. Sometimes considered to support adherence to calorie targets and metabolic markers when fat-loss goals are aggressive.",
  },
  {
    id: "pep_tirzepatide",
    name: "Tirzepatide",
    category: "metabolic_support",
    description:
      "A dual-agonist compound (GLP-1 and GIP) discussed for supporting appetite regulation and metabolic signaling. Sometimes considered when providers want a broader metabolic approach.",
  },
  {
    id: "pep_retatrutide",
    name: "Retatrutide (Advanced)",
    category: "metabolic_support",
    description:
      "A triple-agonist compound (GLP-1, GIP, and glucagon) representing a newer approach to metabolic support. Typically only discussed in provider-led contexts.",
  },
  {
    id: "pep_motsc",
    name: "MOTS-C",
    category: "metabolic_support",
    description:
      "A mitochondrial-derived peptide discussed in research contexts for its potential role in cellular energy metabolism and metabolic flexibility.",
  },
  {
    id: "pep_dsip",
    name: "DSIP (Delta Sleep-Inducing Peptide)",
    category: "recovery_neurological_support",
    description:
      "A neuropeptide that promotes deep, restorative sleep architecture by modulating delta wave activity. Particularly relevant for individuals with genetic variants affecting circadian rhythm.",
  },
  {
    id: "pep_semax",
    name: "Semax / Selank",
    category: "recovery_neurological_support",
    description:
      "Semax supports cognitive function, focus, and neuroprotection by enhancing BDNF expression. Selank is a tuftsin analog with anxiolytic properties. Together this combination supports stress resilience and neurological recovery — especially relevant for individuals with COMT, BDNF, or serotonin transporter variants.",
  },
];

export const geneticMarkers: GeneticMarker[] = [
  // Lipid Handling
  { id: "g_apoe_1", gene: "APOE", rsNumber: "rs429358 + rs7412", category: "Lipid Handling", whatItAffects: "Particle clearance, sat fat response", userResult: "CT" },
  { id: "g_apob_1", gene: "APOB", rsNumber: "rs693", category: "Lipid Handling", whatItAffects: "ApoB production", userResult: "AG" },
  { id: "g_ldlr_1", gene: "LDLR", rsNumber: "rs688", category: "Lipid Handling", whatItAffects: "LDL receptor function", userResult: "TC" },
  { id: "g_cetp_1", gene: "CETP", rsNumber: "rs708272", category: "Lipid Handling", whatItAffects: "HDL/LDL transfer", userResult: "AG" },
  { id: "g_lpa_1", gene: "LPA", rsNumber: "rs3798220, rs10455872", category: "Lipid Handling", whatItAffects: "Lp(a) levels", userResult: "TT" },
  { id: "g_apoe_2", gene: "APOE", rsNumber: "rs7412", category: "Lipid Handling", whatItAffects: "APOE ε2 allele (protective)", userResult: "CC" },
  { id: "g_lpa_2", gene: "LPA", rsNumber: "rs10455872", category: "Lipid Handling", whatItAffects: "Lp(a) levels (secondary)", userResult: "AA" },
  { id: "g_ppara", gene: "PPARA", rsNumber: "rs4253778", category: "Lipid Handling", whatItAffects: "Fatty acid oxidation", userResult: "GG" },
  { id: "g_ld_proxy", gene: "—", rsNumber: "rs4714209", category: "Lipid Handling", whatItAffects: "LD proxy", userResult: "TC" },
  { id: "g_cetp_2", gene: "CETP", rsNumber: "rs5882", category: "Lipid Handling", whatItAffects: "Cholesterol transfer", userResult: "AG" },

  // Inflammation
  { id: "g_crp_1", gene: "CRP", rsNumber: "rs1205, rs1800947", category: "Inflammation", whatItAffects: "Baseline CRP production", userResult: "CC" },
  { id: "g_il6", gene: "IL-6", rsNumber: "rs1800795", category: "Inflammation", whatItAffects: "Pro-inflammatory signaling", userResult: "GG" },
  { id: "g_tnfa", gene: "TNF-α", rsNumber: "rs1800629", category: "Inflammation", whatItAffects: "Inflammatory response intensity", userResult: "GG" },
  { id: "g_nfkb1", gene: "NFKB1", rsNumber: "rs28362491", category: "Inflammation", whatItAffects: "Master inflammatory switch", userResult: "II" },
  { id: "g_il10", gene: "IL-10", rsNumber: "rs1800896", category: "Inflammation", whatItAffects: "Anti-inflammatory capacity", userResult: "TT" },
  { id: "g_crp_2", gene: "CRP", rsNumber: "rs1800947", category: "Inflammation", whatItAffects: "Baseline CRP production (secondary)", userResult: "—" },
  { id: "g_il1b", gene: "IL-1β promoter", rsNumber: "rs1143627", category: "Inflammation", whatItAffects: "Inflammatory cytokine", userResult: "AG" },
  { id: "g_il6r", gene: "IL-6R", rsNumber: "rs8192284", category: "Inflammation", whatItAffects: "IL-6 receptor signaling", userResult: "—" },

  // Methylation
  { id: "g_mthfr_1", gene: "MTHFR", rsNumber: "rs1801133 (C677T)", category: "Methylation", whatItAffects: "Folate processing (major)", userResult: "GG" },
  { id: "g_mthfr_2", gene: "MTHFR", rsNumber: "rs1801131 (A1298C)", category: "Methylation", whatItAffects: "Folate processing (minor)", userResult: "TG" },
  { id: "g_mtr", gene: "MTR", rsNumber: "rs1805087", category: "Methylation", whatItAffects: "B12-dependent remethylation", userResult: "AA" },
  { id: "g_mtrr", gene: "MTRR", rsNumber: "rs1801394", category: "Methylation", whatItAffects: "B12 recycling", userResult: "GG" },
  { id: "g_cbs", gene: "CBS", rsNumber: "rs234706", category: "Methylation", whatItAffects: "Transsulfuration pathway", userResult: "AG" },
  { id: "g_bhmt", gene: "BHMT", rsNumber: "rs3733890", category: "Methylation", whatItAffects: "Alternate remethylation", userResult: "GG" },
  { id: "g_tcn2", gene: "TCN2", rsNumber: "rs1801198", category: "Methylation", whatItAffects: "B12 transport", userResult: "CC" },
  { id: "g_fut2", gene: "FUT2", rsNumber: "rs602662", category: "Methylation", whatItAffects: "B12 absorption, gut signaling", userResult: "AG" },

  // Insulin/Glucose
  { id: "g_tcf7l2", gene: "TCF7L2", rsNumber: "rs7903146", category: "Insulin/Glucose", whatItAffects: "Insulin production (strongest predictor)", userResult: "CC" },
  { id: "g_slc2a2", gene: "SLC2A2", rsNumber: "rs5400", category: "Insulin/Glucose", whatItAffects: "Glucose transport", userResult: "AG" },
  { id: "g_pparg", gene: "PPARG", rsNumber: "rs1801282", category: "Insulin/Glucose", whatItAffects: "Fat cell insulin sensitivity", userResult: "CG" },
  { id: "g_slc30a8", gene: "SLC30A8", rsNumber: "rs13266634", category: "Insulin/Glucose", whatItAffects: "Zinc transport in beta cells", userResult: "CC" },
  { id: "g_irs2", gene: "IRS2", rsNumber: "rs4771647", category: "Insulin/Glucose", whatItAffects: "Insulin signaling", userResult: "AC" },
  { id: "g_gck", gene: "GCK", rsNumber: "rs1799884", category: "Insulin/Glucose", whatItAffects: "Glucose sensing / fasting glucose", userResult: "TC" },

  // Vitamin D
  { id: "g_cyp2r1", gene: "CYP2R1", rsNumber: "rs10741657", category: "Vitamin D", whatItAffects: "Vitamin D activation", userResult: "GG" },
  { id: "g_dhcr7", gene: "DHCR7", rsNumber: "rs12785878", category: "Vitamin D", whatItAffects: "Vitamin D synthesis", userResult: "TT" },
  { id: "g_gc_1", gene: "GC", rsNumber: "rs2282679, rs4588, rs7041", category: "Vitamin D", whatItAffects: "Vitamin D binding/transport", userResult: "TT" },
  { id: "g_vdr", gene: "VDR", rsNumber: "rs2228570, rs1544410, rs731236", category: "Vitamin D", whatItAffects: "Vitamin D receptor sensitivity", userResult: "—" },
  { id: "g_gc_2", gene: "GC", rsNumber: "rs4588", category: "Vitamin D", whatItAffects: "Vitamin D transport (secondary)", userResult: "GG" },
  { id: "g_gc_3", gene: "GC", rsNumber: "rs7041", category: "Vitamin D", whatItAffects: "Vitamin D transport (tertiary)", userResult: "CC" },

  // Iron Metabolism
  { id: "g_hfe_1", gene: "HFE", rsNumber: "rs1800562 (C282Y)", category: "Iron Metabolism", whatItAffects: "Iron absorption (major)", userResult: "GG" },
  { id: "g_hfe_2", gene: "HFE", rsNumber: "rs1799945 (H63D)", category: "Iron Metabolism", whatItAffects: "Iron absorption (minor)", userResult: "CC" },
  { id: "g_tf", gene: "TF", rsNumber: "rs3811647", category: "Iron Metabolism", whatItAffects: "Transferrin function", userResult: "AG" },

  // Omega-3 Metabolism
  { id: "g_fads1", gene: "FADS1", rsNumber: "rs174546", category: "Omega-3 Metabolism", whatItAffects: "ALA to EPA conversion", userResult: "TC" },
  { id: "g_fads2_1", gene: "FADS2", rsNumber: "rs174618", category: "Omega-3 Metabolism", whatItAffects: "EPA to DHA conversion", userResult: "CC" },
  { id: "g_fads2_2", gene: "FADS2", rsNumber: "rs1535", category: "Omega-3 Metabolism", whatItAffects: "EPA to DHA conversion (secondary)", userResult: "AG" },

  // Gut/Digestion
  { id: "g_lct", gene: "LCT", rsNumber: "rs4988235", category: "Gut/Digestion", whatItAffects: "Lactase persistence", userResult: "GG" },
  { id: "g_hladqa1", gene: "HLA-DQA1", rsNumber: "rs2187668", category: "Gut/Digestion", whatItAffects: "Celiac susceptibility", userResult: "CC" },
  { id: "g_hladqb1", gene: "HLA-DQB1", rsNumber: "rs7454108", category: "Gut/Digestion", whatItAffects: "Celiac susceptibility", userResult: "TT" },
  { id: "g_nod2", gene: "NOD2", rsNumber: "rs2066844", category: "Gut/Digestion", whatItAffects: "Innate gut immunity", userResult: "CC" },
  { id: "g_aoc1", gene: "AOC1 / DAO", rsNumber: "rs10156191", category: "Gut/Digestion", whatItAffects: "Histamine breakdown", userResult: "CC" },

  // Appetite/Metabolism
  { id: "g_lep", gene: "LEP", rsNumber: "rs7799039", category: "Appetite/Metabolism", whatItAffects: "Leptin production", userResult: "AG" },
  { id: "g_lepr", gene: "LEPR", rsNumber: "rs1137101", category: "Appetite/Metabolism", whatItAffects: "Leptin receptor", userResult: "AG" },
  { id: "g_mc4r_1", gene: "MC4R", rsNumber: "rs17782313", category: "Appetite/Metabolism", whatItAffects: "Appetite regulation", userResult: "TT" },
  { id: "g_ghrl", gene: "GHRL", rsNumber: "rs696217", category: "Appetite/Metabolism", whatItAffects: "Ghrelin (hunger hormone)", userResult: "—" },
  { id: "g_mc4r_2", gene: "MC4R", rsNumber: "rs6567160", category: "Appetite/Metabolism", whatItAffects: "Satiety regulation", userResult: "TT" },

  // Connective Tissue
  { id: "g_col1a1", gene: "COL1A1", rsNumber: "rs1800012", category: "Connective Tissue", whatItAffects: "Collagen type I", userResult: "AC" },
  { id: "g_col5a1", gene: "COL5A1", rsNumber: "rs12722", category: "Connective Tissue", whatItAffects: "Collagen type V", userResult: "TC" },
  { id: "g_gdf5", gene: "GDF5", rsNumber: "rs143383", category: "Connective Tissue", whatItAffects: "Joint/cartilage development", userResult: "GG" },
  { id: "g_mmp3", gene: "MMP3", rsNumber: "rs679620", category: "Connective Tissue", whatItAffects: "Tissue remodeling", userResult: "TT" },
  { id: "g_actn3", gene: "ACTN3", rsNumber: "rs1815739", category: "Connective Tissue", whatItAffects: "Muscle fiber type", userResult: "CC" },

  // Stress & Recovery
  { id: "g_comt", gene: "COMT", rsNumber: "rs4680", category: "Stress & Recovery", whatItAffects: "Dopamine metabolism", userResult: "GG" },
  { id: "g_oxtr", gene: "OXTR", rsNumber: "rs53576", category: "Stress & Recovery", whatItAffects: "Stress resilience", userResult: "GG" },
  { id: "g_oprm1", gene: "OPRM1", rsNumber: "rs1799971", category: "Stress & Recovery", whatItAffects: "Reward sensitivity", userResult: "AA" },
  { id: "g_bdnf", gene: "BDNF", rsNumber: "rs6265", category: "Stress & Recovery", whatItAffects: "Neuroplasticity, mood", userResult: "CC" },
  { id: "g_gnb3", gene: "GNB3", rsNumber: "rs5443", category: "Stress & Recovery", whatItAffects: "Sympathetic signaling", userResult: "CC" },
  { id: "g_drd2", gene: "DRD2 / ANKK1", rsNumber: "rs1800497", category: "Stress & Recovery", whatItAffects: "Dopamine reward", userResult: "GG" },

  // Oxidative Stress
  { id: "g_sod2", gene: "SOD2", rsNumber: "rs4880", category: "Oxidative Stress", whatItAffects: "Mitochondrial antioxidant", userResult: "GG" },
  { id: "g_nqo1", gene: "NQO1", rsNumber: "rs1800566", category: "Oxidative Stress", whatItAffects: "Detoxification enzyme", userResult: "AG" },
  { id: "g_cat", gene: "CAT", rsNumber: "rs1001179", category: "Oxidative Stress", whatItAffects: "Catalase function", userResult: "TC" },
  { id: "g_hmox1", gene: "HMOX1", rsNumber: "rs2269533", category: "Oxidative Stress", whatItAffects: "Heme oxygenase", userResult: "—" },
  { id: "g_nrf2", gene: "NRF2", rsNumber: "rs6721961", category: "Oxidative Stress", whatItAffects: "Antioxidant response", userResult: "—" },
  { id: "g_gpx1", gene: "GPX1", rsNumber: "rs1050450", category: "Oxidative Stress", whatItAffects: "Glutathione peroxidase", userResult: "AG" },

  // Caffeine Metabolism
  { id: "g_cyp1a2", gene: "CYP1A2", rsNumber: "rs762551", category: "Caffeine Metabolism", whatItAffects: "Caffeine metabolism speed", userResult: "AA" },
  { id: "g_ahr", gene: "AHR", rsNumber: "rs4410790", category: "Caffeine Metabolism", whatItAffects: "Caffeine sensitivity / receptor", userResult: "CC" },
  { id: "g_cyp2a6", gene: "CYP2A6", rsNumber: "rs1801272", category: "Caffeine Metabolism", whatItAffects: "Caffeine / nicotine metabolism", userResult: "AA" },

  // Circadian Rhythm & Sleep
  { id: "g_clock", gene: "CLOCK", rsNumber: "rs1801260", category: "Circadian Rhythm & Sleep", whatItAffects: "Circadian rhythm regulation", userResult: "AA" },
  { id: "g_cry1", gene: "CRY1", rsNumber: "rs2287161", category: "Circadian Rhythm & Sleep", whatItAffects: "Delayed sleep phase tendency", userResult: "CC" },
  { id: "g_ada", gene: "ADA", rsNumber: "rs73598374", category: "Circadian Rhythm & Sleep", whatItAffects: "Adenosine / sleep pressure", userResult: "CC" },
  { id: "g_mtnr1b", gene: "MTNR1B", rsNumber: "rs10830963", category: "Circadian Rhythm & Sleep", whatItAffects: "Melatonin receptor / light sensitivity", userResult: "CG" },

  // Stress & Cortisol
  { id: "g_fkbp5", gene: "FKBP5", rsNumber: "rs1360780", category: "Stress & Cortisol", whatItAffects: "Cortisol sensitivity / recovery", userResult: "—" },
  { id: "g_nr3c1", gene: "NR3C1", rsNumber: "rs6190", category: "Stress & Cortisol", whatItAffects: "Glucocorticoid receptor function", userResult: "CC" },
  { id: "g_adrb2", gene: "ADRB2", rsNumber: "rs1042713", category: "Stress & Cortisol", whatItAffects: "Adrenergic stress response", userResult: "GG" },

  // Mitochondrial Function
  { id: "g_sirt1", gene: "SIRT1", rsNumber: "rs10997868", category: "Mitochondrial Function", whatItAffects: "Metabolic regulation / longevity", userResult: "—" },
  { id: "g_ppargc1a", gene: "PPARGC1A", rsNumber: "rs8192678", category: "Mitochondrial Function", whatItAffects: "Mitochondrial biogenesis", userResult: "TC" },
  { id: "g_ucp2", gene: "UCP2", rsNumber: "rs659366", category: "Mitochondrial Function", whatItAffects: "Mitochondrial uncoupling", userResult: "CC" },
];

export const providerQuestions = [
  {
    id: "q_insulin",
    question:
      "Given my fasting insulin of 8.92 μIU/mL and the FTO/PPARG/SLC2A2 pattern, what labs should we recheck in 12 weeks?",
    source: "Biomarker — Fasting Insulin",
  },
  {
    id: "q_berberine",
    question:
      "Is berberine appropriate given my current medications and glucose levels?",
    source: "Supplement — Berberine",
  },
  {
    id: "q_ferritin",
    question:
      "Does my ferritin level (21.7 ng/mL) require further evaluation before starting iron, given my HFE/TF results?",
    source: "Supplement — Iron",
  },
  {
    id: "q_apob",
    question:
      "Given my ApoB and lipid-related genes (APOE, LDLR, APOB, PCSK9), should I be monitoring ApoB, Lp(a), LDL-C, or additional cardiovascular markers?",
    source: "Biomarker — ApoB",
  },
  {
    id: "q_peptides",
    question:
      "Are any peptide or GLP-1 options medically appropriate for me, or should we focus on lifestyle first?",
    source: "Peptide Considerations",
  },
  {
    id: "q_caffeine",
    question:
      "Given my slow caffeine metabolism (CYP1A2 AA, CYP2A6 AA), should I modify caffeine timing to improve sleep quality?",
    source: "Lifestyle — Caffeine",
  },
];
