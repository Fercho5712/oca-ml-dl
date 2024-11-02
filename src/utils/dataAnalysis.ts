interface AnalysisResult {
  cropHealthIndex: number;
  growthPrediction: string;
  recommendedActions: string[];
  efficiency: number;
}

export const analyzeData = (data: any[]): AnalysisResult => {
  // Simulación de análisis de datos
  const cropHealthIndex = Math.random() * (1 - 0.7) + 0.7; // Entre 0.7 y 1
  const efficiency = Math.random() * (100 - 80) + 80; // Entre 80% y 100%
  
  return {
    cropHealthIndex,
    growthPrediction: cropHealthIndex > 0.85 ? 'positivo' : 'neutral',
    recommendedActions: [
      'Optimizar horario de riego',
      'Monitorear nutrientes del suelo',
      'Revisar condiciones climáticas'
    ],
    efficiency
  };
};

export const generatePredictions = (data: any[]) => {
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
  const baseValue = 150;
  
  return months.map((month, index) => ({
    month,
    actual: baseValue + (Math.random() * 40 - 20),
    predicted: baseValue + (index * 5) + (Math.random() * 20 - 10)
  }));
};

export const calculateOptimization = (data: any[]) => {
  const resources = ['Almacén A', 'Almacén B', 'Ruta 1', 'Ruta 2', 'Centro Dist.'];
  
  return resources.map(resource => ({
    resource,
    actual: Math.floor(Math.random() * (90 - 65) + 65),
    optimal: Math.floor(Math.random() * (100 - 85) + 85)
  }));
};