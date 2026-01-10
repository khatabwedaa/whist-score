/**
 * West Score - Settings Screen (Arabic Only)
 */

import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "../components";
import { t } from "../i18n";
import { colors, spacing, typography } from "../lib/theme";

export default function SettingsScreen() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("settings")}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* About */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>{t("about")}</Text>
          <Text style={styles.aboutText}>{t("aboutDescription")}</Text>

          <View style={styles.versionContainer}>
            <Text style={styles.versionValue}>1.0.0</Text>
            <Text style={styles.versionLabel}>{t("version")}</Text>
          </View>
        </Card>

        {/* App Logo and Name */}
        <View style={styles.appContainer}>
          <View style={styles.logoIcon}>
            <View style={styles.logoCircle} />
          </View>
          <Text style={styles.appName}>{t("appName")}</Text>
          <Text style={styles.appTagline}>{t("appTagline")}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  closeButton: {
    padding: spacing.sm,
  },
  closeText: {
    fontSize: 24,
    color: colors.text.primary,
  },
  headerSpacer: {
    width: 40,
  },
  headerTitle: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: "right",
  },
  aboutText: {
    fontSize: typography.size.base,
    color: colors.text.secondary,
    lineHeight: 24,
    marginBottom: spacing.lg,
    textAlign: "right",
  },
  versionContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border.primary,
  },
  versionLabel: {
    fontSize: typography.size.sm,
    color: colors.text.muted,
  },
  versionValue: {
    fontSize: typography.size.sm,
    color: colors.text.primary,
    fontWeight: typography.weight.medium,
  },
  appContainer: {
    alignItems: "center",
    paddingVertical: spacing.xxl,
  },
  logoIcon: {
    width: 64,
    height: 80,
    backgroundColor: "#991b1b",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  logoCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f5f5f4",
    marginTop: -12,
  },
  appName: {
    fontSize: typography.size["2xl"],
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  appTagline: {
    fontSize: typography.size.base,
    color: colors.text.muted,
  },
});
