# Keepsake Card Art Direction

Style LOCKED July 2026. The reference image is the Water Snake Jasmine generated in Midjourney: an emerald and gold serpent with fine gold scale linework and a soft gold moon, on a deep solid indigo night. Every other animal matches this. The old cream rice-paper direction is retired.

## Status (updated July 11, 2026)

Chosen finals live in `art-finals/`, one clean-named file per animal. The set shares a moon-gazing motif; protect it when generating the remaining animals.

| Animal | Status |
|---|---|
| Rat, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, Pig | DONE, final chosen in art-finals/ |
| Ox, Tiger, Rabbit | NOT YET GENERATED, prompts below are ready |

Selection notes: pig final is the moon-gazing pig (the boar variant kept as promo art only, wrong archetype for the locked Pig traits; the smiling pig variant reads too storybook next to the set). Rooster final is the clean-sky version (the rocky-outcrop variant kept as promo art, too busy for the constellation layer). Monkey final is the vertical reaching pose.

## The look

- Deep solid indigo night ground (roughly #262a55)
- Emerald and teal ink and watercolor washes for the animal
- Luminous gold: gold leaf, fine gold linework, a soft gold moon, wisps of gold cloud
- A faint scattering of gold stars, elegant and atmospheric
- Generous open sky, so the code constellation has room to live

## The concept: two skies, one card

Each card is the person's Chinese zodiac animal, painted, on a night sky. In code we draw their real Western constellation in gold in the open part of that sky. The animal carries the Chinese tradition, the constellation carries the Western one. Both are present, neither is a footnote.

This is what lets twelve paintings serve everyone. The animal is one of twelve; the Western constellation is drawn in code, so any animal pairs with any of the twelve signs without new art. Do not paint a specific Western constellation into the image; leave that to code.

## How the element works

The element is not painted into the animal. Twelve fixed animal paintings stay constant, and code tints the night around them by element: Water keeps the deep indigo, Wood a deep teal-green, Fire a warm ember, Earth a bronze, Metal a cool silver-grey. The element colors the whole sky; the animal stays the same. Twelve images, all sixty element and animal pairings.

The Water Snake needs no tint at all, since indigo already reads as Water. A happy accident.

## Card ground: dark night (decided)

The keepsake card is a dark indigo night, not cream. The rich gold-and-emerald animals glow on it, and it matches the app's own night-sky shell. The cream direction is retired.

## Technical specs for each generated image

- Portrait orientation, 3:4 ratio preferred (the square framing of the reference snake also works, since the card crops to portrait)
- Highest resolution the tool offers; upscale before saving
- Background: deep solid indigo night, roughly #262a55, even and uncluttered
- Palette: emerald and teal washes, luminous gold leaf and fine gold linework, a soft gold moon; keep to this jewel-and-gold family so all twelve read as one set
- Composition: the animal to one side or lower, the moon in the upper sky, and at least one region of open indigo kept clear so the code constellation is readable
- No text, no watermarks, no borders, no signature in the image

## The locked base prompt (swap only the bracketed part)

> Chinese ink and watercolor painting of [animal description], deep emerald and teal washes with luminous gold leaf accents and fine gold linework, on a deep solid indigo night ground, a soft glowing gold moon and wisps of stylized gold cloud, a faint scattering of gold stars, elegant negative space, atmospheric, dreamlike, refined brushwork --ar 3:4 --stylize 300 --no photorealism, neon, saturated colors, text, watermark, border, frame, busy background, harsh outlines

## Midjourney workflow, with the snake as the anchor

The snake is your style reference. It is what keeps the other eleven looking like the same artist made them.

1. On midjourney.com, drag your saved Water Snake image into the prompt bar and mark it as a style reference. (Or upload it, copy its image URL, and add `--sref THAT_URL` to the end of each prompt below.)
2. Paste ONE animal line per generation. Nothing else from this document goes into Midjourney.
3. Generate several candidates per animal and keep the best. Curation is the real work.
4. Save each keeper at full resolution.

If an animal comes out too busy, add the word `simple` near the front. If the sky fills with too many painted stars and leaves no open space, change `a faint scattering of gold stars` to `a few faint gold stars`.

### Ready-to-paste prompts

Rat:

```
Chinese ink and watercolor painting of a clever alert rat, poised mid-step, tail curling in one fluid gold-lined stroke, deep emerald and teal washes with luminous gold leaf accents and fine gold linework, on a deep solid indigo night ground, a soft glowing gold moon and wisps of stylized gold cloud, a faint scattering of gold stars, elegant negative space, atmospheric, dreamlike, refined brushwork --ar 3:4 --stylize 300 --no photorealism, neon, saturated colors, text, watermark, border, frame, busy background, harsh outlines
```

Ox:

```
Chinese ink and watercolor painting of a calm powerful ox standing firm, head lowered, painted in flowing emerald ink washes, deep emerald and teal washes with luminous gold leaf accents and fine gold linework, on a deep solid indigo night ground, a soft glowing gold moon and wisps of stylized gold cloud, a faint scattering of gold stars, elegant negative space, atmospheric, dreamlike, refined brushwork --ar 3:4 --stylize 300 --no photorealism, neon, saturated colors, text, watermark, border, frame, busy background, harsh outlines
```

Tiger:

```
Chinese ink and watercolor painting of a bold tiger mid-stride, stripes in confident gold-lined strokes, deep emerald and teal washes with luminous gold leaf accents and fine gold linework, on a deep solid indigo night ground, a soft glowing gold moon and wisps of stylized gold cloud, a faint scattering of gold stars, elegant negative space, atmospheric, dreamlike, refined brushwork --ar 3:4 --stylize 300 --no photorealism, neon, saturated colors, text, watermark, border, frame, busy background, harsh outlines
```

Rabbit:

```
Chinese ink and watercolor painting of a gentle rabbit sitting quietly, ears attentive, soft flowing washes, deep emerald and teal washes with luminous gold leaf accents and fine gold linework, on a deep solid indigo night ground, a soft glowing gold moon and wisps of stylized gold cloud, a faint scattering of gold stars, elegant negative space, atmospheric, dreamlike, refined brushwork --ar 3:4 --stylize 300 --no photorealism, neon, saturated colors, text, watermark, border, frame, busy background, harsh outlines
```

Dragon:

```
Chinese ink and watercolor painting of a sinuous dragon curling through cloud, whiskers trailing, its body flowing like liquid ink and water, deep emerald and teal washes with luminous gold leaf accents and fine gold linework, on a deep solid indigo night ground, a soft glowing gold moon and wisps of stylized gold cloud, a faint scattering of gold stars, elegant negative space, atmospheric, dreamlike, refined brushwork --ar 3:4 --stylize 300 --no photorealism, neon, saturated colors, text, watermark, border, frame, busy background, harsh outlines
```

Snake (your reference, already done):

```
Chinese ink and watercolor painting of a graceful snake coiling in an elegant curve, its body flowing like liquid ink and water, deep emerald and teal washes with luminous gold leaf accents and fine gold linework, on a deep solid indigo night ground, a soft glowing gold moon and wisps of stylized gold cloud, a faint scattering of gold stars, elegant negative space, atmospheric, dreamlike, refined brushwork --ar 3:4 --stylize 300 --no photorealism, neon, saturated colors, text, watermark, border, frame, busy background, harsh outlines
```

Horse:

```
Chinese ink and watercolor painting of a spirited horse in mid-gallop, mane and tail flowing in loose gold-lined strokes, deep emerald and teal washes with luminous gold leaf accents and fine gold linework, on a deep solid indigo night ground, a soft glowing gold moon and wisps of stylized gold cloud, a faint scattering of gold stars, elegant negative space, atmospheric, dreamlike, refined brushwork --ar 3:4 --stylize 300 --no photorealism, neon, saturated colors, text, watermark, border, frame, busy background, harsh outlines
```

Goat:

```
Chinese ink and watercolor painting of a serene goat at rest, horns curving in a calm gold-lined line, soft flowing washes, deep emerald and teal washes with luminous gold leaf accents and fine gold linework, on a deep solid indigo night ground, a soft glowing gold moon and wisps of stylized gold cloud, a faint scattering of gold stars, elegant negative space, atmospheric, dreamlike, refined brushwork --ar 3:4 --stylize 300 --no photorealism, neon, saturated colors, text, watermark, border, frame, busy background, harsh outlines
```

Monkey:

```
Chinese ink and watercolor painting of a playful monkey reaching upward mid-swing, tail curling in a fluid stroke, deep emerald and teal washes with luminous gold leaf accents and fine gold linework, on a deep solid indigo night ground, a soft glowing gold moon and wisps of stylized gold cloud, a faint scattering of gold stars, elegant negative space, atmospheric, dreamlike, refined brushwork --ar 3:4 --stylize 300 --no photorealism, neon, saturated colors, text, watermark, border, frame, busy background, harsh outlines
```

Rooster:

```
Chinese ink and watercolor painting of a proud rooster standing tall, tail feathers sweeping in bold gold-lined strokes, deep emerald and teal washes with luminous gold leaf accents and fine gold linework, on a deep solid indigo night ground, a soft glowing gold moon and wisps of stylized gold cloud, a faint scattering of gold stars, elegant negative space, atmospheric, dreamlike, refined brushwork --ar 3:4 --stylize 300 --no photorealism, neon, saturated colors, text, watermark, border, frame, busy background, harsh outlines
```

Dog:

```
Chinese ink and watercolor painting of a loyal dog seated and watchful, ears up, painted in flowing emerald ink washes, deep emerald and teal washes with luminous gold leaf accents and fine gold linework, on a deep solid indigo night ground, a soft glowing gold moon and wisps of stylized gold cloud, a faint scattering of gold stars, elegant negative space, atmospheric, dreamlike, refined brushwork --ar 3:4 --stylize 300 --no photorealism, neon, saturated colors, text, watermark, border, frame, busy background, harsh outlines
```

Pig:

```
Chinese ink and watercolor painting of a content rounded pig, gentle and soft, painted in flowing emerald ink washes, deep emerald and teal washes with luminous gold leaf accents and fine gold linework, on a deep solid indigo night ground, a soft glowing gold moon and wisps of stylized gold cloud, a faint scattering of gold stars, elegant negative space, atmospheric, dreamlike, refined brushwork --ar 3:4 --stylize 300 --no photorealism, neon, saturated colors, text, watermark, border, frame, busy background, harsh outlines
```

## Consistency tips

- Use the snake as the style reference for all eleven, in one sitting, same model version.
- Keep the prompt identical except for the animal phrase.
- Expect several candidates per animal. Keep the one whose pose and gold work best.
- Favor images with a calm, open patch of night, since that is where the constellation goes.

## Usage rights

You are on a paid Midjourney plan, which grants commercial rights while your business grosses under one million dollars a year, and rights vest when you create the image, so they survive cancelling. Keep your receipt. Do not use images from the Pinterest board itself; those belong to other artists.

## Handoff

When you have animals you love, drop them in the project folder or into chat. Next steps from there: place each animal in the app, draw the twelve real Western constellations from star data, wire the element tinting of the night, and preview the full card on your phone before anything ships. The reference snake already lives at the project root, and a card preview is saved in previews/keepsake-virgo-water-snake.png.
