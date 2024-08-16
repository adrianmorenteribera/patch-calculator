import { Product } from "@/components/types/Product.types";

const unitConversion = {
  l: 1000, // 1 liter = 1000 milliliters
  ml: 1,
  g: 1, // Assume 1g is the base unit for simplicity
  kg: 1000, // 1 kilogram = 1000 grams
};

/**
 * Calculate the required product quantity based on the water quantity and product ratio.
 * Handles different units for both product quantity and water quantity.
 *
 * @param product The product selected by the user.
 * @param waterQuantity The amount of water specified by the user.
 * @param waterUnit The unit of the water quantity specified by the user.
 * @returns The required amount of product as a string with the correct unit.
 */
export const calculateRequiredProductQuantity = (
  product: Product,
  waterQuantity: number,
  waterUnit: "l" | "ml",
): string => {
  if (!product || waterQuantity <= 0) return "0";

  // Convert the reference water to milliliters for calculation
  const referenceWaterInMl =
    product.reference_water_unit === "l"
      ? product.reference_water * unitConversion.l
      : product.reference_water;

  // Convert the water quantity to milliliters if necessary
  const waterInMl =
    waterUnit === "l" ? waterQuantity * unitConversion.l : waterQuantity;

  // Calculate the product to water ratio
  const productToWaterRatio = product.quantity_to_add / referenceWaterInMl;

  // Calculate the required product quantity in base units (grams or milliliters)
  let requiredProductQuantity = productToWaterRatio * waterInMl;

  let outputUnit = product.quantity_to_add_unit;

  // Convert to kilograms if the output is more than 1000 grams
  if (outputUnit === "g" && requiredProductQuantity >= 1000) {
    requiredProductQuantity /= unitConversion.kg;
    outputUnit = "kg";
  }

  // Convert to liters if the output is more than 1000 milliliters
  if (outputUnit === "ml" && requiredProductQuantity >= 1000) {
    requiredProductQuantity /= unitConversion.l;
    outputUnit = "l";
  }

  return `${requiredProductQuantity.toFixed(2)} ${outputUnit}`;
};
