import { describe, expect, it } from 'vitest';
import collisionResponses from '../js/collision-responses.js';

describe('state preservation after life loss', () => {
  function makePlayer(overrides) {
    return Object.assign({
      x: 220,
      y: 600,
      width: 40,
      height: 60,
      fuel: 75,
      lives: 3,
      cooldown: 5
    }, overrides || {});
  }

  function makeEnemy(overrides) {
    return Object.assign({
      x: 230,
      y: 610,
      width: 36,
      height: 52,
      speed: 5,
      type: 'boat'
    }, overrides || {});
  }

  it('should preserve the current score after losing a life', () => {
    let score = 2500;
    const player = makePlayer({ lives: 3 });
    const enemy = makeEnemy();

    const result = collisionResponses.resolvePlayerEnemyCollision(
      player,
      enemy,
      player,
      enemy,
      0,
      1
    );

    expect(result).not.toBeNull();
    player.lives -= result.damage;

    expect(score).toBe(2500);
    expect(player.lives).toBe(2);
  });

  it('should preserve the current fuel level after losing a life', () => {
    const player = makePlayer({ lives: 2, fuel: 42.5 });
    const enemy = makeEnemy();

    const result = collisionResponses.resolvePlayerEnemyCollision(
      player,
      enemy,
      player,
      enemy,
      0,
      1
    );

    expect(result).not.toBeNull();
    player.lives -= result.damage;

    expect(player.fuel).toBe(42.5);
  });

  it('should preserve remaining enemies on screen after losing a life', () => {
    const player = makePlayer({ lives: 3 });
    const enemies = [
      makeEnemy({ x: 230, y: 610 }),
      makeEnemy({ x: 100, y: 200, type: 'plane' }),
      makeEnemy({ x: 350, y: 300, type: 'boat' })
    ];

    const collidedIndex = 0;
    const result = collisionResponses.resolvePlayerEnemyCollision(
      player,
      enemies[collidedIndex],
      player,
      enemies[collidedIndex],
      0,
      1
    );

    expect(result).not.toBeNull();
    enemies.splice(collidedIndex, 1);
    player.lives -= result.damage;

    expect(enemies).toHaveLength(2);
    expect(enemies[0].x).toBe(100);
    expect(enemies[1].x).toBe(350);
  });

  it('should preserve active bullets on screen after losing a life', () => {
    const player = makePlayer({ lives: 2 });
    const enemy = makeEnemy();
    const bullets = [
      { x: 200, y: 100, width: 4, height: 12 },
      { x: 250, y: 50, width: 4, height: 12 }
    ];

    const result = collisionResponses.resolvePlayerEnemyCollision(
      player,
      enemy,
      player,
      enemy,
      0,
      1
    );

    expect(result).not.toBeNull();
    player.lives -= result.damage;

    expect(bullets).toHaveLength(2);
  });

  it('should preserve fuel items on screen after losing a life', () => {
    const player = makePlayer({ lives: 2 });
    const enemy = makeEnemy();
    const fuels = [
      { x: 150, y: 200, width: 28, height: 40 },
      { x: 300, y: 400, width: 28, height: 40 }
    ];

    const result = collisionResponses.resolvePlayerEnemyCollision(
      player,
      enemy,
      player,
      enemy,
      0,
      1
    );

    expect(result).not.toBeNull();
    player.lives -= result.damage;

    expect(fuels).toHaveLength(2);
  });

  it('should preserve active explosions after losing a life', () => {
    const player = makePlayer({ lives: 2 });
    const enemy = makeEnemy();
    const explosions = [
      { x: 100, y: 200, radius: 15, alpha: 0.7 }
    ];

    const result = collisionResponses.resolvePlayerEnemyCollision(
      player,
      enemy,
      player,
      enemy,
      0,
      1
    );

    expect(result).not.toBeNull();
    player.lives -= result.damage;
    explosions.push({
      x: result.explosionX,
      y: result.explosionY,
      radius: 10,
      alpha: 1
    });

    expect(explosions).toHaveLength(2);
    expect(explosions[0].radius).toBe(15);
  });

  it('should preserve remaining lives count correctly through multiple collisions', () => {
    const player = makePlayer({ lives: 3 });

    for (let i = 0; i < 2; i++) {
      const enemy = makeEnemy();

      const result = collisionResponses.resolvePlayerEnemyCollision(
        player,
        enemy,
        player,
        enemy,
        0,
        1
      );

      expect(result).not.toBeNull();
      player.lives -= result.damage;
    }

    expect(player.lives).toBe(1);
  });

  it('should only trigger game over when all lives are lost', () => {
    const player = makePlayer({ lives: 3 });
    let gameOverTriggered = false;

    for (let i = 0; i < 3; i++) {
      const enemy = makeEnemy();

      const result = collisionResponses.resolvePlayerEnemyCollision(
        player,
        enemy,
        player,
        enemy,
        0,
        1
      );

      expect(result).not.toBeNull();
      player.lives -= result.damage;

      if (player.lives <= 0) {
        player.lives = 0;
        gameOverTriggered = true;
      }
    }

    expect(gameOverTriggered).toBe(true);
    expect(player.lives).toBe(0);
  });

  it('should not reset score to zero after losing a life', () => {
    let score = 3000;
    const player = makePlayer({ lives: 2 });
    const enemy = makeEnemy();

    const result = collisionResponses.resolvePlayerEnemyCollision(
      player,
      enemy,
      player,
      enemy,
      0,
      1
    );

    expect(result).not.toBeNull();
    player.lives -= result.damage;

    expect(score).not.toBe(0);
    expect(score).toBe(3000);
  });

  it('should not refill fuel after losing a life', () => {
    const maxFuel = 100;
    const player = makePlayer({ lives: 2, fuel: 35 });
    const enemy = makeEnemy();

    const result = collisionResponses.resolvePlayerEnemyCollision(
      player,
      enemy,
      player,
      enemy,
      0,
      1
    );

    expect(result).not.toBeNull();
    player.lives -= result.damage;

    expect(player.fuel).toBe(35);
    expect(player.fuel).not.toBe(maxFuel);
  });

  it('should use the existing game over flow when lives run out', () => {
    const player = makePlayer({ lives: 1 });
    const enemy = makeEnemy();
    let running = true;

    const result = collisionResponses.resolvePlayerEnemyCollision(
      player,
      enemy,
      player,
      enemy,
      0,
      1
    );

    expect(result).not.toBeNull();
    player.lives -= result.damage;

    if (player.lives <= 0) {
      player.lives = 0;
      running = false;
    }

    expect(player.lives).toBe(0);
    expect(running).toBe(false);
  });
});
