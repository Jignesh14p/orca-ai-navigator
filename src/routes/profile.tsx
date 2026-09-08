import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Globe, LifeBuoy, Mic, RefreshCw, Satellite, WifiOff } from "lucide-react";
import { toast } from "sonner";
import { AppShell, Card, OrcaMark, ScreenHeader } from "@/components/orca/shell";
import { dataSources, vessel } from "@/lib/orca/data";
import { useOrca } from "@/lib/orca/state";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile & Settings | ORCA" },
      {
        name: "description",
        content:
          "Fisherman profile, boat details, language, voice settings, offline mode, emergency settings and marine data sources.",
      },
      { property: "og:title", content: "Profile & Settings | ORCA" },
      {
        property: "og:description",
        content: "Control language, voice, offline sync and emergency settings in ORCA.",
      },
    ],
  }),
  component: ProfileScreen,
});

function ProfileScreen() {
  const {
    t,
    langLabel,
    setLangSheetOpen,
    voiceEnabled,
    setVoiceEnabled,
    online,
    setOnline,
    autoSync,
    setAutoSync,
  } = useOrca();

  return (
    <AppShell>
      <ScreenHeader title="PROFILE" subtitle="Fisherman profile & settings" />
      <div className="-mt-4 space-y-4 p-4">
        <Card className="flex items-center gap-4">
          <span className="flex size-16 items-center justify-center rounded-2xl bg-ocean/10 text-xl font-black text-ocean">
            DU
          </span>
          <div>
            <p className="text-lg font-black">{vessel.captain}</p>
            <p className="text-sm font-semibold text-muted-foreground">Boat: {vessel.name}</p>
            <p className="text-sm font-semibold text-muted-foreground">
              Home Port: {vessel.homePort}
            </p>
          </div>
        </Card>

        <Card className="divide-y divide-border">
          <button
            type="button"
            onClick={() => setLangSheetOpen(true)}
            className="flex min-h-14 w-full items-center gap-3 text-left"
          >
            <Globe className="size-5 text-ocean" />
            <span className="flex-1 text-sm font-bold">
              {t("changeLanguage")}
              <span className="block text-xs font-medium text-muted-foreground">
                Current: {langLabel}
              </span>
            </span>
            <ChevronRight className="size-5 text-muted-foreground" />
          </button>

          <Toggle
            icon={<Mic className="size-5 text-ocean" />}
            label="Voice assistant"
            hint="Speech input and spoken replies"
            value={voiceEnabled}
            onChange={() => setVoiceEnabled(!voiceEnabled)}
          />
          <Toggle
            icon={<WifiOff className="size-5 text-ocean" />}
            label="Offline mode"
            hint="Use only locally synced marine data"
            value={!online}
            onChange={() => {
              setOnline(!online);
              toast.success(online ? "Offline mode on" : "Back online");
            }}
          />
          <Toggle
            icon={<RefreshCw className="size-5 text-ocean" />}
            label="Automatic sync"
            hint="Sync marine data when in harbour"
            value={autoSync}
            onChange={() => setAutoSync(!autoSync)}
          />
        </Card>

        <Card className="space-y-2">
          <p className="flex items-center gap-2 text-sm font-extrabold">
            <LifeBuoy className="size-5 text-danger" /> Emergency settings
          </p>
          <p className="text-sm text-muted-foreground">
            Coast Guard: 1554 · Marine Police: 100 · Emergency contact: not set
          </p>
          <Link
            to="/pre-departure"
            className="flex min-h-12 items-center justify-center rounded-xl bg-danger/10 text-xs font-extrabold text-danger"
          >
            SET EMERGENCY CONTACT
          </Link>
        </Card>

        <Card className="space-y-2">
          <p className="flex items-center gap-2 text-sm font-extrabold">
            <Satellite className="size-5 text-ocean" /> Marine data sources
          </p>
          {dataSources.map((d) => (
            <p key={d.id} className="flex items-center justify-between text-sm font-semibold">
              <span>
                <span className="mr-2 inline-block size-2.5 rounded-full bg-sea align-middle" />
                {d.name}
              </span>
              <span className="text-xs text-sea">{d.status}</span>
            </p>
          ))}
        </Card>

        <Card className="space-y-2 text-center">
          <OrcaMark className="mx-auto size-12 text-ocean" />
          <p className="text-sm font-black tracking-widest">ABOUT ORCA</p>
          <p className="text-xs text-muted-foreground">
            Marine EcOsystem Reasoning with Collaborative Agents. Collaborative AI agents transform
            complex ocean data into safe, multilingual, actionable intelligence — online and offline.
          </p>
          <Link to="/intelligence-process" className="text-xs font-extrabold text-ocean">
            View the agent architecture →
          </Link>
          <p className="text-[11px] text-muted-foreground">Prototype v1.0 · Sample marine data</p>
        </Card>
      </div>
    </AppShell>
  );
}

function Toggle({
  icon,
  label,
  hint,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  hint: string;
  value: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex min-h-14 items-center gap-3">
      {icon}
      <span className="flex-1 text-sm font-bold">
        {label}
        <span className="block text-xs font-medium text-muted-foreground">{hint}</span>
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        aria-label={label}
        onClick={onChange}
        className={cn(
          "flex h-8 w-14 items-center rounded-full p-1 transition-colors",
          value ? "bg-sea" : "bg-muted",
        )}
      >
        <span
          className={cn(
            "size-6 rounded-full bg-card shadow-card transition-transform",
            value && "translate-x-6",
          )}
        />
      </button>
    </div>
  );
}
