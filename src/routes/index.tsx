import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Anchor,
  ChevronRight,
  CloudSun,
  Compass,
  Fish,
  Mic,
  RefreshCw,
  ShieldCheck,
  Waves,
} from "lucide-react";
import { AppShell, Card, LanguageButton, Meter, OrcaMark } from "@/components/orca/shell";
import { alerts, fishingZones, marineConditions, safety, vessel } from "@/lib/orca/data";
import { suggestedQuestions } from "@/lib/orca/agents";
import { useOrca } from "@/lib/orca/state";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ORCA — Marine Intelligence for Fishermen" },
      {
        name: "description",
        content:
          "ORCA turns ocean data into actionable intelligence: safe routes, fishing zones, marine alerts and a multilingual offline-first AI assistant.",
      },
      { property: "og:title", content: "ORCA — From Ocean Data to Actionable Intelligence" },
      {
        property: "og:description",
        content:
          "Collaborative AI agents for safe marine navigation, sustainable fishing and offline marine intelligence.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { onboarded } = useOrca();
  const [phase, setPhase] = useState<"splash" | "onboarding" | "home">("splash");

  useEffect(() => {
    const timer = setTimeout(() => setPhase(onboarded ? "home" : "onboarding"), 2300);
    return () => clearTimeout(timer);
  }, [onboarded]);

  if (phase === "splash") return <Splash />;
  if (phase === "onboarding") return <Onboarding onDone={() => setPhase("home")} />;
  return <Dashboard />;
}

function Splash() {
  return (
    <div className="ocean-depth relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-8 text-center text-navy-foreground">
      <span className="absolute size-56 rounded-full border border-aqua/40 orca-sonar" />
      <span
        className="absolute size-56 rounded-full border border-aqua/30 orca-sonar"
        style={{ animationDelay: "1.2s" }}
      />
      <OrcaMark className="relative size-24 text-aqua" />
      <h1 className="relative mt-6 text-4xl font-black tracking-[0.2em]">ORCA</h1>
      <p className="relative mt-2 text-xs font-semibold text-navy-foreground/75">
        Marine EcOsystem Reasoning
        <br />
        with Collaborative Agents
      </p>
      <p className="relative mt-6 text-sm font-bold text-aqua">
        “From Ocean Data to Actionable Intelligence.”
      </p>
      <p className="relative mt-8 text-[11px] tracking-widest text-navy-foreground/60 uppercase">
        Connecting NavIC · INCOIS · IMD · MOSDAC
      </p>
      <div className="absolute bottom-0 left-0 w-[200%] orca-wave">
        <svg viewBox="0 0 1200 120" className="w-full">
          <path
            d="M0 60 C 150 20, 300 100, 450 60 S 750 20, 900 60 S 1050 100, 1200 60 L1200 120 L0 120 Z"
            fill="oklch(0.735 0.129 240 / 0.25)"
          />
        </svg>
      </div>
    </div>
  );
}

const slides = [
  {
    icon: "🧭",
    title: "Navigate Safely",
    text: "Get intelligent route guidance and marine safety alerts.",
  },
  { icon: "🐟", title: "Fish Smarter", text: "Discover data-driven potential fishing zones." },
  {
    icon: "🤖",
    title: "Ask ORCA",
    text: "Your multilingual AI marine assistant, available online and offline.",
  },
];

function Onboarding({ onDone }: { onDone: () => void }) {
  const { completeOnboarding } = useOrca();
  const [i, setI] = useState(0);
  const finish = () => {
    completeOnboarding();
    onDone();
  };
  const slide = slides[i]!;
  return (
    <div className="ocean-depth flex min-h-screen flex-col px-6 pt-8 pb-10 text-navy-foreground">
      <button
        type="button"
        onClick={finish}
        className="self-end text-sm font-bold text-navy-foreground/70"
      >
        SKIP
      </button>
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <span className="flex size-28 items-center justify-center rounded-3xl bg-navy-foreground/10 text-6xl orca-float">
          {slide.icon}
        </span>
        <h2 className="mt-8 text-3xl font-black">{slide.title}</h2>
        <p className="mt-3 max-w-xs text-base text-navy-foreground/80">{slide.text}</p>
      </div>
      <div className="mb-6 flex justify-center gap-2">
        {slides.map((s, idx) => (
          <span
            key={s.title}
            className={
              idx === i ? "h-2 w-7 rounded-full bg-aqua" : "size-2 rounded-full bg-navy-foreground/30"
            }
          />
        ))}
      </div>
      <button
        type="button"
        onClick={() => (i === slides.length - 1 ? finish() : setI(i + 1))}
        className="ocean-bright min-h-14 rounded-2xl text-base font-extrabold text-ocean-foreground"
      >
        {i === slides.length - 1 ? "GET STARTED" : "NEXT"}
      </button>
    </div>
  );
}

