import { Settings, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useLocationData } from '../context/LocationDataContext';
import { useQuery } from '@tanstack/react-query';
import { useToast } from "@/components/ui/use-toast";

const Optimization = () => {
  const { locationData } = useLocationData();
  const { toast } = useToast();

  const { data: optimizationResults, isLoading, refetch } = useQuery({
    queryKey: ['optimization', locationData.length],
    queryFn: async () => {
      try {
        const response = await fetch('http://localhost:8000/api/locations/multi-agent-optimization/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Error al cargar los datos de optimización');
        }
        return response.json();
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar los datos de optimización",
          variant: "destructive",
        });
        throw error;
      }
    }
  });

  const metrics = [
    {
      title: "Eficiencia de Recursos",
      value: optimizationResults?.resource_allocation?.efficiency.toFixed(2) + '%' || '0%',
      trend: "↑ 2.5%",
      status: "success",
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      title: "Ahorro en Tiempo",
      value: optimizationResults?.route_optimization?.time_saved || '0%',
      trend: "↑ 0.8%",
      status: "success",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      title: "Reducción de Costos",
      value: optimizationResults?.route_optimization?.cost_reduction || '0%',
      trend: "-1 vs ayer",
      status: "warning",
      icon: <AlertTriangle className="w-6 h-6" />
    }
  ];

  const distributionData = optimizationResults?.resource_allocation?.distribution
    ? Object.entries(optimizationResults.resource_allocation.distribution).map(([center, value]) => ({
        center,
        actual: (value as number) * 100,
        optimal: Math.min((value as number) * 110, 100)
      }))
    : [];

  if (isLoading) {
    return (
      <div className="p-8 ml-64">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 ml-64">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Optimización de Rutas y Centros</h1>
        <Button variant="outline" onClick={() => refetch()} className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Actualizar
        </Button>
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
          <h2 className="text-xl font-semibold mb-4">Distribución de Recursos por Centro</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="center" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="actual" 
                  fill="hsl(var(--primary))" 
                  name="Distribución Actual (%)"
                />
                <Bar 
                  dataKey="optimal" 
                  fill="hsl(var(--secondary))" 
                  name="Nivel Óptimo (%)"
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