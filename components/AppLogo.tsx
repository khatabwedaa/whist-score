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
    sm: { container: 48, fontSize: 32, borderRadius: 11 },
    md: { container: 80, fontSize: 52, borderRadius: 18 },
    lg: { container: 120, fontSize: 78, borderRadius: 26 },
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
      <Text style={[styles.letter, { fontSize: dimensions.fontSize }]}>W</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
  },
  letter: {
    color: "#ffffff",
    fontWeight: "300",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: -4,
  },
});

export default AppLogo;
