import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Mic, Send, Workflow } from "lucide-react";
import { AgentChips, AnalysingSteps, RecommendationCard } from "@/components/orca/agent-ui";
import { AppShell, LanguageButton, OrcaMark } from "@/components/orca/shell";
import { runOrca, suggestedQuestions, type OrcaAnswer } from "@/lib/orca/agents";
import { useOrca } from "@/lib/orca/state";

export const Route = createFileRoute("/ai")({
  head: () => ({
    meta: [
      { title: "ORCA AI — Collaborative Marine Agents" },
      {
        name: "description",
        content:
          "Ask ORCA about weather, routes, fishing zones or safety. A supervisor agent coordinates specialist agents and a safety veto engine checks every answer.",
      },
      { property: "og:title", content: "ORCA AI — Collaborative Marine Agents" },
      {
        property: "og:description",
        content: "Multi-agent marine reasoning with a visible safety veto engine.",
      },
    ],
  }),
  component: AiScreen,
});

type Turn = { id: number; query: string; answer: OrcaAnswer; completed: number };

function AiScreen() {
  const { t } = useOrca();
  const { lang } = useOrca();
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [turns]);

  const ask = (query: string) => {
    if (!query.trim() || busy) return;
    const answer = runOrca(query, lang);
    const id = Date.now();
    setTurns((prev) => [...prev, { id, query, answer, completed: 0 }]);
    setInput("");
    setBusy(true);
    answer.steps.forEach((_, i) => {
      setTimeout(() => {
        setTurns((prev) => prev.map((tn) => (tn.id === id ? { ...tn, completed: i + 1 } : tn)));
        if (i === answer.steps.length - 1) {
          setBusy(false);
          inputRef.current?.focus();
        }
      }, 550 * (i + 1));
    });
  };

  return (
    <AppShell>
      <header className="ocean-depth space-y-3 px-4 pt-4 pb-5 text-navy-foreground">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            aria-label="Back"
            className="flex size-10 items-center justify-center rounded-full bg-navy-foreground/15"
          >
            ←
          </Link>
          <OrcaMark className="size-8 text-aqua" />
          <div className="flex-1">
            <h1 className="text-lg font-extrabold tracking-wide">ORCA AI</h1>
            <p className="flex items-center gap-1.5 text-[11px] text-navy-foreground/75">
              <span className="size-2 rounded-full bg-sea" /> {t("agentsOnline")}
            </p>
          </div>
          <LanguageButton dark />
        </div>
        <AgentChips active={busy ? ["supervisor", "weather", "navigation", "safety", "fishing"] : []} />
        <Link
          to="/intelligence-process"
          className="inline-flex items-center gap-1.5 rounded-full bg-navy-foreground/12 px-3 py-2 text-[11px] font-bold"
        >
          <Workflow className="size-4" /> View Intelligence Process
        </Link>
      </header>

      <div className="space-y-4 p-4">
        {turns.length === 0 && (
          <div className="space-y-2">
            <p className="text-sm font-bold">Marine command centre — ask anything:</p>
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => ask(q)}
                className="min-h-13 w-full rounded-2xl bg-card px-4 py-3.5 text-left text-sm font-semibold shadow-card"
              >
                {q}
              </button>
            ))}
            <button
              type="button"
              onClick={() => ask("Can I fish in Zone Gamma?")}
              className="min-h-13 w-full rounded-2xl bg-danger/8 px-4 py-3.5 text-left text-sm font-semibold text-danger"
            >
              Can I fish in Zone Gamma? (safety veto demo)
            </button>
          </div>
        )}

        {turns.map((turn) => (
          <div key={turn.id} className="space-y-3">
            <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-ocean px-4 py-2.5 text-sm font-semibold text-ocean-foreground">
              {turn.query}
            </p>
            <AnalysingSteps
              steps={turn.answer.steps}
              completed={turn.completed}
              title={
                turn.completed < turn.answer.steps.length ? "ORCA IS ANALYSING" : "AGENT TRACE COMPLETE"
              }
            />
            {turn.completed >= turn.answer.steps.length && <RecommendationCard answer={turn.answer} />}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="sticky bottom-0 flex items-center gap-2 border-t border-border bg-card p-3">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask(input)}
          placeholder={t("askPlaceholder")}
          className="min-h-12 flex-1 rounded-xl bg-muted px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="button"
          onClick={() => ask(input)}
          aria-label="Send"
          className="ocean-bright flex size-12 items-center justify-center rounded-xl text-ocean-foreground"
        >
          <Send className="size-5" />
        </button>
        <Link
          to="/voice"
          aria-label={t("voice")}
          className="flex size-12 items-center justify-center rounded-xl bg-aqua text-aqua-foreground"
        >
          <Mic className="size-5" />
        </Link>
      </div>
    </AppShell>
  );
}
