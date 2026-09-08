# ORCA — Marine Ecosystem Reasoning with Collaborative Agents

A mobile-first, high-fidelity working prototype of the ORCA marine intelligence app, built as a web app that renders and behaves like a phone app (works in the phone preview and on real phones). All marine data is realistic sample data for the Chennai coast, so the whole demo runs without any external service.

Note: React Native / Flutter aren't available here — this will be a mobile-first web app with the same look and feel, which is ideal for a live hackathon demo (open on any phone, no install).

## What gets built

Bottom tab bar: Home, Map, ORCA AI, Alerts, Profile — large icons with labels.

1. Splash — deep ocean gradient, ORCA mark, sonar pulse and wave animation, tagline, auto-advance.
2. Onboarding — 3 swipeable cards (Navigate Safely / Fish Smarter / Ask ORCA), Skip + Get Started.
3. Home dashboard — greeting, location pill, "All Systems Safe" status, marine conditions hero card (28°C, wind 12 km/h, wave 1.2 m, safe-for-departure verdict), 4 big quick actions (Navigate, Find Fish, Safety Check, Sync), ORCA AI ask card with prominent mic, marine alerts, today's fishing intelligence with likelihood bar, offline data card.
4. Map — stylized marine chart with vessel position, route line, green/orange/red zones, fishing zones, lighthouse markers, legend, recenter/compass/layers buttons, and a route bottom sheet with distance, ETA, safety status and Start Navigation. Includes the route-crosses-restricted-zone warning with View Alternative / Continue with Caution.
5. ORCA AI — command-center chat, not a chatbot clone: agent chips (Supervisor, Weather, Navigation, Safety, Fishing) that light up, a live 5-step "ORCA is analyzing" sequence, then a structured recommendation card with safety score, departure window, and action buttons. Link to the agent orchestration view.
6. Voice mode — full-screen dark ocean, animated waveform, Listening / Thinking / Speaking states, sample voice prompts, language switch, End Voice Chat, and a transcript that opens details.
7. Agent orchestration visualization — animated flow from user query through supervisor, specialist agents, data fusion, safety veto engine, to final decision; pulsing while active, green checks when done.
8. Safety Center — big 82/100 score, category bars (weather, route, hazard, restricted-zone clear), active risks, recommendation action.
9. Fish Intelligence — Zone Alpha (87%, sustainable), Zone Beta (68%), Zone Gamma (91% but conservation-restricted and blocked with a safe alternative) — the clearest demo of the Safety Veto Engine.
10. Pre-departure check — 6-item checklist, 5/6 progress, animated Sync Now with per-item progress, "Last synced" time, Ready to Depart / Sync Required verdict.
11. Alerts — filter tabs (All, Critical, Weather, Navigation), critical cyclone / warning wind / info advisory cards with time, severity, location, View on Map.
12. Profile & settings — fisherman + boat + home port, language, voice settings, offline mode, auto sync, emergency settings, data sources status (INCOIS, IMD, MOSDAC, NavIC), About ORCA.

## Cross-cutting behaviour

- Language: persistent globe button opens a bottom sheet with English, हिंदी, தமிழ், తెలుగు, മലയാളം, ಕನ್ನಡ, বাংলা; key screen text and ORCA's answers switch language; success toast on change.
- Online / Offline: a global status strip; a demo toggle in settings flips to Offline Mode, where map, synced routes, hazard zones, lighthouses, cached AI answers and emergency guidance all still work.
- Safety veto engine: every AI recommendation passes a visible check, and blocked ones show the reason plus a safe alternative — never a bare authoritative answer.
- Every alert follows problem → why it matters → recommended action, in plain wording.

## Design

Deep ocean navy #06283D, ocean blue #1363DF, aqua #47B5FF, sea green #2FA36B, safety orange #F59E0B, danger red #E63946, background #F7FAFC, white cards. Manrope/Inter type, 12–18px radii, soft shadows, large gloved-hand touch targets, high outdoor contrast, subtle ocean-depth gradients.

## Technical notes

- TanStack Start routes: `/` (splash → onboarding → home), `/map`, `/ai`, `/ai/process`, `/alerts`, `/profile`, `/safety`, `/fish`, `/pre-departure`, `/voice`.
- Colours added as semantic tokens in `src/styles.css`; no hardcoded colour utilities in components.
- Shared app state (language, online/offline, sync status, safety score, active route) in a lightweight React context persisted to browser storage.
- Agent pipeline simulated in a typed module (`supervisor → agents → fusion → safety veto → response`) with staged timing so the orchestration animation reflects real state transitions; sample marine data in one data module.
- Map rendered as a custom SVG/CSS marine chart rather than a mapping library, so it works fully offline and stays fast in the preview.
- Motion for React for waves, sonar pulse, agent pulses, waveform, and sync progress.
- No backend needed for this prototype; a later step could add Lovable Cloud plus real AI and live INCOIS/IMD feeds.

## Out of scope for this prototype

Real speech recognition/synthesis and live marine APIs are simulated; voice mode is driven by tappable sample prompts so the demo is reliable on stage. Say the word if you want real device speech added.
