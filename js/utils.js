function getCollisionBox(entity, paddingX, paddingY) {
  paddingX = typeof paddingX === 'number' ? paddingX : 0;
  paddingY = typeof paddingY === 'number' ? paddingY : paddingX;

  return {
    x: entity.x + paddingX,
    y: entity.y + paddingY,
    width: Math.max(0, entity.width - paddingX * 2),
    height: Math.max(0, entity.height - paddingY * 2)
  };
}

function checkCollision(a, b, buffer) {
  buffer = buffer || 0;

  return (
    a.x - buffer < b.x + b.width &&
    a.x + a.width + buffer > b.x &&
    a.y - buffer < b.y + b.height &&
    a.y + a.height + buffer > b.y
  );
}

function clampToRiver(entity, padding) {
  padding = padding || 0;

  var minX = river.left + padding;
  var maxX = river.right - entity.width - padding;

  if (maxX <= minX) {
    entity.x = river.left + (river.right - river.left - entity.width) / 2;
    return;
  }

  if (entity.x < minX) {
    entity.x = minX;
  }

  if (entity.x > maxX) {
    entity.x = maxX;
  }
}

function getRiverSpawnX(entityWidth, padding) {
  padding = padding || 0;

  var minX = river.left + padding;
  var maxX = river.right - entityWidth - padding;

  if (maxX <= minX) {
    return river.left + (river.right - river.left - entityWidth) / 2;
  }

  return minX + Math.random() * (maxX - minX);
}
