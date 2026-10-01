import { describe, it, expect } from "vitest";
import { projectile, pendulum, additive } from "../src/lib/science";
import { validatePlan, curatedPlan, chooseCurated } from "../src/lib/plans";
import { readNotebook, encodeNotebook } from "../src/lib/notebook";
describe("deterministic scientific models", () => {
  it("projectile returns to the ground at its calculated flight time", () => {
    const m = projectile({ speed: 10, angle: 45, gravity: 9.81 });
    expect(m.range).toBeCloseTo(100 / 9.81, 8);
    expect(m.point(m.duration).y).toBe(0);
    expect(m.point(m.duration / 2).y).toBeCloseTo(m.height, 8);
  });
  it("lower gravity increases range in inverse proportion", () => {
    const earth = projectile({ speed: 8, angle: 45, gravity: 9.81 }),
      moon = projectile({ speed: 8, angle: 45, gravity: 1.62 });
    expect(moon.range / earth.range).toBeCloseTo(9.81 / 1.62, 8);
  });
  it("complementary launch angles have equal range", () =>
    expect(projectile({ speed: 10, angle: 30, gravity: 9.81 }).range).toBeCloseTo(
      projectile({ speed: 10, angle: 60, gravity: 9.81 }).range,
      8,
    ));
  it("bounds the simulation domain including non-finite inputs", () => {
    expect(() => projectile({ speed: Infinity, angle: 45, gravity: 9.81 })).toThrow();
    expect(() => projectile({ speed: 8, angle: 45, gravity: 0 })).toThrow();
    expect(() => pendulum({ length: 1, gravity: 9.81, amplitude: 45 })).toThrow();
  });
  it("quadrupling pendulum length doubles period", () =>
    expect(
      pendulum({ length: 2, gravity: 9.81, amplitude: 8 }).period /
        pendulum({ length: 0.5, gravity: 9.81, amplitude: 8 }).period,
    ).toBeCloseTo(2, 8));
  it("pendulum returns to starting angle after one period", () => {
    const p = pendulum({ length: 1, gravity: 9.81, amplitude: 8 });
    expect(p.angle(p.period)).toBeCloseTo(p.angle(0), 8);
  });
  it("RGB primaries produce expected additive display colours", () => {
    expect(additive({ red: 255, green: 255, blue: 0 }).hex).toBe("#ffff00");
    expect(additive({ red: 255, green: 255, blue: 255 }).hex).toBe("#ffffff");
    expect(additive({ red: 0, green: 0, blue: 0 }).hex).toBe("#000000");
  });
});
describe("bounded experience planning", () => {
  it("rejects unknown labs, mismatched presets and arbitrary code", () => {
    const p = curatedPlan("motion", "4-6");
    expect(() => validatePlan({ ...p, lab: "chemistry" })).toThrow();
    expect(() => validatePlan({ ...p, preset: "white" })).toThrow();
    expect(() => validatePlan({ ...p, code: "eval()" })).toThrow();
  });
  it("does not invent an unsupported module", () =>
    expect(chooseCurated("Make a volcano", "7-10")).toBeNull());
  it("selects a curated activity without pretending to generate it", () =>
    expect(chooseCurated("Explore gravity on the moon", "4-6")?.lab).toBe("motion"));
  it("validates local notebook structure", () => {
    expect(readNotebook(encodeNotebook([]))).toEqual([]);
    expect(() => readNotebook("{broken")).toThrow();
    expect(() => readNotebook('{"version":99,"discoveries":[]}')).toThrow();
  });
});
