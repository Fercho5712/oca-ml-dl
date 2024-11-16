import { LineChart, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { ResponsiveContainer, LineChart as ReChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useEffect, useState } from 'react';
import { calculateMAE, calculateRMSE, validatePredictions, PredictionMetric } from '../utils/predictionMetrics';

const mockExportData = [
  { month: 'Ene', cafe: 250, banano: 180, aguacate: 120 },
  { month: 'Feb', cafe: 280, banano: 190, aguacate: 140 },
  { month: 'Mar', cafe: 300, banano: 200, aguacate: 160 },
  { month: 'Abr', cafe: 320, banano: 210, aguacate: 180 },
  { month: 'May', cafe: 340, banano: 220, aguacate: 200 },
];

// Datos de ejemplo para las métricas
const historicalPredictions: PredictionMetric[] = [
  { actual: 250, predicted: 245 },
  { actual: 280, predicted: 275 },
  { actual: 300, predicted: 310 },
];

const newPredictions: PredictionMetric[] = [
  { actual: 320, predicted: 315 },
  { actual: 340, predicted: 350 },
];

const Predictions = () => {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    const validationResults = validatePredictions(historicalPredictions, newPredictions);
    setMetrics(validationResults);
  }, []);

  const metricsCards = [
    {
      title: "Total Exportaciones",
      value: "2,450 Ton",
      trend: "↑ 15%",
      status: "success",
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      title: "Producto Principal",
      value: "Café",
      trend: "340 Ton",
      status: "success",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      title: "Alertas de Stock",
      value: "2",
      trend: "+1 vs mes anterior",
      status: "warning",
      icon: <AlertTriangle className="w-6 h-6" />
    }
  ];

  return (
    <div className="p-8 ml-64">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Predicciones de Exportaciones</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {metricsCards.map((metric, index) => (
          <Card key={index} className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{metric.title}</p>
                <h3 className="text-2xl font-semibold mt-1">{metric.value}</h3>
                <p className={`text-sm mt-1 ${
                  metric.status === 'success' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {metric.trend}
                </p>
              </div>
              <div className={`${
                metric.status === 'success' ? 'text-green-600' : 'text-yellow-600'
              }`}>
                {metric.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Métricas de Precisión</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Error Medio Absoluto (MAE)</p>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-lg font-medium">
                    Histórico: {metrics.historical.mae.toFixed(2)}
                  </span>
                  <span className="text-lg font-medium">
                    Nuevo: {metrics.new.mae.toFixed(2)}
                  </span>
                </div>
                <p className={`text-sm ${metrics.comparison.maeChange <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  Cambio: {metrics.comparison.maeChange.toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Error Cuadrático Medio (RMSE)</p>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-lg font-medium">
                    Histórico: {metrics.historical.rmse.toFixed(2)}
                  </span>
                  <span className="text-lg font-medium">
                    Nuevo: {metrics.new.rmse.toFixed(2)}
                  </span>
                </div>
                <p className={`text-sm ${metrics.comparison.rmseChange <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  Cambio: {metrics.comparison.rmseChange.toFixed(1)}%
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Tendencia de Exportaciones por Producto</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ReChart data={mockExportData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="cafe" 
                    name="Café"
                    stroke="#795548" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="banano" 
                    name="Banano"
                    stroke="#FFB74D" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="aguacate" 
                    name="Aguacate"
                    stroke="#66BB6A" 
                    strokeWidth={2}
                  />
                </ReChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Predictions;