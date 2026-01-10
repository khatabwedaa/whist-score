/**
 * West Score - Button Component
 */

import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { borderRadius, colors, spacing, typography } from "../lib/theme";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export function Button({
  title,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  icon,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const buttonStyles = [
    styles.base,
    styles[variant],
    styles[`size_${size}`],
    fullWidth && styles.fullWidth,
    isDisabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`text_${variant}`],
    styles[`text_${size}`],
    isDisabled && styles.textDisabled,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === "outline" || variant === "ghost"
              ? colors.accent.primary
              : colors.text.inverse
          }
          size="small"
        />
      ) : (
        <>
          {icon}
          <Text style={textStyles}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
  },

  // Variants
  primary: {
    backgroundColor: colors.accent.primary,
  },
  secondary: {
    backgroundColor: colors.surface.secondary,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.accent.primary,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  danger: {
    backgroundColor: colors.error.primary,
  },

  // Sizes
  size_sm: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  size_md: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  size_lg: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },

  // States
  disabled: {
    opacity: 0.5,
  },
  fullWidth: {
    width: "100%",
  },

  // Text base
  text: {
    fontWeight: typography.weight.semibold,
    textAlign: "center",
  },

  // Text variants
  text_primary: {
    color: colors.text.inverse,
  },
  text_secondary: {
    color: colors.text.primary,
  },
  text_outline: {
    color: colors.accent.primary,
  },
  text_ghost: {
    color: colors.accent.primary,
  },
  text_danger: {
    color: colors.text.primary,
  },

  // Text sizes
  text_sm: {
    fontSize: typography.size.sm,
  },
  text_md: {
    fontSize: typography.size.base,
  },
  text_lg: {
    fontSize: typography.size.lg,
  },

  // Text states
  textDisabled: {
    opacity: 0.7,
  },
});
