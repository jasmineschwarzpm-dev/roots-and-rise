"use client";

import { useMemo, useState } from "react";
import { computeSigns, isSignError, type Signs } from "@/lib/signs";
import {
  WESTERN_SIGNS,
  ANIMALS,
  ELEMENTS,
  westernCard,
  animalCard,
  elementCard,
  type SignCard,
  type Tone,
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

type ReadingResult = Reading & { limited?: boolean };

async function requestReading(
  s: Signs,
  tone: Tone,
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
        tone,
        nonce: n,
        lockedThread,
        onlyPart,
      }),
    });
    if (!res.ok) throw new Error(`request failed: ${res.status}`);
    return (await res.json()) as ReadingResult;
  } catch {
    // Network failure before the server could answer: compose offline here too.
    return fallbackReading(s.western, s.animal, s.element, tone, n, lockedThread);
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

export default function RootsAndRise() {
  const [view, setView] = useState<"home" | "reading">("home");
  const [dob, setDob] = useState("");
  const [tone, setTone] = useState<Tone>("mixed");
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

  async function generateFor(s: Signs) {
    setBusy(true);
    const n = nonce + 1;
    setNonce(n);
    const r = await requestReading(s, tone, n, null, null);
    setReading(r);
    setBusy(false);
  }

  async function generate(lockedThread: string | null, onlyPart: ReadingPart | null) {
    if (!signs) return;
    if (onlyPart) setBusyPart(onlyPart);
    else setBusy(true);
    const n = nonce + 1;
    setNonce(n);
    const r = await requestReading(signs, tone, n, lockedThread, onlyPart);
    setReading((prev) => (onlyPart && prev ? { ...prev, [onlyPart]: r[onlyPart] } : r));
    setBusy(false);
    setBusyPart(null);
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
    setView("reading");
    void generateFor(s);
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
              <p className="leading-relaxed text-sm" style={{ color: SOFT }}>
                The Western zodiac reads the sky on the day you were born: twelve signs, one for each
                stretch of the sun&apos;s path. The Chinese zodiac reads the year: twelve animals in a
                repeating cycle, each colored by one of five elements that returns every sixty years. Most
                people only ever hear one side of their story. This is both, woven together.
              </p>
              <div className="mt-6">
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

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-widest" style={{ color: MIST }}>
                Feel:
              </span>
              {(["grounded", "rising", "mixed"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className="text-xs px-3 py-1 rounded-full capitalize focus:outline-none focus-visible:ring-2"
                  style={
                    tone === t
                      ? { background: GOLD, color: INK, fontWeight: 600 }
                      : { border: "1px solid rgba(139,144,173,.5)", color: MIST }
                  }
                >
                  {t === "mixed" ? "both" : t}
                </button>
              ))}
              <div className="ml-auto">
                <RegenBtn
                  onClick={() => void generate(null, null)}
                  busy={busy}
                  label={"↻ new thread, whole reading"}
                />
              </div>
            </div>

            <KeepsakeCard
              signs={signs}
              animalSymbol={a.symbol}
              westernSymbol={w.symbol}
              reading={reading}
              busy={busy}
              busyPart={busyPart}
              copied={copied}
              onReword={(part) => {
                if (reading) void generate(reading.thread, part);
              }}
              onCopyLine={copyLine}
            />

            <p className="text-xs text-center" style={{ color: MIST }}>
              Reword keeps your thread; new thread starts fresh. For fun, reflection, and the occasional mug.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
