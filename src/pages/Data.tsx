import { Database, RefreshCw, Filter, Download } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const mockLocationData = [
  { id: 1, department: 'Cundinamarca', city: 'Bogotá', center: 'CD Bogotá', cropType: 'Café', lastUpdate: '2024-02-15' },
  { id: 2, department: 'Antioquia', city: 'Medellín', center: 'CD Medellín', cropType: 'Plátano', lastUpdate: '2024-02-15' },
  { id: 3, department: 'Valle del Cauca', city: 'Cali', center: 'CD Cali', cropType: 'Caña', lastUpdate: '2024-02-14' },
  { id: 4, department: 'Atlántico', city: 'Barranquilla', center: 'CD Barranquilla', cropType: 'Yuca', lastUpdate: '2024-02-15' },
  { id: 5, department: 'Santander', city: 'Bucaramanga', center: 'CD Bucaramanga', cropType: 'Café', lastUpdate: '2024-02-15' },
];

const Data = () => {
  return (
    <div className="p-8 ml-64">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Datos de Ubicaciones</h1>
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
          <h2 className="text-xl font-semibold">Registro de Ubicaciones</h2>
          <p className="text-sm text-gray-500 mt-1">
            Listado de ubicaciones registradas y sus detalles
          </p>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Departamento</TableHead>
              <TableHead>Ciudad</TableHead>
              <TableHead>Centro de Distribución</TableHead>
              <TableHead>Tipo de Cultivo</TableHead>
              <TableHead>Última Actualización</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockLocationData.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Database className="w-4 h-4 mr-2 text-primary" />
                    {row.department}
                  </div>
                </TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.center}</TableCell>
                <TableCell>{row.cropType}</TableCell>
                <TableCell>{row.lastUpdate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Data;