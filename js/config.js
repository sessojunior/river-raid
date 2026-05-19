var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var scoreEl = document.getElementById('score');
var fuelEl = document.getElementById('fuel');
var lifeEl = document.getElementById('life');
var gameOverScreen = document.getElementById('gameOverScreen');

var GAME = {
  canvasWidth: 480,
  riverWidth: 220,
  riverWidthMin: 190,
  riverWidthEase: 0.025,
  riverEdgeMargin: 20,
  playerMargin: 5,
  playerBottomOffset: 120,
  maxFuel: 100,
  initialLives: 3,
  gameSpeed: 4,
  playerSpeed: 5,
  bulletSpeed: 8,
  bulletCooldown: 14,
  enemySpawnChance: 0.02,
  enemySpawnChanceMax: 0.04,
  fuelSpawnChance: 0.01,
  fuelSpawnChanceMin: 0.006,
  riverShiftChance: 0.015,
  riverShiftChanceMax: 0.03,
  riverEase: 0.015,
  difficultyRampScore: 4000,
  enemySpeedBonusMax: 1,
  enemyWaveSizeBonusMax: 1,
  enemyWaveSpacingStart: 70,
  enemyWaveSpacingMin: 50,
  enemySpawnCooldownStart: 90,
  enemySpawnCooldownMin: 50,
  enemyScoreValue: 100,
  fuelPickupGain: 30,
  collisionBuffer: 4,
  fuelCollisionBuffer: 3,
  bulletCollisionBuffer: 2,
  starCount: 100,
  spawnPadding: 10
};

GAME.baseGameSpeed = GAME.gameSpeed;
GAME.basePlayerSpeed = GAME.playerSpeed;
GAME.baseBulletSpeed = GAME.bulletSpeed;
GAME.baseRiverEase = GAME.riverEase;
GAME.baseRiverWidthEase = GAME.riverWidthEase;
GAME.baseEnemySpawnChance = GAME.enemySpawnChance;
GAME.baseEnemySpawnChanceMax = GAME.enemySpawnChanceMax;
GAME.baseFuelSpawnChance = GAME.fuelSpawnChance;
GAME.baseFuelSpawnChanceMin = GAME.fuelSpawnChanceMin;
GAME.baseRiverShiftChance = GAME.riverShiftChance;
GAME.baseRiverShiftChanceMax = GAME.riverShiftChanceMax;
GAME.baseEnemySpeedBonusMax = GAME.enemySpeedBonusMax;
GAME.baseScoreAdvancePerFrame = 0.05;

function applyGamePacing() {
  var paceScale = Math.max(0.45, Math.min(1, canvas.height / 720));

  GAME.paceScale = paceScale;
  GAME.gameSpeed = GAME.baseGameSpeed * paceScale;
  GAME.playerSpeed = GAME.basePlayerSpeed * paceScale;
  GAME.bulletSpeed = GAME.baseBulletSpeed * paceScale;
  GAME.riverEase = GAME.baseRiverEase * paceScale;
  GAME.riverWidthEase = GAME.baseRiverWidthEase * paceScale;
  GAME.enemySpawnChance = GAME.baseEnemySpawnChance * paceScale;
  GAME.enemySpawnChanceMax = GAME.baseEnemySpawnChanceMax * paceScale;
  GAME.fuelSpawnChance = GAME.baseFuelSpawnChance * paceScale;
  GAME.fuelSpawnChanceMin = GAME.baseFuelSpawnChanceMin * paceScale;
  GAME.riverShiftChance = GAME.baseRiverShiftChance * paceScale;
  GAME.riverShiftChanceMax = GAME.baseRiverShiftChanceMax * paceScale;
  GAME.enemySpeedBonusMax = GAME.baseEnemySpeedBonusMax * paceScale;
  GAME.scoreAdvancePerFrame = GAME.baseScoreAdvancePerFrame * paceScale;
}

canvas.width = GAME.canvasWidth;
canvas.height = window.innerHeight;

applyGamePacing();
