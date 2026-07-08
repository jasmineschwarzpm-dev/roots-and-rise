import {
  seedFor,
  westernCard,
  animalCard,
  elementCard,
  EXEMPLARS,
  type Tone,
} from "./content";
import type { Reading } from "./reading";

/**
 * Offline template composer. Used when the AI call fails or is unavailable, so
 * the page always shows a coherent reading. Draws entirely on the locked traits,
 * seeds, and exemplars, and avoids the banned punctuation and constructions.
 */

/** Deterministic pick with a wrap-around index, so a nonce varies the wording. */
function pick<T>(arr: T[], n: number): T {
  return arr[((n % arr.length) + arr.length) % arr.length];
}

function cap(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

export function fallbackReading(
  western: string,
  animal: string,
  element: string,
  tone: Tone,
  n: number,
  lockedThread?: string | null,
): Reading {
  const seed = seedFor(western, animal);
  const w = westernCard(western);
  const a = animalCard(animal);
  const e = elementCard(element);

  const coreTone = seed?.coreTone ?? "";
  const keywords = seed?.keywords ?? "";
  const kw = keywords.split(",").map((s) => s.trim()).filter(Boolean);
  const thread = lockedThread || pick(kw.length ? kw : [coreTone], n) || coreTone;
  const threadLow = thread.toLowerCase();

  // The seed's core tone gives grammatically safe adjectives, e.g. "Fierce + Heart-Centered".
  const toneParts = coreTone.split("+").map((s) => s.trim().toLowerCase());
  const wTrait = toneParts[0] || (w?.traits[0] ?? "").toLowerCase();
  const aTrait = toneParts[1] || (a?.traits[0] ?? "").toLowerCase();

  const bows = [
    `Put the ${wTrait} and the ${aTrait} in one person and you get ${threadLow}: one side starts things, the other decides how they feel to everyone around you.`,
    `${cap(thread)} is what happens when the ${wTrait} part and the ${aTrait} part share a life: the first opens the door, the second makes it warm inside.`,
  ];

  const readingText = [
    `Your ${western} side is the ${wTrait} one: ${(w?.traits.join(", ") ?? "").toLowerCase()}.`,
    `Your ${animal} side is the ${aTrait} one: ${(a?.traits.join(", ") ?? "").toLowerCase()}.`,
    `Underneath it all, ${e?.flavorClause ?? ""}.`,
    pick(bows, n),
  ].join(" ");

  // Quote: prefer an exemplar for this exact combo, then a tone exemplar sharing
  // a word with the thread, then any exemplar for this tone.
  const comboEx = EXEMPLARS.filter((x) => x.western === western && x.chinese === animal);
  const toneEx = EXEMPLARS.filter((x) => x.tone === tone);
  const threadWords = threadLow.split(/\W+/).filter((s) => s.length > 3);
  const onThread = toneEx.filter((x) =>
    threadWords.some((word) => x.text.toLowerCase().includes(word)),
  );
  const pool = comboEx.length ? comboEx : onThread.length ? onThread : toneEx;
  const quote = pool.length ? pick(pool, n).text : `${cap(thread)} is yours to carry.`;

  const lines = [
    `${cap(thread)}, worn like a second skin.`,
    `Call it ${threadLow}. Everyone else calls it you.`,
    `${cap(thread)} is how you move through the world.`,
  ];

  return {
    thread,
    reading: readingText,
    quote,
    line: pick(lines, n),
    source: "offline",
  };
}
