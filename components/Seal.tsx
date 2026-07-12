const CINNABAR = "#B03A2E";
const PAPER = "#F5EFE2";

export function Seal({ hanzi, size = 56 }: { hanzi: string; size?: number }) {
  return (
    <div
      className="flex items-center justify-center shrink-0"
      style={{
        width: size,
        height: size,
        background: CINNABAR,
        borderRadius: 8,
        boxShadow: "0 2px 10px rgba(176,58,46,.45)",
      }}
    >
      <span style={{ color: PAPER, fontSize: size * 0.55, lineHeight: 1, fontWeight: 700 }}>
        {hanzi}
      </span>
    </div>
  );
}
