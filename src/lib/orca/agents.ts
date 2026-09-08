import { marineConditions, fishingZones, route, safety } from "./data";
import { recommendationText, type LangCode } from "./i18n";

export type AgentId = "supervisor" | "weather" | "navigation" | "fishing" | "safety" | "language";

export const agentMeta: Record<AgentId, { name: string; role: string }> = {
  supervisor: { name: "Supervisor", role: "Understands intent, coordinates agents" },
  language: { name: "Multilingual", role: "Detects language, translates intent" },
  weather: { name: "Weather", role: "IMD marine weather + ocean state" },
  navigation: { name: "Navigation", role: "NavIC route, lighthouses, avoid zones" },
  fishing: { name: "Fishing", role: "INCOIS potential fishing zones" },
  safety: { name: "Safety Veto", role: "Validates every recommendation" },
};

export type PipelineStep = {
  agent: AgentId;
  label: string;
  detail: string;
};

export type SafetyStatus = "approved" | "approved_with_caution" | "blocked";

export type OrcaAnswer = {
  title: string;
  safetyScore: number;
  status: SafetyStatus;
  headline: string;
  points: string[];
  window?: { depart: string; returnBy: string };
  vetoNote?: string;
  alternative?: string;
  spoken: string;
  steps: PipelineStep[];
};

const baseSteps: PipelineStep[] = [
  { agent: "supervisor", label: "Understanding your request", detail: "Intent classified" },
  { agent: "language", label: "Detecting language", detail: "Translating intent" },
  { agent: "weather", label: "Checking marine weather", detail: "IMD + ocean state forecast" },
  { agent: "navigation", label: "Analysing navigation safety", detail: "Route vs avoid zones" },
  { agent: "fishing", label: "Checking fishing intelligence", detail: "INCOIS advisory" },
  { agent: "safety", label: "Safety verification", detail: "Veto engine review" },
];

export const suggestedQuestions = [
  "Is it safe to go fishing?",
  "Find the best fishing zone.",
  "Navigate me safely.",
  "Check weather conditions.",
];

/** Simulated supervisor → agents → data fusion → safety veto pipeline. */
export function runOrca(query: string, lang: LangCode): OrcaAnswer {
  const q = query.toLowerCase();
  const alpha = fishingZones[0]!;
  const gamma = fishingZones[2]!;

  if (q.includes("gamma") || q.includes("conservation") || q.includes("restricted")) {
    return {
      title: "ORCA Recommendation",
      safetyScore: 34,
      status: "blocked",
      headline: "Not recommended — restricted marine zone",
      points: [
        `Fish activity in ${gamma.name} is high (${gamma.likelihood}%).`,
        gamma.note ?? "Conservation restriction detected.",
        "Fishing here risks a penalty and long-term stock damage.",
      ],
      vetoNote: "Safety Veto Engine blocked the Fish Intelligence Agent's suggestion.",
      alternative: `Safe alternative: ${alpha.name}, ${alpha.distanceKm} km north-east, ${alpha.likelihood}% likelihood.`,
      spoken: recommendationText[lang],
      steps: baseSteps,
    };
  }

  if (q.includes("fish") || q.includes("zone") || q.includes("मछली") || q.includes("மீன")) {
    return {
      title: "ORCA Recommendation",
      safetyScore: 84,
      status: "approved_with_caution",
      headline: `${alpha.name} is your best option today`,
      points: [
        `Fish likelihood ${alpha.likelihood}% at ${alpha.distanceKm} km north-east.`,
        `Best window ${alpha.bestTime}. Sustainability status: recommended.`,
        `Zone Gamma has higher fish activity but is blocked — conservation zone.`,
      ],
      window: { depart: "06:30 AM", returnBy: "01:30 PM" },
      spoken: recommendationText[lang],
      steps: baseSteps,
    };
  }

  if (q.includes("navigate") || q.includes("lighthouse") || q.includes("route")) {
    return {
      title: "ORCA Recommendation",
      safetyScore: 88,
      status: "approved",
      headline: `Safe route to ${route.destination}`,
      points: [
        `${route.distanceKm} km, about ${route.etaMin} minutes at cruising speed.`,
        `Heading ${route.bearing}. Chennai Lighthouse stays visible for the first 5 km.`,
        "Route does not cross any restricted or hazard zone.",
      ],
      spoken: recommendationText[lang],
      steps: baseSteps,
    };
  }

  return {
    title: "ORCA Recommendation",
    safetyScore: safety.score,
    status: "approved_with_caution",
    headline: "Conditions are favourable for departure",
    points: [
      `${marineConditions.summary}, ${marineConditions.temperatureC}°C, wind ${marineConditions.windKmh} km/h, waves ${marineConditions.waveHeightM} m.`,
      "Weather stays stable between 6 AM and 11 AM.",
      `Wind speed rises after ${marineConditions.windShiftAfter} — plan the return early.`,
    ],
    window: { depart: "06:00 AM – 07:00 AM", returnBy: "01:30 PM" },
    spoken: recommendationText[lang],
    steps: baseSteps,
  };
}
