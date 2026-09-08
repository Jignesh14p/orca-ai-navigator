import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, Card, LanguageButton, ScreenHeader } from "@/components/orca/shell";
import { alerts, type Severity } from "@/lib/orca/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "Marine Alerts | ORCA" },
      {
        name: "description",
        content:
          "Critical cyclone, wind and navigation alerts for the Chennai coast, each with the problem, why it matters and the recommended action.",
      },
      { property: "og:title", content: "Marine Alerts | ORCA" },
      {
        property: "og:description",
        content: "Clear, prominent marine safety alerts with recommended actions.",
      },
    ],
  }),
  component: AlertsScreen,
});

const filters = ["All", "Critical", "Weather", "Navigation"] as const;

const tone: Record<Severity, { cls: string; label: string; icon: string }> = {
  critical: { cls: "border-danger text-danger", label: "CRITICAL", icon: "🔴" },
  warning: { cls: "border-caution text-caution", label: "WARNING", icon: "🟠" },
  info: { cls: "border-ocean text-ocean", label: "INFORMATION", icon: "🔵" },
};

function AlertsScreen() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const shown = alerts.filter((a) => {
    if (filter === "All") return true;
    if (filter === "Critical") return a.severity === "critical";
    if (filter === "Weather") return a.category === "weather";
    return a.category === "navigation";
  });

  return (
    <AppShell>
      <ScreenHeader title="MARINE ALERTS" subtitle="Never hidden, always actionable" right={<LanguageButton dark />} />
      <div className="-mt-4 space-y-3 p-4">
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "min-h-11 shrink-0 rounded-full px-4 text-sm font-bold",
                filter === f ? "bg-ocean text-ocean-foreground" : "bg-card text-muted-foreground shadow-card",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {shown.map((a) => {
          const style = tone[a.severity];
          return (
            <Card key={a.id} className={cn("space-y-2 border-l-4", style.cls)}>
              <div className="flex items-center justify-between">
                <p className={cn("text-xs font-extrabold tracking-widest", style.cls)}>
                  {style.icon} {style.label}
                </p>
                <p className="text-[11px] font-semibold text-muted-foreground">{a.time}</p>
              </div>
              <p className="text-base font-black text-foreground">{a.title}</p>
              <p className="text-sm font-semibold">{a.problem}</p>
              <p className="text-sm text-muted-foreground">Why it matters: {a.why}</p>
              <p className="rounded-xl bg-muted/70 px-3 py-2.5 text-sm font-extrabold">
                Do this: {a.action}
              </p>
              <p className="text-[11px] font-semibold text-muted-foreground">📍 {a.location}</p>
              <Link
                to="/map"
                className="flex min-h-12 items-center justify-center rounded-xl bg-secondary text-xs font-extrabold text-secondary-foreground"
              >
                VIEW ON MAP
              </Link>
            </Card>
          );
        })}

        {shown.length === 0 && (
          <Card className="text-center text-sm font-semibold text-sea">
            🟢 No alerts in this category
          </Card>
        )}
      </div>
    </AppShell>
  );
}
