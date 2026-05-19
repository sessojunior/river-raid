(function (root, factory) {
  var api = factory();

  root.incrementScore = api.incrementScore;
  root.advanceScore = api.advanceScore;
  root.formatScoreValue = api.formatScoreValue;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function incrementScore(scoreValue, points) {
    return scoreValue + points;
  }

  function advanceScore(scoreValue, delta) {
    return scoreValue + delta;
  }

  function formatScoreValue(scoreValue) {
    return Math.floor(scoreValue);
  }

  return {
    incrementScore: incrementScore,
    advanceScore: advanceScore,
    formatScoreValue: formatScoreValue
  };
});