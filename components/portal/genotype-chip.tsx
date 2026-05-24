"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const BASE_FULL_NAME: Record<string, string> = {
  A: "adenine",
  C: "cytosine",
  G: "guanine",
  T: "thymine",
  I: "insertion",
  D: "deletion",
};

type ParsedGenotype =
  | { kind: "no-call" }
  | {
      kind: "diploid";
      letters: [string, string];
      heterozygous: boolean;
    }
  | { kind: "unknown"; raw: string };

function parseGenotype(raw: string): ParsedGenotype {
  const trimmed = raw.trim();
  if (!trimmed || trimmed === "—" || trimmed === "-" || trimmed === "--") {
    return { kind: "no-call" };
  }
  // Two-letter genotype like "CT", "AG", "II"
  if (/^[ACGTID]{2}$/i.test(trimmed)) {
    const a = trimmed[0].toUpperCase();
    const b = trimmed[1].toUpperCase();
    return {
      kind: "diploid",
      letters: [a, b],
      heterozygous: a !== b,
    };
  }
  return { kind: "unknown", raw: trimmed };
}

function buildExplanation(parsed: ParsedGenotype): {
  zygosityLabel: string;
  body: string;
} {
  if (parsed.kind === "no-call") {
    return {
      zygosityLabel: "No call",
      body:
        "This variant wasn't successfully read in your sample, or it wasn't part of the panel. It isn't a problem — there's just no result to interpret here.",
    };
  }
  if (parsed.kind === "unknown") {
    return {
      zygosityLabel: "Result",
      body: `Result code "${parsed.raw}" — see your full report or provider for interpretation.`,
    };
  }
  const [a, b] = parsed.letters;
  const aName = BASE_FULL_NAME[a] ?? a;
  const bName = BASE_FULL_NAME[b] ?? b;

  if (parsed.heterozygous) {
    return {
      zygosityLabel: "Heterozygous",
      body: `You inherited ${a} (${aName}) from one parent and ${b} (${bName}) from the other at this DNA position. Because the two letters differ, you carry one copy of each variant — what scientists call heterozygous.`,
    };
  }
  return {
    zygosityLabel: a === "I" ? "Homozygous insertion" : "Homozygous",
    body:
      a === "I"
        ? `Both copies you inherited at this position are insertions — a section of DNA is added compared to the reference. "Homozygous" means the same on both chromosomes.`
        : `Both copies you inherited at this position are ${a} (${aName}). "Homozygous" means the same letter on both chromosomes — one from each parent.`,
  };
}

export function GenotypeChip({ value }: { value: string }) {
  const parsed = parseGenotype(value);
  const { zygosityLabel, body } = buildExplanation(parsed);
  const isNoCall = parsed.kind === "no-call";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "inline-flex cursor-help rounded-md px-2 py-0.5 font-mono text-xs font-medium transition-colors",
            "underline-offset-4 decoration-dotted hover:underline",
            isNoCall
              ? "bg-muted/40 text-muted-foreground"
              : "bg-muted/60 text-foreground hover:bg-primary/10"
          )}
          aria-label={`Genotype ${value} — ${zygosityLabel}. ${body}`}
        >
          {value}
        </button>
      </TooltipTrigger>
      <TooltipContent
        side="left"
        align="center"
        sideOffset={6}
        className="max-w-xs whitespace-normal px-3.5 py-2.5"
      >
        <div className="space-y-1.5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-background/70">
            {zygosityLabel}
          </p>
          <p className="text-xs leading-relaxed text-background">{body}</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
