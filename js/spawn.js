(function (root, factory) {
  var api = factory();

  root.createEnemySpawn = api.createEnemySpawn;
  root.createFuelSpawn = api.createFuelSpawn;
  root.createEnemyWave = api.createEnemyWave;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function getRandomFn(randomFn) {
    return typeof randomFn === 'function' ? randomFn : Math.random;
  }

  function createEnemySpawn(options) {
    options = options || {};

    var randomFn = getRandomFn(options.randomFn);
    var baseSpeed = typeof options.baseSpeed === 'number' ? options.baseSpeed : 0;
    var speedVariance = typeof options.speedVariance === 'number' ? options.speedVariance : 2;

    return {
      x: typeof options.x === 'number' ? options.x : 0,
      y: typeof options.y === 'number' ? options.y : -80,
      width: typeof options.width === 'number' ? options.width : 36,
      height: typeof options.height === 'number' ? options.height : 52,
      speed: baseSpeed + randomFn() * speedVariance,
      type: randomFn() > 0.5 ? 'plane' : 'boat'
    };
  }

  function createFuelSpawn(options) {
    options = options || {};

    return {
      x: typeof options.x === 'number' ? options.x : 0,
      y: typeof options.y === 'number' ? options.y : -50,
      width: typeof options.width === 'number' ? options.width : 28,
      height: typeof options.height === 'number' ? options.height : 40,
      speed: typeof options.speed === 'number' ? options.speed : 0
    };
  }

  function createEnemyWave(options) {
    options = options || {};

    var count = typeof options.count === 'number' ? options.count : 1;
    var spacing = typeof options.spacing === 'number' ? options.spacing : 0;
    var centerX = typeof options.x === 'number' ? options.x : 0;
    var startY = typeof options.y === 'number' ? options.y : -80;
    var width = typeof options.width === 'number' ? options.width : 36;
    var height = typeof options.height === 'number' ? options.height : 52;
    var baseSpeed = typeof options.baseSpeed === 'number' ? options.baseSpeed : 0;
    var speedVariance = typeof options.speedVariance === 'number' ? options.speedVariance : 2;
    var randomFn = getRandomFn(options.randomFn);
    var enemies = [];
    var startOffset = -((count - 1) / 2) * spacing;

    for (var i = 0; i < count; i++) {
      var enemy = createEnemySpawn({
        x: centerX + startOffset + i * spacing,
        y: startY,
        width: width,
        height: height,
        baseSpeed: baseSpeed,
        speedVariance: speedVariance,
        randomFn: randomFn
      });

      if (options.type) {
        enemy.type = options.type;
      }

      enemies.push(enemy);
    }

    return enemies;
  }

  return {
    createEnemySpawn: createEnemySpawn,
    createFuelSpawn: createFuelSpawn,
    createEnemyWave: createEnemyWave
  };
});