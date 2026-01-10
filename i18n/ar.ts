/**
 * West Score - Sudanese Arabic Translations
 * اللهجة السودانية
 */

export const ar = {
  // App
  appName: "حاسب ويست",
  appTagline: "حاسب نقاط الويست السوداني",

  // Common
  save: "حفظ",
  cancel: "إلغاء",
  delete: "حذف",
  edit: "تعديل",
  create: "إنشاء",
  close: "قفل",
  confirm: "تأكيد",
  yes: "أيوة",
  no: "لا",
  ok: "تمام",
  loading: "جاري التحميل...",
  error: "غلط",
  success: "تمام",

  // Teams
  teamA: "فريق أ",
  teamB: "فريق ب",
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
  round: "شوط",
  rounds: "الأشواط",
  addRound: "أضف شوط",
  editRound: "عدل الشوط",
  deleteRound: "احذف الشوط",
  deleteRoundConfirm: "متأكد عايز تحذف الشوط دا؟",
  noRounds: "ما في أشواط",
  noRoundsDescription: "أضف شوط عشان تبدأ تحسب النقاط",
  roundNumber: "الشوط {{number}}",

  // Scoring
  score: "نقطة",
  scores: "النقاط",
  totalScore: "مجموع النقاط",
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
  languageDescription: "اللغة العربية بتحول التطبيق لتخطيط من اليمين لليسار",
  arabic: "العربية",
  english: "English",
  theme: "الشكل",
  darkMode: "الوضع الغامق",
  lightMode: "الوضع الفاتح",

  // Game Settings
  targetScore: "النقاط المطلوبة",
  targetScoreDescription: "اللعبة بتخلص لمن فريق يوصل للنقاط دي",
  roundsLimit: "حد الأشواط",
  roundsLimitDescription: "أكتر عدد أشواط (اختياري)",
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

  // Validation
  required: "الحقل دا مطلوب",
  invalidBid: "المزايدة لازم تكون بين {{min}} و {{max}}",
  invalidTricks: "الأكلات لازم تكون بين 0 و 13",
  tricksMustEqual13: "مجموع الأكلات لازم يساوي 13",
  enterGameTitle: "رجاءً دخل اسم اللعبة",
  enterPlayerNames: "رجاءً دخل أسماء كل اللاعبين",

  // Confirmation
  unsavedChanges: "لديك تغييرات غير محفوظة",
  discardChanges: "تجاهل التغييرات؟",

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
