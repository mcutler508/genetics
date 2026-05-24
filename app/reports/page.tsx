import { PageHeader } from "@/components/portal/page-header";
import { PlaceholderCard } from "@/components/portal/placeholder-card";

export default function ReportsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Library"
        title="Reports"
        description="Your original blueprint PDF, parsed structured reports, biomarker tables, supplement plans, and historical 12-week summaries."
      />
      <PlaceholderCard note="Report list with title, type, generated date, source, and download/view actions will render here." />
    </>
  );
}
