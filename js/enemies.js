var enemies = [];
var enemySpawnCooldown = 0;

function spawnEnemy(difficulty) {
  var width = 36;
  var waveSpan = width + Math.max(0, difficulty.enemyWaveSize - 1) * difficulty.enemyWaveSpacing;
  var leftX = getRiverSpawnX(waveSpan, GAME.spawnPadding);
  var centerX = leftX + waveSpan / 2;

  createEnemyWave({
    x: centerX,
    y: -80,
    count: difficulty.enemyWaveSize,
    spacing: difficulty.enemyWaveSpacing,
    baseSpeed: GAME.gameSpeed + difficulty.enemySpeedBonus,
    speedVariance: 1.25,
    randomFn: Math.random,
    width: width,
    height: 52
  }).forEach(function (enemy) {
    clampToRiver(enemy, 0);
    enemies.push(enemy);
  });
}

function drawEnemy(enemy) {
  if (enemy.type === 'plane') {
    ctx.drawImage(sprites.plane, enemy.x, enemy.y, enemy.width, enemy.height);
  } else {
    ctx.drawImage(sprites.boat, enemy.x, enemy.y, enemy.width, enemy.height);
  }
}

function getPlayerCollisionBox() {
  return getCollisionBox(player, -3, -3);
}

function getEnemyCollisionBox(enemy) {
  if (enemy.type === 'plane') {
    return getCollisionBox(enemy, -2, -2);
  }

  return getCollisionBox(enemy, -1, -1);
}

function updateEnemies() {
  var difficulty = createDifficultyProfile(score, GAME);

  if (enemySpawnCooldown > 0) {
    enemySpawnCooldown--;
  } else if (Math.random() < difficulty.enemySpawnChance) {
    spawnEnemy(difficulty);
    enemySpawnCooldown = difficulty.enemySpawnCooldown;
  }

  for (var i = enemies.length - 1; i >= 0; i--) {
    var enemy = enemies[i];
    enemy.y += enemy.speed;
    clampToRiver(enemy, 0);

    var playerCollision = resolvePlayerEnemyCollision(
      player,
      enemy,
      getPlayerCollisionBox(),
      getEnemyCollisionBox(enemy),
      GAME.collisionBuffer,
      1
    );

    if (playerCollision) {
      createExplosion(playerCollision.explosionX, playerCollision.explosionY);
      enemies.splice(i, 1);
      player.lives -= playerCollision.damage;

      if (player.lives <= 0) {
        player.lives = 0;
        gameOver();
      }

      continue;
    }

    var destroyed = false;

    for (var j = bullets.length - 1; j >= 0; j--) {
      var bulletCollision = resolveBulletEnemyCollision(
        bullets[j],
        enemy,
        bullets[j],
        getEnemyCollisionBox(enemy),
        GAME.bulletCollisionBuffer,
        GAME.enemyScoreValue
      );

      if (bulletCollision) {
        createExplosion(bulletCollision.explosionX, bulletCollision.explosionY);
        bullets.splice(j, 1);
        enemies.splice(i, 1);
        addScore(bulletCollision.scoreGain);
        destroyed = true;
        break;
      }
    }

    if (destroyed) {
      continue;
    }

    if (enemy.y > canvas.height + 100) {
      enemies.splice(i, 1);
    }
  }
}

function drawEnemies() {
  enemies.forEach(function (enemy) {
    drawEnemy(enemy);
  });
}

function resetEnemies() {
  enemies.length = 0;
  enemySpawnCooldown = 0;
}
