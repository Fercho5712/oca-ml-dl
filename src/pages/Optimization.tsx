import { Settings, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useEffect, useState } from 'react';
import { useLocationData } from '../context/LocationDataContext';

const Optimization = () => {
  const { locationData } = useLocationData();
  const [optimizationData, setOptimizationData] = useState([]);

  useEffect(() => {
    // Calculate optimization data based on locationData
    const data = locationData.map(location => ({
      resource: `${location.distribution_center} - ${location.city}`,
      actual: Math.floor(Math.random() * (90 - 65) + 65),
      optimal: Math.floor(Math.random() * (100 - 85) + 85)
    }));
    setOptimizationData(data);
  }, [locationData]);

  const metrics = [
    {
      title: "Eficiencia Global",
      value: "78%",
      trend: "↑ 2.5%",
      status: "success",
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      title: "Ahorro Potencial",
      value: "12.3%",
      trend: "↑ 0.8%",
      status: "success",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      title: "Puntos Críticos",
      value: "3",
      trend: "-1 vs ayer",
      status: "warning",
      icon: <AlertTriangle className="w-6 h-6" />
    }
  ];

  return (
    <div className="p-8 ml-64">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Optimización de Rutas y Centros</h1>
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
          <h2 className="text-xl font-semibold mb-4">Rendimiento de Rutas y Centros</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={optimizationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="resource" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="actual" 
                  fill="hsl(var(--primary))" 
                  name="Rendimiento Actual"
                />
                <Bar 
                  dataKey="optimal" 
                  fill="hsl(var(--secondary))" 
                  name="Nivel Óptimo"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Optimization;
