import { PageHeader } from "@/components/portal/page-header";
import { PlaceholderCard } from "@/components/portal/placeholder-card";

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Your Control"
        title="Privacy & consent"
        description="Manage what's stored, who can see it, and how it's used. You can revoke any consent or request data deletion at any time."
      />
      <PlaceholderCard note="Consent toggles, sharing permissions, data export, and deletion request flow will render here." />
    </>
  );
}
