import { notFound } from "next/navigation";
import { labSchema, ageSchema, motionSchema, pendulumSchema, lightSchema } from "@/lib/science";
import { Experiment } from "@/components/experiment";
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ lab: string }>;
  searchParams: Promise<{ age?: string; preset?: string; settings?: string }>;
}) {
  const p = await params,
    q = await searchParams,
    lab = labSchema.safeParse(p.lab);
  if (!lab.success) notFound();
  const age = ageSchema.safeParse(q.age);
  let settings: Record<string, number> | undefined;
  try {
    if (q.settings && q.settings.length < 300)
      settings = (
        lab.data === "motion"
          ? motionSchema
          : lab.data === "pendulum"
            ? pendulumSchema
            : lightSchema
      ).parse(JSON.parse(q.settings));
  } catch {
    /* Invalid shared settings fall back to a known experiment. */
  }
  return (
    <Experiment
      key={`${lab.data}-${q.settings ?? ""}`}
      settings={settings}
      lab={lab.data}
      age={age.success ? age.data : "4-6"}
      preset={q.preset}
    />
  );
}