function Dashboard() {
  const { t, online, sync } = useOrca();
  const navigate = useNavigate();
  const alpha = fishingZones[0]!;
  const topAlert = alerts[1]!;

  return (
    <AppShell>
      <header className="ocean-depth px-4 pt-5 pb-16 text-navy-foreground">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-navy-foreground/75">{t("goodMorning")} 👋</p>
            <h1 className="text-2xl font-black">{t("captain")}</h1>
            <p className="mt-2 text-[11px] tracking-wide text-navy-foreground/70 uppercase">
              {t("currentLocation")}
            </p>
            <p className="text-sm font-bold">📍 {vessel.location}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <LanguageButton dark />
              <Link
                to="/profile"
                className="flex size-11 items-center justify-center rounded-full bg-aqua text-sm font-black text-aqua-foreground"
              >
                DU
              </Link>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sea/20 px-3 py-1.5 text-[11px] font-bold text-sea">
              <span className="size-2 rounded-full bg-sea" /> {t("allSafe")}
            </span>
          </div>
        </div>
      </header>

      <div className="-mt-12 space-y-4 px-4 pb-6">
        {/* Weather hero */}
        <Card className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-extrabold tracking-widest text-muted-foreground">
              {t("marineConditions")}
            </p>
            <span className="text-[11px] font-bold text-ocean">IMD · INCOIS</span>
          </div>
          <div className="flex items-center gap-3">
            <CloudSun className="size-11 text-caution" />
            <div>
              <p className="text-3xl leading-none font-black">{marineConditions.temperatureC}°C</p>
              <p className="text-sm font-semibold text-muted-foreground">
                {marineConditions.summary}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Stat label={t("wind")} value={`${marineConditions.windKmh} km/h`} />
            <Stat label={t("waveHeight")} value={`${marineConditions.waveHeightM} m`} />
            <Stat label={t("seaCondition")} value={marineConditions.seaCondition} />
          </div>
          <p className="flex items-center gap-2 rounded-xl bg-sea/10 px-3 py-2.5 text-sm font-extrabold text-sea">
            <ShieldCheck className="size-5" /> ✓ {t("safeForDeparture")}
          </p>
        </Card>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3">
          <Action to="/map" icon={<Compass className="size-7" />} label={t("navigate")} />
          <Action to="/fish" icon={<Fish className="size-7" />} label={t("findFish")} />
          <Action to="/safety" icon={<AlertTriangle className="size-7" />} label={t("safetyCheck")} />
          <Action
            to="/pre-departure"
            icon={<RefreshCw className="size-7" />}
            label={t("syncData")}
          />
        </div>

        {/* AI hero */}
        <section className="ocean-depth relative overflow-hidden rounded-2xl p-4 text-navy-foreground shadow-float">
          <div className="flex items-center gap-2">
            <OrcaMark className="size-9 text-aqua" />
            <div>
              <p className="text-base font-black tracking-wide">ORCA AI</p>
              <p className="text-[11px] text-navy-foreground/70">
                Supervisor + 5 agents · Safety veto engine
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm font-semibold">{t("howCanIHelp")}</p>
          <ul className="mt-2 space-y-1 text-[12px] text-navy-foreground/80">
            {suggestedQuestions.map((q) => (
              <li key={q}>• {q}</li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-2 rounded-2xl bg-navy-foreground/12 p-1.5">
            <button
              type="button"
              onClick={() => navigate({ to: "/ai" })}
              className="min-h-11 flex-1 px-3 text-left text-sm text-navy-foreground/70"
            >
              {t("askAnything")}
            </button>
            <Link
              to="/voice"
              aria-label="Start voice chat"
              className="flex size-12 items-center justify-center rounded-xl bg-aqua text-aqua-foreground orca-pulse-ring"
            >
              <Mic className="size-6" />
            </Link>
          </div>
        </section>

        {/* Alerts */}
        <div className="space-y-2">
          <h2 className="text-sm font-extrabold tracking-wide">{t("marineAlerts")}</h2>
          <Card className="border-l-4 border-caution">
            <p className="text-sm font-extrabold text-caution">⚠️ {topAlert.title.toUpperCase()}</p>
            <p className="mt-1 text-sm">{topAlert.problem}</p>
            <p className="mt-1 text-xs font-semibold text-muted-foreground">
              Severity: Moderate · {topAlert.location}
            </p>
            <Link
              to="/alerts"
              className="mt-3 inline-flex items-center gap-1 text-xs font-extrabold text-ocean"
            >
              {t("viewDetails")} <ChevronRight className="size-4" />
            </Link>
          </Card>
          <Card className="flex items-center gap-2 text-sm font-semibold text-sea">
            <span className="size-2.5 rounded-full bg-sea" /> No critical hazards within 10 km
          </Card>
        </div>

        {/* Fishing insight */}
        <Card className="space-y-3">
          <h2 className="text-sm font-extrabold tracking-wide">{t("fishingIntelligence")}</h2>
          <div className="flex items-end justify-between">
            <p className="text-xs font-bold text-muted-foreground">{t("fishLikelihood")}</p>
            <p className="text-2xl font-black text-sea">{alpha.likelihood}%</p>
          </div>
          <Meter value={alpha.likelihood} tone="sea" />
          <p className="text-xs font-extrabold tracking-wide text-sea">{t("highPotential")}</p>
          <p className="text-sm">
            <span className="font-bold">{t("recommendedZone")}:</span> {alpha.distanceKm} km
            north-east · {alpha.bestTime}
          </p>
          <Link
            to="/fish"
            className="ocean-bright flex min-h-13 items-center justify-center rounded-xl py-3.5 text-xs font-extrabold text-ocean-foreground"
          >
            {t("viewFishingZone")}
          </Link>
        </Card>

        {/* Offline card */}
        <Card className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[11px] font-extrabold tracking-widest text-muted-foreground">
              {t("offlineIntelligence")}
            </h2>
            <span
              className={
                online
                  ? "text-[11px] font-bold text-sea"
                  : "text-[11px] font-bold text-ocean"
              }
            >
              {online ? t("online") : t("offline")}
            </span>
          </div>
          <p className="text-sm">
            <span className="font-bold">{t("lastSynced")}:</span> {sync.lastSynced}
          </p>
          <div className="grid grid-cols-2 gap-1.5 text-sm font-semibold">
            <p className="text-sea">✓ Maps</p>
            <p className="text-sea">✓ Weather</p>
            <p className="text-sea">✓ Hazard Zones</p>
            <p className="text-sea">✓ Fishing Advisories</p>
          </div>
          <Link
            to="/pre-departure"
            className="flex min-h-12 items-center justify-center rounded-xl bg-secondary text-xs font-extrabold text-secondary-foreground"
          >
            {t("manageOffline")}
          </Link>
        </Card>

        <p className="flex items-center justify-center gap-2 pt-2 pb-1 text-[11px] font-bold tracking-widest text-muted-foreground uppercase">
          <Waves className="size-4" /> From ocean data to actionable intelligence
          <Anchor className="size-4" />
        </p>
      </div>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted/70 p-2.5">
      <p className="text-[10px] font-bold text-muted-foreground">{label}</p>
      <p className="text-sm font-extrabold">{value}</p>
    </div>
  );
}

function Action({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      to={to}
      className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl bg-card text-ocean shadow-card"
    >
      {icon}
      <span className="text-sm font-extrabold text-foreground">{label}</span>
    </Link>
  );
}
