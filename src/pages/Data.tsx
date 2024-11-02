import { Database, RefreshCw, Filter, Download } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const mockLocationData = [
  { id: 1, department: 'Cundinamarca', city: 'Bogotá', center: 'CD Bogotá', cropType: 'Café', lastUpdate: '2024-02-15' },
  { id: 2, department: 'Antioquia', city: 'Medellín', center: 'CD Medellín', cropType: 'Plátano', lastUpdate: '2024-02-15' },
  { id: 3, department: 'Valle del Cauca', city: 'Cali', center: 'CD Cali', cropType: 'Caña', lastUpdate: '2024-02-14' },
  { id: 4, department: 'Atlántico', city: 'Barranquilla', center: 'CD Barranquilla', cropType: 'Yuca', lastUpdate: '2024-02-15' },
  { id: 5, department: 'Santander', city: 'Bucaramanga', center: 'CD Bucaramanga', cropType: 'Café', lastUpdate: '2024-02-15' },
];

const Data = () => {
  const [filterText, setFilterText] = useState("");
  const [data, setData] = useState(mockLocationData);
  const { toast } = useToast();

  const handleFilter = (text: string) => {
    setFilterText(text);
    const filtered = mockLocationData.filter(item => 
      Object.values(item).some(value => 
        value.toString().toLowerCase().includes(text.toLowerCase())
      )
    );
    setData(filtered);
  };

  const handleExport = () => {
    const csvContent = [
      ['ID', 'Departamento', 'Ciudad', 'Centro de Distribución', 'Tipo de Cultivo', 'Última Actualización'],
      ...data.map(row => [
        row.id,
        row.department,
        row.city,
        row.center,
        row.cropType,
        row.lastUpdate
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'ubicaciones.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Exportación exitosa",
      description: "Los datos han sido exportados en formato CSV",
    });
  };

  const handleRefresh = () => {
    setData(mockLocationData);
    setFilterText("");
    toast({
      title: "Datos actualizados",
      description: "La tabla ha sido actualizada con éxito",
    });
  };

  return (
    <div className="p-8 ml-64">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Datos de Ubicaciones</h1>
        <div className="flex gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtrar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filtrar Datos</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <Input
                  placeholder="Buscar en todos los campos..."
                  value={filterText}
                  onChange={(e) => handleFilter(e.target.value)}
                />
              </div>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          
          <Button size="sm" onClick={handleRefresh}>
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
            {data.map((row) => (
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