# Directive
Build the robust backend API services for "Tsukuyomi Watch", a samurai-themed celestial and stargazing guide platform.

# Tech Stack
- Node.js
- Axios for external API calls (Open-Meteo, NASA APIs)
- CORS enabled for frontend integration

# Orchestration & Rules
- Keep endpoints clean, well-documented, and error-tolerant.
- If an external API fails, return graceful fallback dummy data so the frontend never crashes during the hackathon demo.
- Structure code into modular routes (weather, events, image-processing).

---

## Project Specification: Tsukuyomi Watch

### 1. Overview
"Tsukuyomi Watch" is a samurai-themed celestial and stargazing guide platform. The backend provides astronomical data, stargazing weather forecasts, celestial events, and celestial image processing services.

### 2. Architecture & Modular Routes
- `/api/weather`: Stargazing weather conditions (cloud cover, visibility, seeing conditions, wind) powered by Open-Meteo API with samurai-themed stargazing condition indices.
- `/api/events`: Upcoming celestial events (meteor showers, lunar phases, planetary alignments, eclipses) integrating NASA APIs and curated celestial data.
- `/api/image-processing`: Image enhancement, stargazing filters, or celestial photo analysis.

### 3. Reliability & Fallbacks
- All external calls via Axios must be wrapped in robust error handling.
- When an upstream API (e.g., NASA, Open-Meteo) is unreachable or rate-limited, immediately serve high-fidelity mock/dummy data with standard fallback flags so frontend experiences remain seamless.
- CORS must be configured to permit local development and preview deployments.
