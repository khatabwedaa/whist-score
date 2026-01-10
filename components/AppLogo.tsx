/**
 * Whist Score - App Logo Component
 * Ford-style elegant "W" typography on dark navy background
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface AppLogoProps {
  size?: "sm" | "md" | "lg";
}

export function AppLogo({ size = "md" }: AppLogoProps) {
  const dimensions = {
    sm: { container: 48, fontSize: 28, borderRadius: 10 },
    md: { container: 80, fontSize: 48, borderRadius: 16 },
    lg: { container: 120, fontSize: 72, borderRadius: 24 },
  }[size];

  return (
    <View
      style={[
        styles.container,
        {
          width: dimensions.container,
          height: dimensions.container,
          borderRadius: dimensions.borderRadius,
        },
      ]}
    >
      <Text style={[styles.emoji, { fontSize: dimensions.fontSize }]}>🃏</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    textAlign: "center",
  },
});

export default AppLogo;
