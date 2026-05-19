import { describe, expect, it } from 'vitest';
import collisionResponses from '../js/collision-responses.js';

describe('collision responses', () => {
  it('resolves a player-enemy hit with damage and explosion coordinates', () => {
    const player = { x: 100, y: 100, width: 40, height: 60 };
    const enemy = { x: 110, y: 110, width: 36, height: 52 };

    const result = collisionResponses.resolvePlayerEnemyCollision(
      player,
      enemy,
      player,
      enemy,
      0,
      1
    );

    expect(result).toEqual({
      damage: 1,
      explosionX: 120,
      explosionY: 130
    });
  });

  it('resolves a bullet-enemy hit with score gain', () => {
    const bullet = { x: 120, y: 90, width: 4, height: 12 };
    const enemy = { x: 110, y: 100, width: 36, height: 52 };

    const result = collisionResponses.resolveBulletEnemyCollision(
      bullet,
      enemy,
      bullet,
      enemy,
      0,
      100
    );

    expect(result).toEqual({
      scoreGain: 100,
      explosionX: 128,
      explosionY: 126
    });
  });

  it('caps fuel pickups at the maximum fuel value', () => {
    const player = { x: 100, y: 100, width: 40, height: 60, fuel: 90 };
    const fuel = { x: 110, y: 110, width: 28, height: 40 };

    const result = collisionResponses.resolvePlayerFuelCollision(
      player,
      fuel,
      player,
      fuel,
      0,
      30,
      100
    );

    expect(result).toEqual({
      fuelGain: 30,
      fuelAfter: 100,
      explosionX: 124,
      explosionY: 130
    });
  });
});