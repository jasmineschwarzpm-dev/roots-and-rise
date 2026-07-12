# Leveling Up: The Developer's-Eye Roadmap

Written July 2026 as the answer to: if a skilled developer built the next version, what would change, what did the owner not think to ask for, and what is this product's real potential? Each item carries a rough size: S (a day or less), M (a few days), L (a week or more). Sizes matter because the owner's biggest hidden disadvantage was never imagination; it was not knowing which wishes are cheap and which are expensive. This menu has prices.

## The two principles worth repeating (already built, keep them)

**The privacy unicorn, as a repeatable ask.** It happened here because the sign math ran in the browser and stayed there when the server was added. To make it deliberate, say this at the start of any project: "Before writing code, list every piece of data that leaves the user's device, why it must leave, and what the smallest derived version of it would be. Default to computing on the device and sending only the derivative." Data minimization decided at design time, not patched in later.

**The cost guard, as a repeatable ask.** Any feature that costs money per use gets five things: a per-user limit, a whole-site limit, a price cap per single use, an over-limit behavior that degrades gracefully instead of erroring, and a kill switch that leaves the product standing. Say exactly that sentence to whoever builds it.

## Tier 1: Growth features that keep the no-database purity (do these first)

1. **Download your card as an image. (M)** Render the finished card, painting, constellation, words, seal, to a PNG right in the browser. People cannot share what they cannot save; today the only way out is a screenshot. This is the single highest-leverage missing feature, it costs nothing per use, and it stores nothing.
2. **Beautiful link previews. (S)** When someone texts the site link, iMessage and social apps show a plain gray box today. Vercel can generate a gorgeous card image per link automatically. First impressions happen in the group chat, not on the site.
3. **Shareable reading links without a database. (S/M)** The signs, tone, and thread can be encoded into the link itself, so "look at mine" regenerates a matching reading for the friend while still storing nothing anywhere.
4. **The reading writes itself. (M)** Stream the AI's words onto the card as they are generated, like a fortune being inked live, instead of a spinner then a wall of text. Developers call it streaming; visitors call it magic. Pairs with the constellation drawing itself in, line by line (S, a CSS/SVG animation).
5. **Front page art tease and the restyle.** Already specced in `docs/restyle-spec.md`. (M)

## Tier 2: Engineering maturity (what separates a demo from a product)

6. **Durable rate limiting. (S/M)** Today's limits live in short-term server memory and reset when the server naps. A tiny shared counter store (Upstash Redis or similar, free tier) makes limits real across all servers. Add a quiet bot check (Cloudflare Turnstile) only if abuse actually appears.
7. **Knowing when it breaks before users tell you. (M)** Error tracking (Sentry) plus one alert: "the AI fallback rate spiked." Today, if Anthropic had an outage, every visitor would quietly get template readings and the owner would never know.
8. **A test that clicks the buttons. (M)** Current tests prove the math and the voice rules; an end-to-end test (Playwright) proves a human can enter a birthday and get a reading, on every change, automatically. Plus a CI gate so a failing test blocks deployment instead of deploying anyway.
9. **Automated taste. (M/L)** The voice rules and anti-examples already exist as data; a developer would build an eval harness that scores hundreds of generated readings against them overnight, so prompt changes are measured instead of vibed. This is the most underrated item on this list for a content product.
10. **Speed polish. (S)** Preload the painting while the AI writes, size images per device, cache static assets at the edge. The site is already fast; this makes it feel instant.

## Tier 3: The money layer (only after the pride layer)

11. **Print-quality card compositor. (L)** The on-screen card rebuilt at print resolution (300 DPI) on the server: painting, real constellation, chosen words, seal, sized for mugs, posters, and cards. This is THE technical asset that makes physical products possible.
12. **Print-on-demand by API, no Etsy. (L)** Gelato, Prodigi, and Printful all have APIs: visitor taps "make it a mug," pays through Stripe, the compositor renders the file, the printer ships it. No marketplace, no inventory, owner keeps the customer relationship. Requires the first legal/accounting conversation (sales tax, terms of sale).
13. **Tip jar. (S)** One Stripe payment link or Ko-fi button. An afternoon.
14. **Optional accounts, last of all. (L)** Only when purchases demand order history. Every tier above works without accounts, and the privacy story survives every tier above.

## Tier 4: Where this product could actually go (the unconsidered potential)

The thing built here is not a zodiac site. It is an engine: **locked verified content, plus a thread-first AI writer with enforced voice, plus a code-drawn personalization layer, plus a keepsake output.** Birthdays are just its first input. The same engine, mostly reskinned, produces:

- Couples and compatibility keepsakes (two birthdays, one card, the wedding and anniversary market)
- New-baby cards (birth date, first keepsake, the gift market where people actually spend)
- Pet zodiac cards (do not laugh, this may be the biggest one)
- A Lunar New Year seasonal campaign product (the annual moment when the whole audience thinks about their animal at once)
- A bilingual edition honoring both languages of both traditions (deeply on-mission, rare, and shareable across diaspora family group chats)
- White-label event versions (a wedding's guest list all getting their reading at the reception)

And separately: the process itself is a product for the owner's governance practice. The decision log, governance doc, and this file are its chapters.

## What a developer sees that a non-developer cannot (the honest meta-answer)

1. **A correctly priced menu.** The skill gap is mostly knowing that "save my card as an image" is a day and "slightly more art variation" is a budget. This document tries to hand that pricing over.
2. **Statelessness is a superpower, not a limitation.** Nearly every growth feature above works with zero storage. A developer would fight to KEEP the no-database purity while adding sharing, downloads, and previews, because it eliminates whole categories of risk, cost, and regulation.
3. **Quality can be automated.** Hand-reviewing AI output does not scale; eval harnesses do. The locked content and banned lists were already the hard part; wiring them into an automatic judge is mechanical.
4. **Observability is love.** Wanting to know "how many people used it" and "is it broken" is not vanity; it is the difference between running a product and hoping about one.
5. **The moat was never the pixels.** Anyone can screenshot an image. Nobody can screenshot the feeling of their own two skies computed truthfully, their real constellation, on a card that ships to their door. Personalization, correctness, and physical quality are defensible; images are marketing.
