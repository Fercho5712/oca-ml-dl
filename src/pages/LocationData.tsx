import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useLocationData } from '../context/LocationDataContext';

const distributionCentersByDepartment = {
  "Amazonas": [{ id: "let", name: "Leticia", location: "Amazonas" }],
  "Antioquia": [
    { id: "med", name: "Medellín", location: "Antioquia" },
    { id: "rio", name: "Rionegro", location: "Antioquia" }
  ],
  "Atlántico": [{ id: "bar", name: "Barranquilla", location: "Atlántico" }],
  "Bolívar": [{ id: "car", name: "Cartagena", location: "Bolívar" }],
  "Boyacá": [{ id: "tun", name: "Tunja", location: "Boyacá" }],
  "Caldas": [{ id: "man", name: "Manizales", location: "Caldas" }],
  "Cundinamarca": [
    { id: "bog", name: "Bogotá", location: "Cundinamarca" },
    { id: "mos", name: "Mosquera", location: "Cundinamarca" },
    { id: "chia", name: "Chía", location: "Cundinamarca" }
  ],
  "Valle del Cauca": [
    { id: "cal", name: "Cali", location: "Valle del Cauca" },
    { id: "bue", name: "Buenaventura", location: "Valle del Cauca" }
  ],
};

const departments = [
  "Amazonas", "Antioquia", "Arauca", "Atlántico", "Bolívar", 
  "Boyacá", "Caldas", "Caquetá", "Casanare", "Cauca", 
  "Cesar", "Chocó", "Córdoba", "Cundinamarca", "Guainía", 
  "Guaviare", "Huila", "La Guajira", "Magdalena", "Meta", 
  "Nariño", "Norte de Santander", "Putumayo", "Quindío", 
  "Risaralda", "San Andrés y Providencia", "Santander", 
  "Sucre", "Tolima", "Valle del Cauca", "Vaupés", "Vichada"
];

const cropTypes = [
  { id: "cafe", name: "Café" },
  { id: "platano", name: "Plátano" },
  { id: "papa", name: "Papa" },
  { id: "yuca", name: "Yuca" },
  { id: "maiz", name: "Maíz" },
  { id: "arroz", name: "Arroz" },
];

const LocationData = () => {
  const { locationData, setLocationData, updateAnalytics } = useLocationData();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [department, setDepartment] = useState("");
  const [cropType, setCropType] = useState("");
  const [center, setCenter] = useState("");
  const { toast } = useToast();

  const availableCenters = department ? 
    (distributionCentersByDepartment[department as keyof typeof distributionCentersByDepartment] || []) 
    : [];

  const handleDepartmentChange = (newDepartment: string) => {
    if (typeof newDepartment === 'string') {
      setDepartment(newDepartment);
      setCenter(""); // Reset center when department changes
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!department || !city || !center || !cropType) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos requeridos",
      });
      return;
    }

    const newLocation = {
      department,
      city,
      distribution_center: center,
      crop_type: cropType,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setLocationData([...locationData, newLocation]);
    updateAnalytics();
    
    toast({
      title: "Datos guardados",
      description: "La información ha sido registrada exitosamente",
    });

    // Reset form
    setAddress("");
    setCity("");
    setDepartment("");
    setCropType("");
    setCenter("");
  };

  return (
    <div className="p-8 ml-64">
      <h1 className="text-3xl font-bold mb-8">Registro de Ubicación y Cultivo</h1>
      
      <Card className="max-w-2xl p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-medium">
              Dirección
            </label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Ingresa tu dirección"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="city" className="text-sm font-medium">
                Ciudad
              </label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ciudad"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="department" className="text-sm font-medium">
                Departamento
              </label>
              <Select value={department} onValueChange={handleDepartmentChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un departamento" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="center" className="text-sm font-medium">
              Centro de Distribución más Cercano
            </label>
            <Select value={center} onValueChange={setCenter}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un centro" />
              </SelectTrigger>
              <SelectContent>
                {availableCenters.map((center) => (
                  <SelectItem key={center.id} value={center.id}>
                    {center.name} - {center.location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="cropType" className="text-sm font-medium">
              Tipo de Cultivo
            </label>
            <Select value={cropType} onValueChange={setCropType}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un cultivo" />
              </SelectTrigger>
              <SelectContent>
                {cropTypes.map((crop) => (
                  <SelectItem key={crop.id} value={crop.id}>
                    {crop.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">
            Guardar Información
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LocationData;