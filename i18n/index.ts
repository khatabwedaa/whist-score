/**
 * West Score - Arabic Only i18n
 * App is Arabic only with RTL support
 */

import { I18nManager } from "react-native";

// Arabic translations
const translations = {
  // App
  appName: "حاسب ويست",
  appTagline: "حاسب نقاط الويست السوداني",

  // Common
  save: "حفظ",
  cancel: "إلغاء",
  delete: "حذف",
  edit: "تعديل",
  create: "إنشاء",
  close: "✕",
  confirm: "تأكيد",
  yes: "أيوة",
  no: "لا",
  ok: "تمام",
  loading: "جاري التحميل...",
  error: "غلط",
  success: "تمام",
  undo: "تراجع",
  calculate: "احسب",

  // Teams
  us: "لنا",
  them: "لهم",
  teamA: "لنا",
  teamB: "لهم",
  team: "فريق",
  teams: "الفرق",
  declarer: "الداخل",
  opponent: "الخصم",

  // Players
  player: "لاعب",
  players: "اللاعبين",
  player1: "اللاعب 1",
  player2: "اللاعب 2",
  player3: "اللاعب 3",
  player4: "اللاعب 4",
  playerName: "اسم اللاعب",

  // Game
  game: "لعبة",
  games: "الألعاب",
  newGame: "لعبة جديدة",
  newRound: "صكة جديدة",
  createGame: "ابدأ لعبة",
  gameTitle: "اسم اللعبة",
  gameNote: "ملاحظة (اختياري)",
  noGames: "ما في ألعاب",
  noGamesDescription: "اضغط الزر تحت عشان تبدأ لعبة جديدة",
  inProgress: "شغالة",
  finished: "خلصت",
  finishGame: "خلص اللعبة",
  reopenGame: "ارجع افتح اللعبة",
  deleteGame: "احذف اللعبة",
  deleteGameConfirm: "متأكد عايز تحذف اللعبة دي؟",

  // Rounds
  round: "صكة",
  rounds: "الصكات",
  addRound: "أضف صكة",
  editRound: "عدل الصكة",
  deleteRound: "احذف الصكة",
  deleteRoundConfirm: "متأكد عايز تحذف الصكة دي؟",
  noRounds: "ما في صكات",
  noRoundsDescription: "أضف صكة عشان تبدأ تحسب النقاط",
  roundNumber: "الصكة {{number}}",

  // Scoring
  score: "نقطة",
  scores: "النقاط",
  total: "المجموع",
  totalScore: "المجموع",
  bid: "المزايدة",
  tricks: "الأكلات",
  tricksWon: "الأكلات المكسوبة",
  bidMet: "المزايدة نجحت",
  bidFailed: "المزايدة فشلت",
  leading: "متقدم",
  tied: "تعادل",
  winner: "الفايز",

  // Settings
  settings: "الإعدادات",
  gameSettings: "إعدادات اللعبة",
  globalSettings: "الإعدادات العامة",
  language: "اللغة",
  languageDescription: "التطبيق يدعم العربية فقط",
  arabic: "العربية",
  english: "English",
  theme: "الشكل",
  darkMode: "الوضع الغامق",
  lightMode: "الوضع الفاتح",

  // Statistics
  statistics: "الإحصائيات",
  wins: "عدد الإنتصارات",
  losses: "عدد الهزائم",
  draws: "عدد الصكات",
  overallLevel: "المستوى العام",
  beginner: "مبتدئ",
  amateur: "هاوي",
  professional: "محترف",
  expert: "خبير",

  // Game Settings
  targetScore: "النقاط المطلوبة",
  targetScoreDescription: "اللعبة بتخلص لمن فريق يوصل للنقاط دي",
  roundsLimit: "حد الصكات",
  roundsLimitDescription: "أكتر عدد صكات (اختياري)",
  failMode: "حساب المزايدة الفاشلة",
  failModeDescription: "كيف تتحسب النقاط لمن الداخل ما يجيب مزايدتو",
  failMode_minusBid_opponentZero: "الداخل -مزايدة، الخصم 0",
  failMode_minusBid_opponentTricks: "الداخل -مزايدة، الخصم +أكلات",
  failMode_minusBid_opponentDifference: "الداخل -مزايدة، الخصم +الفرق",
  bonusAllTricks: "بونص كل الأكلات",
  bonusAllTricksDescription: "بونص لمن تاخد كل الـ 13 أكلة",
  bonusSeik: "بونص السيك",
  bonusSeikDescription: 'بونص حالة "السيك" الخاصة',
  minBid: "أقل مزايدة",
  maxBid: "أعلى مزايدة",
  daqAlWalad: "دق الولد",

  // Validation
  required: "الحقل دا مطلوب",
  invalidBid: "المزايدة لازم تكون بين {{min}} و {{max}}",
  invalidTricks: "الأكلات لازم تكون بين 0 و 13",
  tricksMustEqual13: "مجموع الأكلات لازم يساوي 13",
  enterGameTitle: "رجاءً دخل اسم اللعبة",
  enterPlayerNames: "رجاءً دخل أسماء كل اللاعبين",

  // Confirmation
  unsavedChanges: "عندك تغييرات ما اتحفظت",
  discardChanges: "تتجاهل التغييرات؟",

  // Empty states
  startPlaying: "ابدأ اللعب",
  getStarted: "يلا نبدأ",

  // Dates
  createdOn: "اتعملت في",
  lastPlayed: "آخر لعب",
  today: "اليوم",
  yesterday: "أمس",

  // About
  about: "عن التطبيق",
  version: "النسخة",
  aboutDescription:
    "حاسب ويست هو دفتر نقاط رقمي للويست السوداني. تابع النقاط، احفظ الألعاب، واستمتع!",
} as const;

export type TranslationKey = keyof typeof translations;

/**
 * Get translation for a key
 */
export function t(
  key: TranslationKey,
  params?: Record<string, string | number>
): string {
  let text: string = translations[key] || key;

  // Handle interpolation
  if (params) {
    Object.entries(params).forEach(([paramKey, value]) => {
      text = text.replace(new RegExp(`{{${paramKey}}}`, "g"), String(value));
    });
  }

  return text;
}

/**
 * Apply RTL settings - always RTL for Arabic
 */
export function applyRTL(): void {
  if (!I18nManager.isRTL) {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
  }
}

/**
 * Check if RTL is enabled (always true for Arabic only app)
 */
export function isRTL(): boolean {
  return true;
}

export { translations };
