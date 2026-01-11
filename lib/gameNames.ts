/**
 * Whist Score - Game Name Generator
 * Generates fun, random game names for Whist games
 */

// Funny game names in Sudanese Arabic
const gameNames = [
  "معركة الأبطال",
  "الليلة بلا رحمة",
  "جهز نفسك للهزيمة",
  "الاختبار النهائي",
  "ورق القدر",
  "النصر ولا العار",
  "مباراة الانتقام",
  "ليلة الجمعة الحامية",
  "الأساطير ما بتموت",
  "الهزيمة الساحقة",
  "الفايز ياخد كل حاجة",
  "الموقف الأخير",
  "ما في صحاب اليوم",
  "حقوق التفاخر",
  "الحرب الكبيرة",
  "الكرامة على المحك",
  "لعبة القروش",
  "مدمر الصداقات",
  "مباراة الثأر",
  "المعركة الفاصلة",
];

/**
 * Get a random game name
 */
export function getRandomGameName(): string {
  const randomIndex = Math.floor(Math.random() * gameNames.length);
  return gameNames[randomIndex];
}

/**
 * Get all game names
 */
export function getAllGameNames(): string[] {
  return gameNames;
}
