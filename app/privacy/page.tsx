import { PageHeader } from "@/components/portal/page-header";
import { Disclaimer } from "@/components/portal/disclaimer";
import { EmptyState } from "@/components/ds/empty-state";
import { VellumCard } from "@/components/ds/card";

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Your Control"
        title="Privacy & consent"
        description="Manage what's stored, who can see it, and how it's used. You can revoke any consent or request data deletion at any time."
      />

      <VellumCard padded={false}>
        <EmptyState
          title="Consent center coming soon."
          body="This page will give you granular control over AI summaries, coach access, provider access, anonymized improvement data, marketing, and data retention. Every toggle ties to a specific data use — opt in or out independently."
        />
      </VellumCard>

      <Disclaimer>
        Consent management surface is part of the MVP scaffolding
      </Disclaimer>
    </>
  );
}
