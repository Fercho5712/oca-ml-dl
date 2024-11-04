import { LocationData } from "../types/locationTypes";

export const filterLocationData = (data: LocationData[], searchTerm: string) => {
  if (!data) return [];
  if (!searchTerm) return data;
  
  return data.filter(item => {
    if (!item) return false;
    return Object.entries(item).some(([_, value]) => {
      if (value === null || value === undefined) return false;
      return String(value).toLowerCase().includes(searchTerm.toLowerCase());
    });
  });
};

export const parseCSVData = (text: string): LocationData[] => {
  const lines = text.split('\n');
  if (lines.length < 2) {
    throw new Error('File is empty or invalid');
  }

  return lines.slice(1)
    .map(line => {
      const values = line.split(',');
      return {
        department: values[1] || '',
        city: values[2] || '',
        distribution_center: values[3] || '',
        crop_type: values[4] || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    })
    .filter(item => item.department && item.city);
};

export const generateCSVContent = (data: LocationData[]) => {
  const headers = ['ID', 'Departamento', 'Ciudad', 'Centro de Distribución', 'Tipo de Cultivo', 'Última Actualización'];
  const rows = data.map((row, index) => [
    index + 1,
    row.department || '',
    row.city || '',
    row.distribution_center || '',
    row.crop_type || '',
    row.created_at || ''
  ]);
  
  return [headers, ...rows].map(row => row.join(',')).join('\n');
};