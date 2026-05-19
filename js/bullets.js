var bullets = [];

function shoot() {
  bullets.push({
    x: player.x + player.width / 2 - 2,
    y: player.y,
    width: 4,
    height: 12
  });
}

function updateBullets() {
  for (var i = bullets.length - 1; i >= 0; i--) {
    var bullet = bullets[i];

    bullet.y -= GAME.bulletSpeed;

    if (bullet.y < -20) {
      bullets.splice(i, 1);
    }
  }
}

function drawBullets() {
  ctx.fillStyle = '#ffff00';

  bullets.forEach(function (bullet) {
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
  });
}
