/**
 * West Score - Edit Round Screen
 */

import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  Card,
  ScoreDisplay,
  ScrollPicker,
  SegmentedControl,
} from "../../../../components";
import { t } from "../../../../i18n";
import { useGames, useLanguage } from "../../../../lib/context";
import { calculateRoundScore } from "../../../../lib/scoring";
import { deleteRound, getGame, updateRound } from "../../../../lib/storage";
import {
  borderRadius,
  colors,
  spacing,
  typography,
} from "../../../../lib/theme";
import {
  Game,
  Round,
  RoundInput,
  TeamId,
  TOTAL_TRICKS,
} from "../../../../lib/types";

export default function EditRoundScreen() {
  const { id, roundId } = useLocalSearchParams<{
    id: string;
    roundId: string;
  }>();
  const router = useRouter();
  const { isRTL } = useLanguage();
  const { refreshGames } = useGames();

  const [game, setGame] = useState<Game | null>(null);
  const [round, setRound] = useState<Round | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [declarerTeam, setDeclarerTeam] = useState<TeamId>("A");
  const [bid, setBid] = useState(7);
  const [tricksTeamA, setTricksTeamA] = useState(7);
  const [tricksTeamB, setTricksTeamB] = useState(6);

  const loadGame = useCallback(async () => {
    if (!id || !roundId) return;
    const loaded = await getGame(id);
    setGame(loaded);

    if (loaded) {
      const foundRound = loaded.rounds.find((r) => r.id === roundId);
      if (foundRound) {
        setRound(foundRound);
        setDeclarerTeam(foundRound.declarerTeam);
        setBid(foundRound.bid);
        setTricksTeamA(foundRound.tricksTeamA);
        setTricksTeamB(foundRound.tricksTeamB);
      }
    }
  }, [id, roundId]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchData = async () => {
        if (!id || !roundId) return;
        const loaded = await getGame(id);

        if (isActive && loaded) {
          setGame(loaded);
          const foundRound = loaded.rounds.find((r) => r.id === roundId);
          if (foundRound) {
            setRound(foundRound);
            setDeclarerTeam(foundRound.declarerTeam);
            setBid(foundRound.bid);
            setTricksTeamA(foundRound.tricksTeamA);
            setTricksTeamB(foundRound.tricksTeamB);
          }
        }
      };

      fetchData();

      return () => {
        isActive = false;
      };
    }, [id, roundId])
  );

  if (!game || !round) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>{t("loading")}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const teamAName = game.teamAName || t("teamA");
  const teamBName = game.teamBName || t("teamB");

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
  let newTotalA = game.totalScoreTeamA;
  let newTotalB = game.totalScoreTeamB;

  if (isValid) {
    const result = calculateRoundScore(roundInput, game.settings);
    previewScoreA = result.scoreTeamA;
    previewScoreB = result.scoreTeamB;

    // Calculate new totals (subtract old round score, add new)
    newTotalA = game.totalScoreTeamA - round.scoreTeamA + previewScoreA;
    newTotalB = game.totalScoreTeamB - round.scoreTeamB + previewScoreB;
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
      await updateRound(id, roundId, roundInput);
      await refreshGames();
      router.back();
    } catch (error) {
      console.error("Error updating round:", error);
      Alert.alert(t("error"), String(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(t("deleteRound"), t("deleteRoundConfirm"), [
      { text: t("cancel"), style: "cancel" },
      {
        text: t("delete"),
        style: "destructive",
        onPress: async () => {
          setIsLoading(true);
          try {
            await deleteRound(id, roundId);
            await refreshGames();
            router.back();
          } catch (error) {
            console.error("Error deleting round:", error);
            Alert.alert(t("error"), String(error));
          } finally {
            setIsLoading(false);
          }
        },
      },
    ]);
  };

  const handleCancel = () => {
    router.back();
  };

  const teamOptions = [
    { label: teamAName, value: "A" as TeamId, color: colors.teamA.primary },
    { label: teamBName, value: "B" as TeamId, color: colors.teamB.primary },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, isRTL && styles.headerRTL]}>
        <Button
          title={t("cancel")}
          onPress={handleCancel}
          variant="ghost"
          size="sm"
        />
        <Text style={styles.headerTitle}>{t("editRound")}</Text>
        <Button
          title={t("save")}
          onPress={handleSave}
          variant="primary"
          size="sm"
          loading={isLoading}
          disabled={!isValid}
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Round Number */}
        <Card style={styles.roundCard}>
          <Text style={styles.roundNumber}>
            {t("round")} {round.index}
          </Text>
        </Card>

        {/* Declarer Team */}
        <Card style={styles.section}>
          <SegmentedControl
            label={t("declarer")}
            options={teamOptions}
            value={declarerTeam}
            onChange={setDeclarerTeam}
          />
        </Card>

        {/* Bid */}
        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, isRTL && styles.textRTL]}>
            {t("bid")}
          </Text>
          <View style={styles.centerPicker}>
            <ScrollPicker
              value={bid}
              onChange={setBid}
              min={game.settings.minBid}
              max={game.settings.maxBid}
            />
          </View>
        </Card>

        {/* Tricks */}
        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, isRTL && styles.textRTL]}>
            {t("tricksWon")}
          </Text>

          <View style={[styles.tricksRow, isRTL && styles.tricksRowRTL]}>
            <View style={styles.tricksColumn}>
              <View style={[styles.teamBadge, styles.teamABadge]}>
                <Text style={styles.teamBadgeText}>{teamAName}</Text>
              </View>
              <ScrollPicker
                value={tricksTeamA}
                onChange={handleTricksTeamAChange}
                min={0}
                max={TOTAL_TRICKS}
              />
            </View>

            <View style={styles.tricksColumn}>
              <View style={[styles.teamBadge, styles.teamBBadge]}>
                <Text style={styles.teamBadgeText}>{teamBName}</Text>
              </View>
              <ScrollPicker
                value={tricksTeamB}
                onChange={handleTricksTeamBChange}
                min={0}
                max={TOTAL_TRICKS}
              />
            </View>
          </View>

          {!tricksValid && (
            <Text style={styles.errorText}>{t("tricksMustEqual13")}</Text>
          )}
        </Card>

        {/* Preview */}
        <Card style={styles.previewCard}>
          <Text style={[styles.previewTitle, isRTL && styles.textRTL]}>
            {t("score")} {t("round")}
          </Text>
          <View
            style={[styles.previewScores, isRTL && styles.previewScoresRTL]}
          >
            <View style={styles.previewScore}>
              <Text style={styles.previewLabel}>{teamAName}</Text>
              <Text
                style={[
                  styles.previewValue,
                  previewScoreA > 0 && styles.positiveScore,
                  previewScoreA < 0 && styles.negativeScore,
                ]}
              >
                {previewScoreA > 0 ? `+${previewScoreA}` : previewScoreA}
              </Text>
            </View>
            <View style={styles.previewScore}>
              <Text style={styles.previewLabel}>{teamBName}</Text>
              <Text
                style={[
                  styles.previewValue,
                  previewScoreB > 0 && styles.positiveScore,
                  previewScoreB < 0 && styles.negativeScore,
                ]}
              >
                {previewScoreB > 0 ? `+${previewScoreB}` : previewScoreB}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={[styles.previewTitle, isRTL && styles.textRTL]}>
            {t("totalScore")}
          </Text>
          <ScoreDisplay
            scoreTeamA={newTotalA}
            scoreTeamB={newTotalB}
            teamAName={teamAName}
            teamBName={teamBName}
            size="md"
          />
        </Card>

        {/* Delete Button */}
        <Button
          title={t("deleteRound")}
          onPress={handleDelete}
          variant="danger"
          size="md"
          fullWidth
          style={styles.deleteButton}
        />
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  roundCard: {
    alignItems: "center",
    marginBottom: spacing.lg,
    backgroundColor: colors.surface.secondary,
  },
  roundNumber: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.size.base,
    fontWeight: typography.weight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.md,
    textAlign: "center",
  },
  centerPicker: {
    alignItems: "center",
  },
  textRTL: {
    textAlign: "right",
  },
  tricksRow: {
    flexDirection: "row",
    gap: spacing.lg,
    justifyContent: "center",
  },
  tricksRowRTL: {
    flexDirection: "row-reverse",
  },
  tricksColumn: {
    flex: 1,
    alignItems: "center",
    maxWidth: 150,
  },
  teamBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    marginBottom: spacing.md,
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
  errorText: {
    color: colors.error.primary,
    fontSize: typography.size.sm,
    textAlign: "center",
    marginTop: spacing.md,
  },
  previewCard: {
    backgroundColor: colors.surface.secondary,
    marginBottom: spacing.lg,
  },
  previewTitle: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    color: colors.text.tertiary,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  previewScores: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  previewScoresRTL: {
    flexDirection: "row-reverse",
  },
  previewScore: {
    alignItems: "center",
  },
  previewLabel: {
    fontSize: typography.size.sm,
    color: colors.text.tertiary,
    marginBottom: 4,
  },
  previewValue: {
    fontSize: typography.size["2xl"],
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
  },
  positiveScore: {
    color: colors.success.primary,
  },
  negativeScore: {
    color: colors.error.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.primary,
    marginVertical: spacing.lg,
  },
  deleteButton: {
    marginTop: spacing.md,
  },
});
