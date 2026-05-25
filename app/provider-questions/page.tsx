import { PageHeader } from "@/components/portal/page-header";
import { Disclaimer } from "@/components/portal/disclaimer";
import { Kicker } from "@/components/ds/kicker";
import { providerQuestions } from "@/lib/mock-data";

export default function ProviderQuestionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Visit Prep"
        title="Six questions worth asking."
        description="Sourced from your biomarkers, genetics, supplements, and recovery plan. Bring this to your next provider visit."
      />

      <ol className="space-y-8">
        {providerQuestions.map((q, idx) => (
          <li
            key={q.id}
            className="grid gap-5 border-t border-rule pt-6 md:grid-cols-[60px_1fr]"
          >
            <div>
              <p className="ds-numeric-L text-ink-faint">
                {String(idx + 1).padStart(2, "0")}
              </p>
            </div>
            <div>
              <p className="ds-title-2 text-ink leading-snug">{q.question}</p>
              <p className="kicker mt-4 text-ink-faint">Source · {q.source}</p>
            </div>
          </li>
        ))}
      </ol>

      <Disclaimer>
        These questions are starting points drawn from your blueprint · This
        portal does not provide answers — it organizes the discussion
      </Disclaimer>
    </>
  );
}
