import { describe, it, expect } from "vitest";
import {
  CONSTELLATIONS,
  project,
  brightestIndex,
} from "./constellations";
import { WESTERN_SIGNS } from "./content";

const NAMES = Object.keys(CONSTELLATIONS);

describe("constellation data covers the zodiac", () => {
  it("has exactly the twelve Western signs", () => {
    expect(NAMES).toHaveLength(12);
    const signNames = WESTERN_SIGNS.map((s) => s.name).sort();
    expect([...NAMES].sort()).toEqual(signNames);
  });
});

describe.each(NAMES)("%s", (name) => {
  const c = CONSTELLATIONS[name];

  it("has at least four stars", () => {
    expect(c.stars.length).toBeGreaterThanOrEqual(4);
  });

  it("has plausible coordinates and magnitudes", () => {
    for (const s of c.stars) {
      expect(s.ra).toBeGreaterThanOrEqual(0);
      expect(s.ra).toBeLessThan(24);
      // Zodiac constellations hug the ecliptic; none reaches beyond 50 degrees.
      expect(Math.abs(s.dec)).toBeLessThan(50);
      expect(s.mag).toBeGreaterThan(-2);
      expect(s.mag).toBeLessThan(7);
    }
  });

  it("has lines that reference real stars and no self-loops", () => {
    expect(c.lines.length).toBeGreaterThanOrEqual(3);
    for (const [a, b] of c.lines) {
      expect(a).not.toBe(b);
      expect(a).toBeGreaterThanOrEqual(0);
      expect(b).toBeGreaterThanOrEqual(0);
      expect(a).toBeLessThan(c.stars.length);
      expect(b).toBeLessThan(c.stars.length);
    }
  });

  it("leaves no star disconnected from the figure", () => {
    const touched = new Set(c.lines.flat());
    for (let i = 0; i < c.stars.length; i++) {
      expect(touched.has(i)).toBe(true);
    }
  });

  it("projects into the unit square without degenerate collapse", () => {
    const p = project(c);
    for (const s of p.stars) {
      expect(Number.isFinite(s.x)).toBe(true);
      expect(Number.isFinite(s.y)).toBe(true);
      expect(s.x).toBeGreaterThanOrEqual(-1e-9);
      expect(s.x).toBeLessThanOrEqual(1 + 1e-9);
      expect(s.y).toBeGreaterThanOrEqual(-1e-9);
      expect(s.y).toBeLessThanOrEqual(1 + 1e-9);
    }
    // The pattern must actually spread across its longer axis.
    const xs = p.stars.map((s) => s.x);
    const ys = p.stars.map((s) => s.y);
    const spread = Math.max(
      Math.max(...xs) - Math.min(...xs),
      Math.max(...ys) - Math.min(...ys),
    );
    expect(spread).toBeGreaterThan(0.9);
    // No two stars may land on the same point.
    const seen = new Set<string>();
    for (const s of p.stars) {
      const key = `${s.x.toFixed(4)},${s.y.toFixed(4)}`;
      expect(seen.has(key)).toBe(false);
      seen.add(key);
    }
  });

  it("names a brightest star for the halo", () => {
    const p = project(c);
    const idx = brightestIndex(p);
    for (const s of p.stars) {
      expect(p.stars[idx].mag).toBeLessThanOrEqual(s.mag);
    }
  });
});

describe("Pisces straddles the zero hour of right ascension", () => {
  it("still projects as one contiguous figure", () => {
    const p = project(CONSTELLATIONS.Pisces);
    // If unwrapping failed, stars near 23h and 1h would be flung far apart
    // and everything else would collapse into a point. Spread checks above
    // catch collapse; here we confirm neighboring cord stars stay close.
    const a = p.stars[4]; // 23.67h
    const b = p.stars[5]; // 0.81h
    const dist = Math.hypot(a.x - b.x, a.y - b.y);
    expect(dist).toBeLessThan(0.6);
  });
});

describe("famous anchor stars are present", () => {
  const anchors: Array<[string, string]> = [
    ["Leo", "Regulus"],
    ["Virgo", "Spica"],
    ["Taurus", "Aldebaran"],
    ["Scorpio", "Antares"],
    ["Gemini", "Pollux"],
    ["Sagittarius", "Nunki"],
  ];
  it.each(anchors)("%s contains %s", (cName, starName) => {
    const found = CONSTELLATIONS[cName].stars.some((s) => s.name === starName);
    expect(found).toBe(true);
  });
});
