/**
 * Whist Score - New Game Screen (Simplified with Team Names Only)
 */

import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Card, Input, NumberInput } from "../components";
import { t } from "../i18n";
import { useGames } from "../lib/context";
import { getRandomGameName } from "../lib/gameNames";
import { createGame } from "../lib/storage";
import { borderRadius, colors, spacing, typography } from "../lib/theme";
import { DEFAULT_GAME_SETTINGS, FailMode, GameInput } from "../lib/types";

export default function NewGameScreen() {
  const router = useRouter();
  const { refreshGames } = useGames();

  // Form state
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [teamAName, setTeamAName] = useState("");
  const [teamBName, setTeamBName] = useState("");
  const [targetScore, setTargetScore] = useState(
    DEFAULT_GAME_SETTINGS.targetScore || 25
  );
  const [failMode, setFailMode] = useState<FailMode>(
    DEFAULT_GAME_SETTINGS.failMode
  );
  const [maxRounds, setMaxRounds] = useState(
    DEFAULT_GAME_SETTINGS.maxRounds || 4
  );
  const [unlimitedRounds, setUnlimitedRounds] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Auto-generate a fun game name on mount
  useEffect(() => {
    setTitle(getRandomGameName());
  }, []);

  // Generate a new random name
  const regenerateName = () => {
    setTitle(getRandomGameName());
  };

  const handleCreate = async () => {
    const gameTitle = title.trim() || getRandomGameName();

    setIsLoading(true);
    try {
      const input: GameInput = {
        title: gameTitle,
        note: note.trim() || undefined,
        teamAName: teamAName.trim() || undefined,
        teamBName: teamBName.trim() || undefined,
        settings: {
          targetScore,
          failMode,
          maxRounds: unlimitedRounds ? undefined : maxRounds,
        },
      };

      const game = await createGame(input);
      await refreshGames();
      router.replace(`/game/${game.id}`);
    } catch (error) {
      console.error("Error creating game:", error);
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
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel} style={styles.closeBtn}>
          <Text style={styles.closeBtnText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("newGame")}</Text>
        <TouchableOpacity
          onPress={handleCreate}
          style={[styles.createBtn, isLoading && styles.createBtnDisabled]}
          disabled={isLoading}
        >
          <Text style={styles.createBtnText}>
            {isLoading ? "..." : t("create")}
          </Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Game Info */}
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>{t("game")}</Text>

            {/* Game Title with Regenerate Button */}
            <View style={styles.titleInputContainer}>
              <View style={styles.titleInputWrapper}>
                <Input
                  label={t("gameTitle")}
                  value={title}
                  onChangeText={setTitle}
                  placeholder={t("gameTitle")}
                  containerStyle={styles.titleInput}
                />
              </View>
              <TouchableOpacity
                style={styles.regenerateButton}
                onPress={regenerateName}
              >
                <Text style={styles.regenerateIcon}>🎲</Text>
              </TouchableOpacity>
            </View>

            <Input
              label={t("gameNote")}
              value={note}
              onChangeText={setNote}
              placeholder={t("gameNote")}
              multiline
              numberOfLines={2}
            />
          </Card>

          {/* Teams */}
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>{t("teams")}</Text>

            {/* Team A */}
            <View style={styles.teamSection}>
              <View style={styles.teamHeader}>
                <View style={[styles.teamBadge, styles.teamABadge]}>
                  <Text style={styles.teamBadgeText}>{t("us")}</Text>
                </View>
              </View>
              <Input
                label={t("teamAName")}
                value={teamAName}
                onChangeText={setTeamAName}
                placeholder={t("us")}
              />
            </View>

            {/* Team B */}
            <View style={styles.teamSection}>
              <View style={styles.teamHeader}>
                <View style={[styles.teamBadge, styles.teamBBadge]}>
                  <Text style={styles.teamBadgeText}>{t("them")}</Text>
                </View>
              </View>
              <Input
                label={t("teamBName")}
                value={teamBName}
                onChangeText={setTeamBName}
                placeholder={t("them")}
              />
            </View>
          </Card>

          {/* Settings */}
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>{t("gameSettings")}</Text>

            {/* Max Rounds Setting */}
            <View style={styles.roundsSettingContainer}>
              <View style={styles.roundsToggleRow}>
                <Text style={styles.label}>{t("maxRounds")}</Text>
                <View style={styles.unlimitedToggle}>
                  <Text style={styles.unlimitedLabel}>
                    {t("unlimitedRounds")}
                  </Text>
                  <Switch
                    value={unlimitedRounds}
                    onValueChange={setUnlimitedRounds}
                    trackColor={{
                      false: colors.surface.tertiary,
                      true: "#0ea5e9",
                    }}
                    thumbColor="#ffffff"
                  />
                </View>
              </View>
              {!unlimitedRounds && (
                <NumberInput
                  value={maxRounds}
                  onChange={setMaxRounds}
                  min={1}
                  max={20}
                  step={1}
                />
              )}
              <Text style={styles.settingDescription}>
                {t("maxRoundsDescription")}
              </Text>
            </View>

            <NumberInput
              label={t("targetScore")}
              value={targetScore}
              onChange={setTargetScore}
              min={10}
              max={100}
              step={5}
            />
            <Text style={styles.settingDescription}>
              {t("targetScoreDescription")}
            </Text>

            <View style={styles.failModeContainer}>
              <Text style={styles.label}>{t("failMode")}</Text>
              <Text style={styles.settingDescription}>
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
                  style={styles.failModeButton}
                />
              ))}
            </View>
          </Card>

          <View style={styles.bottomPadding} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.primary,
  },
  closeBtn: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtnText: {
    fontSize: 20,
    color: colors.text.secondary,
  },
  headerTitle: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
  },
  createBtn: {
    backgroundColor: "#0ea5e9",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 20,
  },
  createBtnDisabled: {
    opacity: 0.5,
  },
  createBtnText: {
    fontSize: typography.size.base,
    fontWeight: typography.weight.bold,
    color: "#ffffff",
  },
  keyboardView: {
    flex: 1,
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
    marginBottom: spacing.lg,
    textAlign: "right",
  },
  titleInputContainer: {
    flexDirection: "row-reverse",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  titleInputWrapper: {
    flex: 1,
  },
  titleInput: {
    marginBottom: 0,
  },
  regenerateButton: {
    marginTop: 28,
    width: 48,
    height: 48,
    backgroundColor: colors.surface.secondary,
    borderRadius: borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border.primary,
  },
  regenerateIcon: {
    fontSize: 24,
  },
  teamSection: {
    marginBottom: spacing.md,
  },
  teamHeader: {
    flexDirection: "row-reverse",
    marginBottom: spacing.sm,
  },
  teamBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  teamABadge: {
    backgroundColor: "#16a34a",
  },
  teamBBadge: {
    backgroundColor: "#f59e0b",
  },
  teamBadgeText: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: "#ffffff",
  },
  label: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
    textAlign: "right",
  },
  settingDescription: {
    fontSize: typography.size.sm,
    color: colors.text.muted,
    marginBottom: spacing.md,
    marginTop: -spacing.sm,
    textAlign: "right",
  },
  failModeContainer: {
    marginTop: spacing.md,
  },
  failModeButton: {
    marginBottom: spacing.sm,
  },
  roundsSettingContainer: {
    marginBottom: spacing.lg,
  },
  roundsToggleRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  unlimitedToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  unlimitedLabel: {
    fontSize: typography.size.sm,
    color: colors.text.muted,
  },
  bottomPadding: {
    height: spacing.xxl,
  },
});
