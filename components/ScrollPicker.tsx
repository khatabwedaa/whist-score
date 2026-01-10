/**
 * West Score - Scroll Picker Component
 * A scrollable number picker for selecting numeric values
 */

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { useLanguage } from "../lib/context";
import { borderRadius, colors, spacing, typography } from "../lib/theme";

interface ScrollPickerProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  error?: string;
  containerStyle?: ViewStyle;
  itemHeight?: number;
  visibleItems?: number;
}

const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 3;

export function ScrollPicker({
  label,
  value,
  onChange,
  min = 0,
  max = 13,
  error,
  containerStyle,
  itemHeight = ITEM_HEIGHT,
  visibleItems = VISIBLE_ITEMS,
}: ScrollPickerProps) {
  const { isRTL } = useLanguage();
  const scrollViewRef = useRef<ScrollView>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  // Generate array of numbers from min to max
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  // Calculate padding to center items
  const paddingVertical = (itemHeight * (visibleItems - 1)) / 2;
  const containerHeight = itemHeight * visibleItems;

  // Scroll to current value on mount and when value changes externally
  useEffect(() => {
    if (!isScrolling) {
      const index = value - min;
      scrollViewRef.current?.scrollTo({
        y: index * itemHeight,
        animated: true,
      });
    }
  }, [value, min, itemHeight, isScrolling]);

  const handleScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      setIsScrolling(false);
      const offsetY = event.nativeEvent.contentOffset.y;
      const index = Math.round(offsetY / itemHeight);
      const clampedIndex = Math.max(0, Math.min(index, numbers.length - 1));
      const newValue = numbers[clampedIndex];

      if (newValue !== value) {
        onChange(newValue);
      }

      // Snap to item
      scrollViewRef.current?.scrollTo({
        y: clampedIndex * itemHeight,
        animated: true,
      });
    },
    [itemHeight, numbers, value, onChange]
  );

  const handleScrollBegin = () => {
    setIsScrolling(true);
  };

  const getItemStyle = (num: number) => {
    const isSelected = num === value;
    return [
      styles.item,
      { height: itemHeight },
      isSelected && styles.itemSelected,
    ];
  };

  const getTextStyle = (num: number) => {
    const isSelected = num === value;
    return [
      styles.itemText,
      isSelected ? styles.itemTextSelected : styles.itemTextUnselected,
    ];
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, isRTL && styles.labelRTL]}>{label}</Text>
      )}

      <View style={[styles.pickerContainer, { height: containerHeight }]}>
        {/* Selection indicator */}
        <View
          style={[
            styles.selectionIndicator,
            {
              top: paddingVertical,
              height: itemHeight,
            },
          ]}
        />

        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          snapToInterval={itemHeight}
          decelerationRate="fast"
          onScrollBeginDrag={handleScrollBegin}
          onMomentumScrollEnd={handleScrollEnd}
          onScrollEndDrag={(e) => {
            // If no momentum, handle scroll end here
            if (e.nativeEvent.velocity?.y === 0) {
              handleScrollEnd(e);
            }
          }}
          contentContainerStyle={{
            paddingVertical,
          }}
          nestedScrollEnabled
        >
          {numbers.map((num) => (
            <View key={num} style={getItemStyle(num)}>
              <Text style={getTextStyle(num)}>{num}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Top fade gradient effect */}
        <View
          style={[styles.fadeTop, { height: paddingVertical }]}
          pointerEvents="none"
        />
        {/* Bottom fade gradient effect */}
        <View
          style={[styles.fadeBottom, { height: paddingVertical }]}
          pointerEvents="none"
        />
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
    width: 100,
    backgroundColor: colors.surface.primary,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border.primary,
    overflow: "hidden",
  },
  selectionIndicator: {
    position: "absolute",
    left: 4,
    right: 4,
    backgroundColor: colors.surface.secondary,
    borderRadius: borderRadius.md,
    zIndex: 0,
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  itemSelected: {},
  itemText: {
    fontWeight: typography.weight.bold,
  },
  itemTextSelected: {
    fontSize: typography.size["3xl"],
    color: colors.text.primary,
  },
  itemTextUnselected: {
    fontSize: typography.size.xl,
    color: colors.text.muted,
  },
  fadeTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    opacity: 0.5,
  },
  fadeBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    opacity: 0.5,
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
