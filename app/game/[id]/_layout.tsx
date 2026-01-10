/**
 * West Score - Game Stack Layout
 */

import { Stack } from "expo-router";
import { colors } from "../../../lib/theme";

export default function GameLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background.primary },
      }}
    />
  );
}
