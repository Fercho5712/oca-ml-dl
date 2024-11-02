import { TrendingUp, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { useEffect, useState } from 'react';

const Analysis = () => {
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  useEffect(() => {
    const storedAnalysis = localStorage.getItem('analysisResult');
    if (storedAnalysis) {
      setAnalysisResult(JSON.parse(storedAnalysis));
    }
  }, []);

  const kpis = analysisResult ? [
    {
      title: "Índice de Salud",
      value: `${(analysisResult.cropHealthIndex * 100).toFixed(1)}%`,
      trend: "+2.3%",
      status: "positive",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      title: "Eficiencia",
      value: `${analysisResult.efficiency.toFixed(1)}%`,
      trend: "+1.5%",
      status: "positive",
      icon: <ArrowUpRight className="w-6 h-6" />
    },
    {
      title: "Acciones Recomendadas",
      value: analysisResult.recommendedActions.length.toString(),
      trend: "Nuevas",
      status: "positive",
      icon: <Activity className="w-6 h-6" />
    }
  ] : [];

  return (
    <div className="p-8 ml-64">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Análisis de Ubicaciones</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {kpis.map((kpi, index) => (
          <Card key={index} className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{kpi.title}</p>
                <h3 className="text-2xl font-semibold mt-1">{kpi.value}</h3>
                <p className={`text-sm mt-1 ${
                  kpi.status === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {kpi.trend}
                </p>
              </div>
              <div className={`${
                kpi.status === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {kpi.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Distribución por Departamento</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockLocationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="locations" name="Ubicaciones" fill="hsl(var(--primary))" />
                <Bar dataKey="cropTypes" name="Tipos de Cultivo" fill="hsl(var(--secondary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analysis;
