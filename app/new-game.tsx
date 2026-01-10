/**
 * West Score - New Game Screen
 */

import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
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

  // Form state - auto-generate title on mount
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player3, setPlayer3] = useState("");
  const [player4, setPlayer4] = useState("");
  const [targetScore, setTargetScore] = useState(
    DEFAULT_GAME_SETTINGS.targetScore || 25
  );
  const [failMode, setFailMode] = useState<FailMode>(
    DEFAULT_GAME_SETTINGS.failMode
  );
  const [isLoading, setIsLoading] = useState(false);

  // Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-generate a fun game name on mount
  useEffect(() => {
    setTitle(getRandomGameName());
  }, []);

  // Generate a new random name
  const regenerateName = () => {
    setTitle(getRandomGameName());
  };

  const validate = (): boolean => {
    // Title is auto-generated, so just make sure it's not empty
    if (!title.trim()) {
      setTitle(getRandomGameName());
    }
    return true;
  };

  const handleCreate = async () => {
    if (!validate()) return;

    setIsLoading(true);
    try {
      const input: GameInput = {
        title: title.trim(),
        note: note.trim() || undefined,
        players: [
          { name: player1.trim() || t("player1"), team: "A" },
          { name: player2.trim() || t("player2"), team: "B" },
          { name: player3.trim() || t("player3"), team: "A" },
          { name: player4.trim() || t("player4"), team: "B" },
        ],
        settings: {
          targetScore,
          failMode,
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
        <Button
          title={t("cancel")}
          onPress={handleCancel}
          variant="ghost"
          size="sm"
        />
        <Text style={styles.headerTitle}>{t("newGame")}</Text>
        <Button
          title={t("create")}
          onPress={handleCreate}
          variant="primary"
          size="sm"
          loading={isLoading}
        />
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
                  error={errors.title}
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

          {/* Players */}
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>{t("players")}</Text>

            {/* Team A */}
            <View style={styles.teamSection}>
              <View style={styles.teamHeader}>
                <View style={[styles.teamBadge, styles.teamABadge]}>
                  <Text style={styles.teamBadgeText}>{t("teamA")}</Text>
                </View>
              </View>
              <Input
                label={t("player1")}
                value={player1}
                onChangeText={setPlayer1}
                placeholder={t("playerName")}
              />
              <Input
                label={t("player3")}
                value={player3}
                onChangeText={setPlayer3}
                placeholder={t("playerName")}
              />
            </View>

            {/* Team B */}
            <View style={styles.teamSection}>
              <View style={styles.teamHeader}>
                <View style={[styles.teamBadge, styles.teamBBadge]}>
                  <Text style={styles.teamBadgeText}>{t("teamB")}</Text>
                </View>
              </View>
              <Input
                label={t("player2")}
                value={player2}
                onChangeText={setPlayer2}
                placeholder={t("playerName")}
              />
              <Input
                label={t("player4")}
                value={player4}
                onChangeText={setPlayer4}
                placeholder={t("playerName")}
              />
            </View>
          </Card>

          {/* Settings */}
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>{t("gameSettings")}</Text>

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
  },
  textRTL: {
    textAlign: "right",
  },
  titleInputContainer: {
    flexDirection: "row",
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
    flexDirection: "row",
    marginBottom: spacing.md,
  },
  teamHeaderRTL: {
    flexDirection: "row-reverse",
  },
  teamBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  teamABadge: {
    backgroundColor: colors.teamA.primary,
  },
  teamBBadge: {
    backgroundColor: colors.teamB.primary,
  },
  teamBadgeText: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: colors.text.inverse,
  },
  label: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  settingDescription: {
    fontSize: typography.size.sm,
    color: colors.text.muted,
    marginBottom: spacing.md,
    marginTop: -spacing.sm,
  },
  failModeContainer: {
    marginTop: spacing.md,
  },
  failModeButton: {
    marginBottom: spacing.sm,
  },
  bottomPadding: {
    height: spacing.xxl,
  },
});
