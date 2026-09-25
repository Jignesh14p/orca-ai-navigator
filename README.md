# Ocean Guardian

You are an expert Product Designer, Mobile UX Architect, AI Systems Architect,

and Full-Stack Developer.

Build a high-fidelity, functional prototype for a Smart India Hackathon project called:

ORCA — Marine EcOsystem Reasoning with Collaborative Agents

Tagline:

"From Ocean Data to Actionable Intelligence."

PROJECT CONTEXT

================

ORCA is an AI-powered, offline-first marine intelligence platform designed

primarily for fishermen and maritime stakeholders operating in offshore and

coastal environments.

The application uses a Multi-Agent AI Architecture coordinated by a central

ORCA Supervisor Agent.

The system helps users with:

1. Safe marine navigation

2. Weather and marine hazard awareness

3. Restricted / avoid-zone detection

4. Lighthouse navigation

5. Potential fishing zone recommendations

6. Sustainable fishing guidance

7. Offline marine intelligence

8. Multilingual conversational assistance

9. Voice-based AI interaction

10. GPS/NavIC location awareness

The product must feel simple enough for fishermen with varying levels of

digital literacy while still looking advanced, intelligent, and professional

for a Smart India Hackathon prototype.

IMPORTANT:

This is a prototype/MVP. Focus on an impressive functional demonstration

with simulated/sample data where live APIs are unavailable.

====================================================

PRIMARY DESIGN PHILOSOPHY

====================================================

Design principles:

- Mobile-first

- Extremely simple UI

- Professional maritime aesthetic

- Minimal cognitive load

- Large touch targets

- High readability outdoors

- Designed for users wearing gloves or operating on boats

- Important safety alerts must be visually prominent

- Avoid clutter

- Offline-first experience should be visible throughout the application

- AI should feel helpful but not overwhelming

VISUAL STYLE:

Theme:

Modern maritime intelligence platform

Color palette:

- Deep Ocean Navy: #06283D

- Ocean Blue: #1363DF

- Aqua Blue: #47B5FF

- Sea Green: #2FA36B

- Safety Orange: #F59E0B

- Danger Red: #E63946

- Background: #F7FAFC

- Card background: White

Use subtle gradients inspired by:

- Ocean depth

- Satellite intelligence

- Marine navigation

Typography:

Use a clean modern sans-serif such as:

Inter / SF Pro / Manrope

UI Style:

- Clean cards

- Rounded corners (12-18px)

- Soft shadows

- Minimal borders

- Modern icons

- Professional dashboard

- Map-centric experience

DO NOT make it look like a generic chatbot application.

====================================================

APPLICATION ARCHITECTURE

====================================================

Create the application architecture based on the following hierarchy:

                    FISHERMAN / END USER

                             |

                             v

                    ORCA SUPERVISOR AGENT

                             |

          -----------------------------------------

          |          |          |         |        |

          v          v          v         v        v

     MULTILINGUAL  PRE-DEPARTURE LIGHTHOUSE  AVOID   FISH

       AGENT          AGENT       AGENT      ZONE  INTELLIGENCE

                                                AGENT    AGENT

                             |

                             v

                    MARINE DATA LAYER

                             |

                             v

              DATA PROCESSING + LOCAL STORAGE

                             |

                             v

                    SAFETY VETO ENGINE

                             |

                             v

                     SAFETY DECISION

                             |

                             v

                 ACTIONABLE OUTPUT TO USER

The application should visually communicate that ORCA is a collaborative

multi-agent intelligence system, not just a single chatbot.

====================================================

CORE SYSTEM COMPONENTS

====================================================

Create the following logical modules:

1. ORCA SUPERVISOR AGENT

--------------------------------

Responsibilities:

- Receives user query

- Understands user intent

- Determines which specialized agents are needed

- Coordinates agent responses

- Combines information

- Sends recommendation to Safety Veto Engine

- Returns final actionable answer

Example:

User says:

"Can I go fishing near this location tomorrow morning?"

Supervisor Agent automatically coordinates:

- Weather Agent

- Marine Hazard Agent

- Fish Intelligence Agent

- Navigation Agent

- Safety Engine

Then produces:

"Moderate risk. Fishing conditions are favourable, but strong winds are

