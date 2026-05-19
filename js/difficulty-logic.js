(function (root, factory) {
  var api = factory();

  root.getDifficultyProgress = api.getDifficultyProgress;
  root.createDifficultyProfile = api.createDifficultyProfile;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function clamp(value, min, max) {
    if (value < min) {
      return min;
    }

    if (value > max) {
      return max;
    }

    return value;
  }

  function lerp(start, end, amount) {
    return start + (end - start) * amount;
  }

  function getDifficultyProgress(scoreValue, rampScore) {
    var normalized = rampScore > 0 ? scoreValue / rampScore : 0;

    return clamp(normalized, 0, 1);
  }

  function createDifficultyProfile(scoreValue, settings) {
    settings = settings || {};

    var progress = getDifficultyProgress(scoreValue, settings.difficultyRampScore || 4000);
    var riverWidthStart = typeof settings.riverWidth === 'number' ? settings.riverWidth : 220;
    var riverWidthMin = typeof settings.riverWidthMin === 'number' ? settings.riverWidthMin : 190;
    var riverShiftChanceStart = typeof settings.riverShiftChance === 'number' ? settings.riverShiftChance : 0.015;
    var riverShiftChanceMax = typeof settings.riverShiftChanceMax === 'number' ? settings.riverShiftChanceMax : 0.03;
    var enemySpawnChanceStart = typeof settings.enemySpawnChance === 'number' ? settings.enemySpawnChance : 0.02;
    var enemySpawnChanceMax = typeof settings.enemySpawnChanceMax === 'number' ? settings.enemySpawnChanceMax : 0.04;
    var fuelSpawnChanceStart = typeof settings.fuelSpawnChance === 'number' ? settings.fuelSpawnChance : 0.01;
    var fuelSpawnChanceMin = typeof settings.fuelSpawnChanceMin === 'number' ? settings.fuelSpawnChanceMin : 0.006;
    var enemySpeedBonusMax = typeof settings.enemySpeedBonusMax === 'number' ? settings.enemySpeedBonusMax : 1;
    var enemyWaveSizeBonusMax = typeof settings.enemyWaveSizeBonusMax === 'number' ? settings.enemyWaveSizeBonusMax : 1;
    var enemyWaveSpacingStart = typeof settings.enemyWaveSpacingStart === 'number' ? settings.enemyWaveSpacingStart : 70;
    var enemyWaveSpacingMin = typeof settings.enemyWaveSpacingMin === 'number' ? settings.enemyWaveSpacingMin : 50;
    var enemySpawnCooldownStart = typeof settings.enemySpawnCooldownStart === 'number' ? settings.enemySpawnCooldownStart : 90;
    var enemySpawnCooldownMin = typeof settings.enemySpawnCooldownMin === 'number' ? settings.enemySpawnCooldownMin : 50;

    return {
      progress: progress,
      riverWidth: Math.round(lerp(riverWidthStart, riverWidthMin, progress)),
      riverShiftChance: lerp(riverShiftChanceStart, riverShiftChanceMax, progress),
      enemySpawnChance: lerp(enemySpawnChanceStart, enemySpawnChanceMax, progress),
      fuelSpawnChance: lerp(fuelSpawnChanceStart, fuelSpawnChanceMin, progress),
      enemySpeedBonus: lerp(0, enemySpeedBonusMax, progress),
      enemyWaveSize: 1 + Math.floor(lerp(0, enemyWaveSizeBonusMax, progress)),
      enemyWaveSpacing: Math.round(lerp(enemyWaveSpacingStart, enemyWaveSpacingMin, progress)),
      enemySpawnCooldown: Math.round(lerp(enemySpawnCooldownStart, enemySpawnCooldownMin, progress))
    };
  }

  return {
    getDifficultyProgress: getDifficultyProgress,
    createDifficultyProfile: createDifficultyProfile
  };
});