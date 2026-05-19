var keys = {};
var GAME_KEYS = ['ArrowLeft', 'ArrowRight', 'Space', 'Enter', 'KeyP'];

function resetInputState() {
  Object.keys(keys).forEach(function (code) {
    keys[code] = false;
  });
}

window.addEventListener('keydown', function (event) {
  if (GAME_KEYS.indexOf(event.code) !== -1) {
    event.preventDefault();
  }

  if (event.code === 'KeyP' && !event.repeat) {
    togglePause();
    return;
  }

  if (event.code === 'Enter' && !event.repeat) {
    if (gameState === GAME_STATE.START) {
      startGame();
    } else if (gameState === GAME_STATE.GAME_OVER) {
      restartGame();
    }

    return;
  }

  keys[event.code] = true;
});

window.addEventListener('keyup', function (event) {
  if (GAME_KEYS.indexOf(event.code) !== -1) {
    event.preventDefault();
  }

  keys[event.code] = false;
});

window.addEventListener('blur', function () {
  resetInputState();
});
