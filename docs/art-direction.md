# Keepsake Card Art Direction

Direction chosen by Jasmine, July 2026: ink-wash zodiac animals fused with an ethereal Western celestial layer, generated with an AI image tool, curated by hand.

## Refined direction (from the mood boards, July 2026)

Jasmine's Pinterest sections (art-inspiration, color-pallet, brand-mood) point to a richer world than a pale minimal one. The consistent DNA across the boards:

- Deep jewel grounds: indigo night, emerald, teal, ink black
- Luminous gold: gold leaf, fine gold linework, gold clouds, gold stars
- Celestial: moons (crescent, full, and a recurring red sun), scattered stars, literal constellations, nebula-like clouds
- Flowing water and cloud forms: koi, waves, serpentine bodies that move like ink in water
- Ink and watercolor brushwork, elegant and atmospheric, with generous negative space

This is warmer and darker than the cream rice-paper minimalism in the reference build. Two consequences to decide before generating all twelve:

1. Card ground. The rich gold-and-teal animals sit best on a dark indigo night card, which also matches the app's own night-sky shell. Options: move the keepsake card to a dark ground (recommended, matches the boards), or keep the cream card and use the lighter warm-paper animal style. Mock both before deciding.
2. Element. If the animals are richly colored, we cannot tint the animal itself by element. Better plan: keep twelve fixed animal paintings and let code tint the night ground, moon glow, and constellation by element (Water indigo, Wood deep teal-green, Fire ember, Earth ochre-bronze, Metal cool silver-grey). Element then colors the whole sky around the animal. Still twelve images, all sixty combinations, and it fits the dark-ground look.

### Refined snake prompts (test both, pick the world)

Luminous dark (matches the boards):

```
Chinese ink and watercolor painting of a graceful snake, its coiling body flowing like liquid ink and water, deep emerald and teal washes with luminous gold leaf accents and fine gold linework, on a deep indigo night ground, a soft glowing moon and a faint scattering of gold stars, wisps of stylized gold cloud, elegant negative space, atmospheric, dreamlike, refined brushwork --ar 3:4 --stylize 300 --no photorealism, neon, text, watermark, border, frame, harsh outlines
```

Warm paper (matches the current cream card):

```
Sumi-e ink painting of a graceful snake in flowing confident brushstrokes, black ink with soft grey washes and a touch of teal, delicate gold leaf accents, on warm cream rice paper, a pale gold moon and a faint scattering of tiny gold stars, generous negative space, elegant, dreamlike, atmospheric --ar 3:4 --stylize 250 --no photorealism, neon, text, watermark, border, frame
```

Keep painted stars faint in either version, so the real Western constellation drawn in code stays readable on top. Once the snake style is chosen, regenerate the other eleven animals in that exact style using a style reference, then update the twelve prompts below to match.

## The concept

Each card background is a Chinese ink-wash painting of the person's zodiac animal on rice paper, with a faint Western sky woven around it: tiny gold stars, thin constellation lines, soft moon glow. The animal carries the Chinese tradition, the star layer carries the Western one. Two skies, one story, in a single image.

One rule that makes this work with 12 images instead of 144: **the celestial layer stays generic.** No specific Western zodiac constellation or glyph in the art, because any animal can pair with any Western sign. The person's Western sign already appears in the card header text.

The element does not need to be in the artwork either. The app tints each image by element in code (Wood green, Fire vermillion, Earth ochre, Metal silver grey, Water blue grey), so 12 neutral ink images cover all 60 element and animal pairings.

## Why this style

- The card lays a cream veil at about 80% opacity over the art so the reading stays legible. Ink work survives that veil because it is made of shape, not color detail.
- The rice-paper ground matches the card's existing cream gradient, so the art looks native, never pasted on.
- Ink plus the cinnabar seal is already the app's visual signature.

## Technical specs for generated images

- Portrait orientation, 3:4 ratio, at least 1200 x 1600 pixels
- Background: warm cream rice paper, close to #F5EFE2
- Palette: black and grey ink washes, small gold star accents, at most one muted warm accent color
- Composition: animal roughly centered, generous empty margins on all sides (text sits on top of everything)
- No text, no watermarks, no borders, no signature in the image

