import { describe, expect, it } from 'vitest';
import score from '../js/score.js';

describe('score helpers', () => {
  it('increments score by points', () => {
    expect(score.incrementScore(120, 80)).toBe(200);
  });

  it('advances score by fractional values', () => {
    expect(score.advanceScore(10.2, 0.1)).toBeCloseTo(10.3);
  });

  it('formats score values for the HUD', () => {
    expect(score.formatScoreValue(123.9)).toBe(123);
  });
});