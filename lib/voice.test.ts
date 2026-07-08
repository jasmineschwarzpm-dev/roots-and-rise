import { describe, it, expect } from "vitest";
import { findViolations, scrubDashes, scrubActually, scrubAll } from "./voice";

describe("findViolations", () => {
  it("passes clean text", () => {
    expect(findViolations("You bring snacks to the revolution and mean it.")).toEqual([]);
  });

  it("detects em and en dashes", () => {
    expect(findViolations("bold—and kind")).toContain("an em dash or en dash");
    expect(findViolations("1984–2026")).toContain("an em dash or en dash");
  });

  it("detects banned words case-insensitively", () => {
    expect(findViolations("You actually wait for the answer.")).toContain('the word "actually"');
    expect(findViolations("Actually, you wait.")).toContain('the word "actually"');
    expect(findViolations("The joke lands every time.")).toContain('the word "lands"');
    expect(findViolations("It looks like rain.")).toContain('the phrase "looks like"');
  });

  it("allows the base form 'land', which the owner's exemplars use", () => {
    expect(findViolations("You leap on instinct and land where others only hope to aim.")).toEqual([]);
  });

  it("detects 'not X but Y' contrast constructions", () => {
    expect(findViolations("You are not fearless but kind.")).not.toEqual([]);
    expect(findViolations("Not loud but lasting.")).not.toEqual([]);
    expect(findViolations("It isn't noise, it's music.")).not.toEqual([]);
  });

  it("does not flag ordinary uses of 'but' or 'cannot'", () => {
    expect(findViolations("You move quietly, but everyone notices.")).toEqual([]);
    expect(findViolations("They cannot help smiling around you.")).toEqual([]);
  });
});

describe("scrubDashes", () => {
  it("replaces dashes with a comma pause", () => {
    expect(scrubDashes("bold—and kind")).toBe("bold, and kind");
    expect(scrubDashes("soft – but sure")).toBe("soft, but sure");
  });
});

describe("scrubActually", () => {
  it("removes the word and tidies spacing", () => {
    expect(scrubActually("then actually wait for the answer")).toBe("then wait for the answer");
    expect(scrubActually("You actually, truly care.")).toBe("You truly care.");
  });

  it("leaves clean text untouched", () => {
    const s = "Curious enough to wonder, kind enough to include.";
    expect(scrubActually(s)).toBe(s);
  });
});

describe("scrubAll", () => {
  it("applies both scrubs and yields violation-free text", () => {
    const dirty = "You actually listen—and people feel it.";
    const clean = scrubAll(dirty);
    expect(clean).toBe("You listen, and people feel it.");
    expect(findViolations(clean)).toEqual([]);
  });
});
