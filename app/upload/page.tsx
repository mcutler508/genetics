import { PageHeader } from "@/components/portal/page-header";
import { Disclaimer } from "@/components/portal/disclaimer";
import { EmptyState } from "@/components/ds/empty-state";
import { VellumCard } from "@/components/ds/card";

export default function UploadPage() {
  return (
    <>
      <PageHeader
        eyebrow="Onboarding"
        title="Upload your blueprint report"
        description="Upload your Impact Health Systems Blueprint PDF. The portal walks through processing states and surfaces the structured plan once ready."
      />

      <VellumCard padded={false}>
        <EmptyState
          title="Drop your PDF here."
          body="Drag-and-drop or browse to upload. Once processed, your biomarkers, supplements, genetic appendix, and twelve-week plan populate the rest of the portal."
          ctaLabel="Choose a file"
        />
      </VellumCard>

      <Disclaimer>
        Upload flow is part of the MVP scaffolding · PDF parsing is mocked for
        the demo
      </Disclaimer>
    </>
  );
}
