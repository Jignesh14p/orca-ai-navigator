# ORCA Real-World AI/ML Architecture Plan

Move the hackathon prototype from simulated, rule-based agents to a real ML-powered marine intelligence system fed by INCOIS, IMD, MOSDAC and ISRO datasets, while keeping the offline-first, safety-first UX.

## Current state (verified)

- The prototype uses hard-coded sample data (`src/lib/orca/data.ts`) and a rule-based agent pipeline (`src/lib/orca/agents.ts`).
- The UI already exposes the right concepts: agent chips, Safety Veto Engine, data-source status, multilingual answers, offline mode, pre-departure sync.
- No AI SDK or backend storage is connected yet; answers are generated locally by string matching.

## Proposed architecture

```text
INCOIS  IMD     MOSDAC  ISRO/NavIC
   |      |        |        |
   +------+--------+--------+
          |
   Data adapters (fetch / parse / cache)
          |
   Feature store + local cache (Lovable Cloud DB + device storage)
          |
   +-----+-----+-----+-----+
   |     |     |     |     |
 Weather  PFZ   Route  Hazards  Multilingual
 models  model  safety   maps     voice/chat
   |     |       |       |         |
   +-----+-------+-------+---------+
          |
   ORCA Supervisor (LLM orchestration)
          |
   Safety Veto Engine (rule + learned guardrails)
          |
   Actionable recommendation + TTS
```

## Model choices by task

| Task | Recommended approach | Rationale |
|------|----------------------|-----------|
| **Weather / sea-state forecasting** | Time-series model on IMD/MOSDAC history (LSTM, Temporal Fusion Transformer, or a lightweight XGBoost regressor for 6–24 h wind/wave/visibility). | Predicts numeric values fishermen can act on; can be retrained as new government data arrives. |
| **Potential fishing zone (PFZ) prediction** | Spatial model on INCOIS chlorophyll / SST / altimetry features (Random Forest or small CNN/UNet on gridded data). | INCOIS already publishes PFZ advisories; the model learns local patterns and improves granularity. |
| **Route safety / hazard detection** | Rule-based geofence engine + learned risk scorer (gradient-boosted classifier) that outputs SAFE / CAUTION / BLOCKED. | Government restricted zones and cyclone warnings are non-negotiable rules; ML adds a learned risk score for sea state and visibility. |
| **Multilingual chat / voice** | LLM via Lovable AI Gateway for intent understanding, translation and response generation; on-device STT/TTS for offline use. | Cloud LLM gives high-quality regional-language answers; on-device STT/TTS keeps voice usable without connectivity. |
| **Supervisor orchestration** | LLM with tool-calling (AI SDK `tool` + `stopWhen`) that routes queries to the weather, PFZ, route-safety and language tools. | Replaces the current `if/else` string matching with real reasoning, while keeping every recommendation visible and auditable. |

## Hosting recommendation

Use a **hybrid cloud + edge** strategy:

- **Cloud (Lovable AI Gateway)**: LLM supervisor, multilingual generation, heavy forecasting model training/inference, and data-source ingestion.
- **Edge / device**: Cached forecasts, synced hazard zones, offline maps, lightweight STT/TTS, and a tiny on-device classifier for emergency route safety when offline.

This balances accuracy, data sovereignty, cost and the offline requirement.

## Data integration layer

Create adapter modules for each government source:

- `INCOISAdapter`: PFZ shapefiles / GeoJSON, ocean forecast grids, SST/chlorophyll.
- `IMDAdapter`: Marine weather bulletins, cyclone warnings, wind/wave forecasts.
- `MOSDACAdapter`: Satellite-derived sea state, visibility, chlorophyll.
- `ISRONavICAdapter`: GNSS position, route geometry, lighthouse / beacon data.

Each adapter normalises data into a shared schema, writes to a local cache, and triggers the Safety Veto Engine when new hazards appear.

## Safety Veto Engine

Keep the current visible veto behaviour, but strengthen it:

- Hard rules always win: cyclone warnings, restricted zones, no-sail notices.
- Learned risk scorer feeds into the score, never overrides hard rules.
- Every blocked recommendation returns a reason and a safe alternative.

## Offline-first data flow

1. Online: adapters fetch latest data → process → store in Lovable Cloud DB + local cache.
2. Pre-departure sync downloads the relevant tiles, forecasts and hazard layers.
3. Offline: map, route, hazard zones, cached AI answers and emergency guidance still work.
4. On reconnect: incremental sync and re-validation of any active route.

## Implementation phases

1. **Backend foundation**: enable Lovable Cloud, add tables for `data_sources`, `forecasts`, `fishing_zones`, `hazard_zones`, `routes`, `sync_state`.
2. **Adapters + ingestion**: build the four government data adapters as scheduled/syncable server functions.
3. **ML models**: start with the route-safety classifier and PFZ model; add weather forecasting next.
4. **LLM supervisor**: replace `runOrca` with an AI SDK tool-calling supervisor that calls the new models.
5. **Voice + multilingual**: integrate cloud STT/TTS and regional-language LLM responses.
6. **Offline hardening**: ensure all critical inference has a cached or on-device fallback.

## Out of scope for this plan

- Procuring actual government API keys or data-use agreements (assumed available).
- Training custom models from scratch on real historical data (this plan sets up the pipeline; first iteration can use government-published advisories as labels).

## Next step

Approve this plan so we can start Phase 1: enable Lovable Cloud and design the data-source schema.
