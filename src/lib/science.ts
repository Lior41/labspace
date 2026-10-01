import { z } from "zod";
export const motionSchema = z.object({
  speed: z.number().min(2).max(12),
  angle: z.number().min(15).max(75),
  gravity: z.number().min(1.62).max(20),
});
export type Motion = z.infer<typeof motionSchema>;
export function projectile(input: Motion) {
  const p = motionSchema.parse(input),
    r = (p.angle * Math.PI) / 180,
    vx = p.speed * Math.cos(r),
    vy = p.speed * Math.sin(r),
    duration = (2 * vy) / p.gravity;
  return {
    duration,
    range: vx * duration,
    height: (vy * vy) / (2 * p.gravity),
    point: (time: number) => {
      const t = Math.max(0, Math.min(time, duration));
      return { x: vx * t, y: Math.max(0, vy * t - (p.gravity * t * t) / 2) };
    },
  };
}
export const pendulumSchema = z.object({
  length: z.number().min(0.25).max(2),
  gravity: z.number().min(1.62).max(20),
  amplitude: z.number().min(1).max(10),
});
export type Pendulum = z.infer<typeof pendulumSchema>;
export function pendulum(input: Pendulum) {
  const p = pendulumSchema.parse(input),
    omega = Math.sqrt(p.gravity / p.length),
    period = (2 * Math.PI) / omega;
  return {
    period,
    angle: (time: number) => ((p.amplitude * Math.PI) / 180) * Math.cos(omega * Math.max(0, time)),
  };
}
export const lightSchema = z.object({
  red: z.number().int().min(0).max(255),
  green: z.number().int().min(0).max(255),
  blue: z.number().int().min(0).max(255),
});
export type Light = z.infer<typeof lightSchema>;
export function additive(input: Light) {
  const c = lightSchema.parse(input);
  return {
    css: `rgb(${c.red}, ${c.green}, ${c.blue})`,
    hex: "#" + [c.red, c.green, c.blue].map((v) => v.toString(16).padStart(2, "0")).join(""),
  };
}
export const ageSchema = z.enum(["4-6", "7-10", "10-14"]);
export type Age = z.infer<typeof ageSchema>;
export const labSchema = z.enum(["motion", "pendulum", "light"]);
export type Lab = z.infer<typeof labSchema>;
export const names: Record<Lab, string> = {
  motion: "Moon jump",
  pendulum: "Find your rhythm",
  light: "A little light magic",
};
export const questions: Record<Lab, string> = {
  motion: "Where will the ball travel farther?",
  pendulum: "Will a longer string swing faster or slower?",
  light: "What happens when we turn on every light?",
};
export const predictions: Record<Lab, string[]> = {
  motion: ["On Earth", "On the Moon", "The same distance"],
  pendulum: ["Faster", "Slower", "The same rhythm"],
  light: ["White light", "Darkness", "A surprise colour"],
};
export const explanation: Record<Lab, Record<Age, string>> = {
  motion: {
    "4-6":
      "The Moon pulls the ball down less strongly. With the same push, the ball stays in the air longer and goes farther.",
    "7-10":
      "We gave both balls the same launch speed and angle. The Moon’s weaker gravity means a longer flight and a greater distance. This model leaves out air resistance.",
    "10-14":
      "With equal launch and landing heights and no air resistance, flight time is 2v sin(θ)/g and range is v² sin(2θ)/g. The same initial velocity travels farther under lower constant gravity.",
  },
  pendulum: {
    "4-6":
      "A longer string makes a slower swing. Try the short and long strings and count together.",
    "7-10":
      "At small angles, a longer pendulum takes more time for one complete swing. Changing the bob’s mass would not change the period in this ideal model.",
    "10-14":
      "The small-angle model uses T = 2π√(L/g). Quadrupling length doubles the period. We limit amplitude to 10°, where the period approximation differs from the ideal nonlinear pendulum by about 0.2% at most. Friction is omitted.",
  },
  light: {
    "4-6":
      "These are coloured lights, not paint! Bright red, green and blue light together look white on our screen.",
    "7-10":
      "Screens mix red, green and blue light. Red plus green makes yellow; red plus blue makes magenta; green plus blue makes cyan. All three at full intensity make white.",
    "10-14":
      "This is an additive RGB display model. Each slider sets a display channel from 0 to 255. It illustrates screen colour mixing, not spectral physics or linear radiometric intensity. Equal maximum channels produce display white.",
  },
};
