# Roots & Rise: Decision Log

The build journey, recorded as decisions with reasons. Two audiences: future sessions that need context fast, and the raw material for a sellable "how a non-engineer shipped an AI product with governance intact" playbook. July 2026.

## Phase 0: The handoff (what made this work at all)

- **Content was locked before engineering began.** Traits, combo seeds, voice exemplars, and voice rules were finalized, verified, and frozen as JSON files before any code. The build brief said: your job is engineering, not rewriting content. This single boundary prevented endless taste-loops during the build.
- **A written working agreement.** No em or en dashes user-facing, banned words, flag gaps rather than silently fix, owner reviews via diffs and plain language, tests instead of asking the owner to verify code. Every later decision was checked against this.
- **Provenance documents.** A verification report (which content is confirmed against tradition, which is draft) and a gap report (what does not exist yet, what was fixed and how). Nothing silently filled.

Playbook lesson: lock content, write the working agreement, and record provenance before touching code. The AI enforces the rules only if they are written down.

## Phase 1: Foundation decisions

- **Stack: Next.js App Router on Vercel free tier, TypeScript.** Chosen for the free tier, the GitHub auto-deploy loop, and server-side API routes that keep secrets off the browser.
- **Security before features: `.env*` gitignored in the first commit.** The API key never entered the repo at any point in its history.
- **Project folder outside OneDrive.** Sync services churn on node_modules and break builds.
- **Sign math treated as correctness-critical.** Lunar New Year table (1924 to 2026) extracted to data, boundary tests written first: Feb 1 vs 2, 1984 (Water Pig vs Wood Rat) and Jan 28 vs 29, 2025 (Wood Dragon vs Wood Snake). The reference implementation was verified, not trusted.
- **Privacy by architecture: birthday converts to signs in the browser.** The server only ever receives sign names. This was a design choice, not an accident, and it became the governance headline.

## Phase 2: The generation pipeline

- **Thread-first generation.** The model finds one idea both signs feed (the thread), then writes line, reading, and quote from it. Per-section reword keeps the thread locked; only a full regenerate may find a new thread. This is what makes a reading feel authored instead of stitched.
- **Voice rules enforced by code, not hope.** A violations checker scans output for banned punctuation, words, and constructions; one corrective rewrite is requested when something slips; a scrubber is the last line of defense.
- **Offline fallback always.** Template-composed readings from the locked content serve when the API fails, is rate-limited, or has no key. The site cannot be knocked over by its own AI dependency.
- **Cost guard.** Per-visitor and site-wide rate limits with capped response length; over-limit visitors get the offline reading, so protection never looks like an outage.
- **Model choice: claude-sonnet-5 at the time of building.** Strong warm creative writing at mid-tier cost; the reading is short, so latency and price stay low.

## Phase 3: Art direction (the taste journey)

- **First instinct was wrong and cheap to discover.** A minimal cream ink-wash style was mocked; the owner felt nothing. Lesson: mock before generating.
- **The mood boards were the real brief.** Pulling the owner's Pinterest boards revealed the actual taste: deep jewel grounds, luminous gold, celestial motifs, ink and watercolor. The style locked as "luminous dark."
- **The 144 problem and its solution.** Any animal can pair with any Western sign, so painting the Western constellation into the art would need 144 images. Solution: 12 animal paintings, and code draws the person's true Western constellation (real star positions) in gold in the open sky. Personalization by code, soul by paint.
- **Element carried by code tint, not by art.** Five element moods tint the night around the animal; 12 paintings serve all 60 element and animal pairs.
- **Generation workflow.** One base prompt, twelve bracketed animal descriptions, style reference locked to the first image the owner loved, several candidates per animal, human curation. Documented in `docs/art-direction.md`.
- **Platform: Midjourney Basic, one month, cancel same day.** Commercial rights vest at creation and survive cancellation for under $1M revenue businesses. Total art budget: about $13.
- **Honest status: the owner rates the current images as good placeholders, not gallery art.** The upgrade path is commissioning a human artist against the Pinterest board as the brief, once the product proves demand.

## Phase 4: Hardening

- **Graceful image failure.** A painting that fails to load swaps to a code-drawn night sky with the constellation intact, discovered after a broken-looking screenshot from a Vercel snapshot URL.
- **Snapshot URLs are not the site.** Vercel's per-deployment links behave differently for outsiders; only the production URL is shared.
- **Key hygiene in practice.** The API key was pasted into chat once early on; the response was rotation: new key straight into Vercel and the local env file without touching chat, old key deleted, verified live afterward.

## Current state (July 2026)

Live at roots-and-rise.vercel.app. 117 automated tests passing (sign math, voice rules, constellation data). Twelve animals, twelve constellations, five element skies. No accounts, no database, no cookies. Remaining wishes: a site-wide restyle to match the art's world (direction agreed, not built), a front-page art tease, analytics, monetization, better art someday.

## What is reusable as a product (the sellable process)

1. The handoff pattern: locked content plus working agreement plus provenance reports, then engineering.
2. The correctness pattern: extract the risky logic, write boundary tests first, distrust reference implementations.
3. The privacy pattern: derive on-device, send only derivatives, collect nothing.
4. The AI-dependency pattern: fallback content, rate limits, spend caps, kill switch that degrades instead of dying.
5. The taste pattern: mood boards as the brief, mock before generating, style reference for consistency, human curation as the quality gate.
6. The governance pattern: a plain-language governance doc answering where data lives, what an attacker gets, and what to do in an incident, written while the system is small enough to fully understand.
