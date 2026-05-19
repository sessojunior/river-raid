var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var scoreEl = document.getElementById('score');
var fuelEl = document.getElementById('fuel');
var lifeEl = document.getElementById('life');
var startScreen = document.getElementById('startScreen');
var pauseScreen = document.getElementById('pauseScreen');
var gameOverScreen = document.getElementById('gameOverScreen');

var GAME_STATE = {
  START: 'start',
  RUNNING: 'running',
  PAUSED: 'paused',
  GAME_OVER: 'gameover'
};

var GAME = {
  canvasWidth: 480,
  riverWidth: 220,
  riverEdgeMargin: 20,
  playerMargin: 5,
  playerBottomOffset: 120,
  maxFuel: 100,
  initialLives: 3,
  gameSpeed: 5,
  playerSpeed: 6,
  bulletSpeed: 9,
  bulletCooldown: 12,
  enemySpawnChance: 0.03,
  fuelSpawnChance: 0.008,
  riverShiftChance: 0.02,
  riverEase: 0.02,
  collisionBuffer: 4,
  fuelCollisionBuffer: 3,
  bulletCollisionBuffer: 2,
  starCount: 100,
  spawnPadding: 10
};

canvas.width = GAME.canvasWidth;
canvas.height = window.innerHeight;
