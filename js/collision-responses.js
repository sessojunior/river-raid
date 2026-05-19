(function (root, factory) {
  var api = factory();

  root.resolvePlayerEnemyCollision = api.resolvePlayerEnemyCollision;
  root.resolveBulletEnemyCollision = api.resolveBulletEnemyCollision;
  root.resolvePlayerFuelCollision = api.resolvePlayerFuelCollision;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function checkCollision(a, b, buffer) {
    buffer = buffer || 0;

    return (
      a.x - buffer < b.x + b.width &&
      a.x + a.width + buffer > b.x &&
      a.y - buffer < b.y + b.height &&
      a.y + a.height + buffer > b.y
    );
  }

  function resolvePlayerEnemyCollision(player, enemy, playerBox, enemyBox, buffer, damageAmount) {
    if (!checkCollision(playerBox, enemyBox, buffer)) {
      return null;
    }

    return {
      damage: typeof damageAmount === 'number' ? damageAmount : 1,
      explosionX: player.x + player.width / 2,
      explosionY: player.y + player.height / 2
    };
  }

  function resolveBulletEnemyCollision(bullet, enemy, bulletBox, enemyBox, buffer, scoreGain) {
    if (!checkCollision(bulletBox, enemyBox, buffer)) {
      return null;
    }

    return {
      scoreGain: typeof scoreGain === 'number' ? scoreGain : 100,
      explosionX: enemy.x + enemy.width / 2,
      explosionY: enemy.y + enemy.height / 2
    };
  }

  function resolvePlayerFuelCollision(player, fuel, playerBox, fuelBox, buffer, fuelGain, maxFuel) {
    if (!checkCollision(playerBox, fuelBox, buffer)) {
      return null;
    }

    var gain = typeof fuelGain === 'number' ? fuelGain : 30;
    var fuelCap = typeof maxFuel === 'number' ? maxFuel : player.fuel;

    return {
      fuelGain: gain,
      fuelAfter: Math.min(fuelCap, player.fuel + gain),
      explosionX: fuel.x + fuel.width / 2,
      explosionY: fuel.y + fuel.height / 2
    };
  }

  return {
    resolvePlayerEnemyCollision: resolvePlayerEnemyCollision,
    resolveBulletEnemyCollision: resolveBulletEnemyCollision,
    resolvePlayerFuelCollision: resolvePlayerFuelCollision
  };
});