/**
 * Whist Score - Arabic Only i18n
 * App is Arabic only with RTL support
 */

import { I18nManager } from "react-native";

// Arabic translations - Sudanese dialect
const translations = {
  // App
  appName: "ويست سكور",
  appNameEn: "Whist Score",
  appTagline: "حاسبة نقاط الويست السوداني",

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
  error: "خطأ",
  success: "تمام",
  undo: "تراجع",
  calculate: "احسب",

  // Teams
  us: "لنا",
  them: "لهم",
  teamA: "لنا",
  teamB: "لهم",
  teamAName: "اسم الفريق الأول",
  teamBName: "اسم الفريق الثاني",
  team: "فريق",
  teams: "الفرق",
  declarer: "الداخل",
  opponent: "الخصم",

  // Game
  game: "لعبة",
  games: "الألعاب",
  newGame: "لعبة جديدة",
  createGame: "ابدأ لعبة",
  gameTitle: "اسم اللعبة",
  gameNote: "ملاحظة (اختياري)",
  noGames: "ما في ألعاب",
  noGamesDescription: "اضغط الزر عشان تبدأ لعبة جديدة",
  inProgress: "شغالة",
  finished: "خلصت",
  finishGame: "خلص اللعبة",
  reopenGame: "افتح اللعبة",
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

  // Statistics
  statistics: "الإحصائيات",
  wins: "الإنتصارات",
  losses: "الهزائم",
  totalRounds: "مجموع الصكات",
  overallLevel: "المستوى العام",
  beginner: "مبتدئ",
  amateur: "هاوي",
  professional: "محترف",
  expert: "خبير",

  // Game Settings
  targetScore: "النقاط المطلوبة",
  targetScoreDescription: "اللعبة بتخلص لمن فريق يوصل للنقاط دي",
  failMode: "حساب المزايدة الفاشلة",
  failModeDescription: "كيف تتحسب النقاط لمن الداخل ما يجيب مزايدتو",
  failMode_minusBid_opponentZero: "الداخل -مزايدة، الخصم 0",
  failMode_minusBid_opponentTricks: "الداخل -مزايدة، الخصم +أكلات",
  failMode_minusBid_opponentDifference: "الداخل -مزايدة، الخصم +الفرق",
  bonusAllTricks: "بونص كل الأكلات",
  bonusAllTricksDescription: "بونص لمن تاخد كل الـ 13 أكلة",
  minBid: "أقل مزايدة",
  maxBid: "أعلى مزايدة",

  // Date/Time
  today: "اليوم",
  yesterday: "أمس",

  // Statistics
  draws: "التعادلات",

  // Validation
  required: "الحقل دا مطلوب",
  invalidBid: "المزايدة لازم تكون بين {{min}} و {{max}}",
  invalidTricks: "الأكلات لازم تكون بين 0 و 13",
  tricksMustEqual13: "مجموع الأكلات لازم يساوي 13",

  // About
  about: "عن التطبيق",
  version: "النسخة",
  aboutDescription:
    "ويست سكور - حاسبة نقاط الويست السوداني. تابع النقاط واستمتع!",
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

export { translations };
