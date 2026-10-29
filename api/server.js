/**
 * Tsukuyomi Watch - Backend API Server (PS-002)
 * Samurai-Themed Celestial & Stargazing Guide Platform
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// Import modular routes
const stargazingSpotsRoute = require('./routes/stargazingSpots');
const celestialEventsRoute = require('./routes/celestialEvents');
const imageRestoreRoute = require('./routes/imageRestore');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend integration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Body parsers with generous limits for astronomical image payloads
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Static file directories (including public frontend)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/processed', express.static(path.join(__dirname, 'processed')));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// JSON API Overview Object
const apiOverview = {
  project: "Tsukuyomi Watch - Celestial API",
  directive: "Samurai-themed celestial and stargazing guide platform (PS-002)",
  status: "Operational",
  spiritMotto: "Draw the blade of wisdom under the guidance of Tsukuyomi.",
  endpoints: {
    health: {
      method: "GET",
      url: "/api/health",
      description: "Server health and status"
    },
    stargazingSpots: {
      method: "GET",
      url: "/api/stargazing-spots?city=Tokyo&latitude=35.6762&longitude=139.6503",
      description: "Real-time Open-Meteo weather, Night Honor Score (0-100), and light pollution index",
      curated: "/api/stargazing-spots/curated"
    },
    celestialEvents: {
      method: "GET",
      url: "/api/celestial-events?type=meteor_shower&upcoming=true",
      description: "Curated cosmic calendar with samurai celestial lore and filtering",
      nasaApod: "/api/celestial-events/nasa-apod"
    },
    imageRestore: {
      method: "POST",
      url: "/api/image-restore",
      description: "Spirit Lens astronomical image noise reduction, contrast stretching, and photon verification",
      capabilities: "/api/image-restore/capabilities"
    }
  }
};

// Root route: serves frontend web app for browsers, JSON for API tools
app.get('/', (req, res) => {
  if (req.accepts('html')) {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
  res.status(200).json(apiOverview);
});

// API index route for JSON clients
app.get('/api', (req, res) => {
  res.status(200).json(apiOverview);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    service: 'Tsukuyomi Watch API Engine',
    version: '1.0.0'
  });
});

// Mount Core API Routes
app.use('/api/stargazing-spots', stargazingSpotsRoute);
app.use('/api/celestial-events', celestialEventsRoute);
app.use('/api/image-restore', imageRestoreRoute);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Celestial Path Not Found',
    requestedUrl: req.originalUrl,
    wisdom: 'A lost samurai consults the North Star. Realign your coordinates.'
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Unhandled Server Error]:', err.stack || err.message);
  res.status(500).json({
    success: false,
    error: 'Internal Celestial Temple Error',
    message: err.message,
    fallbackGuidance: 'The temple remains standing. The server recovered gracefully.'
  });
});

// Start Server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(` 🌙 TSUKUYOMI WATCH API SERVER RUNNING ON PORT ${PORT}`);
    console.log(` ⚔️  Directive: Samurai Celestial & Stargazing Guide`);
    console.log(` 🌐 Base URL: http://localhost:${PORT}`);
    console.log(` 📡 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`=======================================================`);
  });
}

module.exports = app;
