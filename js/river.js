var river = {
  centerX: canvas.width / 2,
  targetCenterX: canvas.width / 2,
  width: 0,
  targetWidth: 0,
  left: 0,
  right: 0,

  syncBounds: function () {
    var bounds = calculateRiverBounds(this.centerX, this.width);

    this.left = bounds.left;
    this.right = bounds.right;
  },

  reset: function () {
    this.width = fitRiverWidth(GAME.riverWidth, canvas.width, GAME.riverEdgeMargin);
    this.targetWidth = this.width;
    this.centerX = canvas.width / 2;
    this.targetCenterX = this.centerX;
    this.syncBounds();
  },

  syncToCanvas: function () {
    this.width = fitRiverWidth(this.width || GAME.riverWidth, canvas.width, GAME.riverEdgeMargin);
    this.targetWidth = fitRiverWidth(this.targetWidth || this.width, canvas.width, GAME.riverEdgeMargin);
    this.centerX = clampRiverCenter(this.centerX, this.width, canvas.width, GAME.riverEdgeMargin);
    this.targetCenterX = clampRiverCenter(this.targetCenterX, this.targetWidth, canvas.width, GAME.riverEdgeMargin);
    this.syncBounds();
  },

  update: function () {
    var difficulty = createDifficultyProfile(score, GAME);

    this.targetWidth = fitRiverWidth(difficulty.riverWidth, canvas.width, GAME.riverEdgeMargin);

    if (Math.random() < difficulty.riverShiftChance) {
      this.targetCenterX = generateRiverTargetCenter(canvas.width, this.targetWidth, GAME.riverEdgeMargin, Math.random);
    }

    this.width = stepValueTowards(this.width, this.targetWidth, GAME.riverWidthEase);
    this.centerX = stepValueTowards(this.centerX, this.targetCenterX, GAME.riverEase);

    this.width = fitRiverWidth(this.width, canvas.width, GAME.riverEdgeMargin);
    this.centerX = clampRiverCenter(this.centerX, this.width, canvas.width, GAME.riverEdgeMargin);
    this.syncBounds();
  },

  draw: function () {
    ctx.fillStyle = '#145214';
    ctx.fillRect(0, 0, this.left, canvas.height);
    ctx.fillRect(this.right, 0, canvas.width - this.right, canvas.height);

    ctx.fillStyle = '#0047ab';
    ctx.fillRect(this.left, 0, this.right - this.left, canvas.height);

    ctx.fillStyle = '#3a7a3a';
    ctx.fillRect(this.left - 5, 0, 5, canvas.height);
    ctx.fillRect(this.right, 0, 5, canvas.height);
  }
};

river.reset();
