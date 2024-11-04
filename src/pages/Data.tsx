import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useLocationData } from '../context/LocationDataContext';
import { useNavigate } from 'react-router-dom';
import { Database, RefreshCw } from 'lucide-react';

const Data = () => {
  const { locationData, setLocationData, updateAnalytics } = useLocationData();
  const [filterText, setFilterText] = useState("");
  const [filteredData, setFilteredData] = useState(locationData);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Update filtered data when locationData changes
  useEffect(() => {
    handleFilter(filterText);
  }, [locationData]);

  useEffect(() => {
    const filtered = locationData.filter(item => {
      if (!item) return false;
      return Object.entries(item).some(([key, value]) => {
        if (value === null || value === undefined) return false;
        const stringValue = String(value).toLowerCase();
        const searchTerm = filterText.toLowerCase();
        return stringValue.includes(searchTerm);
      });
    });
    setFilteredData(filtered);
  }, [filterText, locationData]);

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const text = e.target?.result;
        if (typeof text !== 'string') {
          throw new Error('Invalid file content');
        }

        const lines = text.split('\n');
        if (lines.length < 2) {
          throw new Error('File is empty or invalid');
        }

        const newData = lines.slice(1).map((line) => {
          const values = line.split(',');
          return {
            department: values[1] || '',
            city: values[2] || '',
            distribution_center: values[3] || '',
            crop_type: values[4] || '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
        }).filter(item => item.department && item.city); // Filter out invalid entries

        const updatedData = [...locationData, ...newData];
        setLocationData(updatedData);
        updateAnalytics();

        toast({
          title: "Importación exitosa",
          description: `Se importaron ${newData.length} registros correctamente`,
        });

        // Refresh the filtered data
        handleFilter(filterText);
      } catch (error) {
        toast({
          title: "Error en la importación",
          description: "Hubo un error al procesar el archivo",
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
        row.department || '',
        row.city || '',
        row.distribution_center || '',
        row.crop_type || '',
        row.created_at || ''
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
    updateAnalytics();
    toast({
      title: "Datos actualizados",
      description: "La tabla ha sido actualizada con éxito",
    });
  };

  return (
    <div className="p-8 ml-64">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Datos de Ubicación</h2>
          <div className="flex gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Importar CSV</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Importar datos desde CSV</DialogTitle>
                </DialogHeader>
                <Input
                  type="file"
                  accept=".csv"
                  onChange={handleImport}
                />
              </DialogContent>
            </Dialog>
            <Button variant="outline" onClick={handleExport}>
              Exportar CSV
            </Button>
            <Button variant="outline" onClick={handleRefresh} className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Actualizar
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <Input
            placeholder="Filtrar datos..."
            value={filterText}
            onChange={(e) => handleFilter(e.target.value)}
            className="max-w-sm"
          />
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