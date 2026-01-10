/**
 * West Score - Scoring Logic
 * Implements Sudanese Whist (ويست) scoring rules
 */

import {
  Game,
  GameSettings,
  Round,
  RoundInput,
  TeamId,
  TOTAL_TRICKS,
} from "./types";

export interface RoundScoreResult {
  scoreTeamA: number;
  scoreTeamB: number;
}

/**
 * Calculate the score for a single round based on game settings
 *
 * Scoring rules:
 * - If declarer team meets or exceeds their bid: declarer gains +bid
 * - If declarer team fails to meet bid: applies failMode rules
 * - Bonuses are applied if configured
 */
export function calculateRoundScore(
  input: RoundInput,
  settings: GameSettings
): RoundScoreResult {
  const { declarerTeam, bid, tricksTeamA, tricksTeamB, bonusApplied } = input;

  // Validate tricks total
  if (tricksTeamA + tricksTeamB !== TOTAL_TRICKS) {
    throw new Error(
      `Tricks must total ${TOTAL_TRICKS}. Got: ${tricksTeamA} + ${tricksTeamB}`
    );
  }

  const declarerTricks = declarerTeam === "A" ? tricksTeamA : tricksTeamB;
  const opponentTricks = declarerTeam === "A" ? tricksTeamB : tricksTeamA;
  const opponentTeam: TeamId = declarerTeam === "A" ? "B" : "A";

  let declarerScore = 0;
  let opponentScore = 0;

  // Check if declarer met their bid
  const bidMet = declarerTricks >= bid;

  if (bidMet) {
    // Declarer succeeded: gains the bid amount
    declarerScore = bid;
    opponentScore = 0;
  } else {
    // Declarer failed: loses bid, opponent gains based on failMode
    declarerScore = -bid;

    switch (settings.failMode) {
      case "minusBid_opponentZero":
        opponentScore = 0;
        break;
      case "minusBid_opponentTricks":
        opponentScore = opponentTricks;
        break;
      case "minusBid_opponentDifference":
        opponentScore = bid - declarerTricks;
        break;
    }
  }

  // Apply bonuses
  if (bonusApplied?.allTricks && settings.bonusAllTricks) {
    if (bonusApplied.allTricks === declarerTeam) {
      declarerScore += settings.bonusAllTricks;
    } else {
      opponentScore += settings.bonusAllTricks;
    }
  }

  if (bonusApplied?.seik && settings.bonusSeik) {
    if (bonusApplied.seik === declarerTeam) {
      declarerScore += settings.bonusSeik;
    } else {
      opponentScore += settings.bonusSeik;
    }
  }

  // Map back to Team A and Team B
  const scoreTeamA = declarerTeam === "A" ? declarerScore : opponentScore;
  const scoreTeamB = declarerTeam === "B" ? declarerScore : opponentScore;

  return { scoreTeamA, scoreTeamB };
}

/**
 * Recalculate all round scores and game totals
 * Useful when game settings change
 */
export function recalculateGameTotals(game: Game): Game {
  let totalScoreTeamA = 0;
  let totalScoreTeamB = 0;

  const updatedRounds: Round[] = game.rounds.map((round) => {
    const { scoreTeamA, scoreTeamB } = calculateRoundScore(
      {
        declarerTeam: round.declarerTeam,
        bid: round.bid,
        tricksTeamA: round.tricksTeamA,
        tricksTeamB: round.tricksTeamB,
        bonusApplied: round.bonusApplied,
      },
      game.settings
    );

    totalScoreTeamA += scoreTeamA;
    totalScoreTeamB += scoreTeamB;

    return {
      ...round,
      scoreTeamA,
      scoreTeamB,
    };
  });

  return {
    ...game,
    rounds: updatedRounds,
    totalScoreTeamA,
    totalScoreTeamB,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Check if the game should be marked as finished
 * based on target score or rounds limit
 */
export function checkGameFinished(game: Game): boolean {
  const { settings, totalScoreTeamA, totalScoreTeamB, rounds } = game;

  // Check target score (absolute value - either positive or negative threshold)
  if (settings.targetScore !== undefined) {
    if (
      Math.abs(totalScoreTeamA) >= settings.targetScore ||
      Math.abs(totalScoreTeamB) >= settings.targetScore
    ) {
      return true;
    }
  }

  // Check rounds limit
  if (
    settings.roundsLimit !== undefined &&
    rounds.length >= settings.roundsLimit
  ) {
    return true;
  }

  return false;
}

/**
 * Determine the winning team based on current scores
 * Returns null if tied
 */
export function getLeadingTeam(game: Game): TeamId | null {
  if (game.totalScoreTeamA > game.totalScoreTeamB) return "A";
  if (game.totalScoreTeamB > game.totalScoreTeamA) return "B";
  return null;
}

/**
 * Get the winner of a finished game
 * Returns null if game is not finished or if tied
 */
export function getWinner(game: Game): TeamId | null {
  if (!game.isFinished) return null;
  return getLeadingTeam(game);
}

/**
 * Validate round input
 */
export function validateRoundInput(
  input: RoundInput,
  settings: GameSettings
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validate bid range
  if (input.bid < settings.minBid || input.bid > settings.maxBid) {
    errors.push(
      `Bid must be between ${settings.minBid} and ${settings.maxBid}`
    );
  }

  // Validate tricks
  if (input.tricksTeamA < 0 || input.tricksTeamA > TOTAL_TRICKS) {
    errors.push(`Team A tricks must be between 0 and ${TOTAL_TRICKS}`);
  }

  if (input.tricksTeamB < 0 || input.tricksTeamB > TOTAL_TRICKS) {
    errors.push(`Team B tricks must be between 0 and ${TOTAL_TRICKS}`);
  }

  // Validate total tricks
  if (input.tricksTeamA + input.tricksTeamB !== TOTAL_TRICKS) {
    errors.push(`Total tricks must equal ${TOTAL_TRICKS}`);
  }

  // Validate bonus all tricks
  if (input.bonusApplied?.allTricks) {
    const team = input.bonusApplied.allTricks;
    const tricks = team === "A" ? input.tricksTeamA : input.tricksTeamB;
    if (tricks !== TOTAL_TRICKS) {
      errors.push(
        `Cannot apply all tricks bonus - team ${team} did not take all ${TOTAL_TRICKS} tricks`
      );
    }
  }

  return { valid: errors.length === 0, errors };
}
