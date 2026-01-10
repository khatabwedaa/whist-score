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
  round: "شوتة",
  rounds: "الشوتات",
  addRound: "أضف شوتة",
  editRound: "عدل الشوتة",
  deleteRound: "احذف الشوتة",
  deleteRoundConfirm: "متأكد عايز تحذف الشوتة دي؟",
  noRounds: "ما في شوتات",
  noRoundsDescription: "أضف شوتة عشان تبدأ تحسب النقاط",
  roundNumber: "الشوتة {{number}}",
  maxRounds: "عدد الشوتات",
  maxRoundsDescription: "عدد الشوتات في اللعبة (افتح للعبة بدون حد)",
  unlimitedRounds: "بدون حد",

  // Arabic ordinal round names
  roundOrdinal1: "الشوتة الأولى",
  roundOrdinal2: "الشوتة الثانية",
  roundOrdinal3: "الشوتة الثالثة",
  roundOrdinal4: "الشوتة الرابعة",
  roundOrdinal5: "الشوتة الخامسة",
  roundOrdinal6: "الشوتة السادسة",
  roundOrdinal7: "الشوتة السابعة",
  roundOrdinal8: "الشوتة الثامنة",
  roundOrdinal9: "الشوتة التاسعة",
  roundOrdinal10: "الشوتة العاشرة",

  // Game Over
  gameOver: "انتهت اللعبة",
  teamWins: "{{team}} فاز!",
  vs: "ضد",

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
  totalRounds: "مجموع الشوتات",
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
 * Get ordinal round name in Arabic (الشوطة الأولى، الثانية، etc.)
 */
export function getRoundOrdinalName(roundNumber: number): string {
  const ordinalKeys: TranslationKey[] = [
    "roundOrdinal1",
    "roundOrdinal2",
    "roundOrdinal3",
    "roundOrdinal4",
    "roundOrdinal5",
    "roundOrdinal6",
    "roundOrdinal7",
    "roundOrdinal8",
    "roundOrdinal9",
    "roundOrdinal10",
  ];

  if (roundNumber >= 1 && roundNumber <= 10) {
    return translations[ordinalKeys[roundNumber - 1]];
  }
  // For rounds > 10, use numeric format
  return `${t("round")} ${roundNumber}`;
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
