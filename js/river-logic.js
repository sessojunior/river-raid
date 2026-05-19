(function (root, factory) {
  var api = factory();

  root.fitRiverWidth = api.fitRiverWidth;
  root.getRiverCenterBounds = api.getRiverCenterBounds;
  root.generateRiverTargetCenter = api.generateRiverTargetCenter;
  root.stepValueTowards = api.stepValueTowards;
  root.clampRiverCenter = api.clampRiverCenter;
  root.calculateRiverBounds = api.calculateRiverBounds;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function clamp(value, min, max) {
    if (value < min) {
      return min;
    }

    if (value > max) {
      return max;
    }

    return value;
  }

  function fitRiverWidth(desiredWidth, canvasWidth, edgeMargin) {
    var maxWidth = Math.max(0, canvasWidth - edgeMargin * 2);

    return clamp(desiredWidth, 0, maxWidth);
  }

  function getRiverCenterBounds(canvasWidth, riverWidth, edgeMargin) {
    var halfWidth = riverWidth / 2;
    var minCenter = edgeMargin + halfWidth;
    var maxCenter = canvasWidth - edgeMargin - halfWidth;

    if (maxCenter < minCenter) {
      var centered = canvasWidth / 2;

      return {
        min: centered,
        max: centered
      };
    }

    return {
      min: minCenter,
      max: maxCenter
    };
  }

  function generateRiverTargetCenter(canvasWidth, riverWidth, edgeMargin, randomFn) {
    var bounds = getRiverCenterBounds(canvasWidth, riverWidth, edgeMargin);
    var random = typeof randomFn === 'function' ? randomFn : Math.random;

    if (bounds.min === bounds.max) {
      return bounds.min;
    }

    return bounds.min + random() * (bounds.max - bounds.min);
  }

  function stepValueTowards(currentValue, targetValue, ease) {
    return currentValue + (targetValue - currentValue) * ease;
  }

  function clampRiverCenter(centerX, riverWidth, canvasWidth, edgeMargin) {
    var bounds = getRiverCenterBounds(canvasWidth, riverWidth, edgeMargin);

    return clamp(centerX, bounds.min, bounds.max);
  }

  function calculateRiverBounds(centerX, riverWidth) {
    var width = Math.max(0, Math.round(riverWidth));
    var left = Math.round(centerX - width / 2);

    return {
      left: left,
      right: left + width,
      centerX: centerX,
      width: width
    };
  }

  return {
    fitRiverWidth: fitRiverWidth,
    getRiverCenterBounds: getRiverCenterBounds,
    generateRiverTargetCenter: generateRiverTargetCenter,
    stepValueTowards: stepValueTowards,
    clampRiverCenter: clampRiverCenter,
    calculateRiverBounds: calculateRiverBounds
  };
});