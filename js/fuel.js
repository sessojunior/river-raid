var fuels = [];

function spawnFuel() {
  var width = 28;
  var x = getRiverSpawnX(width, GAME.spawnPadding);

  var fuel = {
    x: x,
    y: -50,
    width: width,
    height: 40,
    speed: GAME.gameSpeed
  };

  clampToRiver(fuel, 0);
  fuels.push(fuel);
}

function updateFuel() {
  var difficulty = createDifficultyProfile(score, GAME);

  if (Math.random() < difficulty.fuelSpawnChance) {
    spawnFuel();
  }

  for (var i = fuels.length - 1; i >= 0; i--) {
    var fuel = fuels[i];
    fuel.y += fuel.speed;
    clampToRiver(fuel, 0);

    var fuelCollision = resolvePlayerFuelCollision(
      player,
      fuel,
      player,
      fuel,
      GAME.fuelCollisionBuffer,
      GAME.fuelPickupGain,
      GAME.maxFuel
    );

    if (fuelCollision) {
      player.fuel = fuelCollision.fuelAfter;
      fuels.splice(i, 1);
      continue;
    }

    if (fuel.y > canvas.height + 60) {
      fuels.splice(i, 1);
    }
  }
}

function drawFuel() {
  fuels.forEach(function (fuel) {
    ctx.drawImage(sprites.fuel, fuel.x, fuel.y, fuel.width, fuel.height);
  });
}

function resetFuel() {
  fuels.length = 0;
}
