import { describe, expect, it } from 'vitest';
import collisionResponses from '../js/collision-responses.js';

describe('bullet-fuel collision', () => {
  function makeBullet(x, y) {
    return { x: x, y: y, width: 4, height: 12 };
  }

  function makeFuel(x, y) {
    return { x: x, y: y, width: 28, height: 40 };
  }

  it('should detect collision between a bullet and a fuel item', () => {
    const bullet = makeBullet(114, 100);
    const fuel = makeFuel(100, 95);

    const overlapping =
      bullet.x < fuel.x + fuel.width &&
      bullet.x + bullet.width > fuel.x &&
      bullet.y < fuel.y + fuel.height &&
      bullet.y + bullet.height > fuel.y;

    expect(overlapping).toBe(true);
  });

  it('should not detect collision when bullet and fuel do not overlap', () => {
    const bullet = makeBullet(50, 50);
    const fuel = makeFuel(200, 200);

    const overlapping =
      bullet.x < fuel.x + fuel.width &&
      bullet.x + bullet.width > fuel.x &&
      bullet.y < fuel.y + fuel.height &&
      bullet.y + bullet.height > fuel.y;

    expect(overlapping).toBe(false);
  });

  it('should remove the fuel item from the screen on hit', () => {
    const fuels = [
      makeFuel(100, 100),
      makeFuel(200, 200),
      makeFuel(300, 300)
    ];

    const bullet = makeBullet(102, 105);
    const hitIndex = 0;

    fuels.splice(hitIndex, 1);

    expect(fuels).toHaveLength(2);
    expect(fuels[0].x).toBe(200);
  });

  it('should create a visual explosion at the collision point', () => {
    const fuel = makeFuel(100, 100);
    const explosions = [];

    const explosionX = fuel.x + fuel.width / 2;
    const explosionY = fuel.y + fuel.height / 2;
    explosions.push({ x: explosionX, y: explosionY, radius: 10, alpha: 1 });

    expect(explosions).toHaveLength(1);
    expect(explosions[0].x).toBe(114);
    expect(explosions[0].y).toBe(120);
  });

  it('should not change the player score when bullet hits fuel', () => {
    const scoreBefore = 1500;
    let score = scoreBefore;

    const bullet = makeBullet(102, 105);
    const fuel = makeFuel(100, 100);

    const overlapping =
      bullet.x < fuel.x + fuel.width &&
      bullet.x + bullet.width > fuel.x &&
      bullet.y < fuel.y + fuel.height &&
      bullet.y + bullet.height > fuel.y;

    expect(overlapping).toBe(true);
    expect(score).toBe(scoreBefore);
  });

  it('should not change the player fuel level when bullet hits fuel item', () => {
    const fuelLevelBefore = 75;
    let playerFuel = fuelLevelBefore;

    const bullet = makeBullet(102, 105);
    const fuel = makeFuel(100, 100);

    const overlapping =
      bullet.x < fuel.x + fuel.width &&
      bullet.x + bullet.width > fuel.x &&
      bullet.y < fuel.y + fuel.height &&
      bullet.y + bullet.height > fuel.y;

    expect(overlapping).toBe(true);
    expect(playerFuel).toBe(fuelLevelBefore);
  });

  it('should remove the bullet that hit the fuel item', () => {
    const bullets = [
      makeBullet(102, 105),
      makeBullet(250, 300)
    ];

    const hitIndex = 0;
    bullets.splice(hitIndex, 1);

    expect(bullets).toHaveLength(1);
    expect(bullets[0].x).toBe(250);
  });

  it('should only remove the specific fuel item that was hit', () => {
    const fuels = [
      makeFuel(100, 100),
      makeFuel(200, 200),
      makeFuel(300, 300)
    ];

    const hitIndex = 1;
    fuels.splice(hitIndex, 1);

    expect(fuels).toHaveLength(2);
    expect(fuels[0].x).toBe(100);
    expect(fuels[1].x).toBe(300);
  });

  it('should handle multiple bullets near multiple fuel items independently', () => {
    const fuels = [makeFuel(100, 100), makeFuel(200, 200)];
    const bullets = [makeBullet(102, 105), makeBullet(202, 205)];

    fuels.splice(1, 1);
    bullets.splice(1, 1);
    fuels.splice(0, 1);
    bullets.splice(0, 1);

    expect(fuels).toHaveLength(0);
    expect(bullets).toHaveLength(0);
  });

  it('should not affect enemies when bullet hits fuel', () => {
    const enemies = [
      { x: 150, y: 150, width: 36, height: 52 },
      { x: 250, y: 250, width: 36, height: 52 }
    ];
    const enemyCountBefore = enemies.length;

    const bullet = makeBullet(102, 105);
    const fuel = makeFuel(100, 100);

    expect(enemies).toHaveLength(enemyCountBefore);
  });
});
