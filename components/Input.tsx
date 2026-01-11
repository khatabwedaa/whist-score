/**
 * Whist Score - Input Component
 */

import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { useLanguage } from "../lib/context";
import { borderRadius, colors, spacing, typography } from "../lib/theme";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export function Input({
  label,
  error,
  containerStyle,
  style,
  ...props
}: InputProps) {
  const { isRTL } = useLanguage();

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, isRTL && styles.labelRTL]}>{label}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          isRTL && styles.inputRTL,
          error && styles.inputError,
          style,
        ]}
        placeholderTextColor={colors.text.muted}
        {...props}
      />
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
    textAlign: "left",
  },
  input: {
    backgroundColor: colors.surface.secondary,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: typography.size.base,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: colors.border.primary,
    textAlign: "left",
  },
  inputRTL: {
    textAlign: "right",
  },
  inputError: {
    borderColor: colors.error.primary,
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
