import { describe, it, expect } from 'vitest';
import { calculateMAE, calculateRMSE, validatePredictions } from '../../utils/predictionMetrics';

describe('Prediction Metrics Tests', () => {
  const testData = [
    { actual: 100, predicted: 90 },
    { actual: 150, predicted: 160 },
    { actual: 200, predicted: 180 }
  ];

  it('calculates MAE correctly', () => {
    const mae = calculateMAE(testData);
    expect(mae).toBeCloseTo(13.33, 2);
  });

  it('calculates RMSE correctly', () => {
    const rmse = calculateRMSE(testData);
    expect(rmse).toBeCloseTo(15.28, 2);
  });

  it('validates predictions with historical and new data', () => {
    const historicalData = [
      { actual: 100, predicted: 95 },
      { actual: 150, predicted: 155 }
    ];
    
    const newData = [
      { actual: 200, predicted: 190 },
      { actual: 250, predicted: 260 }
    ];

    const validation = validatePredictions(historicalData, newData);
    
    expect(validation.historical).toBeDefined();
    expect(validation.new).toBeDefined();
    expect(validation.comparison).toBeDefined();
    expect(typeof validation.comparison.maeChange).toBe('number');
    expect(typeof validation.comparison.rmseChange).toBe('number');
  });

  it('handles empty data arrays', () => {
    expect(calculateMAE([])).toBe(0);
    expect(calculateRMSE([])).toBe(0);
  });
});