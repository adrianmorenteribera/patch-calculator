import React from "react";
import {
  ScrollView,
  StyleSheet,
  useColorScheme,
  ViewStyle,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

interface ThemedScrollViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  backgroundColor: { dark: string; light: string };
  title?: string;
}

export function ThemedScrollView({
  children,
  style,
  backgroundColor,
  title,
  ...props
}: ThemedScrollViewProps) {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <ThemedView
      style={[
        styles.container,
        { backgroundColor: backgroundColor[colorScheme] },
      ]}
    >
      <ScrollView contentContainerStyle={[styles.content, style]} {...props}>
        <ThemedText type="title" style={styles.titleContainer}>
          {title}
        </ThemedText>
        {children}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
  },
  titleContainer: {
    marginBottom: 8,
  },
  content: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 16,
    gap: 16,
    overflow: "hidden",
  },
});
