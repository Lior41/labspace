"use client";
import { useState } from "react";
import Link from "next/link";
import type { Age } from "@/lib/science";
import { LabArt } from "./lab-art";
import { ActivityPlanner } from "./activity-planner";
export function ExplorePicker() {
  const [age, setAge] = useState<Age>("4-6");
  return (
    <section className="wrap explore-page">
      <p className="eyebrow">A FEW MINUTES OF WONDER</p>
      <h1>What shall we discover?</h1>
      <p className="lead">Choose a stage. We’ll adjust the questions and controls.</p>
      <fieldset className="age-picker">
        <legend>Who’s exploring?</legend>
        {(["4-6", "7-10", "10-14"] as const).map((a, i) => (
          <button type="button" key={a} aria-pressed={a === age} onClick={() => setAge(a)}>
            <strong>{a} years</strong>
            <span>
              {
                [
                  "Little hands + a grown-up",
                  "Curious explorers together",
                  "Independent investigators",
                ][i]
              }
            </span>
          </button>
        ))}
      </fieldset>
      <div className="lab-grid">
        {(["motion", "pendulum", "light"] as const).map((kind, i) => (
          <Link className={`lab-card ${kind}`} key={kind} href={`/explore/${kind}?age=${age}`}>
            <div className="lab-card-art">
              <LabArt kind={kind} />
            </div>
            <div className="lab-card-copy">
              <p className="eyebrow">EXPERIMENT 0{i + 1}</p>
              <h3>{["Moon jump", "Find your rhythm", "A little light magic"][i]} ↗</h3>
              <p>
                {
                  [
                    "Compare Earth and the Moon.",
                    "Change a pendulum’s length.",
                    "Mix red, green and blue light.",
                  ][i]
                }
              </p>
            </div>
          </Link>
        ))}
      </div>
      <ActivityPlanner age={age} />
    </section>
  );
}
