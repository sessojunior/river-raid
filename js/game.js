var score = 0;
var gameState = GAME_STATE.START;
var animationFrameId = null;

function addScore(points) {
  score += points;
}

function setOverlayVisibility(screen, isVisible) {
  if (!screen) {
    return;
  }

  screen.style.display = isVisible ? 'flex' : 'none';
}

function setGameState(nextState) {
  gameState = nextState;

  setOverlayVisibility(startScreen, nextState === GAME_STATE.START);
  setOverlayVisibility(pauseScreen, nextState === GAME_STATE.PAUSED);
  setOverlayVisibility(gameOverScreen, nextState === GAME_STATE.GAME_OVER);
}

function updateHud() {
  scoreEl.textContent = Math.floor(score);
  fuelEl.textContent = Math.floor(player.fuel);
  lifeEl.textContent = player.lives;
}

function gameOver() {
  if (gameState !== GAME_STATE.RUNNING) {
    return;
  }

  setGameState(GAME_STATE.GAME_OVER);
  updateHud();
  draw();
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

function showStartScreen() {
  resetInputState();
  resetGameplay();
  setGameState(GAME_STATE.START);
  updateHud();
  draw();
}

function startGame() {
  if (gameState === GAME_STATE.RUNNING) {
    return;
  }

  resetInputState();
  resetGameplay();
  setGameState(GAME_STATE.RUNNING);
  updateHud();
  draw();
}

function restartGame() {
  if (gameState === GAME_STATE.RUNNING) {
    return;
  }

  startGame();
}

function pauseGame() {
  if (gameState !== GAME_STATE.RUNNING) {
    return;
  }

  setGameState(GAME_STATE.PAUSED);
  draw();
}

function resumeGame() {
  if (gameState !== GAME_STATE.PAUSED) {
    return;
  }

  setGameState(GAME_STATE.RUNNING);
  draw();
}

function togglePause() {
  if (gameState === GAME_STATE.RUNNING) {
    pauseGame();
    return;
  }

  if (gameState === GAME_STATE.PAUSED) {
    resumeGame();
  }
}

function update() {
  if (gameState !== GAME_STATE.RUNNING) {
    return;
  }

  river.update();
  player.update();

  if (gameState !== GAME_STATE.RUNNING) {
    return;
  }

  updateBullets();
  updateEnemies();

  if (gameState !== GAME_STATE.RUNNING) {
    return;
  }

  updateFuel();
  updateExplosions();
  updateStars();

  score += 0.1;
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
  update();
  draw();
  updateHud();

  animationFrameId = requestAnimationFrame(gameLoop);
}

window.addEventListener('resize', function () {
  canvas.height = window.innerHeight;
  player.syncToCanvas();
  draw();
});

showStartScreen();
gameLoop();
