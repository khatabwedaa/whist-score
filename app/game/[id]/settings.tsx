/**
 * Whist Score - Game Settings Screen (Simplified)
 */

import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Card, Input, NumberInput } from "../../../components";
import { t } from "../../../i18n";
import { useGames, useLanguage } from "../../../lib/context";
import { getGame, updateGame, updateGameSettings } from "../../../lib/storage";
import { colors, spacing, typography } from "../../../lib/theme";
import { FailMode, Game } from "../../../lib/types";

export default function GameSettingsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { isRTL } = useLanguage();
  const { refreshGames } = useGames();

  const [game, setGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form state - simplified
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [targetScore, setTargetScore] = useState(25);
  const [failMode, setFailMode] = useState<FailMode>("minusBid_opponentTricks");

  const loadGame = useCallback(async () => {
    if (!id) return;
    const loaded = await getGame(id);
    setGame(loaded);

    if (loaded) {
      setTitle(loaded.title);
      setNote(loaded.note || "");
      setTargetScore(loaded.settings.targetScore || 25);
      setFailMode(loaded.settings.failMode);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      loadGame();
    }, [loadGame])
  );

  if (!game) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>{t("loading")}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert(t("error"), t("required"));
      return;
    }

    setIsLoading(true);
    try {
      // Update game info
      await updateGame(id, (g) => ({
        ...g,
        title: title.trim(),
        note: note.trim() || undefined,
      }));

      // Update settings (this will recalculate scores)
      await updateGameSettings(id, {
        targetScore: targetScore > 0 ? targetScore : undefined,
        failMode,
      });

      await refreshGames();
      router.back();
    } catch (error) {
      console.error("Error saving settings:", error);
      Alert.alert(t("error"), String(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const failModeOptions = [
    {
      label: t("failMode_minusBid_opponentZero"),
      value: "minusBid_opponentZero" as FailMode,
    },
    {
      label: t("failMode_minusBid_opponentTricks"),
      value: "minusBid_opponentTricks" as FailMode,
    },
    {
      label: t("failMode_minusBid_opponentDifference"),
      value: "minusBid_opponentDifference" as FailMode,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, isRTL && styles.headerRTL]}>
        <Button
          title={t("cancel")}
          onPress={handleCancel}
          variant="ghost"
          size="sm"
        />
        <Text style={styles.headerTitle}>{t("gameSettings")}</Text>
        <Button
          title={t("save")}
          onPress={handleSave}
          variant="primary"
          size="sm"
          loading={isLoading}
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Game Info */}
        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, isRTL && styles.textRTL]}>
            {t("game")}
          </Text>
          <Input
            label={t("gameTitle")}
            value={title}
            onChangeText={setTitle}
            placeholder={t("gameTitle")}
          />
          <Input
            label={t("gameNote")}
            value={note}
            onChangeText={setNote}
            placeholder={t("gameNote")}
            multiline
            numberOfLines={2}
          />
        </Card>

        {/* Scoring Settings */}
        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, isRTL && styles.textRTL]}>
            {t("settings")}
          </Text>

          <NumberInput
            label={t("targetScore")}
            value={targetScore}
            onChange={setTargetScore}
            min={0}
            max={100}
            step={5}
          />
          <Text style={[styles.description, isRTL && styles.textRTL]}>
            {t("targetScoreDescription")} (0 = {t("no")})
          </Text>
        </Card>

        {/* Fail Mode */}
        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, isRTL && styles.textRTL]}>
            {t("failMode")}
          </Text>
          <Text style={[styles.description, isRTL && styles.textRTL]}>
            {t("failModeDescription")}
          </Text>
          {failModeOptions.map((option) => (
            <Button
              key={option.value}
              title={option.label}
              onPress={() => setFailMode(option.value)}
              variant={failMode === option.value ? "primary" : "secondary"}
              size="md"
              fullWidth
              style={styles.optionButton}
            />
          ))}
        </Card>

        {game.rounds.length > 0 && (
          <Card style={styles.warningCard}>
            <Text style={[styles.warningText, isRTL && styles.textRTL]}>
              ⚠️ تغيير الإعدادات سيعيد حساب كل الصكات
            </Text>
          </Card>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: colors.text.muted,
    fontSize: typography.size.base,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.primary,
  },
  headerRTL: {
    flexDirection: "row-reverse",
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
    marginBottom: spacing.md,
  },
  textRTL: {
    textAlign: "right",
  },
  description: {
    fontSize: typography.size.sm,
    color: colors.text.muted,
    marginTop: -spacing.sm,
    marginBottom: spacing.md,
  },
  optionButton: {
    marginBottom: spacing.sm,
  },
  warningCard: {
    backgroundColor: colors.warning.primary + "20",
    borderColor: colors.warning.primary,
    borderWidth: 1,
  },
  warningText: {
    color: colors.warning.primary,
    fontSize: typography.size.sm,
    textAlign: "center",
  },
  bottomPadding: {
    height: spacing.xl * 2,
  },
});
