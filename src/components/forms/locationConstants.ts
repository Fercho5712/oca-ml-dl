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
  "Amazonas": [
    { id: "let", name: "Leticia", location: "Amazonas" },
    { id: "pto_narino", name: "Puerto Nariño", location: "Amazonas" }
  ],
  "Antioquia": [
    { id: "med", name: "Medellín", location: "Antioquia" },
    { id: "rio", name: "Rionegro", location: "Antioquia" },
    { id: "bello", name: "Bello", location: "Antioquia" },
    { id: "itagui", name: "Itagüí", location: "Antioquia" },
    { id: "apartado", name: "Apartadó", location: "Antioquia" }
  ],
  "Atlántico": [
    { id: "bar", name: "Barranquilla", location: "Atlántico" },
    { id: "soledad", name: "Soledad", location: "Atlántico" },
    { id: "malambo", name: "Malambo", location: "Atlántico" }
  ],
  "Bolívar": [
    { id: "car", name: "Cartagena", location: "Bolívar" },
    { id: "magangue", name: "Magangué", location: "Bolívar" },
    { id: "turbaco", name: "Turbaco", location: "Bolívar" }
  ],
  "Boyacá": [
    { id: "tun", name: "Tunja", location: "Boyacá" },
    { id: "duitama", name: "Duitama", location: "Boyacá" },
    { id: "sogamoso", name: "Sogamoso", location: "Boyacá" },
    { id: "chiquinquira", name: "Chiquinquirá", location: "Boyacá" }
  ],
  "Caldas": [
    { id: "man", name: "Manizales", location: "Caldas" },
    { id: "chinchina", name: "Chinchiná", location: "Caldas" },
    { id: "la_dorada", name: "La Dorada", location: "Caldas" }
  ],
  "Caquetá": [
    { id: "florencia", name: "Florencia", location: "Caquetá" },
    { id: "san_vicente", name: "San Vicente del Caguán", location: "Caquetá" }
  ],
  "Casanare": [
    { id: "yopal", name: "Yopal", location: "Casanare" },
    { id: "aguazul", name: "Aguazul", location: "Casanare" }
  ],
  "Cauca": [
    { id: "popayan", name: "Popayán", location: "Cauca" },
    { id: "santander_q", name: "Santander de Quilichao", location: "Cauca" }
  ],
  "Cesar": [
    { id: "valledupar", name: "Valledupar", location: "Cesar" },
    { id: "aguachica", name: "Aguachica", location: "Cesar" }
  ],
  "Cundinamarca": [
    { id: "bog", name: "Bogotá", location: "Cundinamarca" },
    { id: "mos", name: "Mosquera", location: "Cundinamarca" },
    { id: "chia", name: "Chía", location: "Cundinamarca" },
    { id: "soacha", name: "Soacha", location: "Cundinamarca" },
    { id: "zipaquira", name: "Zipaquirá", location: "Cundinamarca" },
    { id: "facatativa", name: "Facatativá", location: "Cundinamarca" }
  ],
  "Huila": [
    { id: "neiva", name: "Neiva", location: "Huila" },
    { id: "pitalito", name: "Pitalito", location: "Huila" },
    { id: "garzon", name: "Garzón", location: "Huila" }
  ],
  "La Guajira": [
    { id: "riohacha", name: "Riohacha", location: "La Guajira" },
    { id: "maicao", name: "Maicao", location: "La Guajira" }
  ],
  "Magdalena": [
    { id: "santa_marta", name: "Santa Marta", location: "Magdalena" },
    { id: "cienaga", name: "Ciénaga", location: "Magdalena" }
  ],
  "Meta": [
    { id: "villavicencio", name: "Villavicencio", location: "Meta" },
    { id: "acacias", name: "Acacías", location: "Meta" },
    { id: "granada", name: "Granada", location: "Meta" }
  ],
  "Nariño": [
    { id: "pasto", name: "Pasto", location: "Nariño" },
    { id: "ipiales", name: "Ipiales", location: "Nariño" },
    { id: "tumaco", name: "Tumaco", location: "Nariño" }
  ],
  "Norte de Santander": [
    { id: "cucuta", name: "Cúcuta", location: "Norte de Santander" },
    { id: "ocana", name: "Ocaña", location: "Norte de Santander" }
  ],
  "Quindío": [
    { id: "armenia", name: "Armenia", location: "Quindío" },
    { id: "calarca", name: "Calarcá", location: "Quindío" }
  ],
  "Risaralda": [
    { id: "pereira", name: "Pereira", location: "Risaralda" },
    { id: "dosquebradas", name: "Dosquebradas", location: "Risaralda" },
    { id: "santa_rosa", name: "Santa Rosa de Cabal", location: "Risaralda" }
  ],
  "Santander": [
    { id: "bucaramanga", name: "Bucaramanga", location: "Santander" },
    { id: "floridablanca", name: "Floridablanca", location: "Santander" },
    { id: "giron", name: "Girón", location: "Santander" },
    { id: "barrancabermeja", name: "Barrancabermeja", location: "Santander" }
  ],
  "Sucre": [
    { id: "sincelejo", name: "Sincelejo", location: "Sucre" },
    { id: "corozal", name: "Corozal", location: "Sucre" }
  ],
  "Tolima": [
    { id: "ibague", name: "Ibagué", location: "Tolima" },
    { id: "espinal", name: "Espinal", location: "Tolima" },
    { id: "mariquita", name: "Mariquita", location: "Tolima" }
  ],
  "Valle del Cauca": [
    { id: "cal", name: "Cali", location: "Valle del Cauca" },
    { id: "bue", name: "Buenaventura", location: "Valle del Cauca" },
    { id: "palmira", name: "Palmira", location: "Valle del Cauca" },
    { id: "tulua", name: "Tuluá", location: "Valle del Cauca" },
    { id: "cartago", name: "Cartago", location: "Valle del Cauca" }
  ]
};