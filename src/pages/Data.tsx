import { Database, RefreshCw, Filter, Download, Upload } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useLocationData } from '../context/LocationDataContext';
import { useNavigate } from 'react-router-dom';

const Data = () => {
  const { locationData, setLocationData, updateAnalytics } = useLocationData();
  const [filterText, setFilterText] = useState("");
  const [filteredData, setFilteredData] = useState(locationData);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = locationData.filter(item => 
      Object.values(item).some(value => 
        value.toString().toLowerCase().includes(filterText.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [filterText, locationData]);

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n');
        const headers = lines[0].split(',');
        
        const newData = lines.slice(1).map((line, index) => {
          const values = line.split(',');
          return {
            department: values[1] || '',
            city: values[2] || '',
            distribution_center: values[3] || '',
            crop_type: values[4] || '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
        });

        setLocationData([...locationData, ...newData]);
        updateAnalytics();

        toast({
          title: "Importación exitosa",
          description: "Los datos han sido importados y analizados correctamente",
        });

        navigate('/analysis');
      } catch (error) {
        toast({
          title: "Error en la importación",
          description: "El archivo no tiene el formato correcto",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  };

  const handleFilter = (text: string) => {
    setFilterText(text);
  };

  const handleExport = () => {
    const csvContent = [
      ['ID', 'Departamento', 'Ciudad', 'Centro de Distribución', 'Tipo de Cultivo', 'Última Actualización'],
      ...filteredData.map((row, index) => [
        index + 1,
        row.department,
        row.city,
        row.distribution_center,
        row.crop_type,
        row.created_at
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
    setFilterText("");
    setFilteredData(locationData);
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
          
          <label htmlFor="import-csv" className="cursor-pointer">
            <Button variant="outline" size="sm" asChild>
              <span>
                <Upload className="w-4 h-4 mr-2" />
                Importar
              </span>
            </Button>
          </label>
          <input
            id="import-csv"
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleImport}
          />
          
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
            {filteredData.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Database className="w-4 h-4 mr-2 text-primary" />
                    {row.department}
                  </div>
                </TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.distribution_center}</TableCell>
                <TableCell>{row.crop_type}</TableCell>
                <TableCell>{row.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Data;
