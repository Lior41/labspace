import { z } from "zod";
import { ageSchema, labSchema, type Age, type Lab, names, questions } from "./science";
export const planSchema = z
  .object({
    lab: labSchema,
    age: ageSchema,
    title: z.string().min(3).max(80),
    question: z.string().min(5).max(180),
    parentPrompt: z.string().min(5).max(220),
    steps: z.array(z.string().min(5).max(180)).min(3).max(5),
    preset: z.enum(["earth", "moon", "short", "long", "white", "yellow"]),
  })
  .strict();
export type Plan = z.infer<typeof planSchema>;
const presets: Record<Lab, string[]> = {
  motion: ["earth", "moon"],
  pendulum: ["short", "long"],
  light: ["white", "yellow"],
};
export function validatePlan(value: unknown) {
  const p = planSchema.parse(value);
  if (!presets[p.lab].includes(p.preset))
    throw new Error("This preset is not available for that lab.");
  return p;
}
export function curatedPlan(lab: Lab, age: Age): Plan {
  return {
    lab,
    age,
    title: names[lab],
    question: questions[lab],
    parentPrompt: "Ask: What do you think will happen? What changed when we tried it?",
    steps: [
      "Choose a prediction together.",
      "Run the virtual experiment and watch closely.",
      "Change one thing, then try again.",
      "Talk about what you noticed.",
    ],
    preset: lab === "motion" ? "moon" : lab === "pendulum" ? "long" : "white",
  };
}
export function chooseCurated(request: string, age: Age): Plan | null {
  const s = request.toLowerCase();
  if (/moon|earth|gravity|jump|ball|throw|motion/.test(s)) return curatedPlan("motion", age);
  if (/pendulum|string|swing|rhythm/.test(s)) return curatedPlan("pendulum", age);
  if (/light|colou?r|rainbow|rgb/.test(s)) return curatedPlan("light", age);
  return null;
}
