/**
 * West Score - English Translations
 */

export const en = {
  // App
  appName: "West Score",
  appTagline: "Sudanese Whist Score Tracker",

  // Common
  save: "Save",
  cancel: "Cancel",
  delete: "Delete",
  edit: "Edit",
  create: "Create",
  close: "Close",
  confirm: "Confirm",
  yes: "Yes",
  no: "No",
  ok: "OK",
  loading: "Loading...",
  error: "Error",
  success: "Success",

  // Teams
  teamA: "Team A",
  teamB: "Team B",
  team: "Team",
  teams: "Teams",
  declarer: "Declarer",
  opponent: "Opponent",

  // Players
  player: "Player",
  players: "Players",
  player1: "Player 1",
  player2: "Player 2",
  player3: "Player 3",
  player4: "Player 4",
  playerName: "Player Name",

  // Game
  game: "Game",
  games: "Games",
  newGame: "New Game",
  createGame: "Create Game",
  gameTitle: "Game Title",
  gameNote: "Note (optional)",
  noGames: "No games yet",
  noGamesDescription: "Tap the button below to start a new game",
  inProgress: "In Progress",
  finished: "Finished",
  finishGame: "Finish Game",
  reopenGame: "Reopen Game",
  deleteGame: "Delete Game",
  deleteGameConfirm: "Are you sure you want to delete this game?",

  // Rounds
  round: "Round",
  rounds: "Rounds",
  addRound: "Add Round",
  editRound: "Edit Round",
  deleteRound: "Delete Round",
  deleteRoundConfirm: "Are you sure you want to delete this round?",
  noRounds: "No rounds yet",
  noRoundsDescription: "Add a round to start tracking scores",
  roundNumber: "Round {{number}}",

  // Scoring
  score: "Score",
  scores: "Scores",
  totalScore: "Total Score",
  bid: "Bid",
  tricks: "Tricks",
  tricksWon: "Tricks Won",
  bidMet: "Bid Met",
  bidFailed: "Bid Failed",
  leading: "Leading",
  tied: "Tied",
  winner: "Winner",

  // Settings
  settings: "Settings",
  gameSettings: "Game Settings",
  globalSettings: "Global Settings",
  language: "Language",
  languageDescription: "Arabic switches the app to right-to-left layout",
  arabic: "العربية",
  english: "English",
  theme: "Theme",
  darkMode: "Dark Mode",
  lightMode: "Light Mode",

  // Game Settings
  targetScore: "Target Score",
  targetScoreDescription: "Game ends when a team reaches this score",
  roundsLimit: "Rounds Limit",
  roundsLimitDescription: "Maximum number of rounds (optional)",
  failMode: "Failed Bid Scoring",
  failModeDescription: "How to score when declarer fails to meet their bid",
  failMode_minusBid_opponentZero: "Declarer -bid, Opponent 0",
  failMode_minusBid_opponentTricks: "Declarer -bid, Opponent +tricks",
  failMode_minusBid_opponentDifference: "Declarer -bid, Opponent +difference",
  bonusAllTricks: "All Tricks Bonus",
  bonusAllTricksDescription: "Bonus for taking all 13 tricks",
  bonusSeik: "Seik Bonus",
  bonusSeikDescription: 'Bonus for special "سيك" condition',
  minBid: "Minimum Bid",
  maxBid: "Maximum Bid",

  // Validation
  required: "This field is required",
  invalidBid: "Bid must be between {{min}} and {{max}}",
  invalidTricks: "Tricks must be between 0 and 13",
  tricksMustEqual13: "Total tricks must equal 13",
  enterGameTitle: "Please enter a game title",
  enterPlayerNames: "Please enter all player names",

  // Confirmation
  unsavedChanges: "You have unsaved changes",
  discardChanges: "Discard changes?",

  // Empty states
  startPlaying: "Start Playing",
  getStarted: "Get Started",

  // Dates
  createdOn: "Created on",
  lastPlayed: "Last played",
  today: "Today",
  yesterday: "Yesterday",

  // About
  about: "About",
  version: "Version",
  aboutDescription:
    "West Score is a digital scorebook for the Sudanese card game Whist (ويست). Track scores, save games, and enjoy playing!",
} as const;

export type TranslationKey = keyof typeof en;