expected after 2 PM. Recommended departure window: 6 AM – 11 AM."

The prototype should visually show this agent collaboration during AI queries.

------------------------------------------------

2. MULTILINGUAL AI AGENT

--------------------------------

Responsibilities:

- Detect user language

- Translate user intent

- Support voice interaction

- Return responses in selected language

Include language support options:

- English

- Hindi

- Tamil

- Telugu

- Malayalam

- Kannada

- Bengali

UI requirement:

A language selector must be easily accessible from the dashboard.

Example:

🌐 English ▼

When clicked, open a bottom sheet:

Select Language

✓ English

  हिंदी

  தமிழ்

  తెలుగు

  മലയാളം

  ಕನ್ನಡ

  বাংলা

The entire important UI should update conceptually based on the selected

language.

------------------------------------------------

3. PRE-DEPARTURE AGENT

--------------------------------

Purpose:

Help fishermen prepare before going offshore.

Features:

- Sync latest marine data

- Download weather information

- Download hazard zones

- Download restricted zones

- Download offline maps

- Download fishing advisories

Create a Pre-Departure Checklist screen.

Example:

PRE-DEPARTURE CHECK

✓ Marine Weather Updated

✓ Ocean State Forecast Downloaded

✓ Navigation Maps Downloaded

✓ Hazard Zones Updated

✓ Restricted Areas Updated

✓ Fishing Zone Advisory Updated

Overall Status:

READY TO DEPART

OR

SYNC REQUIRED

Include:

"Last synced: Today, 06:42 AM"

Primary CTA:

SYNC NOW

Show animated sync progress when clicked.

------------------------------------------------

4. LIGHTHOUSE NAVIGATION AGENT

--------------------------------

Responsibilities:

- GPS/NavIC positioning

- Lighthouse discovery

- Route guidance

- Distance calculation

- Offline navigation

Create a navigation map interface.

Features:

- Current vessel location

- Route line

- Destination marker

- Lighthouse markers

- Distance remaining

- Estimated arrival time

- Compass direction

Bottom navigation card:

Destination

Chennai Fishing Harbour

Distance

12.4 km

ETA

38 mins

Status:

SAFE ROUTE

Primary button:

START NAVIGATION

------------------------------------------------

5. AVOID ZONE AGENT

--------------------------------

Purpose:

Detect dangerous or restricted marine regions.

Detect:

- Restricted zones

- Cyclone zones

- High-wave regions

- Hazard areas

- Sensitive ecological zones

- Unsafe fishing areas

On map:

- Red translucent polygons = Avoid Zones

- Orange = Caution

- Green = Safe

When route intersects a danger zone:

Display prominent warning:

⚠ ROUTE SAFETY ALERT

Your current route passes through a restricted marine zone.

Recommendation:

Alternative route available.

Buttons:

VIEW ALTERNATIVE

CONTINUE WITH CAUTION

------------------------------------------------

6. FISH INTELLIGENCE AGENT

--------------------------------

Purpose:

Recommend potential fishing zones using marine intelligence.

Show:

- Fish likelihood score

- Potential Fishing Zone

- Suggested fishing time

- Distance from vessel

- Environmental sustainability status

Example card:

POTENTIAL FISHING ZONE

🐟 High Probability

Fish Likelihood

87%

Distance

8.2 km

Recommended Window

6:30 AM – 10:00 AM

Sustainability Status

✓ Recommended

Button:

VIEW ON MAP

Important:

Do not encourage fishing in restricted or conservation-sensitive zones.

------------------------------------------------

7. MARINE DATA FUSION LAYER

--------------------------------

Create a conceptual backend data layer integrating:

- INCOIS

  - Potential Fishing Zone advisories

  - Ocean State Forecast

- IMD

  - Marine weather

  - Wind conditions

  - Cyclone warnings

- ISRO / MOSDAC

  - Satellite observations

  - Ocean data

  - Coastal information

- NavIC

  - Positioning

  - Navigation

For prototype purposes:

Create a "Data Sources" status component.

Example:

DATA SOURCES

🟢 INCOIS        Connected

🟢 IMD           Connected

🟢 MOSDAC        Connected

🟢 NavIC GPS     Active

Last update:

5 minutes ago

------------------------------------------------

