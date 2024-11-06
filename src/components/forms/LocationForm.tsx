import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useLocationData } from '../../context/LocationDataContext';
import { departments, cropTypes, distributionCentersByDepartment } from './locationConstants';

export const LocationForm = () => {
  const { locationData, setLocationData, updateAnalytics } = useLocationData();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [department, setDepartment] = useState("");
  const [cropType, setCropType] = useState("");
  const [center, setCenter] = useState("");
  const [humidity, setHumidity] = useState("");
  const [availableCenters, setAvailableCenters] = useState<Array<{id: string, name: string}>>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (department && distributionCentersByDepartment[department]) {
      setAvailableCenters(distributionCentersByDepartment[department]);
      setCenter(""); // Reset center when department changes
    } else {
      setAvailableCenters([]);
    }
  }, [department]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!department || !city || !center || !cropType || !humidity) {
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
      humidity: parseFloat(humidity),
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
    setHumidity("");
  };

  return (
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
          <Select value={department} onValueChange={setDepartment}>
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
          Centro de Distribución
        </label>
        <Select value={center} onValueChange={setCenter}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un centro de distribución" />
          </SelectTrigger>
          <SelectContent>
            {availableCenters.map((center) => (
              <SelectItem key={center.id} value={center.id}>
                {center.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="humidity" className="text-sm font-medium">
          Humedad (%)
        </label>
        <Input
          id="humidity"
          type="number"
          min="0"
          max="100"
          step="0.1"
          value={humidity}
          onChange={(e) => setHumidity(e.target.value)}
          placeholder="Ingresa el porcentaje de humedad"
          required
        />
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
  );
};