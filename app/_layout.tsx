/**
 * West Score - Root Layout
 * Arabic-only app with RTL support
 */

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, I18nManager, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppProviders } from "../lib/context";
import { colors } from "../lib/theme";

function RootLayoutContent() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background.primary },
          animation: "slide_from_left", // RTL animation
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="new-game" />
        <Stack.Screen name="game/[id]" />
        <Stack.Screen
          name="game/[id]/add-round"
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen
          name="game/[id]/edit-round/[roundId]"
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen
          name="game/[id]/settings"
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Force RTL for Arabic-only app
    if (!I18nManager.isRTL) {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
    }
    setInitialized(true);
  }, []);

  if (!initialized) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.text.primary} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <AppProviders>
        <RootLayoutContent />
      </AppProviders>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background.primary,
  },
});
