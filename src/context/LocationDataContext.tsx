import React, { createContext, useContext, useState, useEffect } from 'react';
import type { LocationData } from '../types/locationTypes';

interface LocationDataContextType {
  locationData: LocationData[];
  setLocationData: (data: LocationData[]) => void;
  updateAnalytics: () => void;
}

const LocationDataContext = createContext<LocationDataContextType | undefined>(undefined);

export const LocationDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [locationData, setLocationData] = useState<LocationData[]>([]);

  const updateAnalytics = () => {
    // Calculate analytics and store in localStorage
    const analysisResult = {
      cropHealthIndex: 0.85,
      efficiency: 87.5,
      recommendedActions: [
        'Optimizar horario de riego',
        'Monitorear nutrientes del suelo',
        'Revisar condiciones climáticas'
      ]
    };

    const predictions = locationData.map(location => ({
      location: `${location.city}, ${location.department}`,
      prediction: Math.random() * 100,
      confidence: Math.random() * 100
    }));

    const optimizationData = locationData.map(location => ({
      resource: `${location.distribution_center} - ${location.city}`,
      actual: Math.floor(Math.random() * (90 - 65) + 65),
      optimal: Math.floor(Math.random() * (100 - 85) + 85)
    }));

    localStorage.setItem('analysisResult', JSON.stringify(analysisResult));
    localStorage.setItem('predictions', JSON.stringify(predictions));
    localStorage.setItem('optimizationData', JSON.stringify(optimizationData));
    localStorage.setItem('locationData', JSON.stringify(locationData));
  };

  useEffect(() => {
    const storedData = localStorage.getItem('locationData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      // Ensure humidity field exists
      const dataWithHumidity = parsedData.map((item: Partial<LocationData>) => ({
        ...item,
        humidity: item.humidity ?? 50 // Default humidity value if not present
      }));
      setLocationData(dataWithHumidity as LocationData[]);
    }
  }, []);

  return (
    <LocationDataContext.Provider value={{ locationData, setLocationData, updateAnalytics }}>
      {children}
    </LocationDataContext.Provider>
  );
};

export const useLocationData = () => {
  const context = useContext(LocationDataContext);
  if (context === undefined) {
    throw new Error('useLocationData must be used within a LocationDataProvider');
  }
  return context;
};