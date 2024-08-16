export interface Product {
  quantity_to_add: number;
  quantity_to_add_unit: "g" | "l" | "ml" | "kg"; // Restricted to 'g', 'l', 'ml', or 'kg'
  reference_water: number;
  reference_water_unit: "l" | "ml"; // Restricted to 'g', 'l', 'ml', or 'kg'
  notes: string;
}

export const quantityProductOptions = [
  { label: "Gramos (g)", value: "g" },
  { label: "Litros (l)", value: "l" },
  { label: "Mililitros (ml)", value: "ml" },
  { label: "Kilogramos (kg)", value: "kg" },
];

export const quantityWaterOptions = [
  { label: "Litros (l)", value: "l" },
  { label: "Mililitros (ml)", value: "ml" },
];
