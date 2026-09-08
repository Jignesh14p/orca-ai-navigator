import { Check, ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { agentMeta, type OrcaAnswer, type PipelineStep } from "@/lib/orca/agents";
import { cn } from "@/lib/utils";
import { Card, Meter } from "./shell";

export function AgentChips({ active }: { active?: string[] }) {
  const ids = ["supervisor", "weather", "navigation", "safety", "fishing"] as const;
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto">
      {ids.map((id) => {
        const on = active?.includes(id);
        return (
          <span
            key={id}
            className={cn(
              "shrink-0 rounded-full px-3 py-1.5 text-[11px] font-bold",
              on
                ? "bg-aqua text-aqua-foreground orca-pulse-ring"
                : "bg-navy-foreground/12 text-navy-foreground/80",
            )}
          >
            {agentMeta[id].name}
          </span>
        );
      })}
    </div>
  );
}

export function AnalysingSteps({
  steps,
  completed,
  title,
}: {
  steps: PipelineStep[];
  completed: number;
  title: string;
}) {
  return (
    <Card className="border border-ocean/15 bg-ocean/5">
      <p className="mb-3 text-xs font-extrabold tracking-widest text-ocean uppercase">{title}</p>
      <ol className="space-y-2.5">
        {steps.map((s, i) => {
          const done = i < completed;
          const current = i === completed;
          return (
            <li key={s.label} className="flex items-start gap-2.5">
              <span
                className={cn(
                  "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-black",
                  done
                    ? "bg-sea text-sea-foreground"
                    : current
                      ? "bg-aqua text-aqua-foreground orca-pulse-ring"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {done ? <Check className="size-3.5" /> : i + 1}
              </span>
              <span className={cn("text-sm", done || current ? "font-semibold" : "text-muted-foreground")}>
                {s.label}
                <span className="block text-[11px] font-medium text-muted-foreground">
                  {agentMeta[s.agent].name} agent · {s.detail}
                </span>
              </span>
            </li>
          );
        })}
      </ol>
    </Card>
  );
}

export function SafetyBadge({ status }: { status: OrcaAnswer["status"] }) {
  const map = {
    approved: { text: "SAFETY VETO: APPROVED", cls: "bg-sea/12 text-sea", Icon: ShieldCheck },
    approved_with_caution: {
      text: "SAFETY VETO: APPROVED WITH CAUTION",
      cls: "bg-caution/16 text-caution",
      Icon: ShieldAlert,
    },
    blocked: { text: "SAFETY VETO: BLOCKED", cls: "bg-danger/12 text-danger", Icon: ShieldX },
  }[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-extrabold tracking-wide",
        map.cls,
      )}
    >
      <map.Icon className="size-3.5" />
      {map.text}
    </span>
  );
}

export function RecommendationCard({ answer }: { answer: OrcaAnswer }) {
  const tone = answer.status === "blocked" ? "danger" : answer.status === "approved" ? "sea" : "caution";
  return (
    <Card className="space-y-3">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-extrabold tracking-wide">🧭 {answer.title}</p>
        <SafetyBadge status={answer.status} />
      </div>

      <div className="flex items-end gap-2">
        <span className="text-4xl leading-none font-black">{answer.safetyScore}</span>
        <span className="pb-1 text-xs font-bold text-muted-foreground">/100 safety score</span>
      </div>
      <Meter value={answer.safetyScore} tone={tone} />

      <p className="text-base font-bold text-balance-tight">{answer.headline}</p>
      <ul className="space-y-1.5 text-sm">
        {answer.points.map((p) => (
          <li key={p} className="flex gap-2">
            <span className="text-ocean">•</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>

      {answer.window && (
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-sea/10 p-3">
            <p className="text-[10px] font-bold text-sea">DEPART</p>
            <p className="text-sm font-extrabold">{answer.window.depart}</p>
          </div>
          <div className="rounded-xl bg-caution/14 p-3">
            <p className="text-[10px] font-bold text-caution">RETURN BEFORE</p>
            <p className="text-sm font-extrabold">{answer.window.returnBy}</p>
          </div>
        </div>
      )}

      {answer.vetoNote && (
        <div className="rounded-xl bg-danger/10 p-3 text-sm">
          <p className="font-extrabold text-danger">🚫 {answer.vetoNote}</p>
          {answer.alternative && <p className="mt-1 font-semibold">{answer.alternative}</p>}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 pt-1">
        <Link
          to="/map"
          className="flex min-h-12 items-center justify-center rounded-xl bg-secondary text-xs font-extrabold text-secondary-foreground"
        >
          VIEW ON MAP
        </Link>
        <Link
          to="/map"
          className="ocean-bright flex min-h-12 items-center justify-center rounded-xl text-xs font-extrabold text-ocean-foreground"
        >
          START NAVIGATION
        </Link>
      </div>
    </Card>
  );
}
