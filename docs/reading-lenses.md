# Reading Lenses: The Vinegar Tasters (V2 design)

Draft v0.1, July 2026. The core of version 2. Instead of the current grounded/rising/mixed tone toggle, the reader chooses one of three philosophical lenses, drawn from the Vinegar Tasters allegory, and the reading is written through that lens. Draft for the owner's review; a knowledgeable reader should check the philosophy before this ships. Voice rules apply to all generated output: no em or en dashes, no banned words, no "not X but Y" constructions.

## The insight that makes this more than three flavors

The three traditions do not merely have different moods. They disagree about what a person even is. That disagreement is the feature, and it is what gives the product real depth.

- Confucius: you are raw material to be cultivated. A reading is a call to forge yourself.
- Laozi: you are a nature to be flowed with. A reading is permission to stop forcing.
- Buddha: you are patterns to be held lightly. A reading is an invitation to watch them without clinging.

Most zodiac sites give one flat answer to "who am I." This gives three honest ones and lets the reader choose how they want to meet themselves today.

## The three lenses

### Confucius, the sour taste, order and cultivation

- Core stance: the world and the self are set right through effort, ritual, learning, and honoring your relationships. Character is built.
- A reading emphasizes: growth, discipline, integrity, the person's roles and responsibilities, becoming your best self through practice.
- Voice: grounded, dignified, aspirational, warm. Speaks to the reader as someone capable of mastery.
- Relationship to the signs: the fire, the water, the animal are raw gifts to be tempered into strengths.

### Laozi, the sweet taste, flow and ease

- Core stance: harmony comes from moving with your nature and the natural way, not against them. Effortless action, wu wei. The uncarved block, the water that wears stone.
- A reading emphasizes: acceptance, ease, trusting your own current, softness as strength, letting go of forcing.
- Voice: gentle, spacious, a little playful, unhurried. Speaks to the reader as already whole.
- Relationship to the signs: the fire, the water, the animal are a current to trust rather than a project to fix.

### Buddha, the bitter taste, awareness and release

- Core stance: peace comes from seeing clearly and releasing attachment, since clinging is the root of suffering. Traits are weather, not identity. Handled with care because Buddhism teaches non-self; the lens holds traits lightly rather than fixing them.
- A reading emphasizes: awareness, compassion, non-attachment, gentleness, the calm underneath the personality.
- Voice: calm, clear, compassionate, softly detached. Speaks to the reader as the awareness behind the traits.
- Relationship to the signs: the fire, the water, the animal are patterns passing through, noticed and not gripped.

## Worked example: Aries Water Pig, three ways

Confucius:
> Your Aries fire is raw ore, and you were born to forge it. You lead by going first, and the people around you steady when you do. The Pig in you gives that fire a generous heart, so your ambition feeds more than yourself. Water runs beneath it all, patient, wearing down whatever resists. Your work is to temper the fire through practice until it becomes mastery. You are still being made, and you are the one standing at the forge.

Laozi:
> Your Aries fire does not need permission to burn, and it does not need forcing. When you stop shoving the river, you move faster. The Pig in you already knows how to rest and savor, so trust that softness; it is your current, and it carries you. Water is your deepest nature, finding the way through without a fight. You already are what you were looking to become. Let yourself be exactly that, and watch how far it takes you.

Buddha:
> Your Aries fire is bright, and it rises and passes like weather across a wide sky. Notice it, and let it move without letting it drive. The Pig in you loves deeply, so hold what you love with open hands, and it will mean more and bind you less. Water teaches you to feel everything and cling to none of it. Your quickness, your temper, even your kindness, all of it passes through you. You are the calm sky that watches it go. Rest there, and be gentle with everyone, beginning with yourself.

## How it plugs into what is built

- The lens replaces the current tone value in the request to the reading route. The thread-first pipeline stays; the lens colors the thread, the reading, the quote, and the line.
- The prompt gains a lens section: the stance, the emphasis, the voice, and the relationship-to-self above, plus a few on-lens exemplars to author.
- The offline fallback needs lens-aware templates too, so a failed API call still respects the chosen lens.
- The homepage chooser presents the three as the Vinegar Tasters, each with a short, honest explanation, before the reading. Pairs with the founder story and the two-skies history.

## Scope and care

- These are simplified lenses for a warm keepsake, honoring the traditions, not teaching them in full. The site should say so plainly.
- Art styles per lens are a later, optional enhancement. Version 2 can ship all three lenses on the single existing art style.
- Verify the philosophy framings with a knowledgeable reader before publishing, especially the Buddhist non-self handling.

## Open questions for the owner

- Keep the old grounded/rising/mixed tone as well, or retire it now that the lenses carry more meaning? Recommendation: retire it; the lenses are richer and three choices are plenty.
- Default lens for a first-time visitor, or force a choice? Recommendation: let them pick, since choosing is part of the experience.
