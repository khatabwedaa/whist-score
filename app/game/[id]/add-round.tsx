/**
 * Whist Score - Add Round Screen
 */

import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollPicker } from "../../../components";
import { getRoundOrdinalName, t } from "../../../i18n";
import { useGames } from "../../../lib/context";
import { calculateRoundScore } from "../../../lib/scoring";
import { addRound, getGame } from "../../../lib/storage";
import { colors, spacing, typography } from "../../../lib/theme";
import { Game, RoundInput, TeamId, TOTAL_TRICKS } from "../../../lib/types";

export default function AddRoundScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { refreshGames } = useGames();

  const [game, setGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [declarerTeam, setDeclarerTeam] = useState<TeamId>("A");
  const [bid, setBid] = useState(7);
  const [tricksTeamA, setTricksTeamA] = useState(7);
  const [tricksTeamB, setTricksTeamB] = useState(6);

  const loadGame = useCallback(async () => {
    if (!id) return;
    const loaded = await getGame(id);
    setGame(loaded);
    if (loaded) {
      setBid(loaded.settings.minBid);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchGame = async () => {
        if (!id) return;
        const loaded = await getGame(id);
        if (isActive && loaded) {
          setGame(loaded);
          setBid(loaded.settings.minBid);
        }
      };

      fetchGame();

      return () => {
        isActive = false;
      };
    }, [id])
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

  // Calculate preview scores
  const roundInput: RoundInput = {
    declarerTeam,
    bid,
    tricksTeamA,
    tricksTeamB,
  };

  const tricksValid = tricksTeamA + tricksTeamB === TOTAL_TRICKS;
  const bidValid = bid >= game.settings.minBid && bid <= game.settings.maxBid;
  const isValid = tricksValid && bidValid;

  let previewScoreA = 0;
  let previewScoreB = 0;

  if (isValid) {
    const result = calculateRoundScore(roundInput, game.settings);
    previewScoreA = result.scoreTeamA;
    previewScoreB = result.scoreTeamB;
  }

  // Handle tricks adjustment - keep total at 13
  const handleTricksTeamAChange = (value: number) => {
    setTricksTeamA(value);
    setTricksTeamB(TOTAL_TRICKS - value);
  };

  const handleTricksTeamBChange = (value: number) => {
    setTricksTeamB(value);
    setTricksTeamA(TOTAL_TRICKS - value);
  };

  const handleSave = async () => {
    if (!isValid) {
      Alert.alert(t("error"), t("tricksMustEqual13"));
      return;
    }

    setIsLoading(true);
    try {
      await addRound(id, roundInput);
      await refreshGames();
      router.back();
    } catch (error) {
      console.error("Error adding round:", error);
      Alert.alert(t("error"), String(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel} style={styles.closeBtn}>
          <Text style={styles.closeBtnText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {getRoundOrdinalName(game.rounds.length + 1)}
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Declarer Team Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t("declarer")}</Text>
          <View style={styles.teamSelector}>
            <TouchableOpacity
              style={[
                styles.teamBtn,
                declarerTeam === "A" && styles.teamBtnActiveA,
              ]}
              onPress={() => setDeclarerTeam("A")}
            >
              <Text
                style={[
                  styles.teamBtnText,
                  declarerTeam === "A" && styles.teamBtnTextActive,
                ]}
              >
                {t("us")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.teamBtn,
                declarerTeam === "B" && styles.teamBtnActiveB,
              ]}
              onPress={() => setDeclarerTeam("B")}
            >
              <Text
                style={[
                  styles.teamBtnText,
                  declarerTeam === "B" && styles.teamBtnTextActive,
                ]}
              >
                {t("them")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bid Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t("bid")}</Text>
          <View style={styles.pickerContainer}>
            <ScrollPicker
              value={bid}
              onChange={setBid}
              min={game.settings.minBid}
              max={game.settings.maxBid}
            />
          </View>
        </View>

        {/* Tricks Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t("tricksWon")}</Text>
          <View style={styles.tricksRow}>
            <View style={styles.tricksColumn}>
              <Text style={styles.tricksTeamLabel}>{t("us")}</Text>
              <View style={styles.pickerContainer}>
                <ScrollPicker
                  value={tricksTeamA}
                  onChange={handleTricksTeamAChange}
                  min={0}
                  max={TOTAL_TRICKS}
                />
              </View>
            </View>
            <View style={styles.tricksDivider}>
              <Text style={styles.tricksDividerText}>:</Text>
            </View>
            <View style={styles.tricksColumn}>
              <Text style={styles.tricksTeamLabel}>{t("them")}</Text>
              <View style={styles.pickerContainer}>
                <ScrollPicker
                  value={tricksTeamB}
                  onChange={handleTricksTeamBChange}
                  min={0}
                  max={TOTAL_TRICKS}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Preview */}
        <View style={styles.previewSection}>
          <Text style={styles.previewLabel}>{t("score")}</Text>
          <View style={styles.previewRow}>
            <View style={styles.previewItem}>
              <Text style={styles.previewTeam}>{t("us")}</Text>
              <Text
                style={[
                  styles.previewScore,
                  previewScoreA > 0 && styles.previewScorePositive,
                  previewScoreA < 0 && styles.previewScoreNegative,
                ]}
              >
                {previewScoreA > 0 ? `+${previewScoreA}` : previewScoreA}
              </Text>
            </View>
            <View style={styles.previewItem}>
              <Text style={styles.previewTeam}>{t("them")}</Text>
              <Text
                style={[
                  styles.previewScore,
                  previewScoreB > 0 && styles.previewScorePositive,
                  previewScoreB < 0 && styles.previewScoreNegative,
                ]}
              >
                {previewScoreB > 0 ? `+${previewScoreB}` : previewScoreB}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.saveBtn, !isValid && styles.saveBtnDisabled]}
          onPress={handleSave}
          disabled={!isValid || isLoading}
        >
          <Text style={styles.saveBtnText}>
            {isLoading ? "..." : t("save")}
          </Text>
        </TouchableOpacity>
      </View>
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

  // Header
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
  headerSpacer: {
    width: 44,
  },

  // Content
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },

  // Sections
  section: {
    marginBottom: spacing.xl,
  },
  sectionLabel: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold,
    color: colors.text.primary,
    textAlign: "center",
    marginBottom: spacing.md,
  },

  // Team Selector
  teamSelector: {
    flexDirection: "row",
    backgroundColor: colors.surface.secondary,
    borderRadius: 30,
    padding: 4,
  },
  teamBtn: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: 26,
    alignItems: "center",
  },
  teamBtnActiveA: {
    backgroundColor: "#16a34a",
  },
  teamBtnActiveB: {
    backgroundColor: "#f59e0b",
  },
  teamBtnText: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold,
    color: colors.text.muted,
  },
  teamBtnTextActive: {
    color: "#ffffff",
  },

  // Picker
  pickerContainer: {
    alignItems: "center",
  },

  // Tricks
  tricksRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tricksColumn: {
    flex: 1,
    alignItems: "center",
  },
  tricksTeamLabel: {
    fontSize: typography.size.base,
    fontWeight: typography.weight.semibold,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  tricksDivider: {
    width: 40,
    alignItems: "center",
  },
  tricksDividerText: {
    fontSize: 32,
    color: colors.text.muted,
    marginTop: 30,
  },
  tricksValueBox: {
    width: 100,
    height: 100,
    backgroundColor: colors.surface.secondary,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  tricksValueText: {
    fontSize: 36,
    fontWeight: typography.weight.bold,
    color: colors.text.secondary,
  },

  // Preview
  previewSection: {
    backgroundColor: colors.surface.secondary,
    borderRadius: 24,
    padding: spacing.lg,
    marginTop: spacing.md,
  },
  previewLabel: {
    fontSize: typography.size.base,
    color: colors.text.muted,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  previewRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  previewItem: {
    alignItems: "center",
  },
  previewTeam: {
    fontSize: typography.size.sm,
    color: colors.text.tertiary,
    marginBottom: 4,
  },
  previewScore: {
    fontSize: 36,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
  },
  previewScorePositive: {
    color: "#22c55e",
  },
  previewScoreNegative: {
    color: "#ef4444",
  },

  // Footer
  footer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    paddingBottom: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.border.primary,
  },
  saveBtn: {
    backgroundColor: "#0ea5e9",
    paddingVertical: spacing.lg,
    borderRadius: 30,
    alignItems: "center",
  },
  saveBtnDisabled: {
    opacity: 0.5,
  },
  saveBtnText: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: "#ffffff",
  },
});
