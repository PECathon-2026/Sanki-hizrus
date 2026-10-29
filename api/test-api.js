/**
 * Tsukuyomi Watch - API Test & Verification Script
 * Validates route handlers, scoring logic, and fallbacks.
 */

const { calculateNightHonorScore, estimateLightPollution, getSamuraiEvaluation } = require('./services/scoringService');
const { resolveCoordinates, getFallbackWeatherData } = require('./services/weatherService');
const { processAstronomicalImage } = require('./services/imageService');
const { CELESTIAL_EVENTS } = require('./data/celestialEventsData');
const { CURATED_SPOTS } = require('./data/curatedSpotsData');

async function runTests() {
  console.log('====================================================');
  console.log('🌙 RUNNING TSUKUYOMI WATCH BACKEND VERIFICATION SUITE');
  console.log('====================================================\n');

  let passed = 0;
  let total = 0;

  function assert(condition, testName) {
    total++;
    if (condition) {
      console.log(` ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(` ❌ FAIL: ${testName}`);
    }
  }

  // Test 1: Coordinate Resolution
  const coordsTokyo = resolveCoordinates(null, null, 'Tokyo');
  assert(coordsTokyo.lat === 35.6762 && coordsTokyo.lon === 139.6503, 'Coordinate resolution: Tokyo');

  const coordsFujiDefault = resolveCoordinates(null, null, null);
  assert(coordsFujiDefault.lat === 35.3606, 'Coordinate resolution: default fallback to Mt. Fuji');

  // Test 2: Night Honor Scoring Algorithm
  const clearSkySample = {
    cloud_cover: 0,
    visibility: 24000,
    relative_humidity_2m: 45,
    wind_speed_10m: 6
  };
  const clearScore = calculateNightHonorScore(clearSkySample);
  assert(clearScore.nightHonorScore >= 95, `Night Honor Score: Pristine sky score >= 95 (Got ${clearScore.nightHonorScore})`);

  const overcastSample = {
    cloud_cover: 100,
    visibility: 5000,
    relative_humidity_2m: 95,
    wind_speed_10m: 30
  };
  const overcastScore = calculateNightHonorScore(overcastSample);
  assert(overcastScore.nightHonorScore <= 25, `Night Honor Score: Overcast storm score <= 25 (Got ${overcastScore.nightHonorScore})`);

  // Test 3: Samurai Evaluation & Ranks
  const masterEval = getSamuraiEvaluation(95, 2);
  assert(masterEval.rank.includes('Kage-Ryu Grandmaster'), 'Samurai Evaluation: High score produces Grandmaster rank');

  const roninEval = getSamuraiEvaluation(15, 8);
  assert(roninEval.rank.includes('Ronin'), 'Samurai Evaluation: Low score produces Ronin rank');

  // Test 4: Light Pollution & Bortle Estimation
  const tokyoPollution = estimateLightPollution(35.6762, 139.6503, { bortle: 8, basePollution: 88 });
  assert(tokyoPollution.bortleClass === 8, 'Light Pollution: Tokyo mapped to Bortle Class 8');

  // Test 5: Celestial Events Pre-Populated Dataset
  assert(CELESTIAL_EVENTS.length >= 10, `Celestial Events: Rich dataset contains ${CELESTIAL_EVENTS.length} events (>= 10)`);
  const hasMeteorShowers = CELESTIAL_EVENTS.some(e => e.eventType === 'meteor_shower');
  const hasMoonPhases = CELESTIAL_EVENTS.some(e => e.eventType === 'moon_phase');
  const hasIssPasses = CELESTIAL_EVENTS.some(e => e.eventType === 'iss_pass');
  assert(hasMeteorShowers && hasMoonPhases && hasIssPasses, 'Celestial Events: Contains meteor showers, lunar phases, and ISS transits');

  // Test 6: Curated Historical Spots
  assert(CURATED_SPOTS.length >= 5, `Curated Spots: Contains ${CURATED_SPOTS.length} renowned samurai observation spots`);

  // Test 7: Spirit Lens Image Processing Service
  const spiritResult = await processAstronomicalImage(null, { filterIntensity: 'standard' });
  assert(spiritResult.success === true, 'Spirit Lens: Demonstration celestial processing succeeded');
  assert(spiritResult.spiritLensReport.metrics.fidelityIntegrity.toLowerCase().includes('zero synthetic'), 'Spirit Lens: Enforces anti-hallucination starlight preservation');

  // Test 8: Fallback Weather Generation
  const fallbackWeather = getFallbackWeatherData(35.3606, 138.7274, 'Mt. Fuji');
  assert(fallbackWeather.isFallback === true && fallbackWeather.current.cloud_cover <= 20, 'Weather Fallback: High-fidelity simulation available');

  console.log('\n----------------------------------------------------');
  console.log(`🏁 TEST SUMMARY: ${passed}/${total} passed (${Math.round((passed/total)*100)}%)`);
  console.log('====================================================');
}

runTests().catch(err => {
  console.error('Test execution failed:', err);
});
