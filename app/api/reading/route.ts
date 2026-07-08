import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { buildPrompt } from "@/lib/prompt";
import { fallbackReading } from "@/lib/fallback";
import { findViolations, scrubAll } from "@/lib/voice";
import { WESTERN_SIGNS, ANIMALS, ELEMENTS, type Tone } from "@/lib/content";
import { READING_PARTS, type Reading, type ReadingPart } from "@/lib/reading";

// The Anthropic SDK uses Node APIs, so pin this route to the Node runtime.
export const runtime = "nodejs";

// Current-generation Sonnet: strong warm creative writing at Sonnet-tier cost.
const MODEL = "claude-sonnet-5";
const MAX_TOKENS = 1024;

const TONES: Tone[] = ["grounded", "rising", "mixed"];

// Structured-output schema so the four parts always come back as clean JSON.
const READING_SCHEMA = {
  type: "object",
  properties: {
    thread: { type: "string" },
    reading: { type: "string" },
    quote: { type: "string" },
    line: { type: "string" },
  },
  required: ["thread", "reading", "quote", "line"],
  additionalProperties: false,
} as const;

type Draft = { thread: string; reading: string; quote: string; line: string };

/**
 * Best-effort request limiting to protect against runaway API spend. This lives
 * in per-instance memory, so on serverless it resets on cold starts and is not
 * shared across instances. It is a spend guard, not a security control.
 */
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const PER_IP_LIMIT = 25;
const GLOBAL_LIMIT = 400;
const ipHits = new Map<string, number[]>();
let globalHits: number[] = [];

function withinWindow(times: number[], now: number): number[] {
  return times.filter((t) => now - t < WINDOW_MS);
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  globalHits = withinWindow(globalHits, now);
  const perIp = withinWindow(ipHits.get(ip) ?? [], now);
  if (perIp.length >= PER_IP_LIMIT || globalHits.length >= GLOBAL_LIMIT) {
    ipHits.set(ip, perIp);
    return true;
  }
  perIp.push(now);
  globalHits.push(now);
  ipHits.set(ip, perIp);
  return false;
}

function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

type RequestBody = {
  western?: unknown;
  animal?: unknown;
  element?: unknown;
  tone?: unknown;
  lockedThread?: unknown;
  onlyPart?: unknown;
  nonce?: unknown;
};

type Validated = {
  western: string;
  animal: string;
  element: string;
  tone: Tone;
  lockedThread: string | null;
  onlyPart: ReadingPart | null;
  nonce: number;
};

function validate(body: RequestBody): Validated | null {
  const { western, animal, element, tone } = body;
  if (typeof western !== "string" || !WESTERN_SIGNS.some((s) => s.name === western)) return null;
  if (typeof animal !== "string" || !ANIMALS.some((a) => a.name === animal)) return null;
  if (typeof element !== "string" || !ELEMENTS.some((e) => e.name === element)) return null;
  if (typeof tone !== "string" || !TONES.includes(tone as Tone)) return null;

  const lockedThread = typeof body.lockedThread === "string" ? body.lockedThread : null;
  const onlyPart =
    typeof body.onlyPart === "string" && READING_PARTS.includes(body.onlyPart as ReadingPart)
      ? (body.onlyPart as ReadingPart)
      : null;
  const nonce = Number.isInteger(body.nonce) ? (body.nonce as number) : Math.floor(Math.random() * 1e6);

  return {
    western,
    animal,
    element,
    tone: tone as Tone,
    lockedThread,
    onlyPart,
    nonce,
  };
}

function offline(v: Validated, limited = false): NextResponse {
  const reading = fallbackReading(v.western, v.animal, v.element, v.tone, v.nonce, v.lockedThread);
  return NextResponse.json({ ...reading, limited });
}

/** One model call returning the four parts, or null when the reply is unusable. */
async function generateOnce(client: Anthropic, system: string, user: string): Promise<Draft | null> {
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    thinking: { type: "disabled" },
    system,
    messages: [{ role: "user", content: user }],
    output_config: { format: { type: "json_schema", schema: READING_SCHEMA } },
  });

  const text = response.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("");

  try {
    const parsed = JSON.parse(text) as Partial<Draft>;
    if (
      typeof parsed.thread !== "string" ||
      typeof parsed.reading !== "string" ||
      typeof parsed.quote !== "string" ||
      typeof parsed.line !== "string"
    ) {
      return null;
    }
    return parsed as Draft;
  } catch {
    return null;
  }
}

function draftText(d: Draft): string {
  return [d.thread, d.reading, d.quote, d.line].join(" ");
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  let raw: RequestBody;
  try {
    raw = (await req.json()) as RequestBody;
  } catch {
    return NextResponse.json({ error: "Could not read the request." }, { status: 400 });
  }

  const v = validate(raw);
  if (!v) {
    return NextResponse.json({ error: "That sign combination is not one we recognize." }, { status: 400 });
  }

  // Spend guard: over the limit, serve the offline reading instead of calling the API.
  if (rateLimited(clientIp(req))) {
    return offline(v, true);
  }

  // No key configured (e.g. local dev without .env.local): fall back gracefully.
  if (!process.env.ANTHROPIC_API_KEY) {
    return offline(v);
  }

  try {
    const client = new Anthropic();
    const { system, user } = buildPrompt(v.western, v.animal, v.element, v.tone, v.lockedThread, v.onlyPart);

    let draft = await generateOnce(client, system, user);
    if (!draft) return offline(v);

    // Enforce the banned list: one corrective rewrite when something slips through.
    const violations = findViolations(draftText(draft));
    if (violations.length > 0) {
      const retryUser =
        user +
        `\n\nYour previous draft broke these voice rules: ${violations.join("; ")}.` +
        ` Write a fresh version that keeps the same thread ("${draft.thread}") and breaks none of the rules.`;
      const retry = await generateOnce(client, system, retryUser);
      if (retry) draft = retry;
    }

    const reading: Reading = {
      // On a per-section reword the thread is locked; never let the model change it.
      thread: scrubAll(v.lockedThread ?? draft.thread),
      reading: scrubAll(draft.reading),
      quote: scrubAll(draft.quote),
      line: scrubAll(draft.line),
      source: "ai",
    };
    return NextResponse.json(reading);
  } catch {
    // Any API error, timeout, or parse failure falls back to the offline reading.
    return offline(v);
  }
}
