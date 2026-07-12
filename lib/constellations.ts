/**
 * The twelve Western zodiac constellations, drawn from real star positions.
 *
 * Each star carries J2000 equatorial coordinates (right ascension in hours,
 * declination in degrees) and an approximate visual magnitude, rounded to a
 * precision that preserves the constellation's true shape at card scale.
 * Lines are the conventional asterism connections used on star charts.
 *
 * project() flattens a constellation onto a unit square for SVG rendering:
 * a local equirectangular projection about the constellation's center, with
 * right ascension increasing to the left (the sky as you see it looking up)
 * and declination increasing upward.
 */

export type Star = {
  /** Right ascension, J2000, in hours (0 to 24). */
  ra: number;
  /** Declination, J2000, in degrees. */
  dec: number;
  /** Approximate visual magnitude (lower is brighter). */
  mag: number;
  /** Traditional name, when the star has a famous one. */
  name?: string;
};

export type Constellation = {
  name: string;
  stars: Star[];
  /** Index pairs into stars, the chart lines. */
  lines: [number, number][];
};

export const CONSTELLATIONS: Record<string, Constellation> = {
  Aries: {
    name: "Aries",
    stars: [
      { ra: 2.12, dec: 23.5, mag: 2.0, name: "Hamal" },
      { ra: 1.91, dec: 20.8, mag: 2.6, name: "Sheratan" },
      { ra: 1.88, dec: 19.3, mag: 3.9, name: "Mesarthim" },
      { ra: 2.83, dec: 27.3, mag: 3.6 },
    ],
    lines: [
      [3, 0],
      [0, 1],
      [1, 2],
    ],
  },
  Taurus: {
    name: "Taurus",
    stars: [
      { ra: 4.6, dec: 16.5, mag: 0.9, name: "Aldebaran" },
      { ra: 4.48, dec: 19.2, mag: 3.5 },
      { ra: 4.38, dec: 17.5, mag: 3.8 },
      { ra: 4.33, dec: 15.6, mag: 3.7 },
      { ra: 4.48, dec: 15.9, mag: 3.8 },
      { ra: 4.01, dec: 12.5, mag: 3.5 },
      { ra: 5.44, dec: 28.6, mag: 1.7, name: "Elnath" },
      { ra: 5.63, dec: 21.1, mag: 3.0 },
    ],
    lines: [
      [6, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 0],
      [0, 7],
      [3, 5],
    ],
  },
  Gemini: {
    name: "Gemini",
    stars: [
      { ra: 7.58, dec: 31.9, mag: 1.6, name: "Castor" },
      { ra: 7.76, dec: 28.0, mag: 1.2, name: "Pollux" },
      { ra: 6.63, dec: 16.4, mag: 1.9, name: "Alhena" },
      { ra: 7.34, dec: 22.0, mag: 3.5 },
      { ra: 6.73, dec: 25.1, mag: 3.0 },
      { ra: 6.38, dec: 22.5, mag: 2.9 },
    ],
    lines: [
      [0, 1],
      [1, 3],
      [3, 2],
      [0, 4],
      [4, 5],
    ],
  },
  Cancer: {
    name: "Cancer",
    stars: [
      { ra: 8.28, dec: 9.2, mag: 3.5, name: "Altarf" },
      { ra: 8.74, dec: 18.2, mag: 3.9 },
      { ra: 8.72, dec: 21.5, mag: 4.7 },
      { ra: 8.97, dec: 11.9, mag: 4.3, name: "Acubens" },
      { ra: 8.78, dec: 28.8, mag: 4.0 },
    ],
    lines: [
      [4, 2],
      [2, 1],
      [1, 0],
      [1, 3],
    ],
  },
  Leo: {
    name: "Leo",
    stars: [
      { ra: 10.14, dec: 12.0, mag: 1.4, name: "Regulus" },
      { ra: 10.12, dec: 16.8, mag: 3.5 },
      { ra: 10.33, dec: 19.8, mag: 2.0, name: "Algieba" },
      { ra: 10.28, dec: 23.4, mag: 3.4 },
      { ra: 9.88, dec: 26.0, mag: 3.9 },
      { ra: 9.76, dec: 23.8, mag: 3.0 },
      { ra: 11.24, dec: 20.5, mag: 2.6, name: "Zosma" },
      { ra: 11.24, dec: 15.4, mag: 3.3 },
      { ra: 11.82, dec: 14.6, mag: 2.1, name: "Denebola" },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [2, 6],
      [6, 8],
      [8, 7],
      [7, 0],
    ],
  },
  Virgo: {
    name: "Virgo",
    stars: [
      { ra: 13.42, dec: -11.2, mag: 1.0, name: "Spica" },
      { ra: 12.69, dec: -1.4, mag: 2.7, name: "Porrima" },
      { ra: 12.93, dec: 3.4, mag: 3.4 },
      { ra: 13.04, dec: 11.0, mag: 2.8, name: "Vindemiatrix" },
      { ra: 11.84, dec: 1.8, mag: 3.6 },
      { ra: 12.33, dec: -0.7, mag: 3.9 },
      { ra: 13.58, dec: -0.6, mag: 3.4 },
    ],
    lines: [
      [4, 5],
      [5, 1],
      [1, 2],
      [2, 3],
      [1, 0],
      [0, 6],
    ],
  },
  Libra: {
    name: "Libra",
    stars: [
      { ra: 14.85, dec: -16.0, mag: 2.8, name: "Zubenelgenubi" },
      { ra: 15.28, dec: -9.4, mag: 2.6, name: "Zubeneschamali" },
      { ra: 15.59, dec: -14.8, mag: 3.9 },
      { ra: 15.07, dec: -25.3, mag: 3.3 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 0],
      [0, 3],
    ],
  },
  Scorpio: {
    name: "Scorpio",
    stars: [
      { ra: 16.49, dec: -26.4, mag: 1.1, name: "Antares" },
      { ra: 16.35, dec: -25.6, mag: 2.9 },
      { ra: 16.6, dec: -28.2, mag: 2.8 },
      { ra: 16.01, dec: -22.6, mag: 2.3, name: "Dschubba" },
      { ra: 16.09, dec: -19.8, mag: 2.6 },
      { ra: 15.98, dec: -26.1, mag: 2.9 },
      { ra: 16.84, dec: -34.3, mag: 2.3 },
      { ra: 16.87, dec: -38.0, mag: 3.0 },
      { ra: 16.91, dec: -42.4, mag: 2.4 },
      { ra: 17.2, dec: -43.2, mag: 3.3 },
      { ra: 17.62, dec: -43.0, mag: 1.9, name: "Sargas" },
      { ra: 17.71, dec: -39.0, mag: 2.4 },
      { ra: 17.56, dec: -37.1, mag: 1.6, name: "Shaula" },
    ],
    lines: [
      [4, 3],
      [3, 5],
      [3, 1],
      [1, 0],
      [0, 2],
      [2, 6],
      [6, 7],
      [7, 8],
      [8, 9],
      [9, 10],
      [10, 11],
      [11, 12],
    ],
  },
  Sagittarius: {
    name: "Sagittarius",
    stars: [
      { ra: 18.1, dec: -30.4, mag: 3.0, name: "Alnasl" },
      { ra: 18.35, dec: -29.8, mag: 2.7, name: "Kaus Media" },
      { ra: 18.4, dec: -34.4, mag: 1.9, name: "Kaus Australis" },
      { ra: 18.47, dec: -25.4, mag: 2.8, name: "Kaus Borealis" },
      { ra: 19.04, dec: -29.9, mag: 2.6 },
      { ra: 19.28, dec: -27.7, mag: 3.3 },
      { ra: 18.92, dec: -26.3, mag: 2.0, name: "Nunki" },
      { ra: 18.76, dec: -27.0, mag: 3.2 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 3],
      [3, 1],
      [7, 4],
    ],
  },
  Capricorn: {
    name: "Capricorn",
    stars: [
      { ra: 20.3, dec: -12.5, mag: 3.6, name: "Algedi" },
      { ra: 20.35, dec: -14.8, mag: 3.1, name: "Dabih" },
      { ra: 20.77, dec: -25.3, mag: 4.1 },
      { ra: 20.86, dec: -26.9, mag: 4.1 },
      { ra: 21.44, dec: -22.4, mag: 3.7 },
      { ra: 21.62, dec: -19.5, mag: 4.5 },
      { ra: 21.78, dec: -16.1, mag: 2.9, name: "Deneb Algedi" },
      { ra: 21.67, dec: -16.7, mag: 3.7 },
      { ra: 21.37, dec: -16.8, mag: 4.3 },
      { ra: 21.1, dec: -17.2, mag: 4.1 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 9],
      [9, 0],
    ],
  },
  Aquarius: {
    name: "Aquarius",
    stars: [
      { ra: 22.1, dec: -0.3, mag: 3.0, name: "Sadalmelik" },
      { ra: 21.53, dec: -5.6, mag: 2.9, name: "Sadalsuud" },
      { ra: 22.36, dec: -1.4, mag: 3.8 },
      { ra: 22.48, dec: 0.0, mag: 3.7 },
      { ra: 22.59, dec: -0.1, mag: 4.0 },
      { ra: 20.79, dec: -9.5, mag: 3.8 },
      { ra: 22.28, dec: -7.8, mag: 4.2 },
      { ra: 22.88, dec: -7.6, mag: 3.7 },
      { ra: 22.91, dec: -15.8, mag: 3.3, name: "Skat" },
    ],
    lines: [
      [5, 1],
      [1, 0],
      [0, 2],
      [2, 3],
      [3, 4],
      [0, 6],
      [6, 7],
      [7, 8],
    ],
  },
  Pisces: {
    name: "Pisces",
    stars: [
      { ra: 23.47, dec: 6.4, mag: 4.3 },
      { ra: 23.29, dec: 3.3, mag: 3.7 },
      { ra: 23.45, dec: 1.3, mag: 4.9 },
      { ra: 23.7, dec: 1.8, mag: 4.5 },
      { ra: 23.67, dec: 5.6, mag: 4.1 },
      { ra: 0.81, dec: 7.6, mag: 4.4 },
      { ra: 1.05, dec: 7.9, mag: 4.3 },
      { ra: 1.24, dec: 7.6, mag: 5.2 },
      { ra: 1.5, dec: 6.1, mag: 4.8 },
      { ra: 1.69, dec: 5.5, mag: 4.4 },
      { ra: 2.03, dec: 2.8, mag: 3.8, name: "Alrescha" },
      { ra: 1.75, dec: 9.2, mag: 4.3 },
      { ra: 1.52, dec: 15.3, mag: 3.6 },
      { ra: 1.23, dec: 24.6, mag: 4.7 },
      { ra: 1.19, dec: 30.1, mag: 4.5 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 0],
      [3, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 9],
      [9, 10],
      [10, 11],
      [11, 12],
      [12, 13],
      [13, 14],
    ],
  },
};