8. DATA PROCESSING + LOCAL STORAGE

--------------------------------

Implement conceptually:

ONLINE MODE

        ↓

Fetch Marine Data

        ↓

Process / Normalize

        ↓

Cache Locally

        ↓

Offline Access

Show connectivity status globally.

Example:

🟢 ONLINE

or

🔵 OFFLINE MODE

Using locally synchronized marine intelligence

When offline, the application should still allow:

- Map access

- Previously synced routes

- Hazard zones

- Lighthouse data

- Basic AI assistance using cached information

- Emergency guidance

====================================================

AI SAFETY VETO ENGINE

====================================================

This is one of the most important features.

Every AI recommendation must conceptually pass through a:

SAFETY VETO ENGINE

The Safety Engine validates:

- Weather safety

- Restricted zones

- Route safety

- Marine hazards

- Conservation constraints

- Location constraints

Architecture:

AI Agents

     ↓

Recommendation

     ↓

SAFETY VETO ENGINE

     ↓

SAFE? ───── YES ────> Show Recommendation

   |

   NO

   ↓

BLOCK / MODIFY RECOMMENDATION

Example:

Fish Intelligence Agent says:

"High fish probability at Location X."

Safety Engine checks:

Location X is inside a conservation zone.

Final output:

🚫 NOT RECOMMENDED

High fish activity detected, however this area falls under an

ecologically sensitive zone.

Alternative safe fishing zone found:

8.5 km east.

Button:

VIEW ALTERNATIVE

Never show AI recommendations as blindly authoritative.

Always show a safety confidence/status.

====================================================

MOBILE APPLICATION STRUCTURE

====================================================

Build the application with the following navigation.

BOTTOM NAVIGATION:

1. Home

2. Map

3. ORCA AI

4. Alerts

5. Profile

Use clear icons and labels.

====================================================

SCREEN 1 — SPLASH SCREEN

====================================================

Create an elegant splash screen.

Background:

Deep ocean gradient.

Center:

ORCA Logo

Below:

ORCA

Marine EcOsystem Reasoning

with Collaborative Agents

Tagline:

"From Ocean Data to Actionable Intelligence."

Subtle animated elements:

- Ocean waves

- Sonar pulse

- Satellite connection

After loading:

Enter App

====================================================

SCREEN 2 — ONBOARDING

====================================================

Create 3 onboarding screens.

Screen 1:

🧭

Navigate Safely

"Get intelligent route guidance and marine safety alerts."

Screen 2:

🐟

Fish Smarter

"Discover data-driven potential fishing zones."

Screen 3:

🤖

Ask ORCA

"Your multilingual AI marine assistant, available online and offline."

Buttons:

SKIP

GET STARTED

====================================================

SCREEN 3 — MAIN HOME DASHBOARD

====================================================

THIS IS THE MOST IMPORTANT SCREEN.

Create a premium but simple dashboard.

TOP SECTION:

Good Morning 👋

Captain

Below:

Current Location

📍 Chennai Coast

Status pill:

🟢 All Systems Safe

Top right:

🌐 Language Selector

and

Profile Avatar

------------------------------------------------

WEATHER HERO CARD

Large horizontal card.

Title:

MARINE CONDITIONS

Show:

🌤 Partly Cloudy

28°C

Wind

12 km/h

Wave Height

1.2 m

Sea Condition

Moderate

Bottom:

✓ Safe for Departure

or dynamic warning if unsafe.

------------------------------------------------

QUICK ACTION GRID

Create 4 large action cards:

🧭

Navigate

🐟

Find Fish

⚠️

Safety Check

🔄

Sync Offline Data

------------------------------------------------

AI ASSISTANT HERO SECTION

Large visually distinct card.

ORCA AI

"How can I help you today?"

Examples:

• Is it safe to go fishing?

• Find the best fishing zone.

• Navigate me safely.

• Check weather conditions.

At the bottom:

[ Ask ORCA anything...              🎙 ]

The microphone button must be prominent.

When clicked:

START VOICE CHAT

------------------------------------------------

ACTIVE ALERTS SECTION

Title:

Marine Alerts

Example:

⚠️ HIGH WIND WARNING

Strong winds expected after 2 PM.

Severity:

Moderate

