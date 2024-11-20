export interface LocationData {
  department: string;
  city: string;
  distribution_center: string;
  crop_type: string;
  humidity: number; // Added as required field
  created_at?: string;
  updated_at?: string;
}