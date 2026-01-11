/**
 * Whist Score - Header Component
 */

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLanguage } from "../lib/context";
import { colors, spacing, typography } from "../lib/theme";

interface HeaderProps {
  title: string;
  subtitle?: string;
  leftAction?: {
    label: string;
    onPress: () => void;
  };
  rightAction?: {
    label: string;
    onPress: () => void;
  };
}

export function Header({
  title,
  subtitle,
  leftAction,
  rightAction,
}: HeaderProps) {
  const { isRTL } = useLanguage();

  return (
    <View style={styles.container}>
      <View style={[styles.row, isRTL && styles.rowRTL]}>
        {/* Left Action */}
        <View style={styles.actionContainer}>
          {leftAction && (
            <TouchableOpacity onPress={leftAction.onPress}>
              <Text style={styles.actionText}>{leftAction.label}</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>

        {/* Right Action */}
        <View style={styles.actionContainer}>
          {rightAction && (
            <TouchableOpacity onPress={rightAction.onPress}>
              <Text style={styles.actionText}>{rightAction.label}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.primary,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowRTL: {
    flexDirection: "row-reverse",
  },
  actionContainer: {
    width: 60,
    alignItems: "center",
  },
  actionText: {
    fontSize: typography.size.base,
    fontWeight: typography.weight.medium,
    color: colors.accent.primary,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    textAlign: "center",
  },
  subtitle: {
    fontSize: typography.size.sm,
    color: colors.text.tertiary,
    marginTop: 2,
  },
});
