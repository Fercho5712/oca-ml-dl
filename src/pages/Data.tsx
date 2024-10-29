import { Database, RefreshCw, Filter, Download } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const mockTableData = [
  { id: 1, source: 'ERP System', lastUpdate: '2024-02-15', status: 'Activo', records: '12,453' },
  { id: 2, source: 'WMS', lastUpdate: '2024-02-15', status: 'Activo', records: '8,234' },
  { id: 3, source: 'TMS', lastUpdate: '2024-02-14', status: 'En Pausa', records: '5,678' },
  { id: 4, source: 'CRM', lastUpdate: '2024-02-15', status: 'Activo', records: '15,789' },
  { id: 5, source: 'IoT Sensors', lastUpdate: '2024-02-15', status: 'Activo', records: '45,123' },
];

const Data = () => {
  return (
    <div className="p-8 ml-64">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Datos</h1>
        <div className="flex gap-4">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtrar
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualizar
          </Button>
        </div>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Fuentes de Datos</h2>
          <p className="text-sm text-gray-500 mt-1">
            Estado actual de las conexiones y última actualización de datos
          </p>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fuente</TableHead>
              <TableHead>Última Actualización</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Registros</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTableData.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Database className="w-4 h-4 mr-2 text-primary" />
                    {row.source}
                  </div>
                </TableCell>
                <TableCell>{row.lastUpdate}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    row.status === 'Activo' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {row.status}
                  </span>
                </TableCell>
                <TableCell>{row.records}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Data;