var stars = [];

function createStars() {
  stars.length = 0;

  for (var i = 0; i < GAME.starCount; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 2 + 1
    });
  }
}

function resetStars() {
  createStars();
}

function updateStars() {
  stars.forEach(function (star) {
    star.y += star.speed;

    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
}

function drawStars() {
  ctx.fillStyle = '#ffffff';

  stars.forEach(function (star) {
    ctx.fillRect(star.x, star.y, star.size, star.size);
  });
}

createStars();
