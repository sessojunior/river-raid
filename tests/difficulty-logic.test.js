import { describe, expect, it } from 'vitest';
import difficulty from '../js/difficulty-logic.js';

describe('difficulty logic', () => {
  it('reports difficulty progress from score', () => {
    expect(difficulty.getDifficultyProgress(0, 2500)).toBe(0);
    expect(difficulty.getDifficultyProgress(5000, 2500)).toBe(1);
  });

  it('increases enemy spawn chance with progress', () => {
    const low = difficulty.createDifficultyProfile(0, {});
    const high = difficulty.createDifficultyProfile(5000, {});

    expect(high.enemySpawnChance).toBeGreaterThan(low.enemySpawnChance);
  });

  it('narrows the river and reduces fuel spawns as difficulty rises', () => {
    const low = difficulty.createDifficultyProfile(0, {
      riverWidth: 220,
      riverWidthMin: 180
    });
    const high = difficulty.createDifficultyProfile(5000, {
      riverWidth: 220,
      riverWidthMin: 180
    });

    expect(high.riverWidth).toBeLessThan(low.riverWidth);
    expect(high.fuelSpawnChance).toBeLessThan(low.fuelSpawnChance);
  });

  it('grows enemy waves and tightens spacing', () => {
    const low = difficulty.createDifficultyProfile(0, {});
    const high = difficulty.createDifficultyProfile(5000, {});

    expect(high.enemyWaveSize).toBeGreaterThan(low.enemyWaveSize);
    expect(high.enemyWaveSpacing).toBeLessThan(low.enemyWaveSpacing);
  });

  it('shortens enemy spawn cooldown as difficulty rises', () => {
    const low = difficulty.createDifficultyProfile(0, {});
    const high = difficulty.createDifficultyProfile(5000, {});

    expect(high.enemySpawnCooldown).toBeLessThan(low.enemySpawnCooldown);
  });
});