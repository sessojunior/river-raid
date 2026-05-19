var river = {
  left: 120,
  right: 360,
  targetLeft: 120,
  targetRight: 360,

  reset: function () {
    this.left = 120;
    this.right = 360;
    this.targetLeft = 120;
    this.targetRight = 360;
  },

  update: function () {
    if (Math.random() < GAME.riverShiftChance) {
      var width = GAME.riverWidth;
      var maxLeft = canvas.width - width - (GAME.riverEdgeMargin * 2);

      if (maxLeft <= 0) {
        this.targetLeft = (canvas.width - width) / 2;
      } else {
        this.targetLeft = Math.random() * maxLeft + GAME.riverEdgeMargin;
      }

      this.targetRight = this.targetLeft + width;
    }

    this.left += (this.targetLeft - this.left) * GAME.riverEase;
    this.right += (this.targetRight - this.right) * GAME.riverEase;
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
