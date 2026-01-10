/**
 * Whist Score - App Logo Component
 * Ford-style elegant cursive "W" with smooth, flowing lines
 */

import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";

interface AppLogoProps {
  size?: "sm" | "md" | "lg";
}

export function AppLogo({ size = "md" }: AppLogoProps) {
  const dimensions = {
    sm: { container: 48, svgSize: 36, borderRadius: 12 },
    md: { container: 80, svgSize: 60, borderRadius: 18 },
    lg: { container: 120, svgSize: 90, borderRadius: 26 },
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
      <Svg
        width={dimensions.svgSize}
        height={dimensions.svgSize}
        viewBox="0 0 100 100"
      >
        <Defs>
          <LinearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#f8fafc" stopOpacity="1" />
            <Stop offset="50%" stopColor="#e2e8f0" stopOpacity="1" />
            <Stop offset="100%" stopColor="#cbd5e1" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        {/* Ford-style smooth cursive "W" with elegant flowing curves */}
        <Path
          d="M 12 30
             Q 14 28, 18 32
             Q 24 45, 30 60
             Q 32 65, 35 62
             Q 40 50, 45 38
             Q 47 34, 50 36
             Q 53 38, 55 42
             Q 60 54, 65 62
             Q 68 65, 70 60
             Q 76 45, 82 32
             Q 86 28, 88 30
             Q 90 32, 88 36
             Q 80 55, 72 72
             Q 68 80, 62 78
             Q 58 76, 55 70
             Q 50 60, 50 58
             Q 50 60, 45 70
             Q 42 76, 38 78
             Q 32 80, 28 72
             Q 20 55, 12 36
             Q 10 32, 12 30
             Z"
          fill="url(#logoGradient)"
          stroke="#f1f5f9"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Decorative underline swoosh - Ford style */}
        <Path
          d="M 18 78
             Q 35 82, 50 80
             Q 65 78, 82 74"
          fill="none"
          stroke="url(#logoGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default AppLogo;
