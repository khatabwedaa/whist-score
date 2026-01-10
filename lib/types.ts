/**
 * Whist Score - TypeScript Data Models
 * For Sudanese Whist (ويست) card game score tracking
 */

export type TeamId = "A" | "B";

/**
 * Scoring modes when the declarer fails to meet their bid:
 * - minusBid_opponentZero: Declarer loses bid, opponent gains 0
 * - minusBid_opponentTricks: Declarer loses bid, opponent gains their tricks taken
 * - minusBid_opponentDifference: Declarer loses bid, opponent gains the difference
 */
export type FailMode =
  | "minusBid_opponentZero"
  | "minusBid_opponentTricks"
  | "minusBid_opponentDifference";

export interface GameSettings {
  targetScore?: number; // e.g., 25 - game ends when a team reaches this
  failMode: FailMode; // how to score when declarer fails
  minBid: number; // minimum bid allowed (default: 7)
  maxBid: number; // maximum bid allowed (default: 13)
}

export interface Round {
  id: string;
  index: number; // round number (1-based)
  declarerTeam: TeamId; // which team is the declarer (الداخل)
  bid: number; // the bid made (7-13 typically)
  tricksTeamA: number; // tricks won by Team A (0-13)
  tricksTeamB: number; // tricks won by Team B (0-13, A+B must = 13)
  scoreTeamA: number; // computed score for Team A this round
  scoreTeamB: number; // computed score for Team B this round
  createdAt: string; // ISO date string
}

export interface Game {
  id: string;
  title: string;
  note?: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  teamAName: string; // Team A name (default: لنا)
  teamBName: string; // Team B name (default: لهم)
  rounds: Round[];
  totalScoreTeamA: number;
  totalScoreTeamB: number;
  isFinished: boolean;
  finishedAt?: string; // ISO date string when game was marked finished
  settings: GameSettings;
}

/**
 * Input for creating/editing a round before scoring is calculated
 */
export interface RoundInput {
  declarerTeam: TeamId;
  bid: number;
  tricksTeamA: number;
  tricksTeamB: number;
}

/**
 * Input for creating a new game
 */
export interface GameInput {
  title: string;
  note?: string;
  teamAName?: string;
  teamBName?: string;
  settings?: Partial<GameSettings>;
}

/**
 * Default game settings
 */
export const DEFAULT_GAME_SETTINGS: GameSettings = {
  targetScore: 25,
  failMode: "minusBid_opponentTricks",
  minBid: 7,
  maxBid: 13,
};

/**
 * Constants
 */
export const TOTAL_TRICKS = 13;
