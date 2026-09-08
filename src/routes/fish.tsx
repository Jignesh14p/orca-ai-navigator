import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, Card, Meter, ScreenHeader } from "@/components/orca/shell";
import { fishingZones } from "@/lib/orca/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/fish")({
  head: () => ({
    meta: [
      { title: "Fish Intelligence | ORCA" },
      {
        name: "description",
        content:
          "Today's potential fishing zones with likelihood scores, best windows, distance and sustainability status — restricted zones are blocked automatically.",
      },
      { property: "og:title", content: "Fish Intelligence | ORCA" },
      {
        property: "og:description",
        content: "Data-driven, sustainable fishing zone guidance for the Chennai coast.",
      },
    ],
  }),
  component: FishScreen,
});

function FishScreen() {
  return (
    <AppShell>
      <ScreenHeader title="FISH INTELLIGENCE" subtitle="INCOIS potential fishing zone advisory" />
      <div className="-mt-4 space-y-4 p-4">
        <Card>
          <p className="text-sm font-extrabold">Today's Potential Fishing Zones</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Chennai Coast · updated Today, 06:42 AM · verified by the safety veto engine
          </p>
        </Card>

        {fishingZones.map((z) => {
          const restricted = z.status === "restricted";
          return (
            <Card key={z.id} className={cn("space-y-3", restricted && "border-l-4 border-danger")}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-base font-black tracking-wide">{z.name.toUpperCase()}</p>
                  <p
                    className={cn(
                      "text-xs font-extrabold",
                      restricted
                        ? "text-danger"
                        : z.likelihood >= 80
                          ? "text-sea"
                          : "text-caution",
                    )}
                  >
                    {restricted
                      ? "🚫 RESTRICTED"
                      : z.likelihood >= 80
                        ? "🐟 HIGH PROBABILITY"
                        : "🐟 MODERATE PROBABILITY"}
                  </p>
                </div>
                <p className="text-3xl font-black">{z.likelihood}%</p>
              </div>
              <Meter value={z.likelihood} tone={restricted ? "danger" : z.likelihood >= 80 ? "sea" : "caution"} />
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p>
                  <span className="font-bold">Distance:</span> {z.distanceKm} km
                </p>
                <p>
                  <span className="font-bold">Lat/Lon:</span> {z.lat}, {z.lon}
                </p>
              </div>
              <p className="text-sm">
                <span className="font-bold">Best time:</span> {z.bestTime}
              </p>

              {restricted ? (
                <>
                  <div className="rounded-xl bg-danger/10 p-3 text-sm">
                    <p className="font-extrabold text-danger">DO NOT RECOMMEND</p>
                    <p className="mt-1">{z.note}</p>
                    <p className="mt-1 font-semibold">
                      Safe alternative: Zone Alpha, 8.2 km north-east, 87% likelihood.
                    </p>
                  </div>
                  <Link
                    to="/map"
                    className="flex min-h-12 items-center justify-center rounded-xl bg-secondary text-xs font-extrabold text-secondary-foreground"
                  >
                    VIEW SAFE ALTERNATIVE
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-sm font-extrabold text-sea">
                    ✓ {z.status === "sustainable" ? "Sustainable — recommended" : "Safe to fish"}
                  </p>
                  <Link
                    to="/map"
                    className="ocean-bright flex min-h-12 items-center justify-center rounded-xl text-xs font-extrabold text-ocean-foreground"
                  >
                    VIEW ON MAP
                  </Link>
                </>
              )}
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}
