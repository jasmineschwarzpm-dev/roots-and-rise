import type { Tone } from "./content";

/** The four generated pieces plus where they came from. */
export type Reading = {
  /** The one shared idea both signs feed. The spine that ties the parts together. */
  thread: string;
  /** The combined reading paragraph. */
  reading: string;
  /** A short quote in the exemplar voice. */
  quote: string;
  /** The wallpaper/mug line: the purest, shortest expression of the thread. */
  line: string;
  source: "ai" | "offline";
};

/** The sections a per-section "reword" can regenerate while keeping the thread locked. */
export type ReadingPart = "reading" | "quote" | "line";

export const READING_PARTS: ReadingPart[] = ["reading", "quote", "line"];

export type GenerateRequest = {
  western: string;
  animal: string;
  element: string;
  tone: Tone;
  /** When present, regenerate only `onlyPart` and keep this exact thread. */
  lockedThread?: string | null;
  onlyPart?: ReadingPart | null;
};
