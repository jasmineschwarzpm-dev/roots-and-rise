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

  // These are real sentences the generator produced through the Vinegar Taster
  // lenses. The contracted-only detector let every one of them through.
  it("detects the full-word negation restated as an affirmation", () => {
    expect(findViolations("Joy is not soft, it is unstoppable.")).not.toEqual([]);
    expect(
      findViolations("Your softness is not weakness, it is a strength that does not need to prove itself."),
    ).not.toEqual([]);
    expect(findViolations("Your fire and your gentleness are not opposites, just one strength.")).not.toEqual(
      [],
    );
    expect(findViolations("This was not a detour, it was the road.")).not.toEqual([]);
  });

  it("detects the same flip hiding behind other negations", () => {
    expect(findViolations("Watch how it settles: it does not vanish, it softens into resolve.")).not.toEqual(
      [],
    );
    expect(findViolations("That first spark is never a mistake, just your nature announcing itself.")).not.toEqual(
      [],
    );
    expect(findViolations("You don't wait for permission, you move.")).not.toEqual([]);
  });

  it("detects the flip written backwards, affirm then negate", () => {
    expect(findViolations("Sincerity is a discipline, not a default.")).not.toEqual([]);
    expect(findViolations("Joy that acts, not joy that waits for permission.")).not.toEqual([]);
    expect(findViolations("You deserve your whole self, not half of it.")).not.toEqual([]);
  });

  it("spares participles and causal clauses that only look like the flip", () => {
    expect(findViolations("He left the door open, not knowing you would follow.")).toEqual([]);
    expect(findViolations("You move, not because you must.")).toEqual([]);
  });

  it("does not flag ordinary uses of 'but' or 'cannot'", () => {
    expect(findViolations("You move quietly, but everyone notices.")).toEqual([]);
    expect(findViolations("They cannot help smiling around you.")).toEqual([]);
  });

  it("does not flag a negation that is never restated", () => {
    expect(findViolations("It is not easy, and it is worth every hour.")).toEqual([]);
    expect(findViolations("You are not waiting for permission.")).toEqual([]);
    expect(findViolations("Some days are not kind. You keep going.")).toEqual([]);
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
