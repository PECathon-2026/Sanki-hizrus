/**
 * Scoring Service for Tsukuyomi Watch
 * Computes custom "Night Honor Score" (0-100), Bortle Light Pollution Index,
 * Atmospheric Seeing index, and Samurai-themed celestial status.
 */

/**
 * Calculates the Night Honor Score (0 - 100)
 * Evaluates:
 * 1. Cloud Cover (Weight: 55%) - Clear skies are paramount.
 * 2. Atmospheric Visibility (Weight: 30%) - Ground visibility in meters.
 * 3. Relative Humidity (Weight: 10%) - Excessive humidity (>75%) produces dew & optical haze.
 * 4. Wind Speed (Weight: 5%) - Calm winds keep telescopes steady.
 */
function calculateNightHonorScore(weatherCurrent) {
  const cloudCover = Math.max(0, Math.min(100, weatherCurrent.cloud_cover ?? 20));
  // Open-Meteo visibility is in meters (typically 0 to 50,000m; 24,000m+ is considered pristine clear)
  const visibilityMeters = Math.max(100, weatherCurrent.visibility ?? 24000);
  const humidity = Math.max(0, Math.min(100, weatherCurrent.relative_humidity_2m ?? 50));
  const windSpeedKmH = Math.max(0, weatherCurrent.wind_speed_10m ?? 5);

  // 1. Cloud Score (0 - 55 pts)
  // Low clouds obscure directly, high clouds veil
  const cloudFactor = (100 - cloudCover) / 100;
  const cloudScore = cloudFactor * 55;

  // 2. Visibility Score (0 - 30 pts)
  // 24km or higher gives maximum points
  const normalizedVisibility = Math.min(visibilityMeters / 24000, 1.0);
  const visibilityScore = normalizedVisibility * 30;

  // 3. Humidity Factor (0 - 10 pts)
  // Optimal is 30% - 60%. Above 75% incurs fog/dew penalties.
  let humidityScore = 10;
  if (humidity > 70) {
    humidityScore = Math.max(0, 10 - ((humidity - 70) * 0.33));
  } else if (humidity < 20) {
    humidityScore = 9; // very dry air can sometimes have dust
  }

  // 4. Wind Stability (0 - 5 pts)
  // Optimal is < 15 km/h
  let windScore = 5;
  if (windSpeedKmH > 15) {
    windScore = Math.max(0, 5 - ((windSpeedKmH - 15) * 0.25));
  }

  // Total raw score
  let totalScore = Math.round(cloudScore + visibilityScore + humidityScore + windScore);
  totalScore = Math.max(0, Math.min(100, totalScore));

  return {
    nightHonorScore: totalScore,
    breakdown: {
      cloudClarityScore: Math.round(cloudScore),
      maxCloudPoints: 55,
      atmosphericVisibilityScore: Math.round(visibilityScore),
      maxVisibilityPoints: 30,
      humidityDewFactorScore: Math.round(humidityScore),
      maxHumidityPoints: 10,
      windStabilityScore: Math.round(windScore),
      maxWindPoints: 5
    }
  };
}

/**
 * Calculates or estimates the Light Pollution and Bortle Scale (Class 1-9)
 */
function estimateLightPollution(lat, lon, locationMetadata) {
  if (locationMetadata && locationMetadata.bortle) {
    return {
      bortleClass: locationMetadata.bortle,
      lightPollutionIndex: locationMetadata.basePollution,
      bortleTitle: getBortleTitle(locationMetadata.bortle),
      artificialLuminanceMcdM2: estimateArtificialLuminance(locationMetadata.bortle)
    };
  }

  // Heuristic estimation based on coordinates distance to high-density zones
  // For coordinates in mountainous or remote areas:
  const absLat = Math.abs(lat);
  let estimatedBortle = 4;
  let estimatedIndex = 35;

  // Typical major urban centers latitude bands
  if (absLat > 34 && absLat < 36 && lon > 135 && lon < 140) {
    // Japan central zone
    estimatedBortle = 5;
    estimatedIndex = 48;
  }

  return {
    bortleClass: estimatedBortle,
    lightPollutionIndex: estimatedIndex,
    bortleTitle: getBortleTitle(estimatedBortle),
    artificialLuminanceMcdM2: estimateArtificialLuminance(estimatedBortle)
  };
}

