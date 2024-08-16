import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import InputSelector from "@/components/input/InputSelector";
import InputNumber from "@/components/input/InputNumber";
import { Product } from "@/components/types/Product.types";
import { calculateRequiredProductQuantity } from "@/hooks/calculateQuantity";

export default function HomeScreen() {
  const [products, setProducts] = useState<{ [key: string]: Product }>({});
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [waterQuantity, setWaterQuantity] = useState<number>(0);
  const [resultQuantity, setResultQuantity] = useState<string>("");
  const [productNotes, setProductNotes] = useState<string>("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@products");
        if (jsonValue != null) {
          setProducts(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error("Failed to load products", e);
      }
    };
    loadProducts();
  }, []);

  const handleProductSelect = (productKey: string) => {
    setSelectedProduct(productKey);
    const product = products[productKey];
    if (product) {
      setProductNotes(product.notes);
      calculateQuantity(product, waterQuantity);
    }
  };

  const handleWaterQuantityChange = (quantity: number) => {
    setWaterQuantity(quantity);
    if (selectedProduct) {
      calculateQuantity(products[selectedProduct], quantity);
    }
  };

  const calculateQuantity = (product: Product, waterQuantity: number) => {
    const result = calculateRequiredProductQuantity(
      product,
      waterQuantity,
      "l",
    );
    setResultQuantity(result);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image source={require("@/assets/images/partial-react-logo.png")} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Calcular Proporciones</ThemedText>
      </ThemedView>

      <View style={styles.selectorContainer}>
        <InputSelector
          label="Selecciona un Producto"
          selectedValue={selectedProduct ?? ""}
          onValueChange={handleProductSelect}
          options={Object.keys(products).map((key) => ({
            label: key,
            value: key,
          }))}
        />
      </View>

      <View style={styles.inputContainer}>
        <InputNumber
          label="Cantidad de Agua (litros)"
          value={waterQuantity}
          onChangeValue={handleWaterQuantityChange}
        />
        <ThemedText> Cantidad de producto: {resultQuantity}</ThemedText>
      </View>

      {productNotes ? (
        <ThemedView>
          <ThemedText style={styles.notesText}>
            Notas: {productNotes}
          </ThemedText>
        </ThemedView>
      ) : null}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectorContainer: {},
  inputContainer: {
    marginBottom: 16,
  },
  notesText: {
    fontStyle: "italic",
  },
});
