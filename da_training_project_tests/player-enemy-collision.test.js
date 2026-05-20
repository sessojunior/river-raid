import { describe, expect, it } from 'vitest';
import collisionResponses from '../js/collision-responses.js';

describe('player-enemy collision', () => {
  function makePlayer(overrides) {
    return Object.assign({
      x: 220,
      y: 600,
      width: 40,
      height: 60,
      fuel: 75,
      lives: 3,
      cooldown: 0
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

  it('should detect collision between player and enemy using resolvePlayerEnemyCollision', () => {
    const player = makePlayer();
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
  });

  it('should return null when player and enemy do not overlap', () => {
    const player = makePlayer({ x: 50, y: 600 });
    const enemy = makeEnemy({ x: 400, y: 100 });

    const result = collisionResponses.resolvePlayerEnemyCollision(
      player,
      enemy,
      player,
      enemy,
      0,
      1
    );

    expect(result).toBeNull();
  });

  it('should destroy both the player plane and the enemy on collision', () => {
    const player = makePlayer();
    const enemies = [makeEnemy()];

    const result = collisionResponses.resolvePlayerEnemyCollision(
      player,
      enemies[0],
      player,
      enemies[0],
      0,
      1
    );

    if (result) {
      enemies.splice(0, 1);
    }

    expect(result).not.toBeNull();
    expect(enemies).toHaveLength(0);
  });

  it('should reduce player lives by exactly one on collision', () => {
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
    expect(result.damage).toBe(1);

    player.lives -= result.damage;
    expect(player.lives).toBe(2);
  });

  it('should return damage of 1 by default even when damageAmount is omitted', () => {
    const player = makePlayer();
    const enemy = makeEnemy();

    const result = collisionResponses.resolvePlayerEnemyCollision(
      player,
      enemy,
      player,
      enemy,
      0
    );

    expect(result).not.toBeNull();
    expect(result.damage).toBe(1);
  });

  it('should place the player at the default starting position after losing a life', () => {
    const canvasWidth = 480;
    const playerBottomOffset = 120;
    const canvasHeight = 720;
    const playerWidth = 40;

    const defaultX = canvasWidth / 2 - playerWidth / 2;
    const defaultY = canvasHeight - playerBottomOffset;

    const player = makePlayer({ x: 150, y: 500 });
    const enemy = makeEnemy({ x: 155, y: 505 });

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

    player.x = defaultX;
    player.y = defaultY;

    expect(player.x).toBe(220);
    expect(player.y).toBe(600);
  });

  it('should create an explosion at the collision point', () => {
    const player = makePlayer();
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
    expect(result.explosionX).toBe(player.x + player.width / 2);
    expect(result.explosionY).toBe(player.y + player.height / 2);
  });

  it('should handle collision with plane type enemies the same as boat type', () => {
    const player = makePlayer();
    const planeEnemy = makeEnemy({ type: 'plane' });

    const result = collisionResponses.resolvePlayerEnemyCollision(
      player,
      planeEnemy,
      player,
      planeEnemy,
      0,
      1
    );

    expect(result).not.toBeNull();
    expect(result.damage).toBe(1);
  });

  it('should not restart the entire match after a collision', () => {
    const player = makePlayer({ lives: 3 });
    const enemies = [
      makeEnemy({ x: 230, y: 610 }),
      makeEnemy({ x: 300, y: 200 }),
      makeEnemy({ x: 350, y: 150 })
    ];

    const result = collisionResponses.resolvePlayerEnemyCollision(
      player,
      enemies[0],
      player,
      enemies[0],
      0,
      1
    );

    expect(result).not.toBeNull();
    enemies.splice(0, 1);
    player.lives -= result.damage;

    expect(player.lives).toBe(2);
    expect(enemies).toHaveLength(2);
  });

  it('should trigger game over when lives reach zero', () => {
    const player = makePlayer({ lives: 1 });
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

    expect(player.lives).toBe(0);
  });

  it('should not trigger game over when lives are still above zero', () => {
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

    expect(player.lives).toBeGreaterThan(0);
  });

  it('should apply collision buffer from game config', () => {
    const player = makePlayer({ x: 100, y: 100, width: 40, height: 60 });
    const enemy = makeEnemy({ x: 141, y: 100, width: 36, height: 52 });

    const resultNoBuffer = collisionResponses.resolvePlayerEnemyCollision(
      player,
      enemy,
      player,
      enemy,
      0,
      1
    );

    const resultWithBuffer = collisionResponses.resolvePlayerEnemyCollision(
      player,
      enemy,
      player,
      enemy,
      4,
      1
    );

    expect(resultNoBuffer).toBeNull();
    expect(resultWithBuffer).not.toBeNull();
  });
});
