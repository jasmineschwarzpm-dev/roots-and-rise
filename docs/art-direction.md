# Keepsake Card Art Direction

Direction chosen by Jasmine, July 2026: ink-wash zodiac animals fused with an ethereal Western celestial layer, generated with an AI image tool, curated by hand.

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

## Usage rights

Use a paid plan on whichever tool you choose and read its commercial terms before generating, since mugs and cards may be sold later. Keep screenshots or receipts of your generations. Do not use images from the Pinterest board itself; those belong to other artists.

## Handoff

When you have candidates you love, send them to Claude Code (a folder path or dropped into chat works). Next steps from there: add them to the app, wire up the element tinting, and preview the full card on your phone before anything ships.
