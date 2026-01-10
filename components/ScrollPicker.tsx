/**
 * Whist Score - Native Picker Component
 * Uses the native iOS/Android picker for smooth performance
 */

import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Platform, StyleSheet, Text, View, ViewStyle } from "react-native";
import { useLanguage } from "../lib/context";
import { colors, spacing, typography } from "../lib/theme";

interface ScrollPickerProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  error?: string;
  containerStyle?: ViewStyle;
}

export function ScrollPicker({
  label,
  value,
  onChange,
  min = 0,
  max = 13,
  error,
  containerStyle,
}: ScrollPickerProps) {
  const { isRTL } = useLanguage();

  // Generate array of numbers from min to max
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, isRTL && styles.labelRTL]}>{label}</Text>
      )}

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={value}
          onValueChange={(itemValue) => onChange(itemValue as number)}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          {numbers.map((num) => (
            <Picker.Item key={num} label={String(num)} value={num} />
          ))}
        </Picker>
      </View>

      {error && (
        <Text style={[styles.error, isRTL && styles.errorRTL]}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  label: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  labelRTL: {
    textAlign: "center",
  },
  pickerContainer: {
    width: 120,
    height: 150,
    backgroundColor: colors.surface.primary,
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center",
  },
  picker: {
    width: "100%",
    height: 150,
    ...Platform.select({
      ios: {
        // iOS specific styles
      },
      android: {
        color: colors.text.primary,
        backgroundColor: colors.surface.primary,
      },
    }),
  },
  pickerItem: {
    fontSize: 28,
    fontWeight: "600",
    color: colors.text.primary,
    height: 150,
  },
  error: {
    fontSize: typography.size.sm,
    color: colors.error.primary,
    marginTop: spacing.xs,
    textAlign: "center",
  },
  errorRTL: {
    textAlign: "center",
  },
});
