/**
 * West Score - Statistics Screen
 * Shows win/loss/draw statistics like Baloot Calculator
 */

import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { t } from "../i18n";
import { useGames } from "../lib/context";
import { colors, spacing, typography } from "../lib/theme";

export default function StatisticsScreen() {
  const router = useRouter();
  const { games } = useGames();

  const stats = useMemo(() => {
    let wins = 0;
    let losses = 0;
    let totalRounds = 0;

    games.forEach((game) => {
      totalRounds += game.rounds.length;

      if (game.isFinished) {
        if (game.totalScoreTeamA > game.totalScoreTeamB) {
          wins++;
        } else if (game.totalScoreTeamB > game.totalScoreTeamA) {
          losses++;
        }
      }
    });

    // Calculate level (0-100)
    const totalFinished = wins + losses;
    const winRate = totalFinished > 0 ? (wins / totalFinished) * 100 : 50;
    const gamesPlayed = Math.min(games.length * 5, 50); // Max 50 from games
    const level = Math.round(winRate * 0.7 + gamesPlayed * 0.3);

    // Determine level title
    let levelTitle = t("beginner");
    if (level >= 80) levelTitle = t("expert");
    else if (level >= 60) levelTitle = t("professional");
    else if (level >= 40) levelTitle = t("amateur");

    return { wins, losses, totalRounds, level, levelTitle };
  }, [games]);

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
      </View>

      {/* Icon */}
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>🎴</Text>
        <Text style={styles.hammer}>🔨</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>{t("statistics")}</Text>
      <View style={styles.titleUnderline} />

      {/* Stats */}
      <View style={styles.statsContainer}>
        {/* Wins */}
        <View style={styles.statRow}>
          <View style={styles.statBar}>
            <View
              style={[
                styles.statFill,
                styles.winFill,
                { width: `${Math.min(stats.wins * 10, 100)}%` },
              ]}
            />
          </View>
          <Text style={styles.statLabel}>{t("wins")}</Text>
          <View style={[styles.statBadge, styles.winBadge]}>
            <Text style={styles.statBadgeText}>{stats.wins}</Text>
          </View>
        </View>

        {/* Losses */}
        <View style={styles.statRow}>
          <View style={styles.statBar}>
            <View
              style={[
                styles.statFill,
                styles.lossFill,
                { width: `${Math.min(stats.losses * 10, 100)}%` },
              ]}
            />
          </View>
          <Text style={styles.statLabel}>{t("losses")}</Text>
          <View style={[styles.statBadge, styles.lossBadge]}>
            <Text style={styles.statBadgeText}>{stats.losses}</Text>
          </View>
        </View>

        {/* Rounds */}
        <View style={styles.statRow}>
          <View style={styles.statBar}>
            <View
              style={[
                styles.statFill,
                styles.roundsFill,
                { width: `${Math.min(stats.totalRounds * 2, 100)}%` },
              ]}
            />
          </View>
          <Text style={styles.statLabel}>{t("draws")}</Text>
          <View style={[styles.statBadge, styles.roundsBadge]}>
            <Text style={styles.statBadgeText}>{stats.totalRounds}</Text>
          </View>
        </View>
      </View>

      {/* Level */}
      <View style={styles.levelContainer}>
        <View style={styles.levelCircle}>
          <Text style={styles.levelNumber}>{stats.level}</Text>
        </View>
        <View style={styles.levelInfo}>
          <Text style={styles.levelLabel}>{t("overallLevel")}</Text>
          <Text style={styles.levelTitle}>{stats.levelTitle}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    paddingHorizontal: spacing.xl,
  },
  header: {
    flexDirection: "row-reverse",
    paddingVertical: spacing.md,
  },
  closeButton: {
    padding: spacing.sm,
  },
  closeText: {
    fontSize: 24,
    color: colors.text.primary,
  },
  iconContainer: {
    alignItems: "center",
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
    position: "relative",
  },
  icon: {
    fontSize: 64,
  },
  hammer: {
    fontSize: 40,
    position: "absolute",
    bottom: -10,
    left: "40%",
    transform: [{ rotate: "-45deg" }],
  },
  title: {
    fontSize: typography.size["2xl"],
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    textAlign: "center",
  },
  titleUnderline: {
    width: 60,
    height: 2,
    backgroundColor: colors.text.muted,
    alignSelf: "center",
    marginTop: spacing.sm,
    marginBottom: spacing.xxl,
  },
  statsContainer: {
    gap: spacing.xl,
  },
  statRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: spacing.md,
  },
  statBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  winBadge: {
    backgroundColor: colors.success.primary,
  },
  lossBadge: {
    backgroundColor: colors.error.primary,
  },
  roundsBadge: {
    backgroundColor: colors.text.muted,
  },
  statBadgeText: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
  },
  statLabel: {
    fontSize: typography.size.base,
    color: colors.text.primary,
    flex: 1,
    textAlign: "right",
  },
  statBar: {
    flex: 2,
    height: 8,
    backgroundColor: colors.surface.secondary,
    borderRadius: 4,
    overflow: "hidden",
  },
  statFill: {
    height: "100%",
    borderRadius: 4,
  },
  winFill: {
    backgroundColor: colors.success.primary,
  },
  lossFill: {
    backgroundColor: colors.error.primary,
  },
  roundsFill: {
    backgroundColor: colors.text.muted,
  },
  levelContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: colors.surface.primary,
    borderRadius: 16,
    padding: spacing.lg,
    marginTop: spacing.xxl,
    gap: spacing.lg,
  },
  levelCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: colors.teamA.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  levelNumber: {
    fontSize: typography.size["2xl"],
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
  },
  levelInfo: {
    flex: 1,
    alignItems: "flex-end",
  },
  levelLabel: {
    fontSize: typography.size.sm,
    color: colors.text.muted,
    marginBottom: 4,
  },
  levelTitle: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
  },
});