## Base prompt (reuse for every animal, swap only the bracketed part)

> Minimal Chinese ink wash painting of [animal description], loose confident sumi brush strokes, black ink with soft grey washes on warm cream rice paper, generous negative space, a faint scattering of tiny gold stars and thin delicate constellation lines woven around the figure, soft ethereal glow, dreamlike, elegant, subtle paper texture, muted palette, no text

Suggested negative prompt where the tool supports one:

> photorealism, neon, saturated colors, text, watermark, border, frame, busy background

## The twelve animal descriptions

| Animal | Bracketed description |
|---|---|
| Rat | a clever alert rat, poised mid-step, tail in one fluid stroke |
| Ox | a calm powerful ox standing firm, head slightly lowered |
| Tiger | a bold tiger mid-stride, stripes in confident single strokes |
| Rabbit | a gentle rabbit sitting quietly, ears attentive, soft washes |
| Dragon | a sinuous dragon curling through mist, whiskers trailing |
| Snake | a graceful snake in one continuous elegant curve |
| Horse | a spirited horse in motion, mane flying in loose strokes |
| Goat | a serene goat resting, horns in a calm curved line |
| Monkey | a playful monkey reaching upward, caught mid-swing |
| Rooster | a proud rooster standing tall, tail feathers in bold strokes |
| Dog | a loyal dog seated and watchful, ears up |
| Pig | a content joyful pig, round and soft, gentle expression |

## Consistency tips

- Generate all twelve in one sitting with the same tool and the same model version.
- Keep the prompt identical except for the animal description.
- If the tool supports a seed number or a style reference image, lock it after the first image you love and reuse it for the rest.
- Expect to generate several candidates per animal and keep the best. Curation is the real work.

## Midjourney workflow (chosen platform, July 2026)

Paste ONE line below per generation. Nothing else from this document goes into Midjourney. The `--ar 3:4` at the end sets the portrait shape and the `--no` list replaces the negative prompt.

