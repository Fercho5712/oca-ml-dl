export interface PredictionMetric {
  actual: number;
  predicted: number;
}

export const calculateMAE = (predictions: PredictionMetric[]): number => {
  if (predictions.length === 0) return 0;
  
  const sum = predictions.reduce((acc, curr) => {
    return acc + Math.abs(curr.actual - curr.predicted);
  }, 0);
  
  return sum / predictions.length;
};

export const calculateRMSE = (predictions: PredictionMetric[]): number => {
  if (predictions.length === 0) return 0;
  
  const sum = predictions.reduce((acc, curr) => {
    const diff = curr.actual - curr.predicted;
    return acc + (diff * diff);
  }, 0);
  
  return Math.sqrt(sum / predictions.length);
};

export const validatePredictions = (historicalData: PredictionMetric[], newData: PredictionMetric[]) => {
  const historicalMAE = calculateMAE(historicalData);
  const historicalRMSE = calculateRMSE(historicalData);
  
  const newMAE = calculateMAE(newData);
  const newRMSE = calculateRMSE(newData);
  
  return {
    historical: {
      mae: historicalMAE,
      rmse: historicalRMSE
    },
    new: {
      mae: newMAE,
      rmse: newRMSE
    },
    comparison: {
      maeChange: ((newMAE - historicalMAE) / historicalMAE) * 100,
      rmseChange: ((newRMSE - historicalRMSE) / historicalRMSE) * 100
    }
  };
};