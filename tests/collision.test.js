import { describe, expect, it } from 'vitest';
import collision from '../js/collision.js';

describe('collision helpers', () => {
  it('builds padded collision boxes', () => {
    const box = collision.getCollisionBox({ x: 10, y: 20, width: 40, height: 60 }, 4, 6);

    expect(box).toEqual({
      x: 14,
      y: 26,
      width: 32,
      height: 48
    });
  });

  it('detects overlap with buffer', () => {
    const a = { x: 10, y: 10, width: 20, height: 20 };
    const b = { x: 30, y: 10, width: 20, height: 20 };

    expect(collision.checkCollision(a, b, 1)).toBe(true);
    expect(collision.checkCollision(a, b, 0)).toBe(false);
  });

  it('clamps an entity inside river bounds', () => {
    const entity = { x: 40, width: 30 };

    collision.clampToRiver(entity, 10, { left: 100, right: 240 });

    expect(entity.x).toBe(110);
  });

  it('centers entities when the river is too narrow', () => {
    const entity = { x: 0, width: 80 };

    collision.clampToRiver(entity, 0, { left: 100, right: 150 });

    expect(entity.x).toBe(85);
  });

  it('returns a deterministic spawn x when using a custom random function', () => {
    const x = collision.getRiverSpawnX(40, 10, { left: 100, right: 200 }, () => 0.5);

    expect(x).toBe(130);
  });
});