Suggested order: start with the Snake. It is the simplest shape, so it is the fastest way to find the style. Generate until one Snake feels exactly right, then use that image as a style reference for the other eleven: on midjourney.com, click your favorite image and choose the style reference option (or drag the image into the prompt bar's style slot), then run the remaining prompts. That is what keeps all twelve looking like one artist.

If results feel too stiff or literal, add `--stylize 250` to the end of the prompt.

### Ready-to-paste prompts

Rat:

```
Minimal Chinese ink wash painting of a clever alert rat, poised mid-step, tail in one fluid stroke, loose confident sumi brush strokes, black ink with soft grey washes on warm cream rice paper, generous negative space, a faint scattering of tiny gold stars and thin delicate constellation lines woven around the figure, soft ethereal glow, dreamlike, elegant, subtle paper texture, muted palette --ar 3:4 --no photorealism, neon, saturated colors, text, watermark, border, frame, busy background
```

Ox:

```
Minimal Chinese ink wash painting of a calm powerful ox standing firm, head slightly lowered, loose confident sumi brush strokes, black ink with soft grey washes on warm cream rice paper, generous negative space, a faint scattering of tiny gold stars and thin delicate constellation lines woven around the figure, soft ethereal glow, dreamlike, elegant, subtle paper texture, muted palette --ar 3:4 --no photorealism, neon, saturated colors, text, watermark, border, frame, busy background
```

Tiger:

```
Minimal Chinese ink wash painting of a bold tiger mid-stride, stripes in confident single strokes, loose confident sumi brush strokes, black ink with soft grey washes on warm cream rice paper, generous negative space, a faint scattering of tiny gold stars and thin delicate constellation lines woven around the figure, soft ethereal glow, dreamlike, elegant, subtle paper texture, muted palette --ar 3:4 --no photorealism, neon, saturated colors, text, watermark, border, frame, busy background
```

Rabbit:

```
Minimal Chinese ink wash painting of a gentle rabbit sitting quietly, ears attentive, soft washes, loose confident sumi brush strokes, black ink with soft grey washes on warm cream rice paper, generous negative space, a faint scattering of tiny gold stars and thin delicate constellation lines woven around the figure, soft ethereal glow, dreamlike, elegant, subtle paper texture, muted palette --ar 3:4 --no photorealism, neon, saturated colors, text, watermark, border, frame, busy background
```

Dragon:

```
Minimal Chinese ink wash painting of a sinuous dragon curling through mist, whiskers trailing, loose confident sumi brush strokes, black ink with soft grey washes on warm cream rice paper, generous negative space, a faint scattering of tiny gold stars and thin delicate constellation lines woven around the figure, soft ethereal glow, dreamlike, elegant, subtle paper texture, muted palette --ar 3:4 --no photorealism, neon, saturated colors, text, watermark, border, frame, busy background
```

Snake (start here):

```
Minimal Chinese ink wash painting of a graceful snake in one continuous elegant curve, loose confident sumi brush strokes, black ink with soft grey washes on warm cream rice paper, generous negative space, a faint scattering of tiny gold stars and thin delicate constellation lines woven around the figure, soft ethereal glow, dreamlike, elegant, subtle paper texture, muted palette --ar 3:4 --no photorealism, neon, saturated colors, text, watermark, border, frame, busy background
```

Horse:

```
Minimal Chinese ink wash painting of a spirited horse in motion, mane flying in loose strokes, loose confident sumi brush strokes, black ink with soft grey washes on warm cream rice paper, generous negative space, a faint scattering of tiny gold stars and thin delicate constellation lines woven around the figure, soft ethereal glow, dreamlike, elegant, subtle paper texture, muted palette --ar 3:4 --no photorealism, neon, saturated colors, text, watermark, border, frame, busy background
```

Goat:

```
Minimal Chinese ink wash painting of a serene goat resting, horns in a calm curved line, loose confident sumi brush strokes, black ink with soft grey washes on warm cream rice paper, generous negative space, a faint scattering of tiny gold stars and thin delicate constellation lines woven around the figure, soft ethereal glow, dreamlike, elegant, subtle paper texture, muted palette --ar 3:4 --no photorealism, neon, saturated colors, text, watermark, border, frame, busy background
```

Monkey:

```
Minimal Chinese ink wash painting of a playful monkey reaching upward, caught mid-swing, loose confident sumi brush strokes, black ink with soft grey washes on warm cream rice paper, generous negative space, a faint scattering of tiny gold stars and thin delicate constellation lines woven around the figure, soft ethereal glow, dreamlike, elegant, subtle paper texture, muted palette --ar 3:4 --no photorealism, neon, saturated colors, text, watermark, border, frame, busy background
```

Rooster:

```
Minimal Chinese ink wash painting of a proud rooster standing tall, tail feathers in bold strokes, loose confident sumi brush strokes, black ink with soft grey washes on warm cream rice paper, generous negative space, a faint scattering of tiny gold stars and thin delicate constellation lines woven around the figure, soft ethereal glow, dreamlike, elegant, subtle paper texture, muted palette --ar 3:4 --no photorealism, neon, saturated colors, text, watermark, border, frame, busy background
```

Dog:

```
Minimal Chinese ink wash painting of a loyal dog seated and watchful, ears up, loose confident sumi brush strokes, black ink with soft grey washes on warm cream rice paper, generous negative space, a faint scattering of tiny gold stars and thin delicate constellation lines woven around the figure, soft ethereal glow, dreamlike, elegant, subtle paper texture, muted palette --ar 3:4 --no photorealism, neon, saturated colors, text, watermark, border, frame, busy background
```

Pig:

```
Minimal Chinese ink wash painting of a content joyful pig, round and soft, gentle expression, loose confident sumi brush strokes, black ink with soft grey washes on warm cream rice paper, generous negative space, a faint scattering of tiny gold stars and thin delicate constellation lines woven around the figure, soft ethereal glow, dreamlike, elegant, subtle paper texture, muted palette --ar 3:4 --no photorealism, neon, saturated colors, text, watermark, border, frame, busy background
```

## Usage rights

Use a paid plan on whichever tool you choose and read its commercial terms before generating, since mugs and cards may be sold later. Keep screenshots or receipts of your generations. Do not use images from the Pinterest board itself; those belong to other artists.

## Handoff

When you have candidates you love, send them to Claude Code (a folder path or dropped into chat works). Next steps from there: add them to the app, wire up the element tinting, and preview the full card on your phone before anything ships.
