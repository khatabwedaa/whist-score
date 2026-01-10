/**
 * West Score - Empty State Component
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useLanguage } from "../lib/context";
import { colors, spacing, typography } from "../lib/theme";
import { Button } from "./Button";

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) {
  const { isRTL } = useLanguage();

  return (
    <View style={styles.container}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={[styles.title, isRTL && styles.textRTL]}>{title}</Text>
      {description && (
        <Text style={[styles.description, isRTL && styles.textRTL]}>
          {description}
        </Text>
      )}
      {actionLabel && onAction && (
        <Button
          title={actionLabel}
          onPress={onAction}
          variant="primary"
          size="lg"
          style={styles.button}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xxl,
  },
  iconContainer: {
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.semibold,
    color: colors.text.primary,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: typography.size.base,
    color: colors.text.muted,
    textAlign: "center",
    marginBottom: spacing.xl,
  },
  textRTL: {
    textAlign: "center",
  },
  button: {
    marginTop: spacing.md,
  },
});
