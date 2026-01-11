/**
 * Whist Score - Score Display Component
 * Big, prominent score display for teams
 */

import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { t } from "../i18n";
import { useLanguage } from "../lib/context";
import { borderRadius, colors, spacing, typography } from "../lib/theme";
import { TeamId } from "../lib/types";

interface ScoreDisplayProps {
  scoreTeamA: number;
  scoreTeamB: number;
  teamAName?: string;
  teamBName?: string;
  leadingTeam?: TeamId | null;
  style?: ViewStyle;
  size?: "sm" | "md" | "lg";
}

export function ScoreDisplay({
  scoreTeamA,
  scoreTeamB,
  teamAName,
  teamBName,
  leadingTeam,
  style,
  size = "lg",
}: ScoreDisplayProps) {
  const { isRTL } = useLanguage();

  const teamALabel = teamAName || t("teamA");
  const teamBLabel = teamBName || t("teamB");

  const isTeamALeading = leadingTeam === "A";
  const isTeamBLeading = leadingTeam === "B";
  const isTied = leadingTeam === null;

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.row, isRTL && styles.rowRTL]}>
        {/* Team A */}
        <View style={styles.teamContainer}>
          <Text
            style={[
              styles.teamLabel,
              styles[`teamLabel_${size}`],
              isTeamALeading && styles.leadingLabel,
            ]}
          >
            {teamALabel}
          </Text>
          <Text
            style={[
              styles.score,
              styles[`score_${size}`],
              isTeamALeading && styles.leadingScore,
              scoreTeamA < 0 && styles.negativeScore,
            ]}
          >
            {scoreTeamA >= 0 ? scoreTeamA : scoreTeamA}
          </Text>
          {isTeamALeading && (
            <View style={styles.leadingBadge}>
              <Text style={styles.leadingBadgeText}>{t("leading")}</Text>
            </View>
          )}
        </View>

        {/* Separator */}
        <View style={styles.separator}>
          <Text style={[styles.separatorText, styles[`separatorText_${size}`]]}>
            —
          </Text>
          {isTied && scoreTeamA !== 0 && (
            <Text style={styles.tiedText}>{t("tied")}</Text>
          )}
        </View>

        {/* Team B */}
        <View style={styles.teamContainer}>
          <Text
            style={[
              styles.teamLabel,
              styles[`teamLabel_${size}`],
              isTeamBLeading && styles.leadingLabel,
            ]}
          >
            {teamBLabel}
          </Text>
          <Text
            style={[
              styles.score,
              styles[`score_${size}`],
              isTeamBLeading && styles.leadingScore,
              scoreTeamB < 0 && styles.negativeScore,
            ]}
          >
            {scoreTeamB >= 0 ? scoreTeamB : scoreTeamB}
          </Text>
          {isTeamBLeading && (
            <View style={styles.leadingBadge}>
              <Text style={styles.leadingBadgeText}>{t("leading")}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: spacing.lg,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rowRTL: {
    flexDirection: "row-reverse",
  },
  teamContainer: {
    alignItems: "center",
    minWidth: 100,
  },
  teamLabel: {
    color: colors.text.tertiary,
    fontWeight: typography.weight.medium,
    marginBottom: spacing.xs,
  },
  teamLabel_sm: {
    fontSize: typography.size.sm,
  },
  teamLabel_md: {
    fontSize: typography.size.base,
  },
  teamLabel_lg: {
    fontSize: typography.size.lg,
  },
  leadingLabel: {
    color: colors.accent.secondary,
  },
  score: {
    color: colors.text.primary,
    fontWeight: typography.weight.bold,
  },
  score_sm: {
    fontSize: typography.size["2xl"],
  },
  score_md: {
    fontSize: typography.size["4xl"],
  },
  score_lg: {
    fontSize: typography.size["6xl"],
  },
  leadingScore: {
    color: colors.accent.primary,
  },
  negativeScore: {
    color: colors.error.light,
  },
  separator: {
    alignItems: "center",
    paddingHorizontal: spacing.lg,
  },
  separatorText: {
    color: colors.text.muted,
    fontWeight: typography.weight.normal,
  },
  separatorText_sm: {
    fontSize: typography.size.xl,
  },
  separatorText_md: {
    fontSize: typography.size["3xl"],
  },
  separatorText_lg: {
    fontSize: typography.size["5xl"],
  },
  tiedText: {
    fontSize: typography.size.xs,
    color: colors.text.muted,
    marginTop: spacing.xs,
  },
  leadingBadge: {
    backgroundColor: colors.accent.dark,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    marginTop: spacing.sm,
  },
  leadingBadgeText: {
    fontSize: typography.size.xs,
    color: colors.text.primary,
    fontWeight: typography.weight.medium,
  },
});
