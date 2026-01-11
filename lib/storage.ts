/**
 * Whist Score - Storage Layer
 * Handles offline storage of games using AsyncStorage
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";
import { calculateRoundScore } from "./scoring";
import {
  DEFAULT_GAME_SETTINGS,
  Game,
  GameInput,
  Round,
  RoundInput,
} from "./types";

/**
 * Generate a UUID using expo-crypto
 */
function generateId(): string {
  return Crypto.randomUUID();
}

const STORAGE_KEY = "whist_score_games_v2";

/**
 * Load all games from storage
 */
export async function loadGames(): Promise<Game[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data) as Game[];
    }
    return [];
  } catch (error) {
    console.error("Error loading games:", error);
    return [];
  }
}

/**
 * Save all games to storage
 */
export async function saveGames(games: Game[]): Promise<void> {
  try {
    const data = JSON.stringify(games);
    await AsyncStorage.setItem(STORAGE_KEY, data);
  } catch (error) {
    console.error("Error saving games:", error);
    throw error;
  }
}

/**
 * Create a new game
 */
export async function createGame(input: GameInput): Promise<Game> {
  const games = await loadGames();

  const now = new Date().toISOString();
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

  const newGame: Game = {
    id: generateId(),
    title: input.title,
    note: input.note,
    createdAt: now,
    updatedAt: now,
    date: today,
    teamAName: input.teamAName || "لنا",
    teamBName: input.teamBName || "لهم",
    rounds: [],
    totalScoreTeamA: 0,
    totalScoreTeamB: 0,
    isFinished: false,
    settings: {
      ...DEFAULT_GAME_SETTINGS,
      ...input.settings,
    },
  };

  games.unshift(newGame); // Add to beginning for most recent first
  await saveGames(games);

  return newGame;
}

/**
 * Get a single game by ID
 */
export async function getGame(gameId: string): Promise<Game | null> {
  const games = await loadGames();
  return games.find((g) => g.id === gameId) || null;
}

/**
 * Update a game using an updater function
 */
export async function updateGame(
  gameId: string,
  updater: (game: Game) => Game
): Promise<Game> {
  const games = await loadGames();
  const index = games.findIndex((g) => g.id === gameId);

  if (index === -1) {
    throw new Error(`Game not found: ${gameId}`);
  }

  const updatedGame = updater({
    ...games[index],
    updatedAt: new Date().toISOString(),
  });

  games[index] = updatedGame;
  await saveGames(games);

  return updatedGame;
}

/**
 * Delete a game
 */
export async function deleteGame(gameId: string): Promise<void> {
  const games = await loadGames();
  const filtered = games.filter((g) => g.id !== gameId);
  await saveGames(filtered);
}

/**
 * Add a round to a game
 */
export async function addRound(
  gameId: string,
  roundInput: RoundInput
): Promise<Game> {
  return updateGame(gameId, (game) => {
    const { scoreTeamA, scoreTeamB } = calculateRoundScore(
      roundInput,
      game.settings
    );

    const newRound: Round = {
      id: generateId(),
      index: game.rounds.length + 1,
      declarerTeam: roundInput.declarerTeam,
      bid: roundInput.bid,
      tricksTeamA: roundInput.tricksTeamA,
      tricksTeamB: roundInput.tricksTeamB,
      scoreTeamA,
      scoreTeamB,
      createdAt: new Date().toISOString(),
    };

    const newTotalA = game.totalScoreTeamA + scoreTeamA;
    const newTotalB = game.totalScoreTeamB + scoreTeamB;

    // Check for game over conditions
    let isFinished = game.isFinished;
    let winnerTeam: "A" | "B" | undefined = game.winnerTeam;
    let finishedAt = game.finishedAt;

    // Check if target score is reached
    if (game.settings.targetScore) {
      if (newTotalA >= game.settings.targetScore && newTotalA > newTotalB) {
        isFinished = true;
        winnerTeam = "A";
        finishedAt = new Date().toISOString();
      } else if (
        newTotalB >= game.settings.targetScore &&
        newTotalB > newTotalA
      ) {
        isFinished = true;
        winnerTeam = "B";
        finishedAt = new Date().toISOString();
      }
    }

    // Check if max rounds is reached
    if (
      game.settings.maxRounds &&
      game.rounds.length + 1 >= game.settings.maxRounds &&
      !isFinished
    ) {
      isFinished = true;
      finishedAt = new Date().toISOString();
      if (newTotalA > newTotalB) {
        winnerTeam = "A";
      } else if (newTotalB > newTotalA) {
        winnerTeam = "B";
      }
      // If tied, no winner is set
    }

    return {
      ...game,
      rounds: [...game.rounds, newRound],
      totalScoreTeamA: newTotalA,
      totalScoreTeamB: newTotalB,
      isFinished,
      winnerTeam,
      finishedAt,
    };
  });
}

