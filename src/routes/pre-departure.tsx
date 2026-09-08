import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { AppShell, Card, Meter, ScreenHeader } from "@/components/orca/shell";
import { checklistItems, dataSources } from "@/lib/orca/data";
import { useOrca } from "@/lib/orca/state";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pre-departure")({
  head: () => ({
    meta: [
      { title: "Pre-Departure Check | ORCA" },
      {
        name: "description",
        content:
          "Sync marine weather, maps, hazard zones and fishing advisories before going offshore so ORCA keeps working offline.",
      },
      { property: "og:title", content: "Pre-Departure Check | ORCA" },
      {
        property: "og:description",
        content: "Offline-first marine intelligence: download everything before you leave harbour.",
      },
    ],
  }),
  component: PreDeparture,
});

function PreDeparture() {
  const { sync, markSynced, toggleChecklistItem, setEmergencyChecked, online, setOnline } = useOrca();
  const [progress, setProgress] = useState<number | null>(null);

  const done = checklistItems.filter((i) => sync.done[i.id]).length + (sync.emergencyChecked ? 1 : 0);
  const total = checklistItems.length + 1;
  const ready = done === total;

  const runSync = () => {
    if (progress !== null) return;
    setProgress(0);
    let p = 0;
    const id = setInterval(() => {
      p += 10;
      setProgress(p);
      if (p >= 100) {
        clearInterval(id);
        markSynced();
        setProgress(null);
        toast.success("All marine data synced for offline use");
      }
    }, 180);
  };

  return (
    <AppShell>
      <ScreenHeader title="PRE-DEPARTURE CHECK" subtitle={`${done} / ${total} complete`} />
      <div className="-mt-4 space-y-4 p-4">
        <Card className="space-y-3">
          <Meter value={(done / total) * 100} tone={ready ? "sea" : "caution"} />
          <p
            className={cn(
              "rounded-xl px-3 py-2.5 text-center text-sm font-extrabold tracking-wide",
              ready ? "bg-sea/12 text-sea" : "bg-caution/16 text-caution",
            )}
          >
            {ready ? "READY TO DEPART" : "SYNC REQUIRED"}
          </p>
          <p className="text-xs text-muted-foreground">Last synced: {sync.lastSynced}</p>
        </Card>

        <Card className="space-y-2">
          {checklistItems.map((item) => {
            const checked = !!sync.done[item.id];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleChecklistItem(item.id)}
                className="flex min-h-14 w-full items-center gap-3 rounded-xl bg-muted/50 px-3 text-left"
              >
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full border-2",
                    checked ? "border-sea bg-sea text-sea-foreground" : "border-border",
                  )}
                >
                  {checked && <Check className="size-4" />}
                </span>
                <span className="text-sm font-semibold">{item.label}</span>
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setEmergencyChecked(!sync.emergencyChecked)}
            className="flex min-h-14 w-full items-center gap-3 rounded-xl bg-muted/50 px-3 text-left"
          >
            <span
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-full border-2",
                sync.emergencyChecked ? "border-sea bg-sea text-sea-foreground" : "border-border",
              )}
            >
              {sync.emergencyChecked && <Check className="size-4" />}
            </span>
            <span className="text-sm font-semibold">Emergency contact check</span>
          </button>
        </Card>

        {progress !== null && (
          <Card className="space-y-2">
            <p className="text-sm font-extrabold text-ocean">Syncing marine intelligence…</p>
            <Meter value={progress} />
            <p className="text-xs text-muted-foreground">{progress}% · INCOIS · IMD · MOSDAC · NavIC</p>
          </Card>
        )}

        <button
          type="button"
          onClick={runSync}
          className="ocean-bright flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl text-sm font-extrabold text-ocean-foreground"
        >
          <RefreshCw className={cn("size-5", progress !== null && "animate-spin")} /> SYNC ALL DATA
        </button>

        <Card className="space-y-2">
          <p className="text-[11px] font-extrabold tracking-widest text-muted-foreground">
            DATA SOURCES
          </p>
          {dataSources.map((d) => (
            <div key={d.id} className="flex items-center justify-between">
              <p className="text-sm font-semibold">
                <span className="mr-2 inline-block size-2.5 rounded-full bg-sea align-middle" />
                {d.name}
                <span className="block text-[11px] font-medium text-muted-foreground">{d.detail}</span>
              </p>
              <span className="text-xs font-bold text-sea">{d.status}</span>
            </div>
          ))}
        </Card>

        <Card className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold">
            Offline mode demo
            <span className="block text-xs text-muted-foreground">
              Turn this on to prove the app keeps working at sea.
            </span>
          </p>
          <button
            type="button"
            onClick={() => {
              setOnline(!online);
              toast.success(online ? "Switched to offline mode" : "Back online");
            }}
            className={cn(
              "min-h-11 rounded-full px-4 text-xs font-extrabold",
              online ? "bg-secondary text-secondary-foreground" : "bg-ocean text-ocean-foreground",
            )}
          >
            {online ? "GO OFFLINE" : "GO ONLINE"}
          </button>
        </Card>
      </div>
    </AppShell>
  );
}
