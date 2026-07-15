import traits from "@/content/zodiac_content/zodiac_traits.json";
import seedData from "@/content/zodiac_content/combo_seeds.json";
import exemplarData from "@/content/zodiac_content/style_exemplars.json";

/**
 * Typed accessors over the locked content JSONs. The JSON files are the source
 * of truth and are never edited here; this module only reshapes them for the
 * app and adds presentation-only glyphs that were not part of the content set.
 */

export type Lens = "confucius" | "laozi" | "buddha";

export type LensInfo = {
  id: Lens;
  philosopher: string;
  taste: string;
  /** Short evocative label for the chooser card. */
  tagline: string;
  /** One or two sentences shown on the chooser card. */
  chooserBlurb: string;
  /** The philosophy's core stance, fed to the generation prompt. */
  stance: string;
  /** What a reading through this lens should emphasize. */
  emphasis: string;
  /** The voice coloring for this lens. */
  voice: string;
  /** How this lens relates the signs to the self, for the prompt. */
  relationship: string;
};

/**
 * The three lenses of the Vinegar Tasters. Confucius tastes the vinegar sour,
 * Buddha bitter, Laozi sweet: one jar, three truths. The reader picks the one
 * that matches how they want to meet themselves, and the reading is written
 * through it. See docs/reading-lenses.md.
 */
export const LENSES: LensInfo[] = [
  {
    id: "confucius",
    philosopher: "Confucius",
    taste: "sour",
    tagline: "Cultivate what you are given",
    chooserBlurb:
      "The world is set right through effort, learning, and honoring your bonds. Your reading becomes a call to forge your best self.",
    stance:
      "Character is built. The self and the world are set right through effort, ritual, learning, and honoring one's relationships.",
    emphasis:
      "growth, discipline, integrity, the reader's roles and responsibilities, and becoming their best self through steady practice",
    voice:
      "grounded, dignified, aspirational, and warm; speak to the reader as someone capable of mastery",
    relationship:
      "Treat the fire, the water, and the animal as raw gifts to be tempered into strengths through practice.",
  },
  {
    id: "laozi",
    philosopher: "Laozi",
    taste: "sweet",
    tagline: "Flow with what you are",
    chooserBlurb:
      "Harmony comes from moving with your nature and the natural way. Your reading becomes permission to stop forcing.",
    stance:
      "Harmony comes from moving with one's nature and the natural way. Effortless action, the water that wears the stone.",
    emphasis:
      "acceptance, ease, trusting one's own current, softness as strength, and letting go of forcing",
    voice:
      "gentle, spacious, lightly playful, and unhurried; speak to the reader as already whole",
    relationship:
      "Treat the fire, the water, and the animal as a current to trust rather than a project to fix.",
  },
  {
    id: "buddha",
    philosopher: "Buddha",
    taste: "bitter",
    tagline: "Hold lightly what you are",
    chooserBlurb:
      "Peace comes from awareness and loosening your grip. Your reading becomes an invitation to meet yourself with compassion.",
    stance:
      "Peace comes from seeing clearly and releasing attachment. Traits are weather passing through, held lightly rather than fixed.",
    emphasis:
      "awareness, compassion, non-attachment, gentleness, and the calm underneath the personality",
    voice:
      "calm, clear, compassionate, and softly grounded; speak to the reader as the awareness behind their traits",
    relationship:
      "Treat the fire, the water, and the animal as patterns passing through, to be noticed with care and held loosely.",
  },
];

export function lensInfo(id: Lens): LensInfo | undefined {
  return LENSES.find((l) => l.id === id);
}

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
  /** Original style-bank mood tag; kept for provenance, no longer used to filter. */
  tone: string;
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
  tone: e.tone,
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

/**
 * A balanced spread of voice exemplars for the prompt. The exemplars teach the
 * house voice, which stays the same across every lens; the lens colors the
 * stance, not the sentence craft. Spreading across the bank avoids leaning on
 * any one mood.
 */
export function voiceExemplars(limit: number): Exemplar[] {
  if (limit <= 0 || EXEMPLARS.length === 0) return [];
  const step = Math.max(1, Math.floor(EXEMPLARS.length / limit));
  const out: Exemplar[] = [];
  for (let i = 0; i < EXEMPLARS.length && out.length < limit; i += step) {
    out.push(EXEMPLARS[i]);
  }
  return out;
}
