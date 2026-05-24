import { PageHeader } from "@/components/portal/page-header";
import { PlaceholderCard } from "@/components/portal/placeholder-card";

export default function UploadPage() {
  return (
    <>
      <PageHeader
        eyebrow="Onboarding"
        title="Upload your blueprint report"
        description="Upload your Impact Health Systems Blueprint PDF. We'll walk through processing states and surface the structured plan once ready."
      />
      <PlaceholderCard note="Drag-and-drop uploader, simulated processing states, and parsed-section preview will live here." />
    </>
  );
}
