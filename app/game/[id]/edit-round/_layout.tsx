/**
 * West Score - Edit Round Stack Layout
 */

import { Stack } from "expo-router";
import { colors } from "../../../../lib/theme";

export default function EditRoundLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background.primary },
      }}
    />
  );
}
