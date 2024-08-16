import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

export default function ProductList() {
  const [editableProduct, setEditableProduct] = useState<string | null>(null);
  const [products, setProducts] = useState<{ [key: string]: any }>({});

  const isFocused = useIsFocused();

  // Load products from AsyncStorage
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

  // Refresh the products list whenever the tab becomes focused
  useEffect(() => {
    if (isFocused) {
      loadProducts();
    }
  }, [isFocused]);

  // Save products to AsyncStorage
  const saveProducts = async (updatedProducts: { [key: string]: any }) => {
    try {
      const jsonValue = JSON.stringify(updatedProducts);
      await AsyncStorage.setItem("@products", jsonValue);
    } catch (e) {
      console.error("Failed to save products", e);
    }
  };

  // Toggle edit mode
  const handleEditToggle = (key: string) => {
    if (editableProduct === key) {
      // Validation for "Cantidad" and "Agua"
      if (
        products[key].quantity_to_add <= 0 ||
        products[key].reference_water <= 0
      ) {
        Alert.alert(
          "Error",
          "La cantidad y la referencia de agua deben ser mayores que cero.",
        );
        return;
      }
      saveProducts(products); // Save changes when exiting edit mode
      setEditableProduct(null); // Exit edit mode
    } else {
      setEditableProduct(key); // Enter edit mode
    }
  };

  // Handle input change for an existing product
  const handleInputChange = (key: string, field: string, value: string) => {
    setProducts((prevProducts) => ({
      ...prevProducts,
      [key]: {
        ...prevProducts[key],
        [field]: value,
      },
    }));
  };

  // Delete a product
  const deleteProduct = (key: string) => {
    Alert.alert(
      "Confirmar eliminación",
      `¿Estás seguro de que deseas eliminar el producto "${key}"?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            const updatedProducts = { ...products };
            delete updatedProducts[key];
            setProducts(updatedProducts);
            saveProducts(updatedProducts);
          },
        },
      ],
    );
  };

  return (
    <ThemedScrollView
      backgroundColor={{ light: "#FFFFFF", dark: "#353636" }}
      style={styles.container}
      title="Lista de Productos"
    >
      {/* Table Header */}
      <ThemedView style={styles.tableHeader}>
        <View style={styles.tableHeaderCell}>
          <Text style={styles.tableHeaderText}>Producto</Text>
        </View>
        <View style={styles.tableHeaderCell}>
          <Text style={styles.tableHeaderText}>Cantidad</Text>
        </View>
        <View style={styles.tableHeaderCell}>
          <Text style={styles.tableHeaderText}>Ref. Agua</Text>
        </View>
        <View style={[styles.tableHeaderCell, { flex: 0.5 }]} />
        <View style={[styles.tableHeaderCell, { flex: 0.5 }]} />
      </ThemedView>

      {/* Table Rows */}
      {Object.entries(products).map(([key, product]) => (
        <React.Fragment key={key}>
          <ThemedView style={styles.tableRow}>
            <View style={styles.tableRowCell}>
              <ThemedText style={styles.tableText}>{key}</ThemedText>
            </View>
            <View style={styles.tableRowCell}>
              {editableProduct === key ? (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.input, styles.inputWithUnit]}
                    value={product.quantity_to_add.toString()}
                    onChangeText={(text) =>
                      handleInputChange(key, "quantity_to_add", text)
                    }
                    keyboardType="numeric"
                  />
                  <Text style={styles.unitText}>
                    {product.quantity_to_add_unit}
                  </Text>
                </View>
              ) : (
                <ThemedText style={styles.tableText}>
                  {product.quantity_to_add} {product.quantity_to_add_unit}
                </ThemedText>
              )}
            </View>
            <View style={styles.tableRowCell}>
              {editableProduct === key ? (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.input, styles.inputWithUnit]}
                    value={product.reference_water.toString()}
                    onChangeText={(text) =>
                      handleInputChange(key, "reference_water", text)
                    }
                    keyboardType="numeric"
                  />
                  <Text style={styles.unitText}>
                    {product.reference_water_unit}
                  </Text>
                </View>
              ) : (
                <ThemedText style={styles.tableText}>
                  {product.reference_water} {product.reference_water_unit}
                </ThemedText>
              )}
            </View>
            <TouchableOpacity
              onPress={() => handleEditToggle(key)}
              style={{ flex: 0.5, alignItems: "center" }}
            >
              <Ionicons
                name={editableProduct === key ? "checkmark-circle" : "pencil"}
                size={20}
                color={"#387CA0"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteProduct(key)}
              style={{ flex: 0.5, alignItems: "center" }}
            >
              <Ionicons name="trash" size={20} color="#A04C38" />
            </TouchableOpacity>
          </ThemedView>

          {/* Notes Section */}
          {editableProduct === key && (
            <ThemedView style={styles.notesRow}>
              <TextInput
                style={styles.notesInput}
                value={product.notes}
                onChangeText={(text) => handleInputChange(key, "notes", text)}
                multiline
              />
            </ThemedView>
          )}
        </React.Fragment>
      ))}
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#387CA0",
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  tableHeaderCell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tableHeaderText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    height: 24,
    alignItems: "center",
  },
  tableRowCell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tableText: {
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    paddingHorizontal: 4, // Reduced padding
    paddingVertical: 2, // Adjusted padding to reduce size
    borderRadius: 4,
    maxWidth: 48, // Adjusted width to reduce size
    textAlign: "center",
  },
  inputWithUnit: {
    flex: 1,
  },
  unitText: {
    marginLeft: 4,
    fontSize: 14,
  },
  notesRow: {
    paddingVertical: 8,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 4,
    textAlignVertical: "top",
    height: 80, // Adjust the height as needed for the notes section
  },
});
