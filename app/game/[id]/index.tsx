/**
 * Whist Score - Game Details Screen
 */

import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { t } from "../../../i18n";
import { useGames } from "../../../lib/context";
import { getLeadingTeam } from "../../../lib/scoring";
import {
  deleteGame,
  finishGame,
  getGame,
  reopenGame,
  undoLastRound,
} from "../../../lib/storage";
import { colors, spacing, typography } from "../../../lib/theme";
import { Game } from "../../../lib/types";

export default function GameDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { refreshGames } = useGames();

  const [game, setGame] = useState<Game | null>(null);
  const [showGameOverModal, setShowGameOverModal] = useState(false);

  const loadGame = useCallback(async () => {
    if (!id) return;
    const loaded = await getGame(id);
    setGame((prevGame) => {
      // Show game over modal when game just became finished
      if (loaded && loaded.isFinished && prevGame && !prevGame.isFinished) {
        setShowGameOverModal(true);
      }
      return loaded;
    });
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchGame = async () => {
        if (!id) return;
        const loaded = await getGame(id);
        if (isActive) {
          setGame((prevGame) => {
            // Show game over modal when game just became finished
            if (
              loaded &&
              loaded.isFinished &&
              prevGame &&
              !prevGame.isFinished
            ) {
              setShowGameOverModal(true);
            }
            return loaded;
          });
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
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>{t("loading")}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const leadingTeam = getLeadingTeam(game);

  const handleAddRound = () => {
    router.push(`/game/${id}/add-round`);
  };

  const handleUndo = async () => {
    if (game.rounds.length === 0) return;
    await undoLastRound(id);
    await loadGame();
    await refreshGames();
  };

  const handleFinishGame = async () => {
    Alert.alert(t("finishGame"), t("confirm"), [
      { text: t("cancel"), style: "cancel" },
      {
        text: t("confirm"),
        onPress: async () => {
          await finishGame(id);
          await loadGame();
          await refreshGames();
        },
      },
    ]);
  };

  const handleReopenGame = async () => {
    await reopenGame(id);
    await loadGame();
    await refreshGames();
  };

  const handleDeleteGame = () => {
    Alert.alert(t("deleteGame"), t("deleteGameConfirm"), [
      { text: t("cancel"), style: "cancel" },
      {
        text: t("delete"),
        style: "destructive",
        onPress: async () => {
          await deleteGame(id);
          await refreshGames();
          router.back();
        },
      },
    ]);
  };

  const handleNewGame = () => {
    router.push("/new-game");
  };

  const winnerTeamName =
    game.winnerTeam === "A"
      ? game.teamAName || t("us")
      : game.winnerTeam === "B"
      ? game.teamBName || t("them")
      : null;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Game Over Modal */}
      <Modal
        visible={showGameOverModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowGameOverModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalEmoji}>🏆</Text>
            <Text style={styles.modalTitle}>{t("gameOver")}</Text>
            {winnerTeamName ? (
              <Text style={styles.modalWinner}>
                {t("teamWins", { team: winnerTeamName })}
              </Text>
            ) : (
              <Text style={styles.modalWinner}>{t("finished")}</Text>
            )}
            <View style={styles.modalScores}>
              <View style={styles.modalScoreItem}>
                <Text style={styles.modalTeamName}>
                  {game.teamAName || t("us")}
                </Text>
                <Text
                  style={[
                    styles.modalScore,
                    game.winnerTeam === "A" && styles.modalScoreWinner,
                  ]}
                >
                  {game.totalScoreTeamA}
                </Text>
              </View>
              <Text style={styles.modalVs}>-</Text>
              <View style={styles.modalScoreItem}>
                <Text style={styles.modalTeamName}>
                  {game.teamBName || t("them")}
                </Text>
                <Text
                  style={[
                    styles.modalScore,
                    game.winnerTeam === "B" && styles.modalScoreWinner,
                  ]}
                >
                  {game.totalScoreTeamB}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowGameOverModal(false)}
            >
              <Text style={styles.modalButtonText}>{t("ok")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <Text style={styles.closeBtnText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {game.title}
        </Text>
        <TouchableOpacity onPress={handleDeleteGame} style={styles.deleteBtn}>
          <Text style={styles.deleteBtnText}>🗑</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Score Display - Baloot Style */}
        <View style={styles.scoreSection}>
          {/* Team Labels */}
          <View style={styles.teamLabels}>
            <Text style={styles.teamLabel}>{t("us")}</Text>
            <Text style={styles.teamLabel}>{t("them")}</Text>
          </View>

          {/* Score Row with Arrow */}
          <View style={styles.scoreRow}>
            <View
              style={[
                styles.scoreBox,
                leadingTeam === "A" && styles.scoreBoxWinning,
              ]}
            >
              <Text
                style={[
                  styles.scoreText,
                  leadingTeam === "A" && styles.scoreTextWinning,
                ]}
              >
                {game.totalScoreTeamA}
              </Text>
            </View>

            <View style={styles.arrowContainer}>
              {leadingTeam === "A" ? (
                <Text style={styles.arrow}>→</Text>
              ) : leadingTeam === "B" ? (
                <Text style={styles.arrow}>←</Text>
              ) : (
                <Text style={styles.arrowNeutral}>-</Text>
              )}
            </View>

            <View
              style={[
                styles.scoreBox,
                leadingTeam === "B" && styles.scoreBoxWinning,
              ]}
            >
              <Text
                style={[
                  styles.scoreText,
                  leadingTeam === "B" && styles.scoreTextWinning,
                ]}
              >
                {game.totalScoreTeamB}
              </Text>
            </View>
          </View>

          {/* Finished Banner */}
          {game.isFinished && (
            <View style={styles.finishedBanner}>
              <Text style={styles.finishedText}>
                {leadingTeam === "A"
                  ? `🏆 ${t("us")} ${t("winner")}!`
                  : leadingTeam === "B"
                  ? `🏆 ${t("them")} ${t("winner")}!`
                  : t("finished")}
              </Text>
            </View>
          )}
        </View>

        {/* Rounds History Table */}
        {game.rounds.length > 0 && (
          <View style={styles.historySection}>
            <Text style={styles.sectionTitle}>{t("rounds")}</Text>

            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>#</Text>
              <Text style={styles.tableHeaderText}>{t("us")}</Text>
              <Text style={styles.tableHeaderText}>{t("them")}</Text>
            </View>

            {/* Table Rows */}
            {game.rounds.map((round, index) => (
              <View key={round.id} style={styles.tableRow}>
                <Text style={styles.tableCell}>{index + 1}</Text>
                <Text
                  style={[
                    styles.tableCell,
                    round.scoreTeamA > round.scoreTeamB && styles.tableCellWin,
                  ]}
                >
                  {round.scoreTeamA}
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    round.scoreTeamB > round.scoreTeamA && styles.tableCellWin,
                  ]}
                >
                  {round.scoreTeamB}
                </Text>
              </View>
            ))}

            {/* Total Row */}
            <View style={styles.tableTotalRow}>
              <Text style={styles.tableTotalLabel}>{t("total")}</Text>
              <Text style={styles.tableTotalCell}>{game.totalScoreTeamA}</Text>
              <Text style={styles.tableTotalCell}>{game.totalScoreTeamB}</Text>
            </View>
          </View>
        )}

        {/* Empty State */}
        {game.rounds.length === 0 && !game.isFinished && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🃏</Text>
            <Text style={styles.emptyText}>{t("noRounds")}</Text>
            <Text style={styles.emptySubtext}>{t("noRoundsDescription")}</Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        {!game.isFinished ? (
          <>
            {/* Main Action Buttons Row */}
            <View style={styles.mainActionsRow}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={handleUndo}
                disabled={game.rounds.length === 0}
              >
                <Text
                  style={[
                    styles.actionBtnText,
                    game.rounds.length === 0 && styles.actionBtnTextDisabled,
                  ]}
                >
                  ↶
                </Text>
                <Text
                  style={[
                    styles.actionBtnLabel,
                    game.rounds.length === 0 && styles.actionBtnTextDisabled,
                  ]}
                >
                  {t("undo")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.calculateBtn}
                onPress={handleAddRound}
              >
                <Text style={styles.calculateBtnText}>{t("calculate")}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionBtn}
                onPress={handleFinishGame}
              >
                <Text style={styles.actionBtnText}>✓</Text>
                <Text style={styles.actionBtnLabel}>{t("finishGame")}</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.finishedActions}>
            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={handleReopenGame}
            >
              <Text style={styles.secondaryBtnText}>{t("reopenGame")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryBtn} onPress={handleNewGame}>
              <Text style={styles.primaryBtnText}>{t("newGame")}</Text>
            </TouchableOpacity>
          </View>
        )}
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
    alignItems: "center",
    justifyContent: "space-between",
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
    flex: 1,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    textAlign: "center",
  },
  deleteBtn: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteBtnText: {
    fontSize: 18,
  },

  // Content
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.lg,
  },

  // Score Section
  scoreSection: {
    marginBottom: spacing.xl,
  },
  teamLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
  },
  teamLabel: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: colors.text.secondary,
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.lg,
  },
  scoreBox: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: colors.surface.secondary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.border.primary,
  },
  scoreBoxWinning: {
    backgroundColor: "#16a34a",
    borderColor: "#22c55e",
  },
  scoreText: {
    fontSize: 42,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
  },
  scoreTextWinning: {
    color: "#ffffff",
  },
  arrowContainer: {
    width: 50,
    alignItems: "center",
  },
  arrow: {
    fontSize: 32,
    color: "#22c55e",
  },
  arrowNeutral: {
    fontSize: 32,
    color: colors.text.muted,
  },
  finishedBanner: {
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: "#16a34a",
    borderRadius: 12,
    alignItems: "center",
  },
  finishedText: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    color: "#ffffff",
  },

  // History Section
  historySection: {
    marginTop: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.md,
    textAlign: "center",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: colors.surface.tertiary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.xs,
  },
  tableHeaderText: {
    flex: 1,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: colors.text.muted,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.primary,
  },
  tableCell: {
    flex: 1,
    fontSize: typography.size.base,
    color: colors.text.secondary,
    textAlign: "center",
  },
  tableCellWin: {
    color: "#22c55e",
    fontWeight: typography.weight.bold,
  },
  tableTotalRow: {
    flexDirection: "row",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface.secondary,
    borderRadius: 8,
    marginTop: spacing.xs,
  },
  tableTotalLabel: {
    flex: 1,
    fontSize: typography.size.base,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    textAlign: "center",
  },
  tableTotalCell: {
    flex: 1,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    textAlign: "center",
  },

  // Empty State
  emptyState: {
    alignItems: "center",
    paddingVertical: spacing.xxxl,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  emptyText: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  emptySubtext: {
    fontSize: typography.size.base,
    color: colors.text.muted,
    textAlign: "center",
  },

  // Bottom Actions
  bottomActions: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    paddingBottom: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.border.primary,
    backgroundColor: colors.background.primary,
  },
  mainActionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  actionBtn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    minWidth: 70,
  },
  actionBtnText: {
    fontSize: 28,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  actionBtnLabel: {
    fontSize: typography.size.xs,
    color: colors.text.muted,
  },
  actionBtnTextDisabled: {
    color: colors.text.muted,
    opacity: 0.4,
  },
  calculateBtn: {
    flex: 1,
    backgroundColor: "#0ea5e9",
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: 30,
    alignItems: "center",
  },
  calculateBtnText: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: "#ffffff",
  },
  finishedActions: {
    flexDirection: "row",
    gap: spacing.md,
  },
  secondaryBtn: {
    flex: 1,
    backgroundColor: colors.surface.secondary,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: "center",
  },
  secondaryBtnText: {
    fontSize: typography.size.base,
    fontWeight: typography.weight.semibold,
    color: colors.text.secondary,
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: "#0ea5e9",
    paddingVertical: spacing.md,
    borderRadius: 24,
    alignItems: "center",
  },
  primaryBtnText: {
    fontSize: typography.size.base,
    fontWeight: typography.weight.bold,
    color: "#ffffff",
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  modalContent: {
    backgroundColor: colors.surface.primary,
    borderRadius: 24,
    padding: spacing.xl,
    alignItems: "center",
    width: "100%",
    maxWidth: 320,
  },
  modalEmoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  modalTitle: {
    fontSize: typography.size["2xl"],
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  modalWinner: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.semibold,
    color: "#22c55e",
    marginBottom: spacing.lg,
  },
  modalScores: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  modalScoreItem: {
    alignItems: "center",
  },
  modalTeamName: {
    fontSize: typography.size.base,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  modalScore: {
    fontSize: typography.size["3xl"],
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
  },
  modalScoreWinner: {
    color: "#22c55e",
  },
  modalVs: {
    fontSize: typography.size.xl,
    color: colors.text.muted,
  },
  modalButton: {
    backgroundColor: "#0ea5e9",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xxxl,
    borderRadius: 24,
  },
  modalButtonText: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    color: "#ffffff",
  },
});
