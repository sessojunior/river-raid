import { describe, expect, it } from 'vitest';
import spawn from '../js/spawn.js';

function sequence(values) {
  let index = 0;

  return function () {
    return values[index++];
  };
}

describe('spawn helpers', () => {
  it('creates an enemy spawn with predictable speed and type', () => {
    const enemy = spawn.createEnemySpawn({
      x: 120,
      y: -80,
      baseSpeed: 5,
      randomFn: sequence([0.25, 0.75])
    });

    expect(enemy).toEqual({
      x: 120,
      y: -80,
      width: 36,
      height: 52,
      speed: 5.5,
      type: 'plane'
    });
  });

  it('creates a spaced enemy wave', () => {
    const wave = spawn.createEnemyWave({
      x: 100,
      y: -80,
      count: 3,
      spacing: 20,
      baseSpeed: 5,
      speedVariance: 0,
      randomFn: sequence([0.1, 0.9, 0.2, 0.8, 0.3, 0.7])
    });

    expect(wave).toHaveLength(3);
    expect(wave.map(function (enemy) {
      return enemy.x;
    })).toEqual([80, 100, 120]);
    expect(wave.every(function (enemy) {
      return enemy.speed === 5;
    })).toBe(true);
  });

  it('creates a fuel spawn with defaults and overrides', () => {
    const fuel = spawn.createFuelSpawn({
      x: 90,
      y: -50,
      width: 30,
      height: 42,
      speed: 6
    });

    expect(fuel).toEqual({
      x: 90,
      y: -50,
      width: 30,
      height: 42,
      speed: 6
    });
  });
});