function getBortleTitle(bortle) {
  switch (bortle) {
    case 1: return "Class 1: Completely Pristine Void (Excellent Dark Sky)";
    case 2: return "Class 2: Truly Dark Sky Site (Summer Milky Way Casts Shadows)";
    case 3: return "Class 3: Rural Sky (Complex Cloud Structure Visible in Milky Way)";
    case 4: return "Class 4: Rural / Suburban Transition";
    case 5: return "Class 5: Suburban Sky (Moderate Light Domes)";
    case 6: return "Class 6: Bright Suburban Sky (Milky Way Only Visible at Zenith)";
    case 7: return "Class 7: Suburban / Urban Transition (Sky Has Gray-White Haze)";
    case 8: return "Class 8: City Sky (Milky Way Completely Invisible)";
    case 9: return "Class 9: Inner-City Core (Only Moon & Bright Planets Visible)";
    default: return "Class 4: Moderate Dark Sky";
  }
}

function estimateArtificialLuminance(bortle) {
  const map = {
    1: "< 0.01 mcd/m²",
    2: "0.01 - 0.08 mcd/m²",
    3: "0.09 - 0.18 mcd/m²",
    4: "0.19 - 0.40 mcd/m²",
    5: "0.41 - 0.80 mcd/m²",
    6: "0.81 - 1.80 mcd/m²",
    7: "1.81 - 3.50 mcd/m²",
    8: "3.51 - 8.00 mcd/m²",
    9: "> 8.00 mcd/m²"
  };
  return map[bortle] || "0.25 mcd/m²";
}

/**
 * Returns samurai-themed honor rank and wisdom based on score
 */
function getSamuraiEvaluation(honorScore, bortleClass) {
  if (honorScore >= 90 && bortleClass <= 3) {
    return {
      rank: "Kage-Ryu Grandmaster (Shadow Master)",
      badge: "LEGENDARY_VOID",
      colorHex: "#FFD700",
      status: "Pristine Celestial Void",
      wisdom: "The Moon Blade is drawn. The stars pierce through the velvet night like diamond sparks on polished iron.",
      tacticalAdvice: "Deploy full astrophotography apparatus. Unveil the core of Amanogawa (Milky Way) and faint deep-sky nebulae."
    };
  }

  if (honorScore >= 75) {
    return {
      rank: "Hatamoto (Senior Celestial Retainer)",
      badge: "HONORED_WARRIOR",
      colorHex: "#00E5FF",
      status: "Favorable Stargazing Heavens",
      wisdom: "Calm your breathing like a swordsman before battle. The heavenly constellations stand in perfect formation.",
      tacticalAdvice: "Ideal window for binoculars and wide-angle star tracking. Major constellations and planets will shine brilliantly."
    };
  }

  if (honorScore >= 55) {
    return {
      rank: "Samurai Watchman (Jou-Gashira)",
      badge: "VIGILANT_SENTRY",
      colorHex: "#76FF03",
      status: "Moderate Viewing with Fleeting Clearings",
      wisdom: "Even behind light mist, the spirit does not waver. The moon and bright warlord stars guide the vigilant.",
      tacticalAdvice: "Focus on bright planetary targets (Jupiter, Saturn, Venus) and open star clusters (Subaru / Pleiades)."
    };
  }

  if (honorScore >= 35) {
    return {
      rank: "Ashigaru Foot Soldier",
      badge: "VEILED_SKY",
      colorHex: "#FF9100",
      status: "Cloud-Veiled Battlefield",
      wisdom: "Clouds test the warrior's patience. Do not strike blindly into the haze; await the break in the storm.",
      tacticalAdvice: "Occasional gaps in cloud cover may permit viewing bright celestial events. Keep optics shielded from dew."
    };
  }

  return {
    rank: "Ronin in the Mist",
    badge: "OBSCURED_SHADOW",
    colorHex: "#FF1744",
    status: "Heavily Obscured Sky",
    wisdom: "Tonight the heavens conceal their swords. Polish your blade, rest by the lantern fire, and prepare for tomorrow's clear dawn.",
    tacticalAdvice: "Stargazing is not recommended due to dense overcast or precipitation. Use this time for planning upcoming celestial passes."
  };
}

module.exports = {
  calculateNightHonorScore,
  estimateLightPollution,
  getSamuraiEvaluation
};
