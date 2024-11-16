import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useLocationData } from '../../context/LocationDataContext';
import { departments, cropTypes, distributionCentersByDepartment } from './locationConstants';
import { performLogisticRegression, performKMeansClustering } from '../../utils/mlAlgorithms';
import { Card } from "@/components/ui/card";

export const LocationForm = () => {
  const { locationData, setLocationData, updateAnalytics } = useLocationData();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [department, setDepartment] = useState("");
  const [cropType, setCropType] = useState("");
  const [center, setCenter] = useState("");
  const [humidity, setHumidity] = useState("");
  const [availableCenters, setAvailableCenters] = useState<Array<{id: string, name: string}>>([]);
  const [mlAnalysis, setMlAnalysis] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (department && distributionCentersByDepartment[department]) {
      setAvailableCenters(distributionCentersByDepartment[department]);
      setCenter("");
    } else {
      setAvailableCenters([]);
    }
  }, [department]);

  const performAnalysis = () => {
    if (locationData.length > 0) {
      const regressionResults = performLogisticRegression(locationData);
      const clusteringResults = performKMeansClustering(locationData);
      
      setMlAnalysis({
        regression: regressionResults,
        clustering: clusteringResults
      });
    }
  };

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
    performAnalysis();
    
    toast({
      title: "Datos guardados",
      description: "La información ha sido registrada y analizada exitosamente",
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
    <div className="space-y-8">
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

      {mlAnalysis && (
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Análisis de Regresión Logística</h3>
            <div className="space-y-4">
              {mlAnalysis.regression.map((result: any, index: number) => (
                <div key={index} className="p-4 border rounded">
                  <p className="font-medium">{result.location}</p>
                  <p>Cultivo: {result.cropType}</p>
                  <p>Probabilidad de éxito: {(result.successProbability * 100).toFixed(1)}%</p>
                  <p className="text-sm text-gray-600">Recomendación: {result.recommendation}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Análisis de Clusters (K-Means)</h3>
            <div className="space-y-4">
              {Object.entries(mlAnalysis.clustering).map(([cluster, locations]: [string, any]) => (
                <div key={cluster} className="p-4 border rounded">
                  <h4 className="font-medium capitalize mb-2">Grupo de Humedad {cluster}</h4>
                  <ul className="space-y-2">
                    {locations.map((loc: any, index: number) => (
                      <li key={index} className="text-sm">
                        {loc.location} - {loc.cropType} ({loc.humidity}% humedad)
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};