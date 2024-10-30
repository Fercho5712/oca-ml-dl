import { LineChart, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { ResponsiveContainer, LineChart as ReChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const mockLocationPredictions = [
  { month: 'Ene', actual: 150, predicted: 145 },
  { month: 'Feb', actual: 165, predicted: 160 },
  { month: 'Mar', actual: 180, predicted: 175 },
  { month: 'Abr', actual: 168, predicted: 170 },
  { month: 'May', actual: 185, predicted: 180 },
];

const metrics = [
  {
    title: "Precisión de Predicción",
    value: "96.8%",
    trend: "↑ 1.2%",
    status: "success",
    icon: <CheckCircle className="w-6 h-6" />
  },
  {
    title: "Crecimiento Esperado",
    value: "+15%",
    trend: "↑ 2.3%",
    status: "success",
    icon: <TrendingUp className="w-6 h-6" />
  },
  {
    title: "Alertas de Capacidad",
    value: "2",
    trend: "+1 vs ayer",
    status: "warning",
    icon: <AlertTriangle className="w-6 h-6" />
  }
];

const Predictions = () => {
  return (
    <div className="p-8 ml-64">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Predicciones de Ubicaciones</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {metrics.map((metric, index) => (
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

      <div className="grid grid-cols-1 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Crecimiento de Ubicaciones</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ReChart data={mockLocationPredictions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="hsl(var(--primary))" 
                  name="Ubicaciones Actuales"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="hsl(var(--secondary))" 
                  name="Predicción"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </ReChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Predictions;