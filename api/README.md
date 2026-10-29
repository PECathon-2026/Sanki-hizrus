# 🌙 Tsukuyomi Watch - Celestial API (PS-002)

> **Samurai-Themed Celestial & Stargazing Guide Platform**  
> Built for Hackathon Demonstration — Fault-tolerant, modular, and resilient.

---

## ⚔️ Project Overview

**Tsukuyomi Watch** is a samurai-inspired celestial guide platform designed for modern stargazers, astrophotographers, and astronomy enthusiasts. Named after *Tsukuyomi-no-Mikoto*, the Shinto god of the moon and night sky, this backend API delivers real-time astronomical forecasts, cosmic calendars, and non-generative astronomical image restoration.

### Core Highlights
- **100% Demo Resilient**: If upstream weather or astronomy APIs are slow or offline, the API transparently serves high-fidelity astronomical fallbacks so the frontend never crashes.
- **Night Honor Score (0-100)**: Proprietary astronomical seeing and visibility score weighted for astrophotography.
- **Curated Celestial Calendar**: Meteor showers, lunar phases, ISS transits, and eclipses interwoven with rich samurai lore.
- **Spirit Lens Engine**: Strict physical photon restoration (denoising, contrast stretching, star sharpening) without fabricating stars or fake AI details.

---

## 🛠 Tech Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Network / HTTP Client**: Axios (for Open-Meteo & NASA APIs)
- **CORS**: Fully enabled for multi-origin frontend hackathon integration
- **File Uploads**: Multer (in-memory buffering for zero disk bottleneck)
- **Image Processing**: Sharp (with automatic pure-Node procedural fallback)

---

## 📂 Project Architecture

```
Pecathon_2026/
├── server.js                     # Main Express server entrypoint & middleware
├── package.json                  # Dependencies, scripts, and optional packages
├── .env.example                  # Environment configuration template
├── .gitignore                    # Version control ignores
├── agent.md                      # AI Agent directives and project specifications
├── README.md                     # Comprehensive API documentation
├── test-api.js                   # Automated test & verification suite
│
├── routes/                       # Modular Express Route Handlers
│   ├── stargazingSpots.js        # /api/stargazing-spots endpoints
│   ├── celestialEvents.js        # /api/celestial-events endpoints
│   └── imageRestore.js           # /api/image-restore (Spirit Lens) endpoints
│
├── services/                     # Business Logic & External Integrations
│   ├── weatherService.js         # Open-Meteo API consumer & city coordinate resolver
│   ├── scoringService.js         # Night Honor Score & Bortle pollution engine
│   └── imageService.js           # Spirit Lens restoration & photon verification
│
├── data/                         # Rich Datasets & Fallbacks
│   ├── celestialEventsData.js    # Pre-populated cosmic events with samurai lore
│   └── curatedSpotsData.js       # Renowned Japanese samurai stargazing sanctuaries
│
├── uploads/                      # Temporary upload directory
└── processed/                    # Processed image output directory
```

---

## 🚀 Quickstart & Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional)
```bash
cp .env.example .env
```
Default configuration:
- `PORT=5000`
- `NASA_API_KEY=DEMO_KEY`
- `OPEN_METEO_BASE_URL=https://api.open-meteo.com/v1`

### 3. Run Development Server
```bash
npm start
# or with auto-reload:
npm run dev
```

### 4. Run Test Verification Suite
```bash
npm test
```

---

## 📡 API Reference & Endpoints

### 1. Stargazing Spots & Night Honor Score
**Endpoint:** `GET /api/stargazing-spots`

Fetches real-time cloud cover, visibility, and humidity from Open-Meteo, calculates the custom **Night Honor Score (0-100)**, and outputs a simulated Bortle light pollution index and samurai rank.

#### Query Parameters:
| Parameter | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `latitude` | `float` | Optional | `35.3606` | Latitude of target location |
| `longitude` | `float` | Optional | `138.7274` | Longitude of target location |
| `city` | `string` | Optional | `"Mount Fuji"` | City/location name (e.g. `Tokyo`, `Kyoto`, `Achi`) |

#### Example Request:
```bash
curl -X GET "http://localhost:5000/api/stargazing-spots?city=Tokyo"
```

