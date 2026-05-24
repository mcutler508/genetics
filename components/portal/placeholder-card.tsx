import { Card, CardContent } from "@/components/ui/card";

export function PlaceholderCard({ note }: { note: string }) {
  return (
    <Card className="border-dashed bg-card/60">
      <CardContent className="py-10 text-center text-sm text-muted-foreground">
        {note}
      </CardContent>
    </Card>
  );
}
