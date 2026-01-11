/**
 * Whist Score - Round Row Component
 * Displays a single round in the game history
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { t } from "../i18n";
import { useLanguage } from "../lib/context";
import { borderRadius, colors, spacing, typography } from "../lib/theme";
import { Round } from "../lib/types";
import { Card } from "./Card";

interface RoundRowProps {
  round: Round;
  teamAName?: string;
  teamBName?: string;
  onPress?: () => void;
}

export function RoundRow({
  round,
  teamAName,
  teamBName,
  onPress,
}: RoundRowProps) {
  const { isRTL } = useLanguage();

  const teamALabel = teamAName || t("teamA");
  const teamBLabel = teamBName || t("teamB");
  const declarerLabel = round.declarerTeam === "A" ? teamALabel : teamBLabel;

  const declarerTricks =
    round.declarerTeam === "A" ? round.tricksTeamA : round.tricksTeamB;
  const bidMet = declarerTricks >= round.bid;

  return (
    <Card onPress={onPress} style={styles.card} variant="outlined" padding="md">
      {/* Header Row: Round number, Declarer, Bid badge */}
      <View style={[styles.headerRow, isRTL && styles.headerRowRTL]}>
        <View style={styles.roundNumberContainer}>
          <Text style={styles.roundNumber}>{round.index}</Text>
        </View>

        <View style={[styles.headerInfo, isRTL && styles.headerInfoRTL]}>
          <Text style={styles.declarerLabel} numberOfLines={1}>
            {declarerLabel}
          </Text>
        </View>

        <View
          style={[
            styles.bidBadge,
            bidMet ? styles.bidMetBadge : styles.bidFailedBadge,
          ]}
        >
          <Text style={styles.bidText}>
            {t("bid")}: {round.bid}
          </Text>
        </View>
      </View>

      {/* Tricks info */}
      <View style={[styles.tricksRow, isRTL && styles.tricksRowRTL]}>
        <Text style={styles.tricksText}>
          {t("tricks")}: {round.tricksTeamA} — {round.tricksTeamB}
        </Text>
      </View>

      {/* Scores Row */}
      <View style={[styles.scoresRow, isRTL && styles.scoresRowRTL]}>
        <View style={styles.scoreItem}>
          <Text style={styles.scoreLabel}>{teamALabel}</Text>
          <Text
            style={[
              styles.scoreValue,
              round.scoreTeamA > 0 && styles.positiveScore,
              round.scoreTeamA < 0 && styles.negativeScore,
            ]}
          >
            {round.scoreTeamA > 0 ? `+${round.scoreTeamA}` : round.scoreTeamA}
          </Text>
        </View>

        <View style={styles.scoreDivider} />

        <View style={styles.scoreItem}>
          <Text style={styles.scoreLabel}>{teamBLabel}</Text>
          <Text
            style={[
              styles.scoreValue,
              round.scoreTeamB > 0 && styles.positiveScore,
              round.scoreTeamB < 0 && styles.negativeScore,
            ]}
          >
            {round.scoreTeamB > 0 ? `+${round.scoreTeamB}` : round.scoreTeamB}
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.sm,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  headerRowRTL: {
    flexDirection: "row-reverse",
  },
  roundNumberContainer: {
    width: 28,
    height: 28,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface.tertiary,
    alignItems: "center",
    justifyContent: "center",
  },
  roundNumber: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
  },
  headerInfo: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  headerInfoRTL: {
    marginLeft: 0,
    marginRight: spacing.sm,
  },
  declarerLabel: {
    fontSize: typography.size.base,
    fontWeight: typography.weight.semibold,
    color: colors.text.primary,
  },
  bidBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  bidMetBadge: {
    backgroundColor: colors.success.dark,
  },
  bidFailedBadge: {
    backgroundColor: colors.error.dark,
  },
  bidText: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    color: colors.text.primary,
  },
  tricksRow: {
    marginBottom: spacing.sm,
    paddingLeft: 36,
  },
  tricksRowRTL: {
    paddingLeft: 0,
    paddingRight: 36,
  },
  tricksText: {
    fontSize: typography.size.sm,
    color: colors.text.muted,
  },
  scoresRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border.primary,
  },
  scoresRowRTL: {
    flexDirection: "row-reverse",
  },
  scoreItem: {
    flex: 1,
    alignItems: "center",
  },
  scoreDivider: {
    width: 1,
    backgroundColor: colors.border.primary,
    marginVertical: -spacing.sm,
  },
  scoreLabel: {
    fontSize: typography.size.xs,
    color: colors.text.muted,
    marginBottom: 2,
  },
  scoreValue: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
  },
  positiveScore: {
    color: colors.success.primary,
  },
  negativeScore: {
    color: colors.error.primary,
  },
});
