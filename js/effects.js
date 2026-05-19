var explosions = [];

function createExplosion(x, y) {
  explosions.push({
    x: x,
    y: y,
    radius: 10,
    alpha: 1
  });
}

function updateExplosions() {
  for (var i = explosions.length - 1; i >= 0; i--) {
    var exp = explosions[i];

    exp.radius += 2;
    exp.alpha -= 0.04;

    if (exp.alpha <= 0) {
      explosions.splice(i, 1);
    }
  }
}

function drawExplosions() {
  explosions.forEach(function (exp) {
    ctx.save();
    ctx.globalAlpha = exp.alpha;

    ctx.beginPath();
    ctx.arc(exp.x, exp.y, exp.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#ff8800';
    ctx.fill();

    ctx.restore();
  });
}
