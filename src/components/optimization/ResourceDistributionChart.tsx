import { Card } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface ResourceDistributionChartProps {
  distributionData: Array<{
    center: string;
    actual: number;
    optimal: number;
  }>;
}

export const ResourceDistributionChart = ({ distributionData }: ResourceDistributionChartProps) => {
  return (
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
  );
};