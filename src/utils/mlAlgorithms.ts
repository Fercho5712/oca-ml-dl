interface DataPoint {
  humidity: number;
  department: string;
  city: string;
  crop_type: string;
}

export const performLogisticRegression = (data: DataPoint[]) => {
  // Simulación de regresión logística para predicción de éxito del cultivo
  const predictions = data.map(point => {
    // Normalización simple de la humedad (0-100)
    const normalizedHumidity = point.humidity / 100;
    
    // Cálculo de probabilidad basado en humedad
    const probability = 1 / (1 + Math.exp(-normalizedHumidity * 2));
    
    return {
      location: `${point.city}, ${point.department}`,
      cropType: point.crop_type,
      successProbability: probability,
      recommendation: probability > 0.7 ? 'Óptimo' : probability > 0.5 ? 'Aceptable' : 'Riesgo'
    };
  });

  return predictions;
};

export const performKMeansClustering = (data: DataPoint[]) => {
  // Simulación de K-Means para agrupar ubicaciones similares
  const clusters = data.reduce((acc, point) => {
    const humidityLevel = point.humidity > 70 ? 'alto' : point.humidity > 40 ? 'medio' : 'bajo';
    
    if (!acc[humidityLevel]) {
      acc[humidityLevel] = [];
    }
    
    acc[humidityLevel].push({
      location: `${point.city}, ${point.department}`,
      humidity: point.humidity,
      cropType: point.crop_type
    });
    
    return acc;
  }, {} as Record<string, any[]>);

  return clusters;
};