VIEW DETAILS →

Another example:

🟢 No critical hazards nearby

------------------------------------------------

FISHING INSIGHT CARD

Title:

Today's Fishing Intelligence

Fish Likelihood:

████████░░ 82%

Status:

HIGH POTENTIAL

Recommended Zone:

8.2 km Northeast

Button:

VIEW FISHING ZONE

------------------------------------------------

OFFLINE STATUS CARD

Show:

OFFLINE INTELLIGENCE

Last Synced:

Today, 06:42 AM

Downloaded:

✓ Maps

✓ Weather

✓ Hazard Zones

✓ Fishing Advisories

Button:

MANAGE OFFLINE DATA

====================================================

SCREEN 4 — INTERACTIVE MAP

====================================================

Create a full-screen marine navigation map.

Visual layers:

- Ocean map

- Current vessel position

- Route

- Fishing zones

- Hazard zones

- Restricted zones

- Lighthouse locations

MAP LEGEND:

🟢 Safe Zone

🟠 Caution Zone

🔴 Avoid Zone

🐟 Fishing Zone

🗼 Lighthouse

Floating buttons:

📍 Recenter Location

🧭 Compass

🗺 Map Layers

Bottom sheet:

CURRENT ROUTE

Destination:

Fishing Zone Alpha

Distance:

12.4 km

ETA:

38 min

Route Status:

✓ SAFE

Button:

START NAVIGATION

====================================================

SCREEN 5 — ORCA AI CHAT

====================================================

This should NOT look like a generic ChatGPT clone.

Create an intelligent marine command center interface.

Header:

← ORCA AI

Status:

🟢 Agents Online

Below, show active agents as small animated chips:

Supervisor

Weather

Navigation

Safety

Fishing

When the user asks something, visually show:

ORCA IS ANALYZING

Step 1 ✓

Understanding your request

Step 2 ✓

Checking marine weather

Step 3 ✓

Analyzing navigation safety

Step 4 ✓

Checking fishing intelligence

Step 5 ✓

Safety verification

Then show final response.

Example:

USER:

"Can I go fishing tomorrow morning?"

ORCA RESPONSE:

🧭 ORCA Recommendation

Overall Safety Score:

82/100

✓ Conditions favourable for departure.

Weather conditions are expected to remain stable between

6 AM and 11 AM.

⚠ Wind speed may increase after 2 PM.

Recommended Departure Window:

06:00 AM – 07:00 AM

Recommended Return Before:

01:30 PM

[ VIEW ON MAP ]

[ START NAVIGATION ]

At bottom:

Type your question...

🎙 Voice

====================================================

SCREEN 6 — VOICE CHAT MODE

====================================================

When user presses the microphone:

Open a dedicated immersive voice interface.

Dark ocean background.

Center:

Large animated ORCA waveform.

Display:

Listening...

Below waveform:

"Ask me about weather, navigation,

fishing zones or marine safety."

Example voice command suggestions:

🎙 "Is it safe to travel?"

🎙 "Where can I find fish?"

🎙 "Navigate me to the nearest lighthouse."

Buttons:

END VOICE CHAT

and

Change Language 🌐

During AI response:

ORCA IS SPEAKING

Animated waveform.

Display transcribed response.

Add a small "View Details" button that transitions to detailed

dashboard information.

====================================================

SCREEN 7 — MARINE SAFETY CENTER

====================================================

Create a safety dashboard.

Header:

SAFETY CENTER

Large safety score:

82

/100

SAFE WITH CAUTION

Show categories:

Weather Safety

█████████░ 90%

Route Safety

████████░░ 82%

Hazard Detection

█████████░ 92%

Restricted Zone Status

✓ CLEAR

Create a section:

ACTIVE RISKS

Example:

⚠ Strong winds expected after 2 PM

⚠ Moderate wave activity

Button:

VIEW SAFETY RECOMMENDATION

====================================================

SCREEN 8 — FISHING INTELLIGENCE

====================================================

Header:

FISH INTELLIGENCE

Hero:

Today's Potential Fishing Zones

Create 3 cards.

ZONE ALPHA

🐟 HIGH PROBABILITY

Likelihood:

87%

Distance:

8.2 km

Best Time:

6:30 AM – 10 AM

