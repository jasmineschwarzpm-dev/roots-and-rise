import {
  seedFor,
  westernCard,
  animalCard,
  elementCard,
  EXEMPLARS,
  type Lens,
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

/** A lens-colored closing bow, so the offline reading still reflects the taster. */
const LENS_BOW: Record<Lens, (thread: string) => string> = {
  confucius: (t) => `${cap(t)} is raw material, and you are the one standing at the forge.`,
  laozi: (t) => `${cap(t)} is your current. Stop shoving the river and let it carry you.`,
  buddha: (t) => `${cap(t)} moves through you like weather. Watch it kindly and hold it loose.`,
};

export function fallbackReading(
  western: string,
  animal: string,
  element: string,
  lens: Lens,
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

  const readingText = [
    `Your ${western} side is the ${wTrait} one: ${(w?.traits.join(", ") ?? "").toLowerCase()}.`,
    `Your ${animal} side is the ${aTrait} one: ${(a?.traits.join(", ") ?? "").toLowerCase()}.`,
    `Underneath it all, ${e?.flavorClause ?? ""}.`,
    LENS_BOW[lens](thread),
  ].join(" ");

  // Quote: prefer an exemplar for this exact combo, then any exemplar sharing a
  // word with the thread, then any exemplar at all. The lens colors the bow and
  // line above; the quote stays in the shared house voice.
  const comboEx = EXEMPLARS.filter((x) => x.western === western && x.chinese === animal);
  const threadWords = threadLow.split(/\W+/).filter((s) => s.length > 3);
  const onThread = EXEMPLARS.filter((x) =>
    threadWords.some((word) => x.text.toLowerCase().includes(word)),
  );
  const pool = comboEx.length ? comboEx : onThread.length ? onThread : EXEMPLARS;
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
