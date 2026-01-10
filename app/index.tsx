/**
 * Whist Score - Home Screen
 */

import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppLogo } from "../components";
import { t } from "../i18n";
import { useGames } from "../lib/context";
import { colors, spacing, typography } from "../lib/theme";
import { Game } from "../lib/types";

export default function HomeScreen() {
  const router = useRouter();
  const { games, isLoading, refreshGames } = useGames();

  useFocusEffect(
    useCallback(() => {
      refreshGames();
    }, [refreshGames])
  );

  const handleNewGame = () => {
    router.push("/new-game");
  };

  const handleOpenGame = (game: Game) => {
    router.push(`/game/${game.id}`);
  };

  const handleOpenSettings = () => {
    router.push("/settings");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (dateString.split("T")[0] === today.toISOString().split("T")[0]) {
      return t("today");
    } else if (
      dateString.split("T")[0] === yesterday.toISOString().split("T")[0]
    ) {
      return t("yesterday");
    }

    return date.toLocaleDateString("ar-SD", { day: "numeric", month: "short" });
  };

  const renderGame = ({ item }: { item: Game }) => {
    const isFinished = item.isFinished;
    const leadingTeam =
      item.totalScoreTeamA > item.totalScoreTeamB
        ? "A"
        : item.totalScoreTeamB > item.totalScoreTeamA
        ? "B"
        : null;

    const gameDate = item.date || item.createdAt;

    return (
      <TouchableOpacity
        style={styles.gameCard}
        onPress={() => handleOpenGame(item)}
        activeOpacity={0.7}
      >
        {/* Date Badge */}
        <View style={styles.dateRow}>
          <Text style={styles.dateText}>{formatDate(gameDate)}</Text>
          <View
            style={[styles.statusBadge, isFinished && styles.finishedBadge]}
          >
            <Text style={styles.statusText}>
              {isFinished ? t("finished") : t("inProgress")}
            </Text>
          </View>
        </View>

        {/* Teams vs Teams */}
        <View style={styles.teamsRow}>
          <View style={styles.teamContainer}>
            <Text
              style={[
                styles.teamName,
                leadingTeam === "A" && styles.winningTeam,
              ]}
            >
              {item.teamAName || t("us")}
            </Text>
            <Text
              style={[
                styles.teamScoreValue,
                leadingTeam === "A" && styles.winningScore,
              ]}
            >
              {item.totalScoreTeamA}
            </Text>
          </View>

          <View style={styles.vsContainer}>
            <Text style={styles.vsText}>{t("vs")}</Text>
          </View>

          <View style={styles.teamContainer}>
            <Text
              style={[
                styles.teamName,
                leadingTeam === "B" && styles.winningTeam,
              ]}
            >
              {item.teamBName || t("them")}
            </Text>
            <Text
              style={[
                styles.teamScoreValue,
                leadingTeam === "B" && styles.winningScore,
              ]}
            >
              {item.totalScoreTeamB}
            </Text>
          </View>
        </View>

        {/* Rounds info */}
        <View style={styles.bottomRow}>
          <Text style={styles.roundsInfo}>
            {item.rounds.length} {t("rounds")}
          </Text>
          {item.settings.maxRounds && (
            <Text style={styles.maxRoundsInfo}>
              / {item.settings.maxRounds}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>🎴</Text>
      <Text style={styles.emptyTitle}>{t("noGames")}</Text>
      <Text style={styles.emptyDescription}>{t("noGamesDescription")}</Text>
      <TouchableOpacity style={styles.startButton} onPress={handleNewGame}>
        <Text style={styles.startButtonText}>{t("newGame")}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header with App Logo */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleOpenSettings}
        >
          <Text style={styles.iconButtonText}>ℹ️</Text>
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.appName}>{t("appName")}</Text>
            <Text style={styles.tagline}>{t("appTagline")}</Text>
          </View>
          <AppLogo size="sm" />
        </View>
      </View>

      {/* Games List */}
      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={renderGame}
        contentContainerStyle={[
          styles.listContent,
          games.length === 0 && styles.emptyList,
        ]}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refreshGames}
            tintColor={colors.text.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      />

      {/* FAB for new game */}
      {games.length > 0 && (
        <TouchableOpacity style={styles.fab} onPress={handleNewGame}>
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
      )}
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
    paddingVertical: spacing.lg,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  titleContainer: {
    alignItems: "flex-end",
  },
  appName: {
    fontSize: typography.size["2xl"],
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
  },
  tagline: {
    fontSize: typography.size.sm,
    color: colors.text.muted,
    marginTop: 2,
  },
  headerButtons: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  iconButton: {
    padding: spacing.sm,
  },
  iconButtonText: {
    fontSize: 24,
  },
  listContent: {
    padding: spacing.lg,
  },
  emptyList: {
    flex: 1,
  },
  gameCard: {
    backgroundColor: colors.surface.primary,
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.primary,
  },
  dateRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  dateText: {
    fontSize: typography.size.sm,
    color: colors.text.muted,
  },
  gameHeader: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  gameTitle: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold,
    color: colors.text.primary,
    flex: 1,
    textAlign: "right",
  },
  statusBadge: {
    backgroundColor: "#0ea5e9",
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 20,
  },
  finishedBadge: {
    backgroundColor: colors.text.muted,
  },
  statusText: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.medium,
    color: "#ffffff",
  },
  teamsRow: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  teamContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.surface.secondary,
    borderRadius: 16,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  teamName: {
    fontSize: typography.size.base,
    fontWeight: typography.weight.medium,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  winningTeam: {
    color: "#22c55e",
  },
  teamScoreValue: {
    fontSize: typography.size["3xl"],
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
  },
  winningScore: {
    color: "#22c55e",
  },
  vsContainer: {
    paddingHorizontal: spacing.sm,
  },
  vsText: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    color: colors.text.muted,
  },
  scoreRow: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.xl,
    marginBottom: spacing.sm,
  },
  teamScore: {
    alignItems: "center",
  },
  teamLabel: {
    fontSize: typography.size.sm,
    color: colors.text.muted,
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: typography.size["3xl"],
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
  },
  leadingScore: {
    color: colors.success.primary,
  },
  scoreDash: {
    fontSize: typography.size["2xl"],
    color: colors.text.muted,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  roundsInfo: {
    fontSize: typography.size.sm,
    color: colors.text.muted,
    textAlign: "center",
  },
  maxRoundsInfo: {
    fontSize: typography.size.sm,
    color: colors.text.muted,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  emptyDescription: {
    fontSize: typography.size.base,
    color: colors.text.muted,
    textAlign: "center",
    marginBottom: spacing.xl,
  },
  startButton: {
    backgroundColor: colors.text.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 24,
  },
  startButtonText: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold,
    color: colors.background.primary,
  },
  fab: {
    position: "absolute",
    bottom: spacing.xl,
    left: spacing.xl,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.text.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabIcon: {
    fontSize: 32,
    color: colors.background.primary,
    fontWeight: typography.weight.normal,
    marginTop: -2,
  },
});
