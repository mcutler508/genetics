import { Info } from "lucide-react";

export function Disclaimer({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-8 flex items-start gap-3 rounded-lg border border-border bg-muted/50 px-4 py-3 text-xs text-muted-foreground">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
      <p>{children}</p>
    </div>
  );
}
