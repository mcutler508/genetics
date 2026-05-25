import { Kicker } from "@/components/ds/kicker";

export function PlaceholderCard({ note }: { note: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-rule-strong bg-vellum/60 px-6 py-10 text-center">
      <Kicker className="mb-2 text-ink-faint">Placeholder</Kicker>
      <p className="text-sm text-ink-muted">{note}</p>
    </div>
  );
}
