import { z } from "zod";
import { ageSchema, labSchema, motionSchema, pendulumSchema, lightSchema } from "./science";
export const discoverySchema = z
  .object({
    id: z.string().max(50),
    lab: labSchema,
    age: ageSchema,
    prediction: z.string().max(180),
    observation: z.string().max(600),
    result: z.string().max(300),
    date: z.string().datetime(),
    parameters: z.record(z.string().max(40), z.number().finite()),
  })
  .superRefine((entry, ctx) => {
    const schema =
      entry.lab === "motion"
        ? motionSchema
        : entry.lab === "pendulum"
          ? pendulumSchema
          : lightSchema;
    if (!schema.safeParse(entry.parameters).success)
      ctx.addIssue({ code: "custom", message: "Invalid experiment settings" });
  });
export type Discovery = z.infer<typeof discoverySchema>;
export const notebookSchema = z.object({
  version: z.literal(1),
  discoveries: z.array(discoverySchema).max(50),
});
export const notebookKey = "labspace-notebook-v1";
export function readNotebook(raw: string | null): Discovery[] {
  if (!raw) return [];
  return notebookSchema.parse(JSON.parse(raw)).discoveries;
}
export function encodeNotebook(items: Discovery[]) {
  return JSON.stringify(notebookSchema.parse({ version: 1, discoveries: items.slice(0, 50) }));
}
