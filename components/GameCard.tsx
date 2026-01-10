/**
 * West Score - Game Card Component
 * Displays a game in the games list
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { t } from "../i18n";
import { useLanguage } from "../lib/context";
import { getLeadingTeam } from "../lib/scoring";
import { borderRadius, colors, spacing, typography } from "../lib/theme";
import { Game } from "../lib/types";
import { Card } from "./Card";

interface GameCardProps {
  game: Game;
  onPress: () => void;
}

export function GameCard({ game, onPress }: GameCardProps) {
  const { isRTL } = useLanguage();
  const leadingTeam = getLeadingTeam(game);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return t("today");
    }
    if (date.toDateString() === yesterday.toDateString()) {
      return t("yesterday");
    }

    return date.toLocaleDateString(isRTL ? "ar" : "en", {
      month: "short",
      day: "numeric",
    });
  };

  // Get team names
  const teamAPlayers = game.players.filter((p) => p.team === "A");
  const teamBPlayers = game.players.filter((p) => p.team === "B");
  const teamAName =
    teamAPlayers.length > 0
      ? teamAPlayers.map((p) => p.name).join(" & ")
      : t("teamA");
  const teamBName =
    teamBPlayers.length > 0
      ? teamBPlayers.map((p) => p.name).join(" & ")
      : t("teamB");

  return (
    <Card onPress={onPress} style={styles.card} variant="elevated" padding="md">
      <View style={[styles.header, isRTL && styles.headerRTL]}>
        <View
          style={[styles.titleContainer, isRTL && styles.titleContainerRTL]}
        >
          <Text style={styles.title} numberOfLines={1}>
            {game.title}
          </Text>
          <Text style={styles.date}>{formatDate(game.updatedAt)}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            game.isFinished ? styles.finishedBadge : styles.inProgressBadge,
          ]}
        >
          <Text style={styles.statusText}>
            {game.isFinished ? t("finished") : t("inProgress")}
          </Text>
        </View>
      </View>

      <View style={[styles.scoreRow, isRTL && styles.scoreRowRTL]}>
        {/* Team A Score */}
        <View style={styles.teamScore}>
          <Text style={styles.teamName} numberOfLines={1}>
            {teamAName}
          </Text>
          <Text
            style={[
              styles.score,
              leadingTeam === "A" && styles.leadingScore,
              game.totalScoreTeamA < 0 && styles.negativeScore,
            ]}
          >
            {game.totalScoreTeamA}
          </Text>
        </View>

        {/* Separator */}
        <Text style={styles.scoreSeparator}>—</Text>

        {/* Team B Score */}
        <View style={styles.teamScore}>
          <Text style={styles.teamName} numberOfLines={1}>
            {teamBName}
          </Text>
          <Text
            style={[
              styles.score,
              leadingTeam === "B" && styles.leadingScore,
              game.totalScoreTeamB < 0 && styles.negativeScore,
            ]}
          >
            {game.totalScoreTeamB}
          </Text>
        </View>
      </View>

      <View style={[styles.footer, isRTL && styles.footerRTL]}>
        <Text style={styles.roundsCount}>
          {game.rounds.length} {t("rounds")}
        </Text>
        {game.note && (
          <Text style={styles.note} numberOfLines={1}>
            {game.note}
          </Text>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.md,
  },
  headerRTL: {
    flexDirection: "row-reverse",
  },
  titleContainer: {
    flex: 1,
    marginRight: spacing.md,
  },
  titleContainerRTL: {
    marginRight: 0,
    marginLeft: spacing.md,
    alignItems: "flex-end",
  },
  title: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    marginBottom: 2,
  },
  date: {
    fontSize: typography.size.sm,
    color: colors.text.muted,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  inProgressBadge: {
    backgroundColor: colors.accent.dark,
  },
  finishedBadge: {
    backgroundColor: colors.surface.tertiary,
  },
  statusText: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.medium,
    color: colors.text.primary,
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.md,
  },
  scoreRowRTL: {
    flexDirection: "row-reverse",
  },
  teamScore: {
    alignItems: "center",
    flex: 1,
  },
  teamName: {
    fontSize: typography.size.sm,
    color: colors.text.tertiary,
    marginBottom: spacing.xs,
    textAlign: "center",
  },
  score: {
    fontSize: typography.size["3xl"],
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
  },
  leadingScore: {
    color: colors.accent.primary,
  },
  negativeScore: {
    color: colors.error.light,
  },
  scoreSeparator: {
    fontSize: typography.size["2xl"],
    color: colors.text.muted,
    marginHorizontal: spacing.md,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border.primary,
  },
  footerRTL: {
    flexDirection: "row-reverse",
  },
  roundsCount: {
    fontSize: typography.size.sm,
    color: colors.text.tertiary,
  },
  note: {
    fontSize: typography.size.sm,
    color: colors.text.muted,
    fontStyle: "italic",
    flex: 1,
    textAlign: "right",
    marginLeft: spacing.md,
  },
});
