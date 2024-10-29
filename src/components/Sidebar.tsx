import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, LineChart, Settings, Database, TrendingUp } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/predictions', icon: LineChart, label: 'Predicciones' },
    { path: '/optimization', icon: Settings, label: 'Optimización' },
    { path: '/analysis', icon: TrendingUp, label: 'Análisis' },
    { path: '/data', icon: Database, label: 'Datos' },
  ];

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 fixed left-0 top-0">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-primary">Supply Chain ML</h2>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 ${
                isActive ? 'bg-primary/5 text-primary border-r-2 border-primary' : ''
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;