var score = 0;
var running = true;
var animationFrameId = null;

function addScore(points) {
  score = incrementScore(score, points);
}

function updateHud() {
  scoreEl.textContent = formatScoreValue(score);
  fuelEl.textContent = Math.floor(player.fuel);
  lifeEl.textContent = player.lives;
}

function gameOver() {
  if (!running) {
    return;
  }

  running = false;
  gameOverScreen.style.display = 'flex';
  updateHud();
}

function resetGameplay() {
  score = 0;
  river.reset();
  player.reset();
  enemies.length = 0;
  bullets.length = 0;
  fuels.length = 0;
  explosions.length = 0;
  resetStars();
}

function restartGame() {
  if (running) {
    return;
  }

  resetGameplay();
  running = true;
  gameOverScreen.style.display = 'none';
  updateHud();
  gameLoop();
}

function update() {
  river.update();
  player.update();

  if (!running) {
    return;
  }

  updateBullets();
  updateEnemies();

  if (!running) {
    return;
  }

  updateFuel();
  updateExplosions();
  updateStars();

  score = advanceScore(score, GAME.scoreAdvancePerFrame);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawStars();
  river.draw();

  drawFuel();
  drawBullets();
  drawEnemies();
  drawExplosions();

  player.draw();
}

function gameLoop() {
  if (!running) {
    animationFrameId = null;
    return;
  }

  update();
  draw();
  updateHud();

  if (!running) {
    animationFrameId = null;
    return;
  }

  animationFrameId = requestAnimationFrame(gameLoop);
}

window.addEventListener('resize', function () {
  canvas.height = window.innerHeight;
  applyGamePacing();
  river.syncToCanvas();
  player.syncToCanvas();
});

updateHud();
gameLoop();
