"use client";

import { useMemo, useState } from "react";
import { computeSigns, isSignError, type Signs } from "@/lib/signs";
import {
  WESTERN_SIGNS,
  ANIMALS,
  ELEMENTS,
  LENSES,
  westernCard,
  animalCard,
  elementCard,
  type SignCard,
  type Lens,
} from "@/lib/content";
import { fallbackReading } from "@/lib/fallback";
import type { Reading, ReadingPart } from "@/lib/reading";
import { KeepsakeCard } from "@/components/KeepsakeCard";
import { Seal } from "@/components/Seal";

const DISPLAY = "var(--font-fraunces), Georgia, serif";

// Palette (the locked design language).
const INK = "#14172B";
const PAPER = "#F5EFE2";
const GOLD = "#D9A441";
const MIST = "#8B90AD";
const SOFT = "#C7CADF";
const JADE = "#9FCDBB";
const EMERALD = "#3E8E7E";

type ReadingResult = Reading & { limited?: boolean };

async function requestReading(
  s: Signs,
  lens: Lens,
  n: number,
  lockedThread: string | null,
  onlyPart: ReadingPart | null,
): Promise<ReadingResult> {
  try {
    const res = await fetch("/api/reading", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        western: s.western,
        animal: s.animal,
        element: s.element,
        lens,
        nonce: n,
        lockedThread,
        onlyPart,
      }),
    });
    if (!res.ok) throw new Error(`request failed: ${res.status}`);
    return (await res.json()) as ReadingResult;
  } catch {
    // Network failure before the server could answer: compose offline here too.
    return fallbackReading(s.western, s.animal, s.element, lens, n, lockedThread);
  }
}