#### Example Response:
```json
{
  "success": true,
  "timestamp": "2026-10-30T01:05:00.000Z",
  "location": {
    "city": "Tokyo, Japan",
    "latitude": 35.6762,
    "longitude": 139.6503,
    "elevationMeters": 40,
    "timezone": "Asia/Tokyo"
  },
  "nightHonorScore": 78,
  "scoreBreakdown": {
    "cloudClarityScore": 45,
    "maxCloudPoints": 55,
    "atmosphericVisibilityScore": 24,
    "maxVisibilityPoints": 30,
    "humidityDewFactorScore": 6,
    "maxHumidityPoints": 10,
    "windStabilityScore": 3,
    "maxWindPoints": 5
  },
  "lightPollution": {
    "bortleClass": 8,
    "bortleTitle": "Class 8: City Sky (Milky Way Completely Invisible)",
    "simulatedIndex": 88,
    "artificialLuminance": "3.51 - 8.00 mcd/m²"
  },
  "samuraiEvaluation": {
    "rank": "Hatamoto (Senior Celestial Retainer)",
    "badge": "HONORED_WARRIOR",
    "colorHex": "#00E5FF",
    "status": "Favorable Stargazing Heavens",
    "wisdom": "Calm your breathing like a swordsman before battle. The heavenly constellations stand in perfect formation.",
    "tacticalAdvice": "Ideal window for binoculars and wide-angle star tracking. Major constellations and planets will shine brilliantly."
  },
  "currentWeather": {
    "cloudCoverPercent": 18,
    "visibilityMeters": 24000,
    "temperatureCelsius": 16.2,
    "humidityPercent": 54,
    "windSpeedKmH": 7.4
  },
  "dataQuality": {
    "source": "Open-Meteo Real-Time Global Satellite/NWP",
    "isFallback": false
  }
}
```

#### Curated Sanctuaries Sub-route:
- `GET /api/stargazing-spots/curated`: Returns top historical samurai stargazing spots across Japan (Mt. Fuji 5th Station, Achi Village, Bisei Town, Koyasan, Kushimoto).

---

### 2. Celestial Events & Cosmic Calendar
**Endpoint:** `GET /api/celestial-events`

Returns a rich calendar of upcoming cosmic events (meteor showers, moon phases, ISS passes, eclipses, planetary alignments) combined with public astronomical data and samurai celestial lore.

#### Query Parameters:
| Parameter | Type | Options | Description |
| :--- | :--- | :--- | :--- |
| `type` | `string` | `meteor_shower`, `moon_phase`, `iss_pass`, `eclipse`, `planetary_alignment`, `all` | Filter by event type |
| `date` | `string` | `YYYY-MM-DD` | Filter for events active on this date |
| `upcoming` | `boolean` | `true`, `false` | Only return events from today onward |
| `search` | `string` | Any keyword | Search by title or samurai lore |
| `limit` | `integer` | e.g. `5` | Maximum number of records to return |

#### Example Request:
```bash
curl -X GET "http://localhost:5000/api/celestial-events?type=meteor_shower"
```

#### Example Response:
```json
{
  "success": true,
  "count": 3,
  "filtersApplied": {
    "type": "meteor_shower",
    "date": null,
    "upcoming": false,
    "search": null
  },
  "events": [
    {
      "id": "evt-perseids-2026",
      "title": "Perseid Meteor Shower Peak",
      "samuraiTitle": "Tears of Tsukuyomi (Perseid Blade Sparks)",
      "eventType": "meteor_shower",
      "peakDate": "2026-08-12",
      "peakHourUtc": "21:00 UTC",
      "zenithHourlyRate": 100,
      "radiantConstellation": "Perseus",
      "direction": "North-East",
      "visibilityRating": "Exceptional",
      "recommendedGear": "Naked Eye & Bamboo Mat",
      "lore": "Legend holds that when the moon god Tsukuyomi tests the temper of celestial katanas, burning sparks rain down through the void of the night."
    }
  ]
}
```

#### Bonus Sub-route:
- `GET /api/celestial-events/nasa-apod`: Returns NASA's Astronomy Picture of the Day with automatic offline cache fallback.

---

