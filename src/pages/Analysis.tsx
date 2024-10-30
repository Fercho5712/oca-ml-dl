import { TrendingUp, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

const mockLocationData = [
  { department: 'Cundinamarca', locations: 45, cropTypes: 4, efficiency: 88 },
  { department: 'Antioquia', locations: 38, cropTypes: 3, efficiency: 85 },
  { department: 'Valle del Cauca', locations: 32, cropTypes: 5, efficiency: 92 },
  { department: 'Atlántico', locations: 25, cropTypes: 3, efficiency: 87 },
  { department: 'Santander', locations: 28, cropTypes: 4, efficiency: 86 },
];

const kpis = [
  {
    title: "Total Ubicaciones",
    value: "168",
    trend: "+12%",
    status: "positive",
    icon: <TrendingUp className="w-6 h-6" />
  },
  {
    title: "Eficiencia Promedio",
    value: "87.6%",
    trend: "+2.3%",
    status: "positive",
    icon: <ArrowUpRight className="w-6 h-6" />
  },
  {
    title: "Tipos de Cultivo",
    value: "6",
    trend: "+1",
    status: "positive",
    icon: <Activity className="w-6 h-6" />
  }
];

const Analysis = () => {
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