import lnyData from "@/content/lunar_new_year.json";

/**
 * Sign math for Roots & Rise.
 *
 * Correctness-critical. Two independent systems:
 *  - Western sun sign: fixed conventional calendar cutoffs.
 *  - Chinese animal + element: determined by the Chinese (lunar) year, which
 *    begins at Lunar New Year, not January 1. A late-January or February
 *    birthday can therefore belong to the previous Chinese year.
 *
 * Everything here is a pure function so the boundary cases can be tested.
 */

export const ANIMAL_ORDER = [
  "Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake",
  "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig",
] as const;

export const ELEMENT_ORDER = [
  "Wood", "Fire", "Earth", "Metal", "Water",
] as const;

export type Animal = (typeof ANIMAL_ORDER)[number];
export type Element = (typeof ELEMENT_ORDER)[number];

/**
 * Fixed conventional Western sun-sign cutoffs: the last inclusive day of each
 * sign's window. These are traditional fixed dates, not per-year astronomical
 * boundaries, matching the locked reference implementation. Capricorn appears
 * twice because its window wraps the year end.
 */
const WESTERN_CUTOFFS: ReadonlyArray<readonly [string, number, number]> = [
  ["Capricorn", 1, 19], ["Aquarius", 2, 18], ["Pisces", 3, 20],
  ["Aries", 4, 19], ["Taurus", 5, 20], ["Gemini", 6, 20],
  ["Cancer", 7, 22], ["Leo", 8, 22], ["Virgo", 9, 22],
  ["Libra", 10, 22], ["Scorpio", 11, 21], ["Sagittarius", 12, 21],
  ["Capricorn", 12, 31],
];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const LNY_DATES = lnyData.dates as Record<string, string>;
export const YEAR_RANGE = lnyData.range as { min: number; max: number };

export type Signs = {
  western: string;
  animal: Animal;
  element: Element;
  lunarYear: number;
  beforeLunarNewYear: boolean;
  /** Human-readable Lunar New Year date for the birth year, e.g. "February 2, 1984". */
  lunarNewYearDate: string;
  /** Explanatory note for January/February births, or null otherwise. */
  edgeNote: string | null;
};

export type SignError = { error: string };

export function isSignError(value: Signs | SignError): value is SignError {
  return (value as SignError).error !== undefined;
}

/** Positive modulo (JavaScript's % can return negatives). */
function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

export function westernSign(month: number, day: number): string {
  for (const [name, cutoffMonth, cutoffDay] of WESTERN_CUTOFFS) {
    if (month < cutoffMonth || (month === cutoffMonth && day <= cutoffDay)) {
      return name;
    }
  }
  return "Capricorn";
}

/**
 * The 12-year animal cycle is anchored so that 1924 (and every year congruent
 * to it) is the Rat. Works for any year via modular arithmetic.
 */
export function animalForLunarYear(lunarYear: number): Animal {
  return ANIMAL_ORDER[mod(lunarYear - 4, 12)];
}

/**
 * The five elements each span two consecutive years of the 10-year stem cycle
 * (Wood 4-5, Fire 6-7, Earth 8-9, Metal 0-1, Water 2-3, by year mod 10).
 */
export function elementForLunarYear(lunarYear: number): Element {
  return ELEMENT_ORDER[Math.floor(mod(lunarYear - 4, 10) / 2)];
}

/** Rejects impossible dates such as February 30 or month 13. */
function isValidCalendarDate(year: number, month: number, day: number): boolean {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return false;
  }
  if (month < 1 || month > 12 || day < 1 || day > 31) return false;
  const probe = new Date(Date.UTC(year, month - 1, day));
  return (
    probe.getUTCFullYear() === year &&
    probe.getUTCMonth() === month - 1 &&
    probe.getUTCDate() === day
  );
}

const OUT_OF_RANGE = `Birth years ${YEAR_RANGE.min} to ${YEAR_RANGE.max} are supported for now.`;

/**
 * Turn a "YYYY-MM-DD" birth date (the value an <input type="date"> produces)
 * into the three signs plus supporting detail, or a friendly error.
 */
export function computeSigns(dateStr: string): Signs | SignError {
  const parts = dateStr.split("-").map((part) => Number(part));
  if (parts.length !== 3) {
    return { error: "That date does not look right. Please pick a real date of birth." };
  }
  const [year, month, day] = parts;
  if (!isValidCalendarDate(year, month, day)) {
    return { error: "That date does not look right. Please pick a real date of birth." };
  }
  if (year < YEAR_RANGE.min || year > YEAR_RANGE.max) {
    return { error: OUT_OF_RANGE };
  }
  const lnyStr = LNY_DATES[String(year)];
  if (!lnyStr) {
    // Defensive: every in-range year has an entry.
    return { error: OUT_OF_RANGE };
  }

  const [lnyMonth, lnyDay] = lnyStr.split("-").map((part) => Number(part));
  const beforeLunarNewYear =
    month < lnyMonth || (month === lnyMonth && day < lnyDay);
  const lunarYear = beforeLunarNewYear ? year - 1 : year;

  const animal = animalForLunarYear(lunarYear);
  const element = elementForLunarYear(lunarYear);
  const western = westernSign(month, day);
  const lunarNewYearDate = `${MONTH_NAMES[lnyMonth - 1]} ${lnyDay}, ${year}`;

  let edgeNote: string | null = null;
  if (month <= 2) {
    edgeNote = beforeLunarNewYear
      ? `Born before Lunar New Year (${lunarNewYearDate}), so your Chinese year is ${lunarYear}: the ${element} ${animal}.`
      : `Born on or after Lunar New Year (${lunarNewYearDate}), so ${year} is your Chinese year: the ${element} ${animal}.`;
  }

  return {
    western,
    animal,
    element,
    lunarYear,
    beforeLunarNewYear,
    lunarNewYearDate,
    edgeNote,
  };
}
