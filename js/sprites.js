function createSpriteCanvas(width, height, drawFn) {
  var spriteCanvas = document.createElement('canvas');
  var spriteCtx = spriteCanvas.getContext('2d');

  spriteCanvas.width = width;
  spriteCanvas.height = height;
  spriteCtx.clearRect(0, 0, width, height);
  spriteCtx.imageSmoothingEnabled = false;
  drawFn(spriteCtx, width, height);

  return spriteCanvas;
}

function drawPlayerSprite(ctx, width, height) {
  ctx.fillStyle = '#007fcd';
  ctx.beginPath();
  ctx.moveTo(width / 2, 1);
  ctx.lineTo(4, height - 2);
  ctx.lineTo(width / 2, height - 16);
  ctx.lineTo(width - 4, height - 2);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#00d0ff';
  ctx.fillRect(width / 2 - 8, 10, 16, 26);

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(width / 2 - 4, 12, 8, 12);

  ctx.fillStyle = '#d8f9ff';
  ctx.fillRect(width / 2 - 5, 15, 10, 3);

  ctx.fillStyle = '#ff6600';
  ctx.fillRect(width / 2 - 6, height - 11, 12, 8);

  ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
  ctx.fillRect(width / 2 - 12, height - 17, 24, 4);
}

function drawPlaneSprite(ctx, width, height) {
  ctx.fillStyle = '#ff4444';
  ctx.beginPath();
  ctx.moveTo(width / 2, 2);
  ctx.lineTo(4, height - 4);
  ctx.lineTo(width / 2, height - 12);
  ctx.lineTo(width - 4, height - 4);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#ffb6b6';
  ctx.fillRect(width / 2 - 5, 9, 10, 10);

  ctx.fillStyle = '#b61d1d';
  ctx.fillRect(width / 2 - 12, height - 16, 24, 4);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
  ctx.fillRect(width / 2 - 2, 6, 4, height - 12);
}

function drawBoatSprite(ctx, width, height) {
  ctx.fillStyle = '#b7b7b7';
  ctx.fillRect(4, 14, width - 8, height - 18);

  ctx.fillStyle = '#8a8a8a';
  ctx.fillRect(10, 8, width - 20, 12);

  ctx.fillStyle = '#666';
  ctx.fillRect(8, height - 8, width - 16, 4);

  ctx.fillStyle = '#d7d7d7';
  ctx.fillRect(12, 12, width - 24, 5);

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(15, 12, 6, 4);
  ctx.fillRect(width - 21, 12, 6, 4);
}

function drawFuelSprite(ctx, width, height) {
  ctx.fillStyle = '#ffcc00';
  ctx.fillRect(4, 5, width - 8, height - 10);

  ctx.fillStyle = '#b98a00';
  ctx.fillRect(10, 2, width - 20, 6);

  ctx.fillStyle = '#ffe36b';
  ctx.fillRect(8, 10, width - 16, height - 18);

  ctx.fillStyle = '#000000';
  ctx.font = 'bold 18px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('F', width / 2, height / 2 + 1);
}

var sprites = {
  player: createSpriteCanvas(40, 60, drawPlayerSprite),
  plane: createSpriteCanvas(36, 52, drawPlaneSprite),
  boat: createSpriteCanvas(36, 52, drawBoatSprite),
  fuel: createSpriteCanvas(28, 40, drawFuelSprite)
};
