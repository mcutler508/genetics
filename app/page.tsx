import Link from "next/link";
import { ArrowUpRight, Pill, Sparkles, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/portal/page-header";
import { RoleBadge, StatusBadge } from "@/components/portal/status-badge";
import { Disclaimer } from "@/components/portal/disclaimer";
import { CycleProgress } from "@/components/portal/cycle-progress";
import { SystemRadar } from "@/components/portal/system-radar";
import { BiomarkerGauge } from "@/components/portal/biomarker-gauge";
import { DashboardCheckinCard } from "@/components/portal/dashboard-checkin-card";
import {
  biomarkers,
  customer,
  supplements,
  systemFocus,
} from "@/lib/mock-data";

function daysBetween(start: string, end: string) {
  const ms = new Date(end).getTime() - new Date(start).getTime();
  return Math.max(0, Math.round(ms / 86_400_000));
}

export default function DashboardPage() {
  const elapsedWeeks = customer.cycleWeeksElapsed;
  const totalWeeks = customer.cycleWeeksTotal;
  const daysRemaining =
    daysBetween(customer.cycleStartDate, customer.cycleEndDate) -
    elapsedWeeks * 7;

  const focused = biomarkers.filter(
    (b) =>
      b.status === "primary_focus" ||
      b.status === "secondary_focus" ||
      b.status === "elevated"
  );

  return (
    <>
      <PageHeader
        eyebrow={`Cycle ${customer.cycleStartDate} → ${customer.cycleEndDate}`}
        title={`Welcome back, ${customer.name.split(" ")[0]}.`}
        description="Your 12-week systems blueprint, organized so you can see what to focus on, what's working, and what to discuss with your provider."
      />

      {/* Hero row: cycle progress + radar */}
      <div className="mb-10 grid gap-5 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardContent className="py-7">
            <CycleProgress
              totalWeeks={totalWeeks}
              elapsedWeeks={elapsedWeeks}
              daysRemaining={daysRemaining}
            />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader className="pb-1">
            <p className="editorial-eyebrow text-muted-foreground">
              Focus map
            </p>
            <CardTitle className="editorial-title text-xl">
              Systems at a glance
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-1">
            <SystemRadar systems={systemFocus} />
          </CardContent>
        </Card>
      </div>

      {/* System focus grid */}
      <div className="mb-10">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="editorial-title text-2xl text-foreground">
            System focus
          </h2>
          <p className="text-sm text-muted-foreground">
            Four systems, ranked by priority for this cycle
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {systemFocus.map((sys) => (
            <Card
              key={sys.id}
              className="group overflow-hidden transition-shadow hover:shadow-md"
            >
              <CardHeader className="space-y-3 pb-3">
                <RoleBadge role={sys.role} />
                <CardTitle className="editorial-title text-xl leading-snug">
                  {sys.systemName}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="editorial-eyebrow text-muted-foreground">
                    {sys.biomarkerName}
                  </p>
                  <p className="mt-1 editorial-title text-2xl text-foreground">
                    {sys.currentValue}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Target: {sys.targetValue}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {sys.summary}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Two-column lower section */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Priority biomarkers with gauges */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <CardTitle className="editorial-title text-lg">
                Priority biomarkers
              </CardTitle>
            </div>
            <Link
              href="/biomarkers"
              className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              View all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-5">
            {focused.map((b) => (
              <div key={b.id} className="space-y-2">
                <div className="flex items-baseline justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {b.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {b.currentValue} {b.unit}{" "}
                      <span className="mx-1 text-border">·</span> Target{" "}
                      {b.target12Week}
                    </p>
                  </div>
                  <StatusBadge status={b.status} />
                </div>
                <BiomarkerGauge biomarker={b} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Today's check-in (interactive, persists to localStorage) */}
        <DashboardCheckinCard />

        {/* Supplements summary */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div className="flex items-center gap-2">
              <Pill className="h-4 w-4 text-primary" />
              <CardTitle className="editorial-title text-lg">
                Today's supplement protocol
              </CardTitle>
            </div>
            <Link
              href="/supplements"
              className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              Full protocol <ArrowUpRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              {supplements.map((s) => (
                <div
                  key={s.id}
                  className="rounded-xl border border-border bg-background/60 p-4 transition-shadow hover:shadow-sm"
                >
                  <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {s.name}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {s.dailyDose}
                  </p>
                  {s.providerDependent && (
                    <p className="mt-2 inline-flex rounded bg-chart-4/15 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-chart-5">
                      Provider-dependent
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Disclaimer>
        This portal organizes your blueprint report for reference and provider
        discussion. It does not diagnose, treat, or prescribe. Always coordinate
        changes to medications or prescribed treatment with a qualified
        provider.
      </Disclaimer>
    </>
  );
}

