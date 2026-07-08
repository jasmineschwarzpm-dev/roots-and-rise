import voiceRules from "@/content/zodiac_content/voice_rules.json";
import {
  seedFor,
  westernCard,
  animalCard,
  elementCard,
  exemplarsForTone,
  ANTI_EXAMPLES,
  type Tone,
} from "./content";
import type { ReadingPart } from "./reading";

/**
 * Builds the thread-first generation prompt straight from voice_rules.json (the
 * generator's contract) plus the locked trait/seed/exemplar content. Returns a
 * system message (the durable voice + method) and a user message (this specific
 * birthday, plus any per-section regenerate instruction).
 */

type VoiceRules = {
  voice: string[];
  banned: {
    punctuation: string[];
    words: string[];
    constructions: string[];
  };
  tones: Record<string, string>;
  generation_pipeline: {
    order: string[];
    thread: string;
    line: string;
    reading: string;
    quote: string;
    section_regenerate_rule: string;
    element_role: string;
    kinship_rule: string;
  };
};

const vr = voiceRules as VoiceRules;

function bannedClause(): string {
  const punctuation = vr.banned.punctuation.join("; ");
  const words = vr.banned.words.join(", ");
  const constructions = vr.banned.constructions.join("; ");
  return [
    `Punctuation you may never use: ${punctuation}.`,
    `Words you may never use: ${words}.`,
    `Never do these: ${constructions}.`,
  ].join(" ");
}

function buildSystem(tone: Tone): string {
  const pipe = vr.generation_pipeline;
  const goods = exemplarsForTone(tone, 6)
    .map((e) => `- ${e.text}`)
    .join("\n");
  const bads = ANTI_EXAMPLES.slice(0, 5)
    .map((text) => `- ${text}`)
    .join("\n");

  return [
    "You write short zodiac readings for Roots & Rise, an app that bridges the Western zodiac and the Chinese zodiac for people who carry both traditions.",
    "",
    `VOICE: ${vr.voice.join(", ")}. Concrete images only, never abstract noun-stacking.`,
    "",
    `BANNED. ${bannedClause()}`,
    "",
    "METHOD, follow in this exact order:",
    `1. THREAD: ${pipe.thread}`,
    `2. LINE: ${pipe.line}`,
    `3. READING: ${pipe.reading}`,
    `4. QUOTE: ${pipe.quote}`,
    "",
    `Element role: ${pipe.element_role}`,
    `Kinship rule: ${pipe.kinship_rule}`,
    "",
    "GOOD examples of the voice for this tone:",
    goods,
    "",
    "NEVER write like these:",
    bads,
  ].join("\n");
}

function buildUser(
  western: string,
  animal: string,
  element: string,
  tone: Tone,
  lockedThread?: string | null,
  onlyPart?: ReadingPart | null,
): string {
  const w = westernCard(western);
  const a = animalCard(animal);
  const e = elementCard(element);
  const seed = seedFor(western, animal);

  const lines: string[] = [
    "SIGNS FOR THIS PERSON:",
    `- Western sign ${western}: ${w?.blurb ?? ""} Traits: ${w?.traits.join(", ") ?? ""}.`,
    `- Chinese animal ${animal}: ${a?.blurb ?? ""} Traits: ${a?.traits.join(", ") ?? ""}.`,
    `- Element ${element} (supporting voice only): ${e?.blurb ?? ""} Let it color both sides with this flavor: ${e?.flavorClause ?? ""}.`,
  ];

  if (seed) {
    lines.push(
      `SEED anchor for the ${western} + ${animal} combination: tone "${seed.coreTone}"; keywords "${seed.keywords}".`,
    );
    if (seed.kinship) {
      lines.push(
        `These two share an archetype (${seed.kinship}). Strongly consider it as the thread.`,
      );
    }
  }

  lines.push(`TONE: ${tone}, meaning ${vr.tones[tone] ?? ""}.`);
  lines.push("");

  if (lockedThread && onlyPart) {
    lines.push(
      `The thread is LOCKED: "${lockedThread}". ${vr.generation_pipeline.section_regenerate_rule} Regenerate only the ${onlyPart}, keeping it on this exact thread. Return all four fields, changing only the ${onlyPart}.`,
    );
  }

  lines.push(
    'Respond with ONLY a JSON object, no markdown fences and no preamble: {"thread":"...","reading":"...","quote":"...","line":"..."}',
  );

  return lines.join("\n");
}

export function buildPrompt(
  western: string,
  animal: string,
  element: string,
  tone: Tone,
  lockedThread?: string | null,
  onlyPart?: ReadingPart | null,
): { system: string; user: string } {
  return {
    system: buildSystem(tone),
    user: buildUser(western, animal, element, tone, lockedThread, onlyPart),
  };
}
