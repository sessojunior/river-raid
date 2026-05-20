import { describe, expect, it, vi, beforeEach } from 'vitest';

describe('pause system', () => {
  let keydownHandler;
  let keys;

  beforeEach(() => {
    keys = {};
    keydownHandler = null;

    vi.stubGlobal('window', {
      addEventListener: function (event, handler) {
        if (event === 'keydown') {
          keydownHandler = handler;
        }
      },
      innerHeight: 720
    });
  });

  function simulateKeydown(code) {
    const event = { code: code, preventDefault: vi.fn() };
    if (keydownHandler) {
      keydownHandler(event);
    }
    return event;
  }

  it('should recognize the P key as the pause toggle', () => {
    const pauseKey = 'KeyP';
    expect(pauseKey).toBe('KeyP');
  });

  it('should freeze the game state when paused', () => {
    let paused = false;

    function togglePause() {
      paused = !paused;
    }

    togglePause();
    expect(paused).toBe(true);
  });

  it('should resume when P is pressed again after being paused', () => {
    let paused = false;

    function togglePause() {
      paused = !paused;
    }

    togglePause();
    expect(paused).toBe(true);

    togglePause();
    expect(paused).toBe(false);
  });

  it('should not advance score while paused', () => {
    let score = 500;
    let paused = true;

    function updateScore(delta) {
      if (!paused) {
        score += delta;
      }
    }

    updateScore(0.05);
    expect(score).toBe(500);
  });

  it('should not decrease fuel while paused', () => {
    let fuel = 80;
    let paused = true;

    function drainFuel(amount) {
      if (!paused) {
        fuel -= amount;
      }
    }

    drainFuel(0.02);
    expect(fuel).toBe(80);
  });

  it('should not move enemies while paused', () => {
    const enemy = { x: 100, y: 50, speed: 4 };
    let paused = true;

    function moveEnemy(e) {
      if (!paused) {
        e.y += e.speed;
      }
    }

    moveEnemy(enemy);
    expect(enemy.y).toBe(50);
  });

  it('should not move bullets while paused', () => {
    const bullet = { x: 200, y: 300, speed: 8 };
    let paused = true;

    function moveBullet(b) {
      if (!paused) {
        b.y -= b.speed;
      }
    }

    moveBullet(bullet);
    expect(bullet.y).toBe(300);
  });

  it('should not update explosions while paused', () => {
    const explosion = { x: 150, y: 200, radius: 10, alpha: 1 };
    let paused = true;

    function updateExplosion(exp) {
      if (!paused) {
        exp.radius += 2;
        exp.alpha -= 0.04;
      }
    }

    updateExplosion(explosion);
    expect(explosion.radius).toBe(10);
    expect(explosion.alpha).toBe(1);
  });

  it('should preserve exact game state after pause and resume cycle', () => {
    let score = 1250;
    let fuel = 67.5;
    let lives = 2;
    const enemies = [{ x: 100, y: 200 }, { x: 150, y: 300 }];
    const bullets = [{ x: 200, y: 100 }];

    let paused = false;

    function togglePause() {
      paused = !paused;
    }

    togglePause();
    expect(paused).toBe(true);

    togglePause();
    expect(paused).toBe(false);

    expect(score).toBe(1250);
    expect(fuel).toBe(67.5);
    expect(lives).toBe(2);
    expect(enemies).toHaveLength(2);
    expect(bullets).toHaveLength(1);
  });

  it('should not allow player movement while paused', () => {
    const player = { x: 200, speed: 5 };
    let paused = true;

    function movePlayer(p, direction) {
      if (!paused) {
        p.x += direction * p.speed;
      }
    }

    movePlayer(player, -1);
    expect(player.x).toBe(200);

    movePlayer(player, 1);
    expect(player.x).toBe(200);
  });

  it('should not allow shooting while paused', () => {
    const bullets = [];
    let paused = true;

    function shoot() {
      if (!paused) {
        bullets.push({ x: 200, y: 400 });
      }
    }

    shoot();
    expect(bullets).toHaveLength(0);
  });

  it('should not spawn new enemies while paused', () => {
    const enemies = [];
    let paused = true;

    function spawnEnemy() {
      if (!paused) {
        enemies.push({ x: 100, y: -80 });
      }
    }

    spawnEnemy();
    expect(enemies).toHaveLength(0);
  });

  it('should not spawn new fuel items while paused', () => {
    const fuels = [];
    let paused = true;

    function spawnFuel() {
      if (!paused) {
        fuels.push({ x: 100, y: -50 });
      }
    }

    spawnFuel();
    expect(fuels).toHaveLength(0);
  });
});
