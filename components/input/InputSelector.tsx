import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface InputSelectorProps {
  selectedValue: string;
  onValueChange: (value: string) => void;
  label?: string;
  options: Array<{ label: string; value: string }>;
}

export default function InputSelector({
  selectedValue,
  onValueChange,
  label,
  options,
}: InputSelectorProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [tempSelectedValue, setTempSelectedValue] = useState(selectedValue);

  const handleSelect = () => {
    onValueChange(tempSelectedValue);
    setModalVisible(false); // Close the picker after selection
  };

  const handleDiscard = () => {
    setTempSelectedValue(selectedValue); // Revert to original value
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        style={styles.selector}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectedText}>
          {options.find((option) => option.value === selectedValue)?.label}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleDiscard}
      >
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={tempSelectedValue}
              onValueChange={(itemValue) => setTempSelectedValue(itemValue)}
            >
              {options.map((option) => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.discardButton}
                onPress={handleDiscard}
              >
                <Text style={styles.discardButtonText}>Descartar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={handleSelect}
              >
                <Text style={styles.selectButtonText}>Seleccionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 2,
  },
  label: {
    marginBottom: 4,
    fontWeight: "bold",
    fontSize: 16,
  },
  selector: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 4,
    justifyContent: "center",
  },
  selectedText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  pickerContainer: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#CCCCCC",
  },
  selectButton: {
    padding: 10,
    backgroundColor: "#387CA0",
    borderRadius: 4,
  },
  selectButtonText: {
    fontWeight: "bold",
    color: "white",
  },
  discardButton: {
    padding: 10,
    backgroundColor: "#A04C38",
    borderRadius: 4,
  },
  discardButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
