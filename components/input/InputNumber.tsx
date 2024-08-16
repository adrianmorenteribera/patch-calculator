import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface InputNumberProps {
  value?: number; // Optional value prop with a default value
  onChangeValue: (value: number) => void;
  placeholder?: string;
  label?: string;
}

export default function InputNumber({
  value = 0, // Default value set to 0
  onChangeValue,
  placeholder,
  label,
}: InputNumberProps) {
  const handleIncrement = () => {
    onChangeValue(value + 1);
  };

  const handleDecrement = () => {
    onChangeValue(value > 0 ? value - 1 : 0); // Ensure the value doesn't go below 0
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={handleDecrement} style={styles.buttonLeft}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={value.toString()}
          onChangeText={(text) => onChangeValue(parseFloat(text) || 0)} // Ensure fallback to 0 on invalid input
          placeholder={placeholder}
          keyboardType="numeric"
        />
        <TouchableOpacity onPress={handleIncrement} style={styles.buttonRight}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  label: {
    marginBottom: 4,
    fontWeight: "bold",
    fontSize: 16,
  },
  inputContainer: {
    position: "relative",
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    paddingHorizontal: 48,
    paddingVertical: 8,
    textAlign: "center",
    height: 32,
    borderRadius: 4,
    zIndex: 1,
  },
  buttonLeft: {
    position: "absolute",
    left: 0,
    width: 48,
    backgroundColor: "#387CA0",
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    zIndex: 2,
  },
  buttonRight: {
    position: "absolute",
    right: 0,
    width: 48,
    height: 32,
    backgroundColor: "#387CA0",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    zIndex: 2,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
