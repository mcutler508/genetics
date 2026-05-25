import { PageHeader } from "@/components/portal/page-header";
import { Disclaimer } from "@/components/portal/disclaimer";
import { EmptyState } from "@/components/ds/empty-state";
import { VellumCard } from "@/components/ds/card";

export default function ReportsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Library"
        title="Reports"
        description="Your original blueprint PDF, parsed structured reports, biomarker tables, supplement plans, and historical twelve-week summaries."
      />

      <VellumCard padded={false}>
        <EmptyState
          title="No reports yet."
          body="Once your blueprint is uploaded and parsed, every cycle's report, biomarker table, and supplement plan will live here — downloadable, viewable, and ready to share with your provider."
          ctaLabel="Upload your blueprint"
        />
      </VellumCard>

      <Disclaimer>
        Report library is part of the MVP scaffolding · Wiring active once your
        blueprint is uploaded
      </Disclaimer>
    </>
  );
}
