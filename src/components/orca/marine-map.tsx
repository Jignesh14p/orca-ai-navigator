import { Compass, Crosshair, Layers } from "lucide-react";
import { useState } from "react";
import { fishingZones, lighthouses } from "@/lib/orca/data";
import { cn } from "@/lib/utils";

export type MapFocus = string | null;

export function MarineMap({
  focusZone,
  showRoute = true,
  routeBlocked = false,
  className,
  onSelectZone,
}: {
  focusZone?: MapFocus;
  showRoute?: boolean;
  routeBlocked?: boolean;
  className?: string;
  onSelectZone?: (id: string) => void;
}) {
  const [layers, setLayers] = useState({ hazard: true, fishing: true, lighthouse: true });
  const [showLayerMenu, setShowLayerMenu] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-navy", className)}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
        <defs>
          <linearGradient id="sea" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.32 0.085 246)" />
            <stop offset="100%" stopColor="oklch(0.2 0.055 244)" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill="url(#sea)" />
        {/* depth contours */}
        {[18, 34, 50, 66, 82].map((y) => (
          <path
            key={y}
            d={`M0 ${y} C 20 ${y - 5}, 40 ${y + 5}, 60 ${y - 3} S 90 ${y + 4}, 100 ${y}`}
            fill="none"
            stroke="oklch(0.735 0.129 240 / 0.18)"
            strokeWidth="0.3"
          />
        ))}
        {/* grid */}
        {[20, 40, 60, 80].map((v) => (
          <g key={v} stroke="oklch(1 0 0 / 0.05)" strokeWidth="0.25">
            <line x1={v} y1="0" x2={v} y2="100" />
            <line x1="0" y1={v} x2="100" y2={v} />
          </g>
        ))}
        {/* coastline / land */}
        <path
          d="M0 0 L18 0 C 14 20, 22 40, 16 60 C 12 78, 20 90, 14 100 L0 100 Z"
          fill="oklch(0.42 0.055 150 / 0.55)"
        />
        <path
          d="M18 0 C 14 20, 22 40, 16 60 C 12 78, 20 90, 14 100"
          fill="none"
          stroke="oklch(0.615 0.126 156 / 0.9)"
          strokeWidth="0.6"
        />

        {/* safe zone */}
        <ellipse cx="45" cy="50" rx="26" ry="30" fill="oklch(0.615 0.126 156 / 0.14)" />
        {layers.hazard && (
          <>
            {/* caution zone */}
            <path
              d="M62 66 L86 60 L92 82 L66 88 Z"
              fill="oklch(0.77 0.158 68 / 0.24)"
              stroke="oklch(0.77 0.158 68 / 0.8)"
              strokeWidth="0.4"
            />
            {/* avoid / restricted zone */}
            <path
              d="M72 8 L96 12 L94 34 L74 30 Z"
              fill="oklch(0.585 0.212 21 / 0.28)"
              stroke="oklch(0.585 0.212 21 / 0.9)"
              strokeWidth="0.5"
            />
          </>
        )}

        {showRoute && (
          <path
            d="M24 52 C 38 48, 50 44, 62 38"
            fill="none"
            stroke={routeBlocked ? "oklch(0.585 0.212 21)" : "oklch(0.735 0.129 240)"}
            strokeWidth="1.1"
            strokeDasharray="4 3"
            className="orca-dash"
          />
        )}
      </svg>

      {/* vessel */}
      <div className="absolute" style={{ left: "24%", top: "52%" }}>
        <span className="absolute -left-6 -top-6 size-12 rounded-full border border-aqua/50 orca-sonar" />
        <span className="relative flex size-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-aqua text-[9px] font-black text-aqua-foreground">
          ▲
        </span>
      </div>

      {layers.fishing &&
        fishingZones.map((z) => (
          <button
            key={z.id}
            type="button"
            onClick={() => onSelectZone?.(z.id)}
            style={{ left: `${z.x}%`, top: `${z.y}%` }}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-[10px] font-bold shadow-card",
              z.status === "restricted"
                ? "bg-danger text-danger-foreground"
                : "bg-sea text-sea-foreground",
              focusZone === z.id && "ring-4 ring-aqua/60 orca-float",
            )}
          >
            🐟 {z.likelihood}%
          </button>
        ))}

      {layers.lighthouse &&
        lighthouses.map((l) => (
          <span
            key={l.id}
            style={{ left: `${l.x}%`, top: `${l.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-base"
            title={l.name}
          >
            🗼
          </span>
        ))}

      {/* legend */}
      <div className="absolute bottom-3 left-3 space-y-1 rounded-xl bg-navy/80 p-2.5 text-[10px] font-semibold text-navy-foreground backdrop-blur">
        <p className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-sea" /> Safe Zone
        </p>
        <p className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-caution" /> Caution Zone
        </p>
        <p className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-danger" /> Avoid Zone
        </p>
        <p>🐟 Fishing Zone</p>
        <p>🗼 Lighthouse</p>
      </div>

      {/* floating controls */}
      <div className="absolute top-3 right-3 space-y-2">
        <MapButton label="Recenter">
          <Crosshair className="size-5" />
        </MapButton>
        <MapButton label="Compass">
          <Compass className="size-5" />
        </MapButton>
        <MapButton label="Layers" onClick={() => setShowLayerMenu((v) => !v)}>
          <Layers className="size-5" />
        </MapButton>
        {showLayerMenu && (
          <div className="w-40 space-y-2 rounded-xl bg-card p-3 text-xs font-semibold shadow-float">
            {(
              [
                ["hazard", "Hazard zones"],
                ["fishing", "Fishing zones"],
                ["lighthouse", "Lighthouses"],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="flex items-center justify-between gap-2">
                {label}
                <input
                  type="checkbox"
                  checked={layers[key]}
                  onChange={() => setLayers((l) => ({ ...l, [key]: !l[key] }))}
                  className="size-4 accent-[var(--color-ocean)]"
                />
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MapButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-11 items-center justify-center rounded-xl bg-card text-ocean shadow-float"
    >
      {children}
    </button>
  );
}
