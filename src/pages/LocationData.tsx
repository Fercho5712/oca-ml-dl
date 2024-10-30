import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const distributionCenters = [
  { id: "cdmx", name: "Ciudad de México", location: "CDMX" },
  { id: "gdl", name: "Guadalajara", location: "Jalisco" },
  { id: "mty", name: "Monterrey", location: "Nuevo León" },
];

const cropTypes = [
  { id: "maiz", name: "Maíz" },
  { id: "trigo", name: "Trigo" },
  { id: "frijol", name: "Frijol" },
  { id: "aguacate", name: "Aguacate" },
];

const LocationData = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [cropType, setCropType] = useState("");
  const [center, setCenter] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se podría agregar la lógica para enviar los datos a un backend
    toast({
      title: "Datos guardados",
      description: "La información ha sido registrada exitosamente",
    });
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
              <label htmlFor="state" className="text-sm font-medium">
                Estado
              </label>
              <Input
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="Estado"
                required
              />
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
                {distributionCenters.map((center) => (
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