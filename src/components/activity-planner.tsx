"use client";
import { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import type { Age } from "@/lib/science";
import type { Plan } from "@/lib/plans";
export function ActivityPlanner({ age }: { age: Age }) {
  const [prompt, setPrompt] = useState("Create a five-minute experiment about gravity."),
    [parent, setParent] = useState(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [result, setResult] = useState<{ plan: Plan; source: string; notice: string } | null>(null);
  return (
    <section className="planner">
      <div>
        <p className="eyebrow">
          <Sparkles size={15} /> CREATE TOGETHER · GROWN-UP SPACE
        </p>
        <h2>Follow their curiosity.</h2>
        <p>Tell us what you’d like to explore. We’ll choose from our tested virtual experiments.</p>
        <small>
          When no AI provider is enabled, this selects a clearly labeled, prewritten activity.
          Please don’t include names or personal details.
        </small>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          setError("");
          setResult(null);
          try {
            const r = await fetch("/api/plan", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ prompt, age, parent }),
            });
            const d = await r.json();
            if (!r.ok) throw new Error(d.error);
            setResult(d);
          } catch (e) {
            setError(
              e instanceof Error
                ? e.message
                : "We could not load an activity. Please try one of the labs above.",
            );
          } finally {
            setBusy(false);
          }
        }}
      >
        <label htmlFor="idea">Our question or idea</label>
        <textarea
          id="idea"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          maxLength={400}
          required
        />
        <label className="checkbox">
          <input
            type="checkbox"
            checked={parent}
            onChange={(e) => setParent(e.target.checked)}
            required
          />{" "}
          I’m the grown-up helping plan this activity.
        </label>
        <button className="button primary" disabled={busy || !parent}>
          {busy ? "Finding an activity…" : "Find our experiment"}
          <ArrowRight size={18} />
        </button>
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
      </form>
      {result && (
        <div className="plan-result" aria-live="polite">
          <span className="pill">
            {result.source === "curated"
              ? "PREWRITTEN ACTIVITY"
              : "AI-SELECTED · VALIDATED TEMPLATE"}
          </span>
          <h3>{result.plan.title}</h3>
          <p>{result.plan.question}</p>
          <ol>
            {result.plan.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          <p>
            <strong>Ask together:</strong> {result.plan.parentPrompt}
          </p>
          <small>{result.notice}</small>
          <Link
            href={`/explore/${result.plan.lab}?age=${result.plan.age}&preset=${result.plan.preset}`}
            className="button primary"
          >
            Open this experiment <ArrowRight size={18} />
          </Link>
        </div>
      )}
    </section>
  );
}
