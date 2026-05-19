var enemies = [];

function spawnEnemy() {
  var width = 36;
  var x = getRiverSpawnX(width, GAME.spawnPadding);

  var enemy = {
    x: x,
    y: -80,
    width: width,
    height: 52,
    speed: GAME.gameSpeed + Math.random() * 2,
    type: Math.random() > 0.5 ? 'plane' : 'boat'
  };

  clampToRiver(enemy, 0);
  enemies.push(enemy);
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
  if (Math.random() < GAME.enemySpawnChance) {
    spawnEnemy();
  }

  for (var i = enemies.length - 1; i >= 0; i--) {
    var enemy = enemies[i];
    enemy.y += enemy.speed;
    clampToRiver(enemy, 0);

    if (checkCollision(getPlayerCollisionBox(), getEnemyCollisionBox(enemy), GAME.collisionBuffer)) {
      createExplosion(player.x + player.width / 2, player.y + player.height / 2);
      enemies.splice(i, 1);
      player.lives--;

      if (player.lives <= 0) {
        player.lives = 0;
        gameOver();
      }

      continue;
    }

    var destroyed = false;

    for (var j = bullets.length - 1; j >= 0; j--) {
      if (checkCollision(bullets[j], getEnemyCollisionBox(enemy), GAME.bulletCollisionBuffer)) {
        createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
        bullets.splice(j, 1);
        enemies.splice(i, 1);
        addScore(100);
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
}
