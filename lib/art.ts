/**
 * Manifest of the keepsake card animal paintings.
 *
 * file: web-ready image under public/ (null while the animal awaits art;
 * the card then renders a code-drawn night sky instead).
 *
 * anchor: where the constellation lives, as percentages of the square art
 * box. Chosen per painting to sit in open sky, clear of the animal and moon.
 *
 * Regenerate the webp files with: node scripts/prepare-art.mjs
 */

export type ConstellationAnchor = { x: number; y: number; w: number };

export type ArtEntry = {
  file: string | null;
  alt: string;
  anchor: ConstellationAnchor;
};

const DEFAULT_ANCHOR: ConstellationAnchor = { x: 32, y: 12, w: 36 };

export const ANIMAL_ART: Record<string, ArtEntry> = {
  Rat: {
    file: "/animals/rat.webp",
    alt: "Ink and watercolor painting of an emerald rat gazing up at a gold moon on an indigo night",
    anchor: { x: 63, y: 30, w: 26 },
  },
  Ox: {
    file: null,
    alt: "A deep indigo night sky with a glowing gold moon",
    anchor: DEFAULT_ANCHOR,
  },
  Tiger: {
    file: null,
    alt: "A deep indigo night sky with a glowing gold moon",
    anchor: DEFAULT_ANCHOR,
  },
  Rabbit: {
    file: null,
    alt: "A deep indigo night sky with a glowing gold moon",
    anchor: DEFAULT_ANCHOR,
  },
  Dragon: {
    file: "/animals/dragon.webp",
    alt: "Ink and watercolor painting of an emerald dragon coiling through gold clouds beneath a gold moon",
    anchor: { x: 7, y: 52, w: 24 },
  },
  Snake: {
    file: "/animals/snake.webp",
    alt: "Ink and watercolor painting of an emerald snake with gold linework beneath a gold moon",
    anchor: { x: 8, y: 8, w: 30 },
  },
  Horse: {
    file: "/animals/horse.webp",
    alt: "Ink and watercolor painting of an emerald horse in mid gallop beneath a gold moon",
    anchor: { x: 7, y: 8, w: 24 },
  },
  Goat: {
    file: "/animals/goat.webp",
    alt: "Ink and watercolor painting of a resting emerald goat with sweeping horns beneath a gold moon",
    anchor: { x: 8, y: 28, w: 26 },
  },
  Monkey: {
    file: "/animals/monkey.webp",
    alt: "Ink and watercolor painting of an emerald monkey reaching toward a gold moon",
    anchor: { x: 6, y: 30, w: 26 },
  },
  Rooster: {
    file: "/animals/rooster.webp",
    alt: "Ink and watercolor painting of a proud emerald rooster beneath a gold moon",
    anchor: { x: 6, y: 8, w: 26 },
  },
  Dog: {
    file: "/animals/dog.webp",
    alt: "Ink and watercolor painting of an emerald dog gazing up at a gold moon",
    anchor: { x: 8, y: 30, w: 26 },
  },
  Pig: {
    file: "/animals/pig.webp",
    alt: "Ink and watercolor painting of an emerald pig gazing up at a gold moon",
    anchor: { x: 8, y: 22, w: 26 },
  },
};

/**
 * Element tint of the night around the animal. Water is the native indigo of
 * the paintings, so it gets no overlay at all. The others shift the sky's
 * mood while the animal stays constant.
 */
export const ELEMENT_TINT: Record<string, string | null> = {
  Water: null,
  Wood: "#1E5C4A",
  Fire: "#8A3A1E",
  Earth: "#7A5A22",
  Metal: "#6E7787",
};
