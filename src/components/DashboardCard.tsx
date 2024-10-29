import { Card } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
}

const DashboardCard = ({ title, value, description, icon }: DashboardCardProps) => {
  return (
    <Card className="card-dashboard">
      <div className="flex items-start justify-between">
        <div>
          <p className="stat-label">{title}</p>
          <h3 className="stat-value mt-2">{value}</h3>
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
        </div>
        {icon && <div className="text-primary">{icon}</div>}
      </div>
    </Card>
  );
};

export default DashboardCard;