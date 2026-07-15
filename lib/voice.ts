/**
 * Enforcement for the voice_rules.json banned list. The generation prompt
 * forbids these, but models occasionally slip, so the server validates every
 * generated reading and can describe exactly what went wrong for a retry.
 *
 * Note: the banned word is "lands" specifically. The base form "land" appears
 * in the owner's own kept exemplars and is allowed.
 */

// "not X but Y" within one sentence, e.g. "not fearless but kind".
const CONTRAST = /\bnot\s+(?:[\w'’-]+[\s,]+){0,6}?but\b/i;

/**
 * The same construction wearing a comma instead of "but": a negation restated
 * as an affirmation. Covers both the contracted and full forms, since models
 * reach for either ("isn't soft, it's steel" and "is not soft, it is steel"),
 * and the "just/only" tail ("are not opposites, just one strength").
 */
const AUX = String.raw`(?:is|are|was|were|do|does|did|will|would|can|could|has|have|had)`;
const NEGATION = String.raw`(?:\b${AUX}\s+(?:not|never)\b|\b${AUX}n'?t\b|\bnever\b)`;
const RESTATEMENT = String.raw`(?:\b(?:it|they|that|this|you|he|she|we)\b['’\s]|\b(?:just|only|merely|simply)\b)`;
const NEGATION_RESTATED = new RegExp(`${NEGATION}[^.!?]*?,\\s*${RESTATEMENT}`, "i");

/**
 * The flip written backwards: affirm, then negate. "A discipline, not a
 * default." The lookaheads spare ordinary participles ("he left, not knowing")
 * and causal clauses ("you move, not because you must"), which read naturally.
 */
const TRAILING_NOT = /,\s*not\s+(?!\w+ing\b)(?!because\b)/i;

/** Returns human-readable descriptions of every banned-list violation in the text. */
export function findViolations(text: string): string[] {
  const found: string[] = [];
  if (/[—–]/.test(text)) found.push("an em dash or en dash");
  if (/\bactually\b/i.test(text)) found.push('the word "actually"');
  if (/\blands\b/i.test(text)) found.push('the word "lands"');
  if (/\blooks like\b/i.test(text)) found.push('the phrase "looks like"');
  if (CONTRAST.test(text) || NEGATION_RESTATED.test(text) || TRAILING_NOT.test(text)) {
    found.push('a "not X but Y" contrast construction');
  }
  return found;
}

/** Replace banned dashes with a comma pause, preserving meaning. */
export function scrubDashes(text: string): string {
  return text
    .replace(/\s*[—–]\s*/g, ", ")
    .replace(/,\s*,/g, ", ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/**
 * Remove a stray "actually": dropping the adverb is grammatically safe in
 * essentially every sentence ("then actually wait" reads as "then wait").
 */
export function scrubActually(text: string): string {
  return text
    .replace(/,?\s*\bactually\b,?\s*/gi, " ")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([.,!?;:])/g, "$1")
    .trim();
}

/** Final cleanup applied to every generated field before it reaches the user. */
export function scrubAll(text: string): string {
  return scrubActually(scrubDashes(text));
}
