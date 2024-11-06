export const departments = [
  "Amazonas", "Antioquia", "Arauca", "Atlántico", "Bolívar", 
  "Boyacá", "Caldas", "Caquetá", "Casanare", "Cauca", 
  "Cesar", "Chocó", "Córdoba", "Cundinamarca", "Guainía", 
  "Guaviare", "Huila", "La Guajira", "Magdalena", "Meta", 
  "Nariño", "Norte de Santander", "Putumayo", "Quindío", 
  "Risaralda", "San Andrés y Providencia", "Santander", 
  "Sucre", "Tolima", "Valle del Cauca", "Vaupés", "Vichada"
];

export const cropTypes = [
  { id: "cafe", name: "Café" },
  { id: "platano", name: "Plátano" },
  { id: "papa", name: "Papa" },
  { id: "yuca", name: "Yuca" },
  { id: "maiz", name: "Maíz" },
  { id: "arroz", name: "Arroz" },
];

export const distributionCentersByDepartment = {
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