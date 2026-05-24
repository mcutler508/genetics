import { MessageCircleQuestion } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/portal/page-header";
import { Disclaimer } from "@/components/portal/disclaimer";
import { providerQuestions } from "@/lib/mock-data";

export default function ProviderQuestionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Visit Prep"
        title="Provider questions"
        description="A running list of questions sourced from your biomarkers, genetics, supplements, and recovery plan. Bring this to your next provider visit."
      />

      <div className="space-y-3">
        {providerQuestions.map((q) => (
          <Card key={q.id}>
            <CardContent className="flex items-start gap-4 py-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MessageCircleQuestion className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm leading-relaxed text-foreground">
                  {q.question}
                </p>
                <p className="mt-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Source: {q.source}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Disclaimer>
        These questions are starting points drawn from your blueprint. Add your
        own, edit them, and share with your provider. This portal does not
        provide answers — it organizes the discussion.
      </Disclaimer>
    </>
  );
}
