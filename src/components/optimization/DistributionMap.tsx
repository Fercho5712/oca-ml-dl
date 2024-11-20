import { Suspense } from 'react';
import { Card } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { LocationData } from '@/types/locationTypes';
import 'leaflet/dist/leaflet.css';

const CENTER_COORDS: [number, number] = [4.5709, -74.2973];
const ZOOM_LEVEL = 5;

interface DistributionMapProps {
  locationData: LocationData[];
}

export const DistributionMap = ({ locationData }: DistributionMapProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Mapa de Distribución</h2>
      <div className="h-[400px] w-full rounded-lg overflow-hidden">
        <MapContainer 
          center={CENTER_COORDS as [number, number]}
          zoom={ZOOM_LEVEL}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {locationData.map((location, index) => (
            <Marker 
              key={index} 
              position={CENTER_COORDS}
            >
              <Popup>
                <div>
                  <h3 className="font-semibold">{location.distribution_center}</h3>
                  <p>{location.city}, {location.department}</p>
                  <p>Tipo de cultivo: {location.crop_type}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </Card>
  );
};