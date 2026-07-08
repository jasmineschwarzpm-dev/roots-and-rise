import traits from "@/content/zodiac_content/zodiac_traits.json";
import seedData from "@/content/zodiac_content/combo_seeds.json";
import exemplarData from "@/content/zodiac_content/style_exemplars.json";

/**
 * Typed accessors over the locked content JSONs. The JSON files are the source
 * of truth and are never edited here; this module only reshapes them for the
 * app and adds presentation-only glyphs that were not part of the content set.
 */

export type Tone = "grounded" | "rising" | "mixed";

export type SignCard = {
  name: string;
  blurb: string;
  traits: string[];
  /** Western glyph or Chinese character used as the card's mark. */
  symbol: string;
};

export type ElementCard = SignCard & { flavorClause: string };

export type Seed = {
  western: string;
  chinese: string;
  coreTone: string;
  keywords: string;
  kinship?: string;
};

export type Exemplar = {
  tone: Tone;
  western?: string;
  chinese?: string;
  text: string;
};

// Presentation-only symbols (stable Unicode). Deliberately kept in code rather
// than in the reusable content JSONs.
const WESTERN_GLYPH: Record<string, string> = {
  Aries: "♈", Taurus: "♉", Gemini: "♊", Cancer: "♋",
  Leo: "♌", Virgo: "♍", Libra: "♎", Scorpio: "♏",
  Sagittarius: "♐", Capricorn: "♑", Aquarius: "♒", Pisces: "♓",
};

const ANIMAL_HANZI: Record<string, string> = {
  Rat: "鼠", Ox: "牛", Tiger: "虎", Rabbit: "兔",
  Dragon: "龙", Snake: "蛇", Horse: "马", Goat: "羊",
  Monkey: "猴", Rooster: "鸡", Dog: "狗", Pig: "猪",
};

const ELEMENT_HANZI: Record<string, string> = {
  Wood: "木", Fire: "火", Earth: "土", Metal: "金", Water: "水",
};

type RawTrait = { name: string; traits: string[]; blurb: string };
type RawElement = RawTrait & { flavor_clause: string };
type RawSeed = {
  western: string;
  chinese: string;
  core_tone: string;
  keywords: string;
  archetype_kinship?: string;
};
type RawExemplar = { tone: string; western?: string; chinese?: string; text: string };

export const WESTERN_SIGNS: SignCard[] = (traits.western_signs as RawTrait[]).map((s) => ({
  name: s.name,
  blurb: s.blurb,
  traits: s.traits,
  symbol: WESTERN_GLYPH[s.name] ?? "",
}));

export const ANIMALS: SignCard[] = (traits.chinese_animals as RawTrait[]).map((s) => ({
  name: s.name,
  blurb: s.blurb,
  traits: s.traits,
  symbol: ANIMAL_HANZI[s.name] ?? "",
}));

export const ELEMENTS: ElementCard[] = (traits.chinese_elements as RawElement[]).map((s) => ({
  name: s.name,
  blurb: s.blurb,
  traits: s.traits,
  symbol: ELEMENT_HANZI[s.name] ?? "",
  flavorClause: s.flavor_clause,
}));

const SEEDS = new Map<string, Seed>(
  (seedData.seeds as RawSeed[]).map((s) => [
    `${s.western}|${s.chinese}`,
    {
      western: s.western,
      chinese: s.chinese,
      coreTone: s.core_tone,
      keywords: s.keywords,
      kinship: s.archetype_kinship,
    },
  ]),
);

export const EXEMPLARS: Exemplar[] = (exemplarData.exemplars as RawExemplar[]).map((e) => ({
  tone: e.tone as Tone,
  western: e.western,
  chinese: e.chinese,
  text: e.text,
}));

export const ANTI_EXAMPLES: string[] = (
  exemplarData.anti_examples as { text: string }[]
).map((a) => a.text);

export function westernCard(name: string): SignCard | undefined {
  return WESTERN_SIGNS.find((s) => s.name === name);
}

export function animalCard(name: string): SignCard | undefined {
  return ANIMALS.find((s) => s.name === name);
}

export function elementCard(name: string): ElementCard | undefined {
  return ELEMENTS.find((s) => s.name === name);
}

export function seedFor(western: string, chinese: string): Seed | undefined {
  return SEEDS.get(`${western}|${chinese}`);
}

export function exemplarsForTone(tone: Tone, limit: number): Exemplar[] {
  return EXEMPLARS.filter((e) => e.tone === tone).slice(0, limit);
}