/**
 * Update an existing round
 */
export async function updateRound(
  gameId: string,
  roundId: string,
  roundInput: RoundInput
): Promise<Game> {
  return updateGame(gameId, (game) => {
    const roundIndex = game.rounds.findIndex((r) => r.id === roundId);
    if (roundIndex === -1) {
      throw new Error(`Round not found: ${roundId}`);
    }

    const { scoreTeamA, scoreTeamB } = calculateRoundScore(
      roundInput,
      game.settings
    );

    const updatedRound: Round = {
      ...game.rounds[roundIndex],
      declarerTeam: roundInput.declarerTeam,
      bid: roundInput.bid,
      tricksTeamA: roundInput.tricksTeamA,
      tricksTeamB: roundInput.tricksTeamB,
      scoreTeamA,
      scoreTeamB,
    };

    const newRounds = [...game.rounds];
    newRounds[roundIndex] = updatedRound;

    // Recalculate totals
    const totalScoreTeamA = newRounds.reduce((sum, r) => sum + r.scoreTeamA, 0);
    const totalScoreTeamB = newRounds.reduce((sum, r) => sum + r.scoreTeamB, 0);

    // Recalculate game finished state
    let isFinished = false;
    let winnerTeam: "A" | "B" | undefined = undefined;
    let finishedAt: string | undefined = undefined;

    if (game.settings.targetScore) {
      if (
        totalScoreTeamA >= game.settings.targetScore &&
        totalScoreTeamA > totalScoreTeamB
      ) {
        isFinished = true;
        winnerTeam = "A";
        finishedAt = game.finishedAt || new Date().toISOString();
      } else if (
        totalScoreTeamB >= game.settings.targetScore &&
        totalScoreTeamB > totalScoreTeamA
      ) {
        isFinished = true;
        winnerTeam = "B";
        finishedAt = game.finishedAt || new Date().toISOString();
      }
    }

    if (
      !isFinished &&
      game.settings.maxRounds &&
      newRounds.length >= game.settings.maxRounds
    ) {
      isFinished = true;
      finishedAt = game.finishedAt || new Date().toISOString();
      if (totalScoreTeamA > totalScoreTeamB) {
        winnerTeam = "A";
      } else if (totalScoreTeamB > totalScoreTeamA) {
        winnerTeam = "B";
      }
    }

    return {
      ...game,
      rounds: newRounds,
      totalScoreTeamA,
      totalScoreTeamB,
      isFinished,
      winnerTeam,
      finishedAt,
    };
  });
}

/**
 * Delete a round from a game
 */
export async function deleteRound(
  gameId: string,
  roundId: string
): Promise<Game> {
  return updateGame(gameId, (game) => {
    const newRounds = game.rounds
      .filter((r) => r.id !== roundId)
      .map((r, i) => ({ ...r, index: i + 1 })); // Re-index

    const totalScoreTeamA = newRounds.reduce((sum, r) => sum + r.scoreTeamA, 0);
    const totalScoreTeamB = newRounds.reduce((sum, r) => sum + r.scoreTeamB, 0);

    // Recalculate game finished state
    let isFinished = false;
    let winnerTeam: "A" | "B" | undefined = undefined;
    let finishedAt: string | undefined = undefined;

    if (game.settings.targetScore) {
      if (
        totalScoreTeamA >= game.settings.targetScore &&
        totalScoreTeamA > totalScoreTeamB
      ) {
        isFinished = true;
        winnerTeam = "A";
        finishedAt = game.finishedAt;
      } else if (
        totalScoreTeamB >= game.settings.targetScore &&
        totalScoreTeamB > totalScoreTeamA
      ) {
        isFinished = true;
        winnerTeam = "B";
        finishedAt = game.finishedAt;
      }
    }

    if (
      !isFinished &&
      game.settings.maxRounds &&
      newRounds.length >= game.settings.maxRounds
    ) {
      isFinished = true;
      finishedAt = game.finishedAt;
      if (totalScoreTeamA > totalScoreTeamB) {
        winnerTeam = "A";
      } else if (totalScoreTeamB > totalScoreTeamA) {
        winnerTeam = "B";
      }
    }

    return {
      ...game,
      rounds: newRounds,
      totalScoreTeamA,
      totalScoreTeamB,
      isFinished,
      winnerTeam,
      finishedAt,
    };
  });
}

