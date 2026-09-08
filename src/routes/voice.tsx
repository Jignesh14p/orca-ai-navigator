import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Globe, Mic } from "lucide-react";
import { LanguageSheet, OrcaMark } from "@/components/orca/shell";
import { runOrca } from "@/lib/orca/agents";
import { useOrca } from "@/lib/orca/state";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/voice")({
  head: () => ({
    meta: [
      { title: "Voice Chat with ORCA" },
      {
        name: "description",
        content:
          "Hands-free multilingual voice assistant for fishermen: ask about weather, navigation, fishing zones or marine safety.",
      },
      { property: "og:title", content: "Voice Chat with ORCA" },
      {
        property: "og:description",
        content: "Speak to ORCA in your language and hear safety-checked marine guidance.",
      },
    ],
  }),
  component: VoiceScreen,
});

const prompts = [
  "Is it safe to travel?",
  "Where can I find fish?",
  "Navigate me to the nearest lighthouse.",
];

type Phase = "idle" | "listening" | "thinking" | "speaking";

function VoiceScreen() {
  const { t, lang, setLangSheetOpen } = useOrca();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("listening");
  const [query, setQuery] = useState("");
  const [reply, setReply] = useState("");

  useEffect(() => {
    if (phase !== "thinking") return;
    const answer = runOrca(query, lang);
    const timer = setTimeout(() => {
      setReply(answer.spoken);
      setPhase("speaking");
    }, 1800);
    return () => clearTimeout(timer);
  }, [phase, query, lang]);

  const heading =
    phase === "listening"
      ? t("listening")
      : phase === "thinking"
        ? t("thinking")
        : phase === "speaking"
          ? t("speaking")
          : t("howCanIHelp");

  return (
    <div className="ocean-depth relative flex min-h-screen flex-col items-center justify-between px-6 pt-10 pb-8 text-center text-navy-foreground">
      <div className="flex w-full items-center justify-between">
        <OrcaMark className="size-9 text-aqua" />
        <button
          type="button"
          onClick={() => setLangSheetOpen(true)}
          className="flex min-h-11 items-center gap-1.5 rounded-full bg-navy-foreground/15 px-3 text-sm font-bold"
        >
          <Globe className="size-4" /> {t("changeLanguage")}
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-6">
        <div className="relative flex h-32 items-end gap-1.5">
          {Array.from({ length: 13 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "w-2.5 rounded-full bg-aqua",
                phase === "thinking" ? "opacity-40" : "orca-bar",
              )}
              style={{
                height: `${30 + Math.sin(i) * 22 + (i % 4) * 14}px`,
                animationDelay: `${i * 70}ms`,
              }}
            />
          ))}
        </div>
        <h1 className="text-2xl font-black">{heading}</h1>
        {phase === "speaking" ? (
          <p className="max-w-xs text-base font-semibold text-navy-foreground/90">{reply}</p>
        ) : (
          <p className="max-w-xs text-sm text-navy-foreground/70">
            Ask me about weather, navigation, fishing zones or marine safety.
          </p>
        )}

        {phase === "listening" && (
          <div className="w-full space-y-2">
            {prompts.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  setQuery(p);
                  setPhase("thinking");
                }}
                className="min-h-13 w-full rounded-2xl bg-navy-foreground/12 px-4 py-3.5 text-left text-sm font-semibold"
              >
                🎙 “{p}”
              </button>
            ))}
          </div>
        )}

        {phase === "speaking" && (
          <div className="w-full space-y-2">
            <button
              type="button"
              onClick={() => navigate({ to: "/ai" })}
              className="ocean-bright min-h-13 w-full rounded-2xl text-sm font-extrabold text-ocean-foreground"
            >
              VIEW DETAILS
            </button>
            <button
              type="button"
              onClick={() => {
                setPhase("listening");
                setReply("");
              }}
              className="min-h-13 w-full rounded-2xl bg-navy-foreground/12 text-sm font-bold"
            >
              ASK ANOTHER QUESTION
            </button>
          </div>
        )}
      </div>

      <div className="w-full space-y-3">
        <div className="flex justify-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-aqua text-aqua-foreground orca-pulse-ring">
            <Mic className="size-7" />
          </span>
        </div>
        <button
          type="button"
          onClick={() => navigate({ to: "/" })}
          className="min-h-13 w-full rounded-2xl bg-danger/90 text-sm font-extrabold text-danger-foreground"
        >
          {t("endVoiceChat")}
        </button>
      </div>
      <LanguageSheet />
    </div>
  );
}
