(function (root, factory) {
  var api = factory();

  root.getCollisionBox = api.getCollisionBox;
  root.checkCollision = api.checkCollision;
  root.clampToRiver = api.clampToRiver;
  root.getRiverSpawnX = api.getRiverSpawnX;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
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

  function resolveBounds(bounds) {
    if (bounds && typeof bounds.left === 'number' && typeof bounds.right === 'number') {
      return bounds;
    }

    if (typeof river !== 'undefined' && river) {
      return {
        left: river.left,
        right: river.right
      };
    }

    return {
      left: 0,
      right: 0
    };
  }

  function clampToRiver(entity, padding, bounds) {
    padding = typeof padding === 'number' ? padding : 0;
    bounds = resolveBounds(bounds);

    var minX = bounds.left + padding;
    var maxX = bounds.right - entity.width - padding;

    if (maxX <= minX) {
      entity.x = bounds.left + (bounds.right - bounds.left - entity.width) / 2;
      return entity;
    }

    if (entity.x < minX) {
      entity.x = minX;
    }

    if (entity.x > maxX) {
      entity.x = maxX;
    }

    return entity;
  }

  function getRiverSpawnX(entityWidth, padding, bounds, randomFn) {
    padding = typeof padding === 'number' ? padding : 0;
    bounds = resolveBounds(bounds);
    randomFn = typeof randomFn === 'function' ? randomFn : Math.random;

    var minX = bounds.left + padding;
    var maxX = bounds.right - entityWidth - padding;

    if (maxX <= minX) {
      return bounds.left + (bounds.right - bounds.left - entityWidth) / 2;
    }

    return minX + randomFn() * (maxX - minX);
  }

  return {
    getCollisionBox: getCollisionBox,
    checkCollision: checkCollision,
    clampToRiver: clampToRiver,
    getRiverSpawnX: getRiverSpawnX
  };
});