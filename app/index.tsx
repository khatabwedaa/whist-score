/**
 * West Score - Home Screen (Minimal Design like Baloot Calculator)
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

  const handleOpenStatistics = () => {
    router.push("/statistics");
  };

  const renderGame = ({ item }: { item: Game }) => {
    const isFinished = item.isFinished;
    const leadingTeam =
      item.totalScoreTeamA > item.totalScoreTeamB
        ? "A"
        : item.totalScoreTeamB > item.totalScoreTeamA
        ? "B"
        : null;

    return (
      <TouchableOpacity
        style={styles.gameCard}
        onPress={() => handleOpenGame(item)}
        activeOpacity={0.7}
      >
        <View style={styles.gameHeader}>
          <Text style={styles.gameTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <View
            style={[styles.statusBadge, isFinished && styles.finishedBadge]}
          >
            <Text style={styles.statusText}>
              {isFinished ? t("finished") : t("inProgress")}
            </Text>
          </View>
        </View>

        <View style={styles.scoreRow}>
          <View style={styles.teamScore}>
            <Text style={styles.teamLabel}>{t("us")}</Text>
            <Text
              style={[
                styles.scoreValue,
                leadingTeam === "A" && styles.leadingScore,
              ]}
            >
              {item.totalScoreTeamA}
            </Text>
          </View>

          <Text style={styles.scoreDash}>—</Text>

          <View style={styles.teamScore}>
            <Text style={styles.teamLabel}>{t("them")}</Text>
            <Text
              style={[
                styles.scoreValue,
                leadingTeam === "B" && styles.leadingScore,
              ]}
            >
              {item.totalScoreTeamB}
            </Text>
          </View>
        </View>

        <Text style={styles.roundsInfo}>
          {item.rounds.length} {t("rounds")}
        </Text>
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
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <View style={styles.logoCircle} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.appName}>{t("appName")}</Text>
            <Text style={styles.tagline}>{t("appTagline")}</Text>
          </View>
        </View>

        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleOpenStatistics}
          >
            <Text style={styles.iconButtonText}>📊</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleOpenSettings}
          >
            <Text style={styles.iconButtonText}>⚙️</Text>
          </TouchableOpacity>
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
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  logoContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: spacing.md,
  },
  logoIcon: {
    width: 44,
    height: 56,
    backgroundColor: "#991b1b",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  logoCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#f5f5f4",
    marginTop: -8,
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
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.md,
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
    backgroundColor: colors.teamA.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  finishedBadge: {
    backgroundColor: colors.text.muted,
  },
  statusText: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.medium,
    color: colors.text.primary,
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
  roundsInfo: {
    fontSize: typography.size.sm,
    color: colors.text.muted,
    textAlign: "center",
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
