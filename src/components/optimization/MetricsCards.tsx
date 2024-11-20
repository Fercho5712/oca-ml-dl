import { Settings, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card } from "@/components/ui/card";

interface MetricsCardsProps {
  metrics: Array<{
    title: string;
    value: string;
    trend: string;
    status: string;
    icon: JSX.Element;
  }>;
}

export const MetricsCards = ({ metrics }: MetricsCardsProps) => {
  return (
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
  );
};