# Handoff: State of Everything and What Comes Next

Written July 2026, at the end of the Fable build sessions. This is the single door into the project for any future session. Read this first; it points everywhere else.

## State of the project

Live at https://roots-and-rise.vercel.app (share only this URL; the long dashboard links are internal). Twelve animal paintings, twelve real constellations drawn in code, five element skies, AI readings with enforced voice and offline fallback, 117 passing tests. No accounts, no database, no cookies; birthdays never leave the visitor's device.

The documentation suite, all in `docs/`:

| File | What it is |
|---|---|
| `art-direction.md` | Locked art style, all twelve prompts, selection notes, upgrade path |
| `governance.md` | Data flow, threat model, incident playbook, owner checklist |
| `decision-log.md` | The build journey as decisions with reasons |
| `leveling-up.md` | Sized menu of future features and the product's larger potential |
| `restyle-spec.md` | The approved site restyle, ready to build |
| `handoff.md` | This file |

## Paste this as the first message to a new session

> Read the files in docs/ of this project, starting with handoff.md, before doing anything. Follow the working agreement in decision-log.md Phase 0: no em or en dashes anywhere user-facing, no "actually", "lands", "looks like", no "not X but Y" constructions, flag gaps rather than silently fixing, explain in plain language for a non-engineer, write and run tests rather than asking me to verify code. Content JSONs and the twelve paintings are locked. Then tell me what you understand the next task to be, and wait for my go.

## Priority queue (in order)

1. **Site restyle** per `restyle-spec.md`. One commit, review on the owner's phone.
2. **Tip jar.** The owner has Stripe. Owner's one manual step: Stripe Dashboard, Payment Links, create a link named "Support Roots & Rise" with "customers choose what to pay" enabled, then paste the link URL into the session. The build step is a small, warm button near the card footer ("Keep the stars lit" or similar, voice rules apply). Do not add any shop or product links yet; there are no products, and dead links kill trust.
3. **"Ideas for your reading" section.** A short, fun list on the site: set your line as your wallpaper, send your card to the friend who shares your animal, read your family's signs at Lunar New Year. Small build, big warmth.
4. **Download-your-card image** (see leveling-up.md Tier 1, item 1). The highest-leverage growth feature. Do this before any wide sharing push.
5. **Productization of the process** (below), which is writing work, not coding work.

## Productization: turning the process into a sellable product

Honest status: **the raw material is complete; the sellable package does not exist yet.** The docs in this repo were written for this project's owner and future developer sessions. They are accurate and complete, but they are not yet a product a beginner can buy and follow.

Target buyer, per the owner: non-technical, possibly no education past high school, less than six months into their AI journey. Every step must say what to do, why it matters, and define its terms. Assume no prior vocabulary: "repo," "deploy," "API key," and "environment variable" all get one-line definitions the first time they appear.

The package to draft (Opus-suitable writing work, using the docs here as source):

1. **The guide.** The story of this build rewritten as teachable chapters: the handoff pattern, locking content, the working agreement, correctness testing, the privacy question, the cost-guard question, art direction with mood boards, curation, governance, launch. Each chapter: what happened, why it worked, what to say to your AI, what can go wrong.
2. **The templates**, fill-in-the-blank versions of: the build brief, the working agreement, the privacy ask ("list every piece of data that leaves the user's device..."), the cost-guard ask (per-user limit, site limit, price cap, graceful degradation, kill switch), the art prompt kit structure, the governance doc skeleton, and the incident playbook skeleton.
3. **The checklists.** Pre-build, pre-launch, and monthly-owner checklists, extracted from governance.md.
4. **A glossary.** Every technical term used anywhere in the package, one plain sentence each.

Branding: yes, the sellable package carries the owner's logo and business identity; it is a product of her governance practice. The repo docs stay plain, they are the source, not the product.

Delivery recommendation: start with a digital-products platform (Gumroad or Lemon Squeezy). They handle payment, file delivery, receipts, and sales tax for a cut. Advise against a homemade password-protected site for version one: passwords get shared, there are no receipts, tax handling lands on the owner, and it adds a build project in front of the writing project. A small course site is the version-two upgrade if the PDF package sells.

Pricing note for the owner: comparable "built-with-AI playbook plus templates" products sell in the $19 to $79 range depending on depth and audience trust. Start mid, adjust on evidence.

## Standing cautions for any future session

- The API key lives in `.env.local` and Vercel env settings only. Never in code, never in chat.
- `art-finals/` holds original paintings; `public/animals/` holds web versions; regenerate with `node scripts/prepare-art.mjs`.
- Run `npx vitest run` before any push; all 117 must pass.
- The owner reviews visual changes on her iPhone; nothing visual is done until she says so.
