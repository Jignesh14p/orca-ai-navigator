import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { AppShell, Card, Meter, ScreenHeader } from "@/components/orca/shell";
import { safety } from "@/lib/orca/data";

export const Route = createFileRoute("/safety")({
  head: () => ({
    meta: [
      { title: "Marine Safety Center | ORCA" },
      {
        name: "description",
        content:
          "Live marine safety score with weather, route and hazard checks, restricted zone status and clear recommended actions.",
      },
      { property: "og:title", content: "Marine Safety Center | ORCA" },
      {
        property: "og:description",
        content: "Every ORCA recommendation is validated by the safety veto engine.",
      },
    ],
  }),
  component: SafetyScreen,
});

function SafetyScreen() {
  return (
    <AppShell>
      <ScreenHeader title="SAFETY CENTER" subtitle="Validated by the ORCA safety veto engine" />
      <div className="-mt-4 space-y-4 p-4">
        <Card className="text-center">
          <p className="text-6xl font-black text-caution">{safety.score}</p>
          <p className="text-xs font-bold text-muted-foreground">/100</p>
          <p className="mt-2 text-sm font-extrabold tracking-widest text-caution">
            {safety.verdict}
          </p>
        </Card>

        <Card className="space-y-3">
          {safety.categories.map((c) => (
            <div key={c.label} className="space-y-1.5">
              <div className="flex justify-between text-sm font-bold">
                <span>{c.label}</span>
                <span className="text-muted-foreground">{c.value}%</span>
              </div>
              <Meter value={c.value} tone={c.value >= 85 ? "sea" : "caution"} />
            </div>
          ))}
          <p className="flex items-center gap-2 rounded-xl bg-sea/10 px-3 py-2.5 text-sm font-extrabold text-sea">
            <ShieldCheck className="size-5" /> Restricted Zone Status: {safety.restrictedZoneStatus}
          </p>
        </Card>

        <Card className="space-y-2">
          <p className="text-[11px] font-extrabold tracking-widest text-muted-foreground">
            ACTIVE RISKS
          </p>
          {safety.risks.map((r) => (
            <p key={r} className="flex gap-2 text-sm font-semibold">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-caution" /> {r}
            </p>
          ))}
        </Card>

        <Card className="space-y-2 bg-ocean/5">
          <p className="text-sm font-extrabold">Recommended action</p>
          <p className="text-sm">
            Depart between 6:00 AM and 7:00 AM, stay within 12 km of the coast, and be back at
            Chennai Fishing Harbour before 1:30 PM. Avoid the south-east sector completely today.
          </p>
        </Card>

        <Link
          to="/ai"
          className="ocean-bright flex min-h-14 items-center justify-center rounded-2xl text-sm font-extrabold text-ocean-foreground"
        >
          VIEW SAFETY RECOMMENDATION
        </Link>
      </div>
    </AppShell>
  );
}
