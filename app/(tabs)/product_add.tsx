import React, { useState } from "react";
import { Alert, Button, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Product,
  quantityProductOptions,
  quantityWaterOptions,
} from "@/components/types/Product.types";
import InputText from "@/components/input/InputText";
import InputNumber from "@/components/input/InputNumber";
import InputSelector from "@/components/input/InputSelector";
import { ThemedScrollView } from "@/components/ThemedScrollView";

export default function AddProductScreen() {
  const [newProductName, setNewProductName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [quantityUnit, setQuantityUnit] =
    useState<Product["quantity_to_add_unit"]>("g");
  const [referenceWater, setReferenceWater] = useState<number>(0);
  const [referenceWaterUnit, setReferenceWaterUnit] =
    useState<Product["reference_water_unit"]>("l");
  const [notes, setNotes] = useState<string>("");

  const addProduct = async () => {
    if (!newProductName.trim()) {
      Alert.alert("Error", "El nombre del producto no puede estar vacío");
      return;
    }

    if (quantity <= 0) {
      Alert.alert("Error", "La cantidad debe ser mayor que cero");
      return;
    }

    if (referenceWater <= 0) {
      Alert.alert("Error", "La referencia de agua debe ser mayor que cero");
      return;
    }

    try {
      const storedProducts = await AsyncStorage.getItem("@products");
      const products: { [key: string]: Product } = storedProducts
        ? JSON.parse(storedProducts)
        : {};

      // Check if the product name already exists
      if (products[newProductName]) {
        Alert.alert(
          "Error",
          "Ya existe un producto con este nombre. Por favor, modifique el nombre.",
        );
        return;
      }

      // Add the new product
      products[newProductName] = {
        quantity_to_add: quantity,
        quantity_to_add_unit: quantityUnit,
        reference_water: referenceWater,
        reference_water_unit: referenceWaterUnit,
        notes: notes,
      };

      await AsyncStorage.setItem("@products", JSON.stringify(products));

      // Reset the form fields after successful product addition
      setNewProductName("");
      setQuantity(0);
      setQuantityUnit("g");
      setReferenceWater(0);
      setReferenceWaterUnit("l");
      setNotes(""); // This resets the notes field

      // Show success message
      Alert.alert("Éxito", "Producto añadido correctamente");
    } catch (e) {
      console.error("Error al añadir producto", e);
      Alert.alert("Error", "Hubo un problema al añadir el producto");
    }
  };

  return (
    <ThemedScrollView
      backgroundColor={{ light: "#FFFFFF", dark: "#353636" }}
      style={styles.container}
      title="Añadir Producto"
    >
      <InputText
        label="Nombre del Producto"
        value={newProductName}
        onChangeText={setNewProductName}
      />

      <InputNumber
        label="Cantidad"
        value={quantity}
        onChangeValue={setQuantity}
      />

      <InputSelector
        label="Unidad de Cantidad"
        selectedValue={quantityUnit}
        onValueChange={(value) =>
          setQuantityUnit(value as Product["quantity_to_add_unit"])
        }
        options={quantityProductOptions}
      />

      <InputNumber
        label="Referencia de Agua"
        value={referenceWater}
        onChangeValue={setReferenceWater}
      />

      <InputSelector
        label="Unidad de Agua"
        selectedValue={referenceWaterUnit}
        onValueChange={(value) =>
          setReferenceWaterUnit(value as Product["reference_water_unit"])
        }
        options={quantityWaterOptions}
      />

      <View style={styles.notesInput}>
        <InputText
          label="Notas"
          value={notes}
          onChangeText={setNotes}
          multiline
        />
      </View>

      <View style={styles.saveButtonContainer}>
        <Button
          title="Guardar Producto"
          onPress={addProduct}
          color={"#387CA0"}
        />
      </View>
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  notesInput: {
    marginBottom: 16,
  },
  saveButtonContainer: {
    justifyContent: "flex-end",
    flexGrow: 1,
  },
});
