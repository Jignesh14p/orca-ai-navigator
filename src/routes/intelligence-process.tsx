import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { AppShell, Card, ScreenHeader } from "@/components/orca/shell";
import { agentMeta } from "@/lib/orca/agents";
import { dataSources } from "@/lib/orca/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/intelligence-process")({
  head: () => ({
    meta: [
      { title: "Agent Orchestration | ORCA" },
      {
        name: "description",
        content:
          "See how ORCA works: user query, supervisor agent, specialist agents, marine data fusion, safety veto engine and the final decision.",
      },
      { property: "og:title", content: "Agent Orchestration | ORCA" },
      {
        property: "og:description",
        content: "An animated view of ORCA's collaborative multi-agent reasoning pipeline.",
      },
    ],
  }),
  component: ProcessScreen,
});

const stages = [
  { id: "query", title: "USER QUERY", detail: "“Can I go fishing tomorrow morning?”" },
  { id: "supervisor", title: "ORCA SUPERVISOR", detail: agentMeta.supervisor.role },
  { id: "agents", title: "SPECIALIST AGENTS", detail: "Weather · Navigation · Fishing · Multilingual" },
  { id: "fusion", title: "MARINE DATA FUSION", detail: "INCOIS · IMD · MOSDAC · NavIC → local cache" },
  { id: "veto", title: "SAFETY VETO ENGINE", detail: "Weather, zones, route, conservation checks" },
  { id: "decision", title: "FINAL DECISION", detail: "Actionable answer + safety score" },
];

function ProcessScreen() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s >= stages.length ? 0 : s + 1)), 1100);
    return () => clearInterval(id);
  }, []);

  return (
    <AppShell>
      <ScreenHeader
        title="INTELLIGENCE PROCESS"
        subtitle="How collaborative agents reach a decision"
        back="/ai"
      />
      <div className="space-y-3 p-4">
        {stages.map((s, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <div key={s.id}>
              <Card
                className={cn(
                  "flex items-center gap-3 transition-all",
                  active && "ring-2 ring-aqua orca-pulse-ring",
                  done && "border border-sea/30",
                )}
              >
                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-xl text-xs font-black",
                    done
                      ? "bg-sea text-sea-foreground"
                      : active
                        ? "bg-aqua text-aqua-foreground"
                        : "bg-muted text-muted-foreground",
                  )}
                >
                  {done ? <Check className="size-5" /> : i + 1}
                </span>
                <div>
                  <p className="text-sm font-extrabold tracking-wide">{s.title}</p>
                  <p className="text-xs text-muted-foreground">{s.detail}</p>
                </div>
              </Card>
              {i === 1 && (
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {(["weather", "navigation", "fishing"] as const).map((a) => (
                    <div
                      key={a}
                      className={cn(
                        "rounded-xl p-2.5 text-center text-[11px] font-bold shadow-card",
                        step >= 2 ? "bg-ocean/10 text-ocean" : "bg-card text-muted-foreground",
                        step === 2 && "orca-pulse-ring",
                      )}
                    >
                      {agentMeta[a].name}
                    </div>
                  ))}
                </div>
              )}
              {i < stages.length - 1 && (
                <p className="py-1 text-center text-lg text-muted-foreground">↓</p>
              )}
            </div>
          );
        })}

        <Card className="space-y-2">
          <p className="text-[11px] font-extrabold tracking-widest text-muted-foreground">
            DATA SOURCES
          </p>
          {dataSources.map((d) => (
            <p key={d.id} className="flex items-center justify-between text-sm font-semibold">
              <span className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-sea" /> {d.name}
              </span>
              <span className="text-xs text-muted-foreground">{d.status}</span>
            </p>
          ))}
          <p className="text-xs text-muted-foreground">Last update: 5 minutes ago</p>
        </Card>
      </div>
    </AppShell>
  );
}
