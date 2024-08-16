// components/InputText.tsx
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface InputTextProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  multiline?: boolean;
}

export default function InputText({
  value,
  onChangeText,
  placeholder,
  label,
  multiline = false,
}: InputTextProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, multiline && styles.multiline]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline={multiline}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 2,
    display: "flex",
  },
  label: {
    marginBottom: 4,
    fontWeight: "bold",
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 4,
    height: 32,
  },
  multiline: {
    // Occupy all the available space
    height: 100,
    textAlignVertical: "top",
  },
});