export type ProjectedStar = { x: number; y: number; mag: number; name?: string };
export type ProjectedConstellation = {
  name: string;
  stars: ProjectedStar[];
  lines: [number, number][];
  /** Width over height of the true shape, so callers can preserve proportion. */
  aspect: number;
};

/**
 * Unwraps right ascension so a constellation straddling 0h (Pisces) stays
 * contiguous: every star lands within 12 hours of the first star.
 */
function unwrapRa(ra: number, reference: number): number {
  let r = ra;
  while (r - reference > 12) r -= 24;
  while (reference - r > 12) r += 24;
  return r;
}

/**
 * Projects a constellation onto the unit square [0,1] x [0,1], preserving the
 * true aspect ratio of the star pattern (the shorter axis is centered).
 * Screen convention: x grows rightward, y grows downward, and right ascension
 * grows leftward, matching the sky seen from the northern hemisphere.
 */
export function project(constellation: Constellation): ProjectedConstellation {
  const { stars, lines, name } = constellation;
  const ra0 = stars[0].ra;
  const decMid =
    stars.reduce((sum, s) => sum + s.dec, 0) / stars.length;
  const cosMid = Math.cos((decMid * Math.PI) / 180);

  // Flat local coordinates in degrees: east to the left, north up.
  const flat = stars.map((s) => ({
    fx: -(unwrapRa(s.ra, ra0) - ra0) * 15 * cosMid,
    fy: -s.dec,
    mag: s.mag,
    name: s.name,
  }));

  const xs = flat.map((p) => p.fx);
  const ys = flat.map((p) => p.fy);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const spanX = maxX - minX || 1;
  const spanY = maxY - minY || 1;
  const span = Math.max(spanX, spanY);

  // Center the smaller axis inside the unit square.
  const padX = (1 - spanX / span) / 2;
  const padY = (1 - spanY / span) / 2;

  const projected = flat.map((p) => ({
    x: padX + (p.fx - minX) / span,
    y: padY + (p.fy - minY) / span,
    mag: p.mag,
    name: p.name,
  }));

  return { name, stars: projected, lines, aspect: spanX / spanY };
}

/** The brightest star's index, for halo treatment when rendering. */
export function brightestIndex(c: ProjectedConstellation): number {
  let best = 0;
  for (let i = 1; i < c.stars.length; i++) {
    if (c.stars[i].mag < c.stars[best].mag) best = i;
  }
  return best;
}
