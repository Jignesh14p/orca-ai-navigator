export type Severity = "critical" | "warning" | "info";

export const vessel = {
  name: "ORCA-01",
  captain: "Demo User",
  homePort: "Chennai",
  location: "Chennai Coast",
  lat: 13.0827,
  lon: 80.2707,
};

export const marineConditions = {
  summary: "Partly Cloudy",
  temperatureC: 28,
  windKmh: 12,
  waveHeightM: 1.2,
  seaCondition: "Moderate",
  visibility: "Good",
  safeForDeparture: true,
  windShiftAfter: "2:00 PM",
};

export const safety = {
  score: 82,
  verdict: "SAFE WITH CAUTION",
  categories: [
    { label: "Weather Safety", value: 90 },
    { label: "Route Safety", value: 82 },
    { label: "Hazard Detection", value: 92 },
    { label: "Sea State", value: 78 },
  ],
  restrictedZoneStatus: "CLEAR",
  risks: [
    "Strong winds expected after 2 PM — return to harbour before 1:30 PM.",
    "Moderate wave activity in the south-east sector — keep speed low.",
  ],
};

export type FishingZone = {
  id: string;
  name: string;
  likelihood: number;
  distanceKm: number;
  bestTime: string;
  status: "sustainable" | "safe" | "restricted";
  note?: string;
  lat: number;
  lon: number;
  x: number;
  y: number;
};

export const fishingZones: FishingZone[] = [
  {
    id: "alpha",
    name: "Zone Alpha",
    likelihood: 87,
    distanceKm: 8.2,
    bestTime: "6:30 AM – 10:00 AM",
    status: "sustainable",
    lat: 13.245,
    lon: 80.315,
    x: 62,
    y: 38,
  },
  {
    id: "beta",
    name: "Zone Beta",
    likelihood: 68,
    distanceKm: 12,
    bestTime: "5:00 AM – 9:00 AM",
    status: "safe",
    lat: 12.981,
    lon: 80.402,
    x: 74,
    y: 62,
  },
  {
    id: "gamma",
    name: "Zone Gamma",
    likelihood: 91,
    distanceKm: 15.6,
    bestTime: "6:00 AM – 11:00 AM",
    status: "restricted",
    note: "Conservation restriction detected — coral and turtle nesting sector.",
    lat: 13.402,
    lon: 80.468,
    x: 84,
    y: 22,
  },
];

export const lighthouses = [
  { id: "chn", name: "Chennai Lighthouse", distanceKm: 4.6, x: 26, y: 52 },
  { id: "pul", name: "Pulicat Lighthouse", distanceKm: 21.3, x: 34, y: 16 },
  { id: "mah", name: "Mahabalipuram Light", distanceKm: 33.8, x: 40, y: 84 },
];

export const route = {
  destination: "Fishing Zone Alpha",
  harbour: "Chennai Fishing Harbour",
  distanceKm: 12.4,
  etaMin: 38,
  bearing: "072° NE",
  status: "SAFE" as "SAFE" | "CAUTION" | "BLOCKED",
};

export type Alert = {
  id: string;
  severity: Severity;
  category: "weather" | "navigation" | "fishing";
  title: string;
  problem: string;
  why: string;
  action: string;
  time: string;
  location: string;
};

export const alerts: Alert[] = [
  {
    id: "a1",
    severity: "critical",
    category: "navigation",
    title: "Cyclone warning",
    problem: "A cyclonic system is forming in the south-east sector.",
    why: "Waves above 3.5 m and winds above 60 km/h can capsize small boats.",
    action: "Do not travel south-east. Stay within 5 km of the coast today.",
    time: "Today, 05:40 AM",
    location: "South-east sector, 40 km offshore",
  },
  {
    id: "a2",
    severity: "warning",
    category: "weather",
    title: "High wind warning",
    problem: "Winds will rise to 34 km/h after 2 PM.",
    why: "Strong side winds make the return trip slow and unsafe.",
    action: "Return to harbour before 1:30 PM.",
    time: "Today, 06:15 AM",
    location: "Chennai Coast",
  },
  {
    id: "a3",
    severity: "info",
    category: "fishing",
    title: "New fishing advisory",
    problem: "A fresh potential fishing zone advisory was published.",
    why: "Shoals have moved 8 km north-east overnight.",
    action: "Open Fish Intelligence to see today's zones.",
    time: "Today, 06:42 AM",
    location: "Zone Alpha, 8.2 km NE",
  },
];

export const dataSources = [
  { id: "incois", name: "INCOIS", detail: "Fishing zones · Ocean forecast", status: "Connected" },
  { id: "imd", name: "IMD", detail: "Marine weather · Cyclone alerts", status: "Connected" },
  { id: "mosdac", name: "ISRO / MOSDAC", detail: "Satellite ocean observation", status: "Connected" },
  { id: "navic", name: "NavIC GPS", detail: "Positioning · Navigation", status: "Active" },
];

export const checklistItems = [
  { id: "weather", label: "Marine weather downloaded" },
  { id: "ocean", label: "Ocean state forecast downloaded" },
  { id: "maps", label: "Navigation maps downloaded" },
  { id: "hazard", label: "Hazard zones updated" },
  { id: "restricted", label: "Restricted areas updated" },
  { id: "fishing", label: "Fishing zone advisory updated" },
];
