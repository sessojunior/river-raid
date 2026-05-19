import { describe, expect, it } from 'vitest';
import riverLogic from '../js/river-logic.js';

describe('river logic', () => {
  it('clamps river width to available space', () => {
    expect(riverLogic.fitRiverWidth(300, 200, 20)).toBe(160);
  });

  it('centers river bounds when the canvas is too narrow', () => {
    expect(riverLogic.getRiverCenterBounds(150, 120, 20)).toEqual({
      min: 75,
      max: 75
    });
  });

  it('generates deterministic target centers', () => {
    const center = riverLogic.generateRiverTargetCenter(480, 220, 20, function () {
      return 0.5;
    });

    expect(center).toBe(240);
  });

  it('steps values toward the target', () => {
    expect(riverLogic.stepValueTowards(10, 30, 0.25)).toBe(15);
  });

  it('rounds river bounds to whole pixels', () => {
    expect(riverLogic.calculateRiverBounds(240.4, 220)).toEqual({
      left: 130,
      right: 350,
      centerX: 240.4,
      width: 220
    });
  });
});