function Accordion({ title, items }: { title: string; items: SignCard[] }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(217,164,65,.25)" }}>
      <div
        className="px-4 py-3 text-sm tracking-widest uppercase"
        style={{ color: GOLD, background: "rgba(217,164,65,.07)" }}
      >
        {title}
      </div>
      {items.map((it) => (
        <div key={it.name} style={{ borderTop: "1px solid rgba(217,164,65,.15)" }}>
          <button
            onClick={() => setOpen(open === it.name ? null : it.name)}
            className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-white/5 focus:outline-none focus-visible:ring-2"
            style={{ color: PAPER }}
          >
            <span className="text-xl w-7 text-center" style={{ color: GOLD }}>
              {it.symbol}
            </span>
            <span className="font-medium">{it.name}</span>
            <span className="ml-auto text-xs" style={{ color: MIST }}>
              {open === it.name ? "close" : "open"}
            </span>
          </button>
          {open === it.name && (
            <div className="px-4 pb-4 pl-14 text-sm leading-relaxed" style={{ color: SOFT }}>
              {it.blurb}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {it.traits.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-full text-xs"
                    style={{ background: "rgba(94,140,122,.2)", color: JADE }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function RegenBtn({ onClick, busy, label }: { onClick: () => void; busy: boolean; label: string }) {
  return (
    <button
      onClick={onClick}
      disabled={busy}
      className="text-xs px-2.5 py-1 rounded-full transition-opacity disabled:opacity-40 focus:outline-none focus-visible:ring-2"
      style={{ border: "1px solid rgba(139,144,173,.5)", color: MIST }}
    >
      {busy ? "…" : label}
    </button>
  );
}

/** The Vinegar Tasters. Picking one writes the reading through that lens. */
function TasterChooser({
  selected,
  onPick,
  busy,
}: {
  selected: Lens | null;
  onPick: (l: Lens) => void;
  busy: boolean;
}) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest mb-1" style={{ color: GOLD }}>
        Choose your taster
      </div>
      <p className="text-xs mb-3" style={{ color: MIST }}>
        Three sages taste the same vinegar and find sour, bitter, and sweet. Pick the one that matches
        how you want to meet yourself.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {LENSES.map((l) => {
          const active = selected === l.id;
          return (
            <button
              key={l.id}
              onClick={() => onPick(l.id)}
              disabled={busy}
              className="text-left rounded-xl p-4 transition-colors focus:outline-none focus-visible:ring-2 disabled:opacity-60"
              style={
                active
                  ? { background: "rgba(62,142,126,.18)", border: `1px solid ${EMERALD}` }
                  : { background: "rgba(245,239,226,.04)", border: "1px solid rgba(139,144,173,.25)" }
              }
            >
              <div className="text-xs" style={{ color: MIST }}>
                the {l.taste} taster
              </div>
              <div style={{ fontFamily: DISPLAY, color: active ? JADE : PAPER, fontSize: 20, fontWeight: 600 }}>
                {l.philosopher}
              </div>
              <div className="text-xs mt-1 mb-2" style={{ color: GOLD }}>
                {l.tagline}
              </div>
              <div className="text-xs leading-relaxed" style={{ color: SOFT }}>
                {l.chooserBlurb}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function RootsAndRise() {
  const [view, setView] = useState<"home" | "reading">("home");
  const [dob, setDob] = useState("");
  const [lens, setLens] = useState<Lens | null>(null);
  const [signs, setSigns] = useState<Signs | null>(null);
  const [reading, setReading] = useState<ReadingResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [busyPart, setBusyPart] = useState<ReadingPart | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);
  const [copied, setCopied] = useState(false);

  const stars = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        left: (i * 137.5) % 100,
        top: (i * 61.8) % 100,
        s: 1 + (i % 3),
        o: 0.25 + ((i * 7) % 10) / 20,
      })),
    [],
  );

  async function runReading(
    s: Signs,
    l: Lens,
    lockedThread: string | null,
    onlyPart: ReadingPart | null,
  ) {
    if (onlyPart) setBusyPart(onlyPart);
    else setBusy(true);
    const n = nonce + 1;
    setNonce(n);
    const r = await requestReading(s, l, n, lockedThread, onlyPart);
    setReading((prev) => (onlyPart && prev ? { ...prev, [onlyPart]: r[onlyPart] } : r));
    setBusy(false);
    setBusyPart(null);
  }

  function chooseTaster(l: Lens) {
    if (!signs) return;
    setLens(l);
    setReading(null);
    void runReading(signs, l, null, null);
  }

  function newThread() {
    if (!signs || !lens) return;
    setReading(null);
    void runReading(signs, lens, null, null);
  }

  function reword(part: ReadingPart) {
    if (!signs || !lens || !reading) return;
    void runReading(signs, lens, reading.thread, part);
  }

  function onReveal() {
    setErr(null);
    if (!dob) {
      setErr("Choose your date of birth first.");
      return;
    }
    const s = computeSigns(dob);
    if (isSignError(s)) {
      setErr(s.error);
      return;
    }
    setSigns(s);
    setReading(null);
    setLens(null);
    setView("reading");
  }

  function copyLine() {
    if (reading?.line && navigator.clipboard) {
      void navigator.clipboard.writeText(reading.line).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      });
    }
  }

  const w = signs ? westernCard(signs.western) : undefined;
  const a = signs ? animalCard(signs.animal) : undefined;
  const e = signs ? elementCard(signs.element) : undefined;

  return (
    <div className="min-h-screen relative" style={{ background: INK }}>
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .twinkle { animation: tw 4s ease-in-out infinite alternate; }
        }
        @keyframes tw { from { opacity:.15 } to { opacity:.6 } }
      `}</style>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((st, i) => (
          <div
            key={i}
            className="twinkle absolute rounded-full"
            style={{
              left: `${st.left}%`,
              top: `${st.top}%`,
              width: st.s,
              height: st.s,
              background: GOLD,
              opacity: st.o,
              animationDelay: `${i * 0.13}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-2xl mx-auto px-5 py-10">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span style={{ color: GOLD, fontSize: 26 }}>{"♉"}</span>
            <Seal hanzi={"牛"} size={40} />
          </div>
          <h1 style={{ fontFamily: DISPLAY, color: PAPER, fontSize: 42, fontWeight: 700, lineHeight: 1.05 }}>
            Roots &amp; Rise
          </h1>
          <p className="mt-2 text-sm tracking-wide" style={{ color: MIST }}>
            Two skies. One story. Yours.
          </p>
        </header>

        {view === "home" && (
          <div className="space-y-8">
            <div
              className="rounded-2xl p-6"
              style={{ background: "rgba(245,239,226,.04)", border: "1px solid rgba(217,164,65,.25)" }}
            >
              <div className="text-xs uppercase tracking-widest mb-3" style={{ color: GOLD }}>
                Why two skies
              </div>
              <div className="space-y-3 text-sm leading-relaxed" style={{ color: SOFT }}>
                <p>
                  I grew up mixed, between two immigrant families from opposite ends of the earth, and for
                  a long time I believed I had to pick one to belong to. One of my skies is my father&apos;s,
                  the Chinese zodiac, the year you were born, your animal, your element. The other sky is the
                  Western one, the month and the sun sign, the version the rest of the world talked about
                  around me. Two ways of asking the same question, who are you and what are you made of. I was
                  never only one answer.
                </p>
                <p>
                  Roots &amp; Rise is me creating that space for everyone who needs it now. It reads both of
                  your skies and holds them together, on purpose, out loud. Whether you carry one heritage or
                  five, your whole self deserves to be seen in the sky.
                </p>
              </div>
            </div>

            <div
              className="rounded-2xl p-6"
              style={{ background: "rgba(245,239,226,.04)", border: "1px solid rgba(217,164,65,.25)" }}
            >
              <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: GOLD }}>
                Your date of birth
              </label>
              <div className="flex flex-wrap gap-3 items-center">
                <input
                  type="date"
                  value={dob}
                  onChange={(ev) => setDob(ev.target.value)}
                  className="rounded-lg px-3 py-2 focus:outline-none focus-visible:ring-2"
                  style={{
                    background: "#1E2340",
                    color: PAPER,
                    border: "1px solid rgba(139,144,173,.4)",
                    colorScheme: "dark",
                  }}
                />
                <button
                  onClick={onReveal}
                  className="px-5 py-2 rounded-lg font-semibold focus:outline-none focus-visible:ring-2"
                  style={{ background: GOLD, color: INK }}
                >
                  Reveal my reading
                </button>
              </div>
              {err && (
                <p className="mt-3 text-sm" style={{ color: "#E58A7B" }}>
                  {err}
                </p>
              )}
              <p className="mt-3 text-xs" style={{ color: MIST }}>
                Chinese years begin at Lunar New Year, not January 1. Late January and February birthdays
                are calculated against the real date, so your animal is always the right one.
              </p>
            </div>

            <div
              className="rounded-2xl p-6"
              style={{ background: "rgba(245,239,226,.04)", border: "1px solid rgba(139,144,173,.25)" }}
            >
              <div className="text-xs uppercase tracking-widest mb-3" style={{ color: GOLD }}>
                The two skies, briefly
              </div>
              <div className="space-y-3 text-sm leading-relaxed" style={{ color: SOFT }}>
                <p>
                  <span style={{ color: JADE }}>The Western sky</span> reads the month you were born.
                  Babylonian sky-watchers traced the sun&apos;s yearly path and split it into twelve signs,
                  and it is your sun sign that most people mean by zodiac.
                </p>
                <p>
                  <span style={{ color: JADE }}>The Eastern sky</span> reads the year. The Chinese tradition
                  turns a sixty-year wheel of twelve animals and five elements, older in its bones than the
                  animals themselves. It begins at Lunar New Year, which is why a late January or February
                  birthday can belong to the year before.
                </p>
                <p>
                  They are two traditions, built by different peoples, that were never meant to complete each
                  other. And yet millions of us inherit both. This holds them in one hand.
                </p>
              </div>
            </div>

            <Accordion title="The twelve Western signs" items={WESTERN_SIGNS} />
            <Accordion title="The twelve animals" items={ANIMALS} />
            <Accordion title="The five elements" items={ELEMENTS} />
          </div>
        )}

        {view === "reading" && signs && w && a && e && (
          <div className="space-y-6">
            <button
              onClick={() => setView("home")}
              className="text-xs focus:outline-none focus-visible:ring-2"
              style={{ color: MIST }}
            >
              {"←"} back to start
            </button>

            {signs.edgeNote && (
              <p className="text-xs" style={{ color: JADE }}>
                {signs.edgeNote}
              </p>
            )}

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { t: signs.western, g: w.symbol, b: w.blurb },
                { t: `${signs.element} element`, g: e.symbol, b: e.blurb },
                { t: signs.animal, g: a.symbol, b: a.blurb },
              ].map((c) => (
                <div
                  key={c.t}
                  className="rounded-xl p-4"
                  style={{ background: "rgba(245,239,226,.04)", border: "1px solid rgba(139,144,173,.25)" }}
                >
                  <div className="text-sm font-semibold mb-1" style={{ color: GOLD }}>
                    {c.g} {c.t}
                  </div>
                  <div className="text-xs leading-relaxed" style={{ color: SOFT }}>
                    {c.b}
                  </div>
                </div>
              ))}
            </div>

            <TasterChooser selected={lens} onPick={chooseTaster} busy={busy} />

            {lens && (
              <div className="flex justify-end">
                <RegenBtn onClick={newThread} busy={busy} label={"↻ new thread, whole reading"} />
              </div>
            )}

            {lens ? (
              <KeepsakeCard
                signs={signs}
                animalSymbol={a.symbol}
                westernSymbol={w.symbol}
                reading={reading}
                busy={busy}
                busyPart={busyPart}
                copied={copied}
                onReword={reword}
                onCopyLine={copyLine}
              />
            ) : (
              <div
                className="rounded-2xl p-10 text-center"
                style={{ background: "rgba(245,239,226,.04)", border: "1px dashed rgba(217,164,65,.35)" }}
              >
                <p className="text-sm" style={{ color: SOFT }}>
                  Pick a taster above to meet yourself.
                </p>
              </div>
            )}

            <p className="text-xs text-center" style={{ color: MIST }}>
              Switch tasters any time to meet yourself a different way. Reword keeps your thread; new thread
              starts fresh. For fun, reflection, and the occasional mug.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
