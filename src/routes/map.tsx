import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { MarineMap } from "@/components/orca/marine-map";
import { AppShell, Card, LanguageButton } from "@/components/orca/shell";
import { fishingZones, route as demoRoute, lighthouses } from "@/lib/orca/data";
import { useOrca } from "@/lib/orca/state";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Marine Navigation Map | ORCA" },
      {
        name: "description",
        content:
          "Offline-capable marine chart with vessel position, safe route, hazard and restricted zones, fishing zones and lighthouse markers.",
      },
      { property: "og:title", content: "Marine Navigation Map | ORCA" },
      {
        property: "og:description",
        content: "Route safety, avoid zones and lighthouse navigation on one marine chart.",
      },
    ],
  }),
  component: MapScreen,
});

function MapScreen() {
  const { t } = useOrca();
  const [selected, setSelected] = useState(fishingZones[0]!.id);
  const [alt, setAlt] = useState(false);
  const zone = fishingZones.find((z) => z.id === selected)!;
  const blocked = zone.status === "restricted" && !alt;
  const shown = blocked ? zone : alt ? fishingZones[0]! : zone;

  return (
    <AppShell>
      <div className="relative">
        <MarineMap
          className="h-[62vh]"
          focusZone={shown.id}
          routeBlocked={blocked}
          onSelectZone={(id) => {
            setSelected(id);
            setAlt(false);
          }}
        />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <Link
            to="/"
            aria-label="Back"
            className="flex size-11 items-center justify-center rounded-xl bg-card text-ocean shadow-float"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <LanguageButton />
        </div>
      </div>

      <div className="space-y-3 p-4">
        {blocked && (
          <Card className="border-l-4 border-danger bg-danger/5">
            <p className="flex items-center gap-2 text-sm font-extrabold text-danger">
              <AlertTriangle className="size-5" /> ⚠ ROUTE SAFETY ALERT
            </p>
            <p className="mt-1.5 text-sm font-semibold">
              Your current route passes through a restricted marine zone.
            </p>
            <p className="mt-1 text-sm">
              {zone.note} Fishing here is not allowed and can damage fish stocks.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAlt(true)}
                className="ocean-bright min-h-12 rounded-xl text-xs font-extrabold text-ocean-foreground"
              >
                VIEW ALTERNATIVE
              </button>
              <button
                type="button"
                onClick={() => setAlt(true)}
                className="min-h-12 rounded-xl bg-secondary text-xs font-extrabold text-secondary-foreground"
              >
                CONTINUE WITH CAUTION
              </button>
            </div>
          </Card>
        )}

        <Card className="space-y-3">
          <p className="text-[11px] font-extrabold tracking-widest text-muted-foreground">
            CURRENT ROUTE
          </p>
          <div>
            <p className="text-xs font-bold text-muted-foreground">Destination</p>
            <p className="text-lg font-black">
              {blocked ? demoRoute.destination : `Fishing ${shown.name}`}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Info label="Distance" value={`${shown.distanceKm} km`} />
            <Info label="ETA" value={`${Math.round(shown.distanceKm * 3.1)} min`} />
            <Info label="Heading" value={demoRoute.bearing} />
          </div>
          <p
            className={
              blocked
                ? "rounded-xl bg-danger/10 px-3 py-2.5 text-sm font-extrabold text-danger"
                : "rounded-xl bg-sea/10 px-3 py-2.5 text-sm font-extrabold text-sea"
            }
          >
            Route Status: {blocked ? "🚫 BLOCKED BY SAFETY ENGINE" : "✓ SAFE"}
          </p>
          <button
            type="button"
            disabled={blocked}
            className="ocean-bright min-h-14 w-full rounded-xl text-sm font-extrabold text-ocean-foreground disabled:opacity-40"
          >
            {t("startNavigation")}
          </button>
        </Card>

        <Card className="space-y-2">
          <p className="text-[11px] font-extrabold tracking-widest text-muted-foreground">
            NEAREST LIGHTHOUSES
          </p>
          {lighthouses.map((l) => (
            <p key={l.id} className="flex justify-between text-sm font-semibold">
              <span>🗼 {l.name}</span>
              <span className="text-muted-foreground">{l.distanceKm} km</span>
            </p>
          ))}
        </Card>
      </div>
    </AppShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted/70 p-2.5">
      <p className="text-[10px] font-bold text-muted-foreground">{label}</p>
      <p className="text-sm font-extrabold">{value}</p>
    </div>
  );
}
