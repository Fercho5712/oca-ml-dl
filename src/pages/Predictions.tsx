import { LineChart, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { ResponsiveContainer, LineChart as ReChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const mockData = [
  { month: 'Ene', actual: 4200, predicted: 4100 },
  { month: 'Feb', actual: 3800, predicted: 3900 },
  { month: 'Mar', actual: 4600, predicted: 4500 },
  { month: 'Abr', actual: 5100, predicted: 5000 },
  { month: 'May', actual: 4800, predicted: 4900 },
];

const metrics = [
  {
    title: "Precisión del Modelo",
    value: "96.8%",
    trend: "↑ 1.2%",
    status: "success",
    icon: <CheckCircle className="w-6 h-6" />
  },
  {
    title: "Error Medio",
    value: "3.2%",
    trend: "↓ 0.8%",
    status: "success",
    icon: <TrendingUp className="w-6 h-6" />
  },
  {
    title: "Alertas Activas",
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
        <h1 className="text-3xl font-bold">Predicciones</h1>
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
          <h2 className="text-xl font-semibold mb-4">Predicción vs Realidad</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ReChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="hsl(var(--primary))" 
                  name="Valor Real"
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