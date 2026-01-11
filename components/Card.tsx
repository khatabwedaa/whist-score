/**
 * Whist Score - Card Component
 */

import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { borderRadius, colors, shadows, spacing } from "../lib/theme";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: "default" | "outlined" | "elevated";
  padding?: "none" | "sm" | "md" | "lg";
}

export function Card({
  children,
  style,
  onPress,
  variant = "default",
  padding = "md",
}: CardProps) {
  const cardStyles = [
    styles.base,
    styles[variant],
    styles[`padding_${padding}`],
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyles}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyles}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.lg,
    overflow: "hidden",
  },

  // Variants
  default: {
    backgroundColor: colors.surface.primary,
  },
  outlined: {
    backgroundColor: colors.surface.primary,
    borderWidth: 1,
    borderColor: colors.border.primary,
  },
  elevated: {
    backgroundColor: colors.surface.primary,
    ...shadows.md,
  },

  // Padding
  padding_none: {
    padding: 0,
  },
  padding_sm: {
    padding: spacing.sm,
  },
  padding_md: {
    padding: spacing.lg,
  },
  padding_lg: {
    padding: spacing.xl,
  },
});
