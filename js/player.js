var player = {
  x: canvas.width / 2 - 20,
  y: canvas.height - GAME.playerBottomOffset,
  width: 40,
  height: 60,
  speed: GAME.playerSpeed,
  fuel: GAME.maxFuel,
  lives: GAME.initialLives,
  cooldown: 0,

  reset: function () {
    this.x = canvas.width / 2 - this.width / 2;
    this.y = canvas.height - GAME.playerBottomOffset;
    this.fuel = GAME.maxFuel;
    this.lives = GAME.initialLives;
    this.cooldown = 0;
    clampToRiver(this, GAME.playerMargin);
  },

  syncToCanvas: function () {
    this.y = canvas.height - GAME.playerBottomOffset;
    clampToRiver(this, GAME.playerMargin);
  },

  draw: function () {
    ctx.drawImage(sprites.player, this.x, this.y, this.width, this.height);
  },

  update: function () {
    if (keys.ArrowLeft) {
      this.x -= this.speed;
    }

    if (keys.ArrowRight) {
      this.x += this.speed;
    }

    clampToRiver(this, GAME.playerMargin);

    if (keys.Space && this.cooldown <= 0) {
      shoot();
      this.cooldown = GAME.bulletCooldown;
    }

    if (this.cooldown > 0) {
      this.cooldown--;
    }

    this.fuel = Math.max(0, this.fuel - 0.02);

    if (this.fuel <= 0) {
      this.fuel = 0;
      gameOver();
    }
  }
};
