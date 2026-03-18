export const DR_CITIES = [
  'Otro',
  'Santo Domingo',
  'Santiago de los Caballeros',
  'San Felipe de Puerto Plata',
  'La Romana',
  'San Pedro de Macorís',
  'Higüey',
  'San Francisco de Macorís',
  'San Cristóbal',
  'Concepción de La Vega',
  'Santa Cruz de Barahona',
] as const;

export type DrCity = typeof DR_CITIES[number];

export const DR_CITY_OPTIONS = [
  ...DR_CITIES.map((city) => ({
    value: city,
    label: city,
  })),
];
