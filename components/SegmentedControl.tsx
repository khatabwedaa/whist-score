/**
 * Whist Score - Segmented Control Component
 * For selecting between teams or options
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

interface SegmentOption<T> {
  label: string;
  value: T;
  color?: string;
}

interface SegmentedControlProps<T> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label?: string;
  containerStyle?: ViewStyle;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label,
  containerStyle,
}: SegmentedControlProps<T>) {
  const { isRTL } = useLanguage();

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, isRTL && styles.labelRTL]}>{label}</Text>
      )}
      <View style={[styles.segmentRow, isRTL && styles.segmentRowRTL]}>
        {options.map((option, index) => {
          const isSelected = value === option.value;
          const isFirst = index === 0;
          const isLast = index === options.length - 1;

          return (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.segment,
                isFirst && styles.segmentFirst,
                isLast && styles.segmentLast,
                isSelected && styles.segmentSelected,
                isSelected && option.color && { backgroundColor: option.color },
              ]}
              onPress={() => onChange(option.value)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.segmentText,
                  isSelected && styles.segmentTextSelected,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
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
  segmentRow: {
    flexDirection: "row",
    backgroundColor: colors.surface.secondary,
    borderRadius: borderRadius.lg,
    padding: spacing.xs,
  },
  segmentRowRTL: {
    flexDirection: "row-reverse",
  },
  segment: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: borderRadius.md,
  },
  segmentFirst: {
    // Additional styling for first segment if needed
  },
  segmentLast: {
    // Additional styling for last segment if needed
  },
  segmentSelected: {
    backgroundColor: colors.accent.primary,
  },
  segmentText: {
    fontSize: typography.size.base,
    fontWeight: typography.weight.medium,
    color: colors.text.tertiary,
  },
  segmentTextSelected: {
    color: colors.text.inverse,
    fontWeight: typography.weight.semibold,
  },
});
