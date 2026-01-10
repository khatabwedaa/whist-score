/**
 * West Score - Number Input Component
 * For entering numeric values like bids and tricks
 */

import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useLanguage } from "../lib/context";
import { borderRadius, colors, spacing, typography } from "../lib/theme";

interface NumberInputProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  error?: string;
  containerStyle?: ViewStyle;
  size?: "sm" | "md" | "lg";
}

export function NumberInput({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  error,
  containerStyle,
  size = "md",
}: NumberInputProps) {
  const { isRTL } = useLanguage();

  const handleDecrement = () => {
    const newValue = value - step;
    if (newValue >= min) {
      onChange(newValue);
    }
  };

  const handleIncrement = () => {
    const newValue = value + step;
    if (newValue <= max) {
      onChange(newValue);
    }
  };

  const canDecrement = value > min;
  const canIncrement = value < max;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, isRTL && styles.labelRTL]}>{label}</Text>
      )}
      <View style={[styles.inputRow, isRTL && styles.inputRowRTL]}>
        <TouchableOpacity
          style={[
            styles.button,
            styles[`button_${size}`],
            !canDecrement && styles.buttonDisabled,
          ]}
          onPress={handleDecrement}
          disabled={!canDecrement}
        >
          <Text style={[styles.buttonText, styles[`buttonText_${size}`]]}>
            −
          </Text>
        </TouchableOpacity>

        <View style={[styles.valueContainer, styles[`valueContainer_${size}`]]}>
          <Text style={[styles.value, styles[`value_${size}`]]}>{value}</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            styles[`button_${size}`],
            !canIncrement && styles.buttonDisabled,
          ]}
          onPress={handleIncrement}
          disabled={!canIncrement}
        >
          <Text style={[styles.buttonText, styles[`buttonText_${size}`]]}>
            +
          </Text>
        </TouchableOpacity>
      </View>
      {error && (
        <Text style={[styles.error, isRTL && styles.errorRTL]}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
    textAlign: "left",
  },
  labelRTL: {
    textAlign: "right",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputRowRTL: {
    flexDirection: "row-reverse",
  },
  button: {
    backgroundColor: colors.surface.secondary,
    borderRadius: borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border.primary,
  },
  button_sm: {
    width: 36,
    height: 36,
  },
  button_md: {
    width: 44,
    height: 44,
  },
  button_lg: {
    width: 56,
    height: 56,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: colors.text.primary,
    fontWeight: typography.weight.bold,
  },
  buttonText_sm: {
    fontSize: typography.size.lg,
  },
  buttonText_md: {
    fontSize: typography.size.xl,
  },
  buttonText_lg: {
    fontSize: typography.size["2xl"],
  },
  valueContainer: {
    backgroundColor: colors.surface.primary,
    borderRadius: borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.primary,
  },
  valueContainer_sm: {
    minWidth: 50,
    height: 36,
    paddingHorizontal: spacing.md,
  },
  valueContainer_md: {
    minWidth: 60,
    height: 44,
    paddingHorizontal: spacing.lg,
  },
  valueContainer_lg: {
    minWidth: 80,
    height: 56,
    paddingHorizontal: spacing.xl,
  },
  value: {
    color: colors.text.primary,
    fontWeight: typography.weight.bold,
  },
  value_sm: {
    fontSize: typography.size.lg,
  },
  value_md: {
    fontSize: typography.size.xl,
  },
  value_lg: {
    fontSize: typography.size["3xl"],
  },
  error: {
    fontSize: typography.size.sm,
    color: colors.error.primary,
    marginTop: spacing.xs,
    textAlign: "left",
  },
  errorRTL: {
    textAlign: "right",
  },
});
