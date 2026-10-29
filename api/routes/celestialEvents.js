/**
 * Route Handler: Celestial Events & Cosmic Calendar
 * Endpoint: /api/celestial-events
 */

const express = require('express');
const router = express.Router();
const { CELESTIAL_EVENTS } = require('../data/celestialEventsData');

let axios = null;
try {
  axios = require('axios');
} catch (e) {
  // Graceful fallback to native fetch
}

const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';

/**
 * GET /api/celestial-events
 * Query Parameters:
 *   - type: "meteor_shower" | "moon_phase" | "iss_pass" | "eclipse" | "planetary_alignment" | "all"
 *   - date: "YYYY-MM-DD"
 *   - upcoming: "true" | "false"
 *   - search: string
 *   - limit: number
 */
router.get('/', (req, res) => {
  try {
    const { type, date, upcoming, search, limit } = req.query;

    let filteredEvents = [...CELESTIAL_EVENTS];

    // 1. Filter by event type
    if (type && type.toLowerCase() !== 'all') {
      const targetType = type.toLowerCase().trim();
      filteredEvents = filteredEvents.filter(evt =>
        evt.eventType.toLowerCase() === targetType
      );
    }

    // 2. Filter by date if provided
    if (date) {
      filteredEvents = filteredEvents.filter(evt => {
        if (evt.peakDate === date) return true;
        if (evt.startDate && evt.endDate) {
          return date >= evt.startDate && date <= evt.endDate;
        }
        return false;
      });
    }

    // 3. Filter for upcoming events
    if (upcoming === 'true') {
      const today = new Date().toISOString().split('T')[0];
      filteredEvents = filteredEvents.filter(evt => {
        const eventEnd = evt.endDate || evt.peakDate;
        return eventEnd >= today;
      });
    }

    // 4. Keyword search
    if (search) {
      const query = search.toLowerCase().trim();
      filteredEvents = filteredEvents.filter(evt =>
        evt.title.toLowerCase().includes(query) ||
        evt.samuraiTitle.toLowerCase().includes(query) ||
        evt.lore.toLowerCase().includes(query) ||
        evt.description.toLowerCase().includes(query)
      );
    }

    // 5. Apply limit
    const maxItems = parseInt(limit, 10);
    if (!isNaN(maxItems) && maxItems > 0) {
      filteredEvents = filteredEvents.slice(0, maxItems);
    }

    return res.status(200).json({
      success: true,
      count: filteredEvents.length,
      filtersApplied: {
        type: type || 'all',
        date: date || null,
        upcoming: upcoming === 'true',
        search: search || null
      },
      availableEventTypes: [
        { type: "all", label: "All Celestial Omens" },
        { type: "meteor_shower", label: "Meteor Showers (Blade Sparks)" },
        { type: "moon_phase", label: "Lunar Phases (Tsukuyomi's Face)" },
        { type: "iss_pass", label: "ISS Transits (Sky Chariot of the Shogun)" },
        { type: "eclipse", label: "Solar & Lunar Eclipses (Celestial Shadows)" },
        { type: "planetary_alignment", label: "Planetary Alignments (Duel of Daimyos)" }
      ],
      events: filteredEvents
    });
  } catch (error) {
    console.error('[Celestial Events Error]:', error.message);
    return res.status(200).json({
      success: true,
      count: CELESTIAL_EVENTS.length,
      isFallback: true,
      events: CELESTIAL_EVENTS
    });
  }
});

/**
 * GET /api/celestial-events/nasa-apod
 */
router.get('/nasa-apod', async (req, res) => {
  try {
    const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;
    let apodData = null;

    if (axios) {
      const response = await axios.get(apodUrl, { timeout: 4000 });
      apodData = response.data;
    } else if (typeof fetch === 'function') {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const response = await fetch(apodUrl, { signal: controller.signal });
      clearTimeout(timeoutId);
      apodData = await response.json();
    }

    if (apodData) {
      return res.status(200).json({
        success: true,
        source: "NASA Astronomy Picture of the Day API",
        data: apodData
      });
    }
    throw new Error('APOD fetch unavailable');
  } catch (error) {
    return res.status(200).json({
      success: true,
      source: "Tsukuyomi Curated Celestial Archive (Fallback)",
      data: {
        title: "The Pillars of Creation (Eagle Nebula)",
        samuraiTitle: "The Three Heavenly Pillars of Amatsumikaboshi",
        date: new Date().toISOString().split('T')[0],
        url: "https://images-assets.nasa.gov/image/PIA18907/PIA18907~orig.jpg",
        explanation: "Vast pillars of interstellar gas and dust bathed in the ultraviolet radiation of newborn massive stars, reminiscent of ancient temple pillars standing proud against cosmic winds."
      }
    });
  }
});

/**
 * GET /api/celestial-events/:id
 */
router.get('/:id', (req, res) => {
  const event = CELESTIAL_EVENTS.find(e => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({
      success: false,
      message: `Celestial event '${req.params.id}' not found.`
    });
  }
  return res.status(200).json({
    success: true,
    event
  });
});

module.exports = router;
