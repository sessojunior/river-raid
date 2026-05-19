var keys = {};
var GAME_KEYS = ['ArrowLeft', 'ArrowRight', 'Space'];

window.addEventListener('keydown', function (event) {
  if (GAME_KEYS.indexOf(event.code) !== -1) {
    event.preventDefault();
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
  Object.keys(keys).forEach(function (code) {
    keys[code] = false;
  });
});
