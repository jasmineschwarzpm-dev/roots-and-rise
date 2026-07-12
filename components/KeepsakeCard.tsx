"use client";

import { useMemo } from "react";
import type { Signs } from "@/lib/signs";
import type { Reading, ReadingPart } from "@/lib/reading";
import { ANIMAL_ART, ELEMENT_TINT } from "@/lib/art";
import { CONSTELLATIONS, project, brightestIndex } from "@/lib/constellations";
import { Seal } from "@/components/Seal";

const DISPLAY = "var(--font-fraunces), Georgia, serif";
const NIGHT = "#12142E";
const GOLD_TEXT = "#E2C685";
const GOLD_LINE = "#E4C06A";
const CREAM = "#EDE7D8";
const FADED = "#9CA0BE";

type Props = {
  signs: Signs;
  animalSymbol: string;
  westernSymbol: string;
  reading: (Reading & { limited?: boolean }) | null;
  busy: boolean;
  busyPart: ReadingPart | null;
  copied: boolean;
  onReword: (part: ReadingPart) => void;
  onCopyLine: () => void;
};

function RegenBtn({ onClick, busy, label }: { onClick: () => void; busy: boolean; label: string }) {
  return (
    <button
      onClick={onClick}
      disabled={busy}
      className="text-xs px-2.5 py-1 rounded-full transition-opacity disabled:opacity-40 focus:outline-none focus-visible:ring-2"
      style={{ border: "1px solid rgba(212,175,90,.4)", color: GOLD_TEXT }}
    >
      {busy ? "…" : label}
    </button>
  );
}

/** The person's real Western constellation, drawn in gold in the open sky. */
function ConstellationOverlay({ western, animal }: { western: string; animal: string }) {
  const constellation = CONSTELLATIONS[western];
  const anchor = (ANIMAL_ART[animal] ?? ANIMAL_ART.Snake).anchor;

  const drawn = useMemo(() => {
    if (!constellation) return null;
    const p = project(constellation);
    const halo = brightestIndex(p);
    // Clamp very tall or very wide figures so nothing sprawls over the animal.
    const aspect = Math.min(Math.max(p.aspect, 0.6), 1.8);
    return { p, halo, aspect };
  }, [constellation]);

  if (!drawn) return null;
  const { p, halo, aspect } = drawn;
  const viewH = 100 / aspect;
  const heightPct = anchor.w / aspect;

  return (
    <svg
      role="img"
      aria-label={`The ${p.name} constellation in gold`}
      viewBox={`0 0 100 ${viewH}`}
      className="absolute"
      style={{
        left: `${anchor.x}%`,
        top: `${anchor.y}%`,
        width: `${anchor.w}%`,
        height: `${heightPct}%`,
        overflow: "visible",
      }}
    >
      {p.lines.map(([a, b], i) => (
        <line
          key={i}
          x1={p.stars[a].x * 100}
          y1={p.stars[a].y * viewH}
          x2={p.stars[b].x * 100}
          y2={p.stars[b].y * viewH}
          stroke={GOLD_LINE}
          strokeWidth={0.7}
          opacity={0.5}
        />
      ))}
      {p.stars.map((s, i) => {
        const r = Math.min(Math.max(2.6 - 0.35 * s.mag, 0.9), 2.4);
        return (
          <g key={i}>
            {i === halo && (
              <circle cx={s.x * 100} cy={s.y * viewH} r={r * 2.8} fill={GOLD_LINE} opacity={0.18} />
            )}
            <circle cx={s.x * 100} cy={s.y * viewH} r={r} fill="#EBCB7E" opacity={0.92} />
          </g>
        );
      })}
    </svg>
  );
}

/** Night sky stand-in while an animal's painting is still to come. */
function FallbackSky() {
  const dots = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        left: (i * 137.5) % 100,
        top: (i * 61.8) % 100,
        o: 0.2 + ((i * 7) % 10) / 25,
      })),
    [],
  );
  return (
    <div
      className="absolute inset-0"
      style={{ background: "radial-gradient(120% 90% at 50% 30%, #2B2F5E 0%, #1A1D3F 60%, #12142E 100%)" }}
    >
      <div
        className="absolute rounded-full"
        style={{
          left: "38%",
          top: "8%",
          width: "24%",
          aspectRatio: "1",
          background:
            "radial-gradient(circle, rgba(238,221,168,.75) 0%, rgba(238,221,168,.25) 55%, rgba(238,221,168,0) 72%)",
        }}
      />
      {dots.map((d, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{ left: `${d.left}%`, top: `${d.top}%`, width: 2, height: 2, background: GOLD_LINE, opacity: d.o }}
        />
      ))}
    </div>
  );
}

