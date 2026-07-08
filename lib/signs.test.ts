import { describe, it, expect } from "vitest";
import {
  computeSigns,
  westernSign,
  isSignError,
  YEAR_RANGE,
  type Signs,
} from "./signs";

/** Assert a date produces signs (not an error) and return them. */
function ok(dateStr: string): Signs {
  const result = computeSigns(dateStr);
  if (isSignError(result)) {
    throw new Error(`Expected signs for ${dateStr}, got error: ${result.error}`);
  }
  return result;
}

describe("Lunar New Year boundary: 1984 (Feb 2)", () => {
  it("Feb 1 1984 falls in the previous Chinese year: Water Pig", () => {
    const r = ok("1984-02-01");
    expect(r.element).toBe("Water");
    expect(r.animal).toBe("Pig");
    expect(r.lunarYear).toBe(1983);
    expect(r.beforeLunarNewYear).toBe(true);
  });

  it("Feb 2 1984 is the first day of the new Chinese year: Wood Rat", () => {
    const r = ok("1984-02-02");
    expect(r.element).toBe("Wood");
    expect(r.animal).toBe("Rat");
    expect(r.lunarYear).toBe(1984);
    expect(r.beforeLunarNewYear).toBe(false);
  });
});

describe("Lunar New Year boundary: 2025 (Jan 29)", () => {
  it("Jan 28 2025 falls in the previous Chinese year: Wood Dragon", () => {
    const r = ok("2025-01-28");
    expect(r.element).toBe("Wood");
    expect(r.animal).toBe("Dragon");
    expect(r.lunarYear).toBe(2024);
    expect(r.beforeLunarNewYear).toBe(true);
  });

  it("Jan 29 2025 is the first day of the new Chinese year: Wood Snake", () => {
    const r = ok("2025-01-29");
    expect(r.element).toBe("Wood");
    expect(r.animal).toBe("Snake");
    expect(r.lunarYear).toBe(2025);
    expect(r.beforeLunarNewYear).toBe(false);
  });
});

describe("lower edge of the supported range", () => {
  it("Jan 1 1924 (before LNY on Feb 5) belongs to lunar year 1923: Water Pig", () => {
    const r = ok("1924-01-01");
    expect(r.element).toBe("Water");
    expect(r.animal).toBe("Pig");
    expect(r.lunarYear).toBe(1923);
  });
});

describe("Western sun-sign cutoffs", () => {
  const cases: Array<[string, string]> = [
    ["2000-01-19", "Capricorn"],
    ["2000-01-20", "Aquarius"],
    ["2000-02-18", "Aquarius"],
    ["2000-02-19", "Pisces"],
    ["2000-03-20", "Pisces"],
    ["2000-03-21", "Aries"],
    ["2000-06-20", "Gemini"],
    ["2000-06-21", "Cancer"],
    ["2000-12-21", "Sagittarius"],
    ["2000-12-22", "Capricorn"],
    ["2000-12-31", "Capricorn"],
  ];
  it.each(cases)("%s is %s", (dateStr, expected) => {
    expect(ok(dateStr).western).toBe(expected);
  });
});

describe("westernSign is pure and covers every month", () => {
  it("returns Capricorn for the year-end wrap", () => {
    expect(westernSign(12, 25)).toBe("Capricorn");
    expect(westernSign(1, 5)).toBe("Capricorn");
  });
});

describe("element cycle across known years (mid-year dates avoid the LNY edge)", () => {
  const cases: Array<[string, string, string]> = [
    ["1996-07-01", "Fire", "Rat"],
    ["2008-07-01", "Earth", "Rat"],
    ["2012-07-01", "Water", "Dragon"],
    ["2020-07-01", "Metal", "Rat"],
    ["2024-07-01", "Wood", "Dragon"],
  ];
  it.each(cases)("%s is the %s %s", (dateStr, element, animal) => {
    const r = ok(dateStr);
    expect(r.element).toBe(element);
    expect(r.animal).toBe(animal);
  });
});

describe("errors", () => {
  it("rejects years above the supported range", () => {
    const r = computeSigns(`${YEAR_RANGE.max + 1}-06-01`);
    expect(isSignError(r)).toBe(true);
  });

  it("rejects years below the supported range", () => {
    const r = computeSigns(`${YEAR_RANGE.min - 1}-06-01`);
    expect(isSignError(r)).toBe(true);
  });

  it("rejects impossible calendar dates", () => {
    expect(isSignError(computeSigns("2020-02-30"))).toBe(true);
    expect(isSignError(computeSigns("2020-13-01"))).toBe(true);
    expect(isSignError(computeSigns("not-a-date"))).toBe(true);
  });
});

describe("banned punctuation never reaches user-facing strings", () => {
  const banned = /[—–]/; // em dash, en dash

  it("the out-of-range error contains no em or en dash", () => {
    const r = computeSigns(`${YEAR_RANGE.max + 1}-06-01`);
    if (!isSignError(r)) throw new Error("expected an error");
    expect(banned.test(r.error)).toBe(false);
  });

  it("edge notes for Jan/Feb births contain no em or en dash", () => {
    for (const dateStr of ["1984-02-01", "1984-02-02", "2025-01-28", "2025-01-29"]) {
      const note = ok(dateStr).edgeNote ?? "";
      expect(banned.test(note)).toBe(false);
    }
  });
});