Status:

✓ Sustainable

VIEW ON MAP

ZONE BETA

🐟 MODERATE PROBABILITY

Likelihood:

68%

Distance:

12 km

Status:

✓ Safe

VIEW ON MAP

ZONE GAMMA

🚫 RESTRICTED

Likelihood:

91%

However:

Conservation restriction detected.

DO NOT RECOMMEND

This demonstrates the AI Safety Veto Engine.

====================================================

SCREEN 9 — PRE-DEPARTURE CHECKLIST

====================================================

Header:

PRE-DEPARTURE CHECK

Progress:

5 / 6 Complete

Checklist:

✓ Weather downloaded

✓ Maps downloaded

✓ Navigation data updated

✓ Hazard zones updated

✓ Fishing intelligence updated

○ Emergency contact check

Bottom CTA:

COMPLETE SAFETY CHECK

Then:

SYNC ALL DATA

====================================================

SCREEN 10 — ALERTS

====================================================

Header:

MARINE ALERTS

Filter:

All | Critical | Weather | Navigation

Example cards:

🔴 CRITICAL

Cyclone warning detected.

Avoid travel towards Southeast region.

-------------------

🟠 WARNING

Strong winds expected after 2 PM.

-------------------

🔵 INFORMATION

New fishing zone advisory available.

Each alert should have:

Time

Severity

Location

Button:

VIEW ON MAP

====================================================

SCREEN 11 — PROFILE & SETTINGS

====================================================

User information:

Fisherman Profile

Name:

Demo User

Boat:

ORCA-01

Home Port:

Chennai

SETTINGS:

🌐 Language

Current:

English

Change Language →

🎙 Voice Settings

Voice Enabled

Offline Mode

Automatic Sync

Emergency Settings

Marine Data Sources

About ORCA

====================================================

LANGUAGE SWITCHING UX

====================================================

Language changing should be extremely easy.

Add a persistent globe icon:

🌐

When clicked:

Bottom sheet:

SELECT LANGUAGE

English

हिंदी

தமிழ்

తెలుగు

മലയാളം

ಕನ್ನಡ

বাংলা

After selection:

Show toast:

✓ Language updated successfully

The AI chat should respond in the selected language.

Voice recognition and TTS should conceptually use the selected language.

====================================================

VOICE CHAT UX

====================================================

Implement a visible microphone button in:

1. Home Dashboard

2. ORCA AI Chat

3. Voice Mode

Voice interaction flow:

User presses microphone

        ↓

Listening animation

        ↓

Speech-to-text

        ↓

Language detection

        ↓

ORCA Supervisor Agent

        ↓

Specialized Agents

        ↓

Safety Veto Engine

        ↓

Response generated

        ↓

Text displayed

        ↓

Text-to-Speech response

Show this visually during prototype interactions.

====================================================

AGENT ORCHESTRATION VISUALIZATION

====================================================

Create a special optional screen accessible from:

ORCA AI → "View Intelligence Process"

Show:

                 USER QUERY

                     ↓

              ORCA SUPERVISOR

                     ↓

       ┌───────────┼────────────┐

       ↓           ↓            ↓

   WEATHER     NAVIGATION     FISHING

    AGENT        AGENT         AGENT

       ↓           ↓            ↓

       └───────────┼────────────┘

                   ↓

             SAFETY ENGINE

                   ↓

             FINAL DECISION

                   ↓

                USER

Make this animated.

When an agent is processing:

Show pulse animation.

When completed:

Show green check.

This is important for demonstrating the multi-agent architecture

to hackathon judges.

====================================================

BACKEND / SYSTEM ARCHITECTURE

====================================================

Use modular architecture.

FRONTEND:

Mobile Application

Recommended:

React Native / Expo

Alternative:

Flutter

For prototype, prioritize smooth responsive UI.

BACKEND:

API Layer

↓

ORCA Supervisor Agent

↓

Specialized AI Agents:

- Multilingual Agent

- Weather Agent

- Navigation Agent

- Lighthouse Agent

- Avoid Zone Agent

- Fish Intelligence Agent

↓

Safety Veto Engine

↓

Response Aggregator

↓

Mobile Application

DATA LAYER:

Marine Data APIs

+

Satellite Data

+

Weather Data

