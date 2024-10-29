import { TrendingUp, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const mockTrendData = [
  { month: 'Ene', efficiency: 82, costs: 75, quality: 88 },
  { month: 'Feb', efficiency: 85, costs: 78, quality: 87 },
  { month: 'Mar', efficiency: 86, costs: 82, quality: 89 },
  { month: 'Abr', efficiency: 89, costs: 85, quality: 91 },
  { month: 'May', efficiency: 87, costs: 83, quality: 90 },
];

const kpis = [
  {
    title: "Eficiencia Operativa",
    value: "87%",
    trend: "+2.3%",
    status: "positive",
    icon: <TrendingUp className="w-6 h-6" />
  },
  {
    title: "Costos Logísticos",
    value: "83%",
    trend: "-1.5%",
    status: "positive",
    icon: <ArrowDownRight className="w-6 h-6" />
  },
  {
    title: "Calidad de Servicio",
    value: "90%",
    trend: "+0.8%",
    status: "positive",
    icon: <Activity className="w-6 h-6" />
  }
];

const Analysis = () => {
  return (
    <div className="p-8 ml-64">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Análisis</h1>
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
          <h2 className="text-xl font-semibold mb-4">Tendencias de KPIs</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="efficiency" 
                  stroke="hsl(var(--primary))" 
                  name="Eficiencia"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="costs" 
                  stroke="hsl(var(--secondary))" 
                  name="Costos"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="quality" 
                  stroke="hsl(var(--accent))" 
                  name="Calidad"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analysis;