### 3. Spirit Lens Image Restoration
**Endpoint:** `POST /api/image-restore`

Accepts an uploaded raw or noisy astronomical photograph (or image URL) and applies authentic astronomical image processing without hallucinating or inventing fake stars.

#### Request Formats Supported:
1. **Multipart Form Data**: Upload file under field `image`
2. **JSON Payload (Image URL)**:
   ```json
   {
     "imageUrl": "https://example.com/starfield.jpg",
     "filterIntensity": "standard",
     "denoiseLevel": 3
   }
   ```
3. **JSON Payload (Base64)**:
   ```json
   {
     "imageBase64": "data:image/jpeg;base64,...",
     "filterIntensity": "deep_void"
   }
   ```

#### Example Request:
```bash
curl -X POST "http://localhost:5000/api/image-restore" \
     -H "Content-Type: application/json" \
     -d '{"filterIntensity":"standard"}'
```

#### Example Response:
```json
{
  "success": true,
  "engine": "sharp-hardware-accelerated",
  "processingTimeMs": 68,
  "imageSpecs": {
    "format": "jpeg",
    "dimensions": "1920x1080",
    "channels": 3
  },
  "spiritLensReport": {
    "pipelineStages": [
      {
        "stage": 1,
        "name": "CMOS Sensor High-Frequency Denoising",
        "details": "Wavelet spatial median filter applied (radius 3px)"
      },
      {
        "stage": 2,
        "name": "Black-Point Sky Background Suppression",
        "details": "Gradient subtraction applied to remove urban light dome glow"
      },
      {
        "stage": 3,
        "name": "Pinpoint Star Diffraction Restoration",
        "details": "Unsharp mask edge-focus applied to reveal faint stellar companions"
      },
      {
        "stage": 4,
        "name": "Chromatic Aberration & Sodium Neutralization",
        "details": "Spectral rebalancing to highlight natural hydrogen-alpha emissions"
      }
    ],
    "metrics": {
      "snrImprovementDb": "+4.8 dB",
      "backgroundNoiseReductionPercent": "42%",
      "starPointSharpnessIndex": "94/100",
      "estimatedDetectableStars": 112,
      "fidelityIntegrity": "100% Physical Photon Preservation (Strictly zero synthetic objects hallucinated)"
    },
    "samuraiSpiritVerdict": "Like wiping mist from an ancestral blade, the Spirit Lens restores the authentic light of the ancient cosmos."
  },
  "output": {
    "fullBase64": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
    "downloadReady": true
  }
}
```

---

## 🥋 The Night Honor Scoring Algorithm

$$\text{Night Honor Score} = \text{Cloud Clarity (55\%)} + \text{Visibility (30\%)} + \text{Humidity Dew Factor (10\%)} + \text{Wind Stability (5\%) }$$

| Score Range | Samurai Honor Rank | Observing Condition |
| :--- | :--- | :--- |
| **90 – 100** | **Kage-Ryu Grandmaster** | Pristine celestial void; Milky Way visible to the horizon |
| **75 – 89** | **Hatamoto Retainer** | Favorable sky; constellations and bright nebulae sharp |
| **55 – 74** | **Samurai Watchman** | Moderate visibility; planets and moon crisp |
| **35 – 54** | **Ashigaru Foot Soldier** | Veiled sky; gaps in clouds allow brief glimpses |
| **0 – 34** | **Ronin in the Mist** | Heavy overcast or storm; retreat to temple quarters |

---

## 🛡️ Hackathon Resilience Philosophy

During live demos and hackathon presentations, network latency and API rate-limiting can cause unexpected failures. **Tsukuyomi Watch** addresses this at every layer:
1. **Axios Timeout Guards**: External calls time out at 4.5 seconds to prevent hanging requests.
2. **Deterministic Fallbacks**: Both weather and celestial event endpoints have embedded astronomical models ready to activate instantly.
3. **Anti-Hallucination Image Engine**: The "Spirit Lens" adheres strictly to physical photon filtering (denoising, contrast equalization) rather than generating fictitious AI stars.
4. **Permissive CORS**: Open cross-origin configuration allows React, Vue, Next.js, or mobile clients to interact without proxy issues.
