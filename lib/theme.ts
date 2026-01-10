/**
 * West Score - Design System
 * Tailwind-inspired color palette and typography
 */

export const colors = {
  // Background colors (dark theme - gray-950)
  background: {
    primary: "#030712", // gray-950
    secondary: "#111827", // gray-900
    tertiary: "#1f2937", // gray-800
  },

  // Surface colors for cards
  surface: {
    primary: "#111827", // gray-900
    secondary: "#1f2937", // gray-800
    tertiary: "#374151", // gray-700
  },

  // Accent colors (neutral gray)
  accent: {
    primary: "#6b7280", // gray-500
    secondary: "#9ca3af", // gray-400
    tertiary: "#d1d5db", // gray-300
    dark: "#4b5563", // gray-600
  },

  // Text colors
  text: {
    primary: "#f9fafb", // gray-50
    secondary: "#e5e7eb", // gray-200
    tertiary: "#9ca3af", // gray-400
    muted: "#6b7280", // gray-500
    inverse: "#111827", // gray-900
  },

  // Status colors
  success: {
    primary: "#22c55e", // green-500
    light: "#86efac", // green-300
    dark: "#16a34a", // green-600
  },

  error: {
    primary: "#ef4444", // red-500
    light: "#fca5a5", // red-300
    dark: "#dc2626", // red-600
  },

  warning: {
    primary: "#f59e0b", // amber-500
    light: "#fcd34d", // amber-300
  },

  // Team colors
  teamA: {
    primary: "#0ea5e9", // sky-500
    light: "#38bdf8", // sky-400
  },

  teamB: {
    primary: "#f59e0b", // amber-500
    light: "#fbbf24", // amber-400
  },

  // Borders
  border: {
    primary: "#111827", // gray-800
    secondary: "#374151", // gray-700
    accent: "#4b5563", // gray-600
  },

  // Transparent overlays
  overlay: {
    light: "rgba(255, 255, 255, 0.1)",
    medium: "rgba(255, 255, 255, 0.2)",
    dark: "rgba(0, 0, 0, 0.5)",
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const typography = {
  // Font sizes
  size: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
    "5xl": 48,
    "6xl": 60,
  },

  // Font weights
  weight: {
    normal: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
    extrabold: "800" as const,
  },

  // Line heights
  lineHeight: {
    tight: 1.1,
    snug: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

// Common component styles
export const commonStyles = {
  card: {
    backgroundColor: colors.surface.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.sm,
  },

  screenContainer: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },

  screenPadding: {
    paddingHorizontal: spacing.lg,
  },

  row: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
  },

  spaceBetween: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
  },

  center: {
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
};

// Theme type for potential light mode support
export type Theme = "dark" | "light";

// Get colors based on theme (currently only dark supported)
export function getThemeColors(theme: Theme = "dark") {
  // For now, always return dark theme colors
  return colors;
}
