/**
 * Curated Samurai & Stargazing Spots for Tsukuyomi Watch
 * Renowned dark-sky sanctuaries and historical celestial watchpoints in Japan and worldwide.
 */

const CURATED_SPOTS = [
  {
    id: "fuji-5th-station",
    name: "Mount Fuji 5th Station (Subashiri / Fujinomiya)",
    region: "Shizuoka / Yamanashi, Japan",
    latitude: 35.3606,
    longitude: 138.7274,
    elevationMeters: 2400,
    historicalClan: "Takeda & Tokugawa Clans",
    samuraiTitle: "The Crown of the Sun Goddess",
    baseBortleClass: 3,
    simulatedLightPollutionIndex: 18,
    bestSeason: "Summer & Autumn",
    celestialTargets: ["Milky Way Core (Amanogawa)", "Perseid Meteors", "Jupiter"],
    lore: "Samurai warriors gazed upon the mountain peak as the bridge between heaven and earth. Above the cloud sea, stars pierce through with blade-like sharpness."
  },
  {
    id: "achi-village",
    name: "Achi Village (Heigadake)",
    region: "Nagano, Japan",
    latitude: 35.4419,
    longitude: 137.7478,
    elevationMeters: 1400,
    historicalClan: "Suwa & Sanada Clans",
    samuraiTitle: "Sanctuary of the Star River",
    baseBortleClass: 2,
    simulatedLightPollutionIndex: 12,
    bestSeason: "Year-Round (Peak: Autumn/Winter)",
    celestialTargets: ["Zodiacal Light", "Andromeda Galaxy (M31)", "Pleiades (Subaru)"],
    lore: "Officially certified as Japan's premier star-observation heaven. Nestled within the Southern Alps, shielded from civilization's glare."
  },
  {
    id: "bisei-town",
    name: "Bisei Astronomical Town",
    region: "Okayama, Japan",
    latitude: 34.7083,
    longitude: 133.5417,
    elevationMeters: 500,
    historicalClan: "Mori Clan",
    samuraiTitle: "The Decree of the Star Light",
    baseBortleClass: 3,
    simulatedLightPollutionIndex: 19,
    bestSeason: "Spring & Autumn",
    celestialTargets: ["Nebulae of Cygnus", "Vega & Altair (Tanabata Stars)"],
    lore: "In 1989, Bisei enacted Japan's first Light Pollution Prevention Ordinance, preserving the darkness honored by medieval astronomers."
  },
  {
    id: "mount-koya",
    name: "Mount Koya (Koyasan)",
    region: "Wakayama, Japan",
    latitude: 34.2139,
    longitude: 135.5861,
    elevationMeters: 800,
    historicalClan: "Kobo Daishi & Feudal Tombs",
    samuraiTitle: "The Whispering Pines of Tsukuyomi",
    baseBortleClass: 3,
    simulatedLightPollutionIndex: 22,
    bestSeason: "Autumn & Spring",
    celestialTargets: ["Winter Hexagon", "Orion Nebula", "Sirius"],
    lore: "Surrounded by ancient cedars and thousands of moss-covered warrior shrines, the night sky opens like a cosmic mandala above the mountain monastery."
  },
  {
    id: "kushimoto-cape",
    name: "Cape Shionomisaki (Kushimoto)",
    region: "Wakayama, Japan",
    latitude: 33.4333,
    longitude: 135.7667,
    elevationMeters: 60,
    historicalClan: "Kumano Navy & Coast Samurai",
    samuraiTitle: "The Southern Ocean Horizon Watch",
    baseBortleClass: 2,
    simulatedLightPollutionIndex: 15,
    bestSeason: "Winter & Spring",
    celestialTargets: ["Southern Cross (Canopus / Alpha Centauri)", "Magellanic Clouds preview"],
    lore: "The southernmost point of Honshu island, where samurai coastal watchmen tracked maritime constellations over the boundless Pacific Ocean."
  },
  {
    id: "nobeyama-highlands",
    name: "Nobeyama Highlands",
    region: "Nagano, Japan",
    latitude: 35.9467,
    longitude: 138.4739,
    elevationMeters: 1350,
    historicalClan: "Shinano Border Guards",
    samuraiTitle: "The Frost Blade Plateau",
    baseBortleClass: 2,
    simulatedLightPollutionIndex: 14,
    bestSeason: "Winter",
    celestialTargets: ["Radio & Optical Cosmic Embers", "Taurus", "Aldebaran"],
    lore: "Cold alpine air ensures zero heat-shimmer distortion, yielding pristine astronomical visibility fit for deep-sky meditation."
  }
];

module.exports = {
  CURATED_SPOTS
};
