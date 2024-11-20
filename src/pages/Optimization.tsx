import { Settings, TrendingUp, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useLocationData } from '../context/LocationDataContext';
import { useQuery } from '@tanstack/react-query';
import { useToast } from "@/components/ui/use-toast";
import { Suspense, lazy, useMemo, useState, useEffect } from 'react';
import type { MapContainerProps } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Lazy load the map components
const MapContainer = lazy(() => import('react-leaflet').then(module => ({ default: module.MapContainer })));
const TileLayer = lazy(() => import('react-leaflet').then(module => ({ default: module.TileLayer })));
const Marker = lazy(() => import('react-leaflet').then(module => ({ default: module.Marker })));
const Popup = lazy(() => import('react-leaflet').then(module => ({ default: module.Popup })));

// Fix for default marker icon in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Coordenadas del centro de Colombia
const CENTER_COORDS: [number, number] = [4.5709, -74.2973];
const ZOOM_LEVEL = 5;

const Optimization = () => {
  const { locationData } = useLocationData();
  const { toast } = useToast();
  const [mapKey, setMapKey] = useState(0);

  // Reset map when location data changes
  useEffect(() => {
    setMapKey(prev => prev + 1);
  }, [locationData]);

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<div>Cargando gráfico...</div>}>
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
        </Suspense>

        <Suspense fallback={
          <Card className="p-6">
            <div className="flex justify-center items-center h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          </Card>
        }>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Mapa de Distribución</h2>
            <div className="h-[400px] w-full rounded-lg overflow-hidden">
              <MapContainer 
                key={mapKey}
                center={CENTER_COORDS}
                zoom={ZOOM_LEVEL} 
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locationData.map((location, index) => (
                  <Marker 
                    key={index} 
                    position={CENTER_COORDS}
                  >
                    <Popup>
                      <div>
                        <h3 className="font-semibold">{location.distribution_center}</h3>
                        <p>{location.city}, {location.department}</p>
                        <p>Tipo de cultivo: {location.crop_type}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </Card>
        </Suspense>
      </div>
    </div>
  );
};

export default Optimization;