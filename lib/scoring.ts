/**
 * Whist Score - Scoring Logic
 * Implements Sudanese Whist (ويست) scoring rules
 */

import { Game, GameSettings, RoundInput, TeamId, TOTAL_TRICKS } from "./types";

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
 */
export function calculateRoundScore(
  input: RoundInput,
  settings: GameSettings
): RoundScoreResult {
  const { declarerTeam, bid, tricksTeamA, tricksTeamB } = input;

  // Validate tricks total
  if (tricksTeamA + tricksTeamB !== TOTAL_TRICKS) {
    throw new Error(
      `Tricks must total ${TOTAL_TRICKS}. Got: ${tricksTeamA} + ${tricksTeamB}`
    );
  }

  const declarerTricks = declarerTeam === "A" ? tricksTeamA : tricksTeamB;

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
    const opponentTricks = declarerTeam === "A" ? tricksTeamB : tricksTeamA;
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

  // Map back to Team A and Team B
  const scoreTeamA = declarerTeam === "A" ? declarerScore : opponentScore;
  const scoreTeamB = declarerTeam === "B" ? declarerScore : opponentScore;

  return { scoreTeamA, scoreTeamB };
}

/**
 * Get the leading team or null if tied
 */
export function getLeadingTeam(game: Game): TeamId | null {
  if (game.totalScoreTeamA > game.totalScoreTeamB) return "A";
  if (game.totalScoreTeamB > game.totalScoreTeamA) return "B";
  return null;
}

/**
 * Check if the game should be marked as finished
 * based on target score
 */
export function checkGameFinished(game: Game): boolean {
  const { settings, totalScoreTeamA, totalScoreTeamB } = game;

  // Check target score (absolute value - either positive or negative threshold)
  if (settings.targetScore !== undefined) {
    if (
      Math.abs(totalScoreTeamA) >= settings.targetScore ||
      Math.abs(totalScoreTeamB) >= settings.targetScore
    ) {
      return true;
    }
  }

  return false;
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

  return {
    valid: errors.length === 0,
    errors,
  };
}