/**
 * Recalculate all round scores and totals for a game
 * Used when game settings change
 */
function recalculateGameTotals(game: Game): Game {
  const newRounds = game.rounds.map((round) => {
    const { scoreTeamA, scoreTeamB } = calculateRoundScore(
      {
        declarerTeam: round.declarerTeam,
        bid: round.bid,
        tricksTeamA: round.tricksTeamA,
        tricksTeamB: round.tricksTeamB,
      },
      game.settings
    );
    return { ...round, scoreTeamA, scoreTeamB };
  });

  const totalScoreTeamA = newRounds.reduce((sum, r) => sum + r.scoreTeamA, 0);
  const totalScoreTeamB = newRounds.reduce((sum, r) => sum + r.scoreTeamB, 0);

  return {
    ...game,
    rounds: newRounds,
    totalScoreTeamA,
    totalScoreTeamB,
  };
}

/**
 * Update game settings and recalculate scores
 */
export async function updateGameSettings(
  gameId: string,
  settings: Partial<Game["settings"]>
): Promise<Game> {
  return updateGame(gameId, (game) => {
    const updatedGame: Game = {
      ...game,
      settings: {
        ...game.settings,
        ...settings,
      },
    };

    // Recalculate all round scores with new settings
    return recalculateGameTotals(updatedGame);
  });
}

/**
 * Mark a game as finished
 */
export async function finishGame(gameId: string): Promise<Game> {
  return updateGame(gameId, (game) => {
    let winnerTeam: "A" | "B" | undefined = undefined;
    if (game.totalScoreTeamA > game.totalScoreTeamB) {
      winnerTeam = "A";
    } else if (game.totalScoreTeamB > game.totalScoreTeamA) {
      winnerTeam = "B";
    }
    return {
      ...game,
      isFinished: true,
      finishedAt: new Date().toISOString(),
      winnerTeam,
    };
  });
}

/**
 * Reopen a finished game
 */
export async function reopenGame(gameId: string): Promise<Game> {
  return updateGame(gameId, (game) => ({
    ...game,
    isFinished: false,
    finishedAt: undefined,
    winnerTeam: undefined,
  }));
}

/**
 * Undo (remove) the last round from a game
 */
export async function undoLastRound(gameId: string): Promise<Game> {
  return updateGame(gameId, (game) => {
    if (game.rounds.length === 0) {
      return game;
    }

    const newRounds = game.rounds.slice(0, -1);
    const totalScoreTeamA = newRounds.reduce((sum, r) => sum + r.scoreTeamA, 0);
    const totalScoreTeamB = newRounds.reduce((sum, r) => sum + r.scoreTeamB, 0);

    // Check if game should still be finished after undo
    let isFinished = false;
    let winnerTeam: "A" | "B" | undefined = undefined;
    let finishedAt: string | undefined = undefined;

    // Check target score
    if (game.settings.targetScore) {
      if (
        totalScoreTeamA >= game.settings.targetScore &&
        totalScoreTeamA > totalScoreTeamB
      ) {
        isFinished = true;
        winnerTeam = "A";
        finishedAt = game.finishedAt;
      } else if (
        totalScoreTeamB >= game.settings.targetScore &&
        totalScoreTeamB > totalScoreTeamA
      ) {
        isFinished = true;
        winnerTeam = "B";
        finishedAt = game.finishedAt;
      }
    }

    // Check max rounds (only if not already finished by target score)
    if (
      !isFinished &&
      game.settings.maxRounds &&
      newRounds.length >= game.settings.maxRounds
    ) {
      isFinished = true;
      finishedAt = game.finishedAt;
      if (totalScoreTeamA > totalScoreTeamB) {
        winnerTeam = "A";
      } else if (totalScoreTeamB > totalScoreTeamA) {
        winnerTeam = "B";
      }
    }

    return {
      ...game,
      rounds: newRounds,
      totalScoreTeamA,
      totalScoreTeamB,
      isFinished,
      winnerTeam,
      finishedAt,
    };
  });
}
