# Site Restyle Spec: Match the Art's World

Direction agreed July 2026, not yet built. Goal: the site shell should feel like the same evening as the paintings, close but never identical. The site is the gallery wall; the paintings are what hangs on it. One commit, fully revertible, no logic changes; all styling lives in named constants at the top of `app/page.tsx` and `components/KeepsakeCard.tsx`.

Jasmine's own read of the current site, honor it: basic, boring, not polished, does not reflect her Pinterest taste. The mood boards (see [[docs/art-direction.md]] and the Pinterest board in memory) want jewel richness against deep space dark, oppositional yin and yang: bright celestial moments against a night that is genuinely dark.

## Changes

1. **Deepen the shell night.** Page background from the current flat `#14172B` toward the paintings' warmer deep indigo family (the card already uses `#12142E`; consider a subtle radial vignette, darker at edges, faintly warmer at center top, echoing moon glow).
2. **Promote emerald to a true accent.** The paintings' emerald (`#1E5C4A` family, jade `#9FCDBB` already exists in code) should carry buttons, hovers, active tone pills, and accordion accents. Gold stays for headings and moments, not everything.
3. **Gold linework flourishes.** Replace the sharp star dots with fewer, softer glowing stars (radial gradient dots). Add one thin gold cloud-wisp SVG motif, drawn in code, used sparingly: under the main heading, as section dividers. Rhyme with the art's gold clouds, do not copy them.
4. **Desktop proportions.** On wide screens the keepsake card should place art and words side by side (art left, words right) instead of the current stacked square that towers 1200px tall. Mobile stays stacked; mobile is already right.
5. **Front page art tease.** The landing page currently shows zero artwork before a birthday is entered. Add a taste: a soft-cropped painting strip or a single animal peeking behind the date picker area, with the veil treatment so it invites rather than spoils.
6. **Polish pass.** Consistent border radii, focus rings in gold, date input styled to match the night (already `colorScheme: dark`), and the footer line given breathing room.

## Guardrails

- No em or en dashes in any user-facing text. Banned words per the working agreement.
- Fraunces stays the display face; Inter stays for body.
- The cinnabar seal stays cinnabar. It is the one warm red note and it is the brand.
- Keep all 117 tests green; touch no lib/ logic.
- Review happens on Jasmine's iPhone. Ship as one commit so one revert undoes it.
