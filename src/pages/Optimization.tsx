import { Settings, TrendingUp, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLocationData } from '../context/LocationDataContext';
import { useQuery } from '@tanstack/react-query';
import { useToast } from "@/components/ui/use-toast";
import { Suspense, useMemo } from 'react';
import { MetricsCards } from '@/components/optimization/MetricsCards';
import { ResourceDistributionChart } from '@/components/optimization/ResourceDistributionChart';
import { DistributionMap } from '@/components/optimization/DistributionMap';

const Optimization = () => {
  const { locationData } = useLocationData();
  const { toast } = useToast();

  const { data: optimizationResults, isLoading, refetch } = useQuery({
    queryKey: ['optimization'],
    queryFn: async () => {
      const response = await fetch('/api/locations/multi-agent-optimization/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Error al cargar los datos de optimización');
      }
      return response.json();
    },
    staleTime: 30000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  });

  const metrics = useMemo(() => [
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
  ], [optimizationResults]);

  const distributionData = useMemo(() => 
    optimizationResults?.resource_allocation?.distribution
      ? Object.entries(optimizationResults.resource_allocation.distribution).map(([center, value]) => ({
          center,
          actual: (value as number) * 100,
          optimal: Math.min((value as number) * 110, 100)
        }))
      : [],
    [optimizationResults]
  );

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

      <MetricsCards metrics={metrics} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<div>Cargando gráfico...</div>}>
          <ResourceDistributionChart distributionData={distributionData} />
        </Suspense>

        <Suspense fallback={<div>Cargando mapa...</div>}>
          <DistributionMap locationData={locationData} />
        </Suspense>
      </div>
    </div>
  );
};

export default Optimization;