# 🌙 Tsukuyomi Watch: The Samurai's Celestial Guide

> **A high-performance celestial stargazing guide, real-time Night Honor scoring, and Spirit Lens astronomical image restoration platform.**  
> Inspired by the immersive festival aesthetic of PECfest and traditional Japanese samurai celestial lore.

---

## ⚔️ Project Overview

**Tsukuyomi Watch** is a single-page celestial guide designed for stargazers, astrophotographers, and cosmic enthusiasts. Named after *Tsukuyomi-no-Mikoto*, the guardian deity of the moon and night sky, the platform combines real-time atmospheric telemetry, interactive lunar tracking, and non-generative astronomical image restoration into a unified samurai-themed interface.

### ✨ Key Features

- **🏯 The Watchtower (Stargazing Location Finder)**:
  - Search any coordinate or Japanese mountain sanctuary.
  - Live atmospheric telemetry (cloud cover, humidity, dew point, wind speed, visibility).
  - Proprietary **Night Honor Score (0–100)**: A weighted astronomical seeing index optimized for astrophotography.
- **📜 The Celestial Scroll (Cosmic Event Tracker)**:
  - Filterable lunar calendar for meteor showers, eclipses, planetary alignments, and ISS transits.
  - Deep astronomical lore and observation tips for each celestial occurrence.
- **🔮 The Spirit Lens (AI & Procedural Image Restoration)**:
  - Interactive Before / After image slider with live star detection and nebular enhancement tags.
  - Physical photon contrast stretching and noise reduction without fabricating artificial stars.
  - Image upload dropzone simulator.
- **🥋 Honor Dojo & Bushi Honor System**:
  - Gamified achievement badges, observation streak tracking, and Honor Rank progression (from *Novice Stargazer* to *Grandmaster of the Celestial Void*).
- **🔴 Top Celestial Ticker & Interactive Modals**:
  - Live telemetry pills at the top of the screen:
    - **Live Celestial Phase**: Real-time lunar phase with "The Silver Katana" Waxing Crescent guide.
    - **☄️ Live Cosmic Event**: Geminids Radiant Surge alert with hourly meteor count and fireball index.
    - **💡 Lunar Illumination**: 22% illumination meter, visual magnitude, and glare impact.
    - **🌅 Moonrise & Moonset**: East-to-West transit times, altitude, and heading.
    - **🌌 Dark Sky Window**: Exact window (22:30–04:15 JST) of zero lunar glare for deep-sky observation.
    - **🔭 Sky Clarity Score**: Real-time seeing index and atmospheric transparency.
    - **⚡ Next Peak Countdown**: Live synchronized countdown to upcoming cosmic peaks.
  - Centered modal dialogs with smooth background blur, click-outside handling, and escape key support.

---

## 🛠 Tech Stack

### Frontend
- **HTML5 & CSS3** (Semantic, accessible, and responsive layout)
- **Tailwind CSS** (Custom palette: Void Black `#0B0E17`, Crimson Red `#DC2626`, Celestial Gold `#EAB308`)
- **Lucide Icons** (Crisp vector iconography)
- **HTML5 Canvas** (Dynamic starry night and sakura petal animations)
- **Web Audio API** (Procedural ambient zen soundscape synthesizer)

### Backend API (`api/`)
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Network / HTTP Client**: Axios (Open-Meteo & NASA APOD integration)
- **Image Processing**: Sharp with procedural fallbacks
- **File Uploads**: Multer memory storage

---

## 📂 Project Structure

```
Pecathon_2026/
├── index.html                  # Single-page frontend application
├── .gitignore                  # Git ignore rules for node_modules & env
├── README.md                   # Project documentation
│
└── api/                        # Express backend services
    ├── server.js               # Main Express server entrypoint (Port 5000)
    ├── package.json            # Backend dependencies & scripts
    ├── test-api.js             # Automated API test suite
    ├── routes/                 # Express route handlers
    │   ├── stargazingSpots.js  # /api/stargazing-spots
    │   ├── celestialEvents.js  # /api/celestial-events
    │   └── imageRestore.js     # /api/image-restore (Spirit Lens)
    ├── services/               # Core business logic
    │   ├── weatherService.js   # Open-Meteo API consumer
    │   ├── scoringService.js   # Night Honor Score calculator
    │   └── imageService.js     # Astronomical image processing engine
    ├── data/                   # Fallback astronomical datasets
    │   ├── celestialEventsData.js
    │   └── curatedSpotsData.js
    └── public/
        └── index.html          # Bundled frontend served by Express
```

---

## 🚀 Getting Started

### Option 1: Standalone Frontend (Instant Demo)
No installation required! Simply open `index.html` directly in any modern web browser:
1. Double-click `index.html` in your file explorer.
2. Or drag and drop `index.html` into Google Chrome, Microsoft Edge, or Mozilla Firefox.

### Option 2: Running with the Backend API Server

#### 1. Navigate to the API directory
```bash
cd api
```

#### 2. Install Dependencies (if not already installed)
```bash
npm install
```

#### 3. Start the Server
```bash
node server.js
```
*(Or run `npm start`)*

#### 4. Open the Web Application
Open your browser and navigate to:
```
http://localhost:5000
```

---

## 📡 Backend API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Server status and uptime health check |
| `GET` | `/api/stargazing-spots` | List of curated samurai stargazing sanctuaries |
| `GET` | `/api/stargazing-spots/weather?lat=...&lon=...` | Live Open-Meteo weather and Night Honor Score |
| `GET` | `/api/celestial-events` | Curated astronomical events calendar |
| `POST` | `/api/image-restore` | Spirit Lens astronomical image noise reduction & enhancement |

---

## 🏆 Hackathon Highlights
- **100% Demo Resilient**: Includes robust offline astronomical fallbacks so the UI remains fully functional even without internet connectivity.
- **Zero Heavy Build Tooling**: Runs natively in modern browsers with instant load times.
- **Keyboard & Screen Friendly**: Fully accessible modal dialogs with focus trapping and ESC-to-close functionality.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