export function KeepsakeCard({
  signs,
  animalSymbol,
  westernSymbol,
  reading,
  busy,
  busyPart,
  copied,
  onReword,
  onCopyLine,
}: Props) {
  const art = ANIMAL_ART[signs.animal] ?? null;
  const tint = ELEMENT_TINT[signs.element] ?? null;

  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      data-bg-slot="reading-card"
      style={{ background: NIGHT, border: "1px solid rgba(212,175,90,.45)" }}
    >
      {/* Night sky hero: the painting, the element tint, the real constellation. */}
      <div className="relative w-full" style={{ aspectRatio: "1" }}>
        {art?.file ? (
          <img
            src={art.file}
            alt={art.alt}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <FallbackSky />
        )}
        {tint && (
          <>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: tint, mixBlendMode: "color", opacity: 0.4 }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: tint, mixBlendMode: "soft-light", opacity: 0.35 }}
            />
          </>
        )}
        <ConstellationOverlay western={signs.western} animal={signs.animal} />
        {/* Bridge into the text panel below. */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{ height: "34%", background: `linear-gradient(to bottom, rgba(18,20,46,0) 0%, ${NIGHT} 92%)` }}
        />
      </div>

      {/* The words, over the fade. */}
      <div className="relative px-6 sm:px-8 pb-6 sm:pb-8" style={{ marginTop: "-3.5rem" }}>
        <div className="mb-5">
          <div style={{ fontFamily: DISPLAY, color: GOLD_TEXT, fontSize: 24, fontWeight: 600 }}>
            {westernSymbol} {signs.western} {"·"} {signs.element} {signs.animal}
          </div>
          <div className="text-xs mt-1 tracking-wide" style={{ color: FADED }}>
            Two skies. One story. Yours.
          </div>
        </div>

        {busy && !reading ? (
          <p className="text-sm" style={{ color: CREAM }}>
            Reading both skies{"…"}
          </p>
        ) : reading ? (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-widest" style={{ color: GOLD_TEXT }}>
                  Your reading
                </span>
                <RegenBtn
                  onClick={() => onReword("reading")}
                  busy={busyPart === "reading"}
                  label={"↻ reword"}
                />
              </div>
              <p className="leading-relaxed" style={{ color: CREAM, fontSize: 16 }}>
                {reading.reading}
              </p>
            </div>

            <div style={{ borderTop: "1px dashed rgba(212,175,90,.35)" }} className="pt-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-widest" style={{ color: GOLD_TEXT }}>
                  Your quote
                </span>
                <RegenBtn onClick={() => onReword("quote")} busy={busyPart === "quote"} label={"↻ reword"} />
              </div>
              <p style={{ fontFamily: DISPLAY, color: CREAM, fontSize: 19, fontStyle: "italic" }}>
                {"“"}
                {reading.quote}
                {"”"}
              </p>
            </div>

            <div style={{ borderTop: "1px dashed rgba(212,175,90,.35)" }} className="pt-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-widest" style={{ color: GOLD_TEXT }}>
                  Your line
                </span>
                <div className="flex gap-2">
                  <RegenBtn onClick={() => onReword("line")} busy={busyPart === "line"} label={"↻ reword"} />
                  <RegenBtn onClick={onCopyLine} busy={false} label={copied ? "copied!" : "copy"} />
                </div>
              </div>
              <p
                style={{
                  fontFamily: DISPLAY,
                  color: "#E8C979",
                  fontSize: 26,
                  fontWeight: 700,
                  lineHeight: 1.15,
                }}
              >
                {reading.line}
              </p>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs" style={{ color: FADED }}>
                thread: {reading.thread}
                {reading.source === "offline" ? " · offline wording, tap any reword to retry" : ""}
              </span>
              <Seal hanzi={animalSymbol} size={34} />
            </div>
          </div>
        ) : (
          <p className="text-sm" style={{ color: CREAM }}>
            Something interrupted the reading. Try again.
          </p>
        )}
      </div>
    </div>
  );
}
