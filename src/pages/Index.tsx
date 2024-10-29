import { LineChart, TrendingUp, Package, Truck } from 'lucide-react';
import DashboardCard from '@/components/DashboardCard';
import { ResponsiveContainer, LineChart as ReChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
  { name: 'Ene', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Abr', value: 800 },
  { name: 'May', value: 500 },
];

const Index = () => {
  return (
    <div className="p-8 ml-64">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Precisión de Predicción"
          value="94%"
          description="↑ 2% vs mes anterior"
          icon={<LineChart className="w-6 h-6" />}
        />
        <DashboardCard
          title="Eficiencia"
          value="87%"
          description="↑ 5% desde optimización"
          icon={<TrendingUp className="w-6 h-6" />}
        />
        <DashboardCard
          title="Inventario"
          value="12,453"
          description="Unidades en stock"
          icon={<Package className="w-6 h-6" />}
        />
        <DashboardCard
          title="Entregas"
          value="98%"
          description="A tiempo este mes"
          icon={<Truck className="w-6 h-6" />}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Tendencia de Demanda</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ReChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
              />
            </ReChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Index;