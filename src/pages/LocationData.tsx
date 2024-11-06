import { Card } from "@/components/ui/card";
import { LocationForm } from "@/components/forms/LocationForm";

const LocationData = () => {
  return (
    <div className="p-8 ml-64">
      <h1 className="text-3xl font-bold mb-8">Registro de Ubicación y Cultivo</h1>
      
      <Card className="max-w-2xl p-6">
        <LocationForm />
      </Card>
    </div>
  );
};

export default LocationData;