+

GPS/NavIC

↓

Data Normalization

↓

Local Cache

↓

Offline Database

Use a clean architecture separation:

Presentation Layer

Business Logic Layer

AI Agent Layer

Safety Layer

Data Layer

Offline Storage Layer

====================================================

PROTOTYPE DATA SIMULATION

====================================================

Where real APIs are unavailable, create realistic mock data.

Sample location:

Chennai Coast

Sample weather:

Temperature:

28°C

Wind:

12 km/h

Wave Height:

1.2 m

Visibility:

Good

Marine Status:

Moderate

Sample Fishing Zone:

Latitude:

13.245

Longitude:

80.315

Fish Probability:

87%

Distance:

8.2 km

Sample Hazard:

High wind warning

Location:

Southeast sector

Severity:

Moderate

====================================================

IMPORTANT PROTOTYPE INTERACTIONS

====================================================

The prototype must allow the following demo flow:

DEMO FLOW 1:

Open App

↓

Dashboard

↓

See Marine Conditions

↓

Press microphone

↓

Ask:

"Is it safe to go fishing today?"

↓

Show ORCA agents working

↓

Weather Agent checks conditions

↓

Navigation Agent checks route

↓

Safety Agent validates

↓

Final answer appears

"Safe with caution. Best departure window is 6 AM to 11 AM."

DEMO FLOW 2:

Dashboard

↓

Find Fish

↓

View Potential Fishing Zones

↓

Select Zone

↓

Safety Engine detects restricted zone

↓

Blocks recommendation

↓

Suggests alternative safe zone

This demonstrates Sustainable Fishing Intelligence.

DEMO FLOW 3:

Dashboard

↓

Language selector

↓

Select Tamil / Hindi

↓

UI updates

↓

Press Voice Chat

↓

Ask question in selected language

↓

ORCA responds in same language

DEMO FLOW 4:

Pre-Departure Sync

↓

Download all marine data

↓

Switch application to Offline Mode

↓

Map still works

↓

Hazard zones visible

↓

Navigation available

This demonstrates Offline-First Marine Intelligence.

====================================================

SAFETY DESIGN REQUIREMENTS

====================================================

Never hide critical alerts.

Critical alerts should always use:

- Red/orange visual indicators

- Clear text

- Large readable icons

Avoid ambiguous messages.

Instead of:

"Conditions are not optimal."

Use:

"High waves expected. Avoid travel in this area."

Always provide:

Problem

↓

Why it matters

↓

Recommended action

====================================================

ACCESSIBILITY REQUIREMENTS

====================================================

The target users may have varying levels of digital literacy.

Therefore:

- Use simple language

- Use icons with labels

- Avoid technical jargon in primary UI

- Large buttons

- High contrast

- Voice-first accessibility

- Multilingual support

- Offline reliability indicators

====================================================

FINAL PRODUCT REQUIREMENTS

====================================================

Build:

✓ Fully designed mobile application prototype

✓ High-fidelity UI

✓ Responsive mobile screens

✓ Functional navigation between screens

✓ Interactive dashboard

✓ Marine map interface

✓ AI chat interface

✓ Voice chat interface

✓ Language selector

✓ Agent orchestration visualization

✓ Safety alert system

✓ Fishing intelligence dashboard

✓ Pre-departure synchronization

✓ Offline mode indicators

✓ Mock realistic marine data

The final application should feel like a combination of:

- Marine navigation system

- AI assistant

- Safety command center

- Smart fishing platform

BUT it must remain extremely simple and intuitive.

====================================================

MOST IMPORTANT DIFFERENTIATOR

====================================================

ORCA is NOT just a chatbot.

The UI and product experience must clearly communicate:

USER

↓

ORCA SUPERVISOR

↓

MULTIPLE SPECIALIZED AI AGENTS

↓

DATA FUSION

↓

SAFETY VETO ENGINE

↓

ACTIONABLE DECISION

The key innovation is:

"Collaborative AI agents transforming complex ocean data into

safe, multilingual, actionable intelligence."

Final tagline:

FROM OCEAN DATA

TO ACTIONABLE INTELLIGENCE.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://orca-ai-navigator.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ff0a2e86-3f37-4965-9c27-596a8f1e7b99).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
