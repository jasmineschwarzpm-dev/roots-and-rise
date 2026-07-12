# Roots & Rise: Governance, Privacy, and Operations

Written July 2026. This is the plain-language record of what the site does with data, what could go wrong, and what to do when something does. Verify against the code before relying on it after major changes; file paths are given so any developer or AI session can re-check the claims.

## The headline fact

**Birthdays never leave the visitor's device.** The date of birth is converted to signs (Western sign, animal, element) by code running in the visitor's own browser (`lib/signs.ts`, called from `app/page.tsx`). Only the derived signs, for example "Virgo, Snake, Water," are sent to the server. There are roughly 8,000 people born on any given date in the world; a sign combination narrows to one person in about 720. Nothing the server receives can identify a person or reconstruct their birthday.

## Data flow, step by step

1. Visitor enters a birthday in the browser. It stays in the browser's memory for that page visit. It is not stored, not sent, not written to a cookie.
2. The browser computes the signs locally and sends only signs plus a tone choice to `/api/reading` (`app/api/reading/route.ts`).
3. The server checks the request against a rate limit, then sends the sign names to Anthropic's API to write the reading. The prompt contains sign names, tone, and the locked thread text. Nothing personal.
4. The reading comes back and is shown. Nothing about the exchange is saved by our code.

## What is stored, and where

By our own code: **nothing**. No database, no accounts, no cookies, no analytics, no server logs written by us. The rate limiter holds visitor IP addresses in short-term server memory for at most 10 minutes, and that memory is wiped whenever the serverless instance recycles.

Third parties hold transient operational data:

| Party | What they see | Why | Notes |
|---|---|---|---|
| Vercel (hosting) | Standard web server logs: IP, pages fetched, timing | Runs the site | Their logs, their retention; short-lived on the free tier |
| Anthropic (AI readings) | The sign names and prompt text | Writes the readings | Per their commercial terms, API data is not used to train models; inputs may be retained briefly for abuse monitoring. Verify current terms at anthropic.com before making public claims |
| GitHub (code) | The code and art, not visitor data | Stores the project | Visitors never touch GitHub |

Fonts are bundled into the site at build time (`next/font`), so visitors' browsers make no calls to Google at all.

## What we deliberately do not have

- No accounts, passwords, or emails collected
- No payment processing
- No cookies and no tracking pixels
- No database
- No analytics (see Usage below; add only the cookieless kind)

The strongest privacy position is the one we hold: you cannot leak what you never collected.

## Threat model, in plain terms

What could an attacker actually do?

1. **Spend attack: hammer the reading API to burn Anthropic credits.** This is the realistic one. Defenses in code: per visitor limit (25 readings per 10 minutes), site-wide limit (400 per 10 minutes), capped response length, and over-limit requests get the free offline reading instead of an API call (`app/api/reading/route.ts`). Defense only the owner can add: a hard monthly spend cap in the Anthropic console. Set it. Worst case then has a known price ceiling.
2. **Account takeover: control of GitHub, Vercel, or Anthropic accounts.** This is the real crown jewels. Defense: strong unique passwords and two-factor authentication on all three accounts. Nothing in the site itself protects against a stolen owner account.
3. **Defacement or malicious code.** Only possible through the accounts above, since the site has no upload or comment features. Same defense: protect the accounts.
4. **Stealing the API key.** The key lives only in Vercel's environment settings and in `.env.local` on the owner's computer, never in the code or browser. `.env*` is ignored by git. If it ever leaks: delete the key in the Anthropic console; the site stays up and serves offline readings while a new key is added.
5. **Attacks on visitors (injecting content, stealing their data).** There is no stored content, no user-to-user surface, and reading text renders as plain text through React, which escapes it. There is no visitor data to steal.

What an attacker cannot get, no matter what: user birthdays, names, emails, or payments, because none exist anywhere in the system.

## Incident playbook

- **Site looks broken after a change:** Vercel dashboard, Deployments, pick the last good one, Promote to Production. Instant rollback, no coding.
- **API bill spiking:** Anthropic console, delete the key. The site degrades gracefully to offline readings, not an outage. Investigate afterward.
- **Key exposed anywhere public:** delete it in the Anthropic console immediately, create a new one, paste the new one into Vercel (Settings, Environment Variables) and into `.env.local`, then redeploy.
- **Account compromise suspected:** change the password, revoke sessions, check Vercel deploy history and GitHub commit history for anything unfamiliar.

## Usage: how many people have used it?

Right now, unknown; the site keeps no counts by design. The clean option when wanted: Vercel Web Analytics, which is cookieless, collects no personal identifiers, needs no consent banner, and shows visits and page views in the Vercel dashboard. One package plus one dashboard toggle. A rough proxy meanwhile: the Anthropic console usage page shows how many readings were generated.

## Ownership and rights

- Code and content JSONs: written for this project, owned by the owner. The repo currently has no LICENSE file, which by default means all rights reserved. Fine for now; decide before inviting contributors.
- Animal art: generated on a paid Midjourney plan, which grants commercial rights to subscribers under $1M annual revenue, and rights vest at creation, surviving cancellation. Keep the subscription receipt.
- Verified content provenance lives in `verification_report.md` and `gap_report.md` in the handoff archive, and `docs/art-direction.md` records the art decisions.

## Owner's checklist

One-time, soon:
- [ ] Two-factor authentication on GitHub, Vercel, and Anthropic
- [ ] Hard monthly spend limit in the Anthropic console
- [ ] Keep the Midjourney receipt somewhere findable

Occasional, monthly-ish:
- [ ] Glance at Anthropic console usage (readings generated, spend)
- [ ] Glance at Vercel dashboard (traffic, failed deploys)

Before any "sharing widely" moment:
- [ ] Add the privacy note below to the site
- [ ] Consider turning on Vercel Web Analytics

## Privacy note, ready to paste onto the site

> Your birthday never leaves your device. It is converted to your signs right in your browser, and only the signs are used to write your reading. We keep no accounts, no cookies, no database, and no record of your visit.
