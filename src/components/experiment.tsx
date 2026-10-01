"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Heart,
  Bookmark,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import {
  names,
  questions,
  predictions,
  explanation,
  projectile,
  pendulum,
  additive,
  type Age,
  type Lab,
  type Motion,
  type Pendulum,
  type Light,
} from "@/lib/science";
import { readNotebook, encodeNotebook, notebookKey, type Discovery } from "@/lib/notebook";
import { ScienceStage } from "./science-stage";
import { ExperimentControls } from "./experiment-controls";
import { useExperimentClock } from "./use-experiment-clock";
export function Experiment({
  lab,
  age: initialAge,
  preset,
  settings,
}: {
  lab: Lab;
  age: Age;
  preset?: string;
  settings?: Record<string, number>;
}) {
  const [age, setAge] = useState(initialAge),
    [prediction, setPrediction] = useState(""),
    [observation, setObservation] = useState(""),
    [message, setMessage] = useState(""),
    [error, setError] = useState(""),
    [motion, setMotion] = useState<Motion>({
      speed: settings?.speed ?? 8,
      angle: settings?.angle ?? 45,
      gravity: 9.81,
    }),
    [swing, setSwing] = useState<Pendulum>({
      length: settings?.length ?? (preset === "short" ? 0.5 : preset === "long" ? 2 : 1),
      gravity: settings?.gravity ?? 9.81,
      amplitude: settings?.amplitude ?? 8,
    }),
    [light, setLight] = useState<Light>({
      red: settings?.red ?? 255,
      green: settings?.green ?? (preset === "yellow" || preset === "white" ? 255 : 0),
      blue: settings?.blue ?? (preset === "white" ? 255 : 0),
    });
  const stage = useRef<HTMLDivElement>(null);
  const duration =
    lab === "motion"
      ? projectile({ ...motion, gravity: 1.62 }).duration
      : lab === "pendulum"
        ? pendulum(swing).period * 2
        : 0;
  const clock = useExperimentClock(duration);
  useEffect(
    () => () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    },
    [],
  );
  const result =
    lab === "motion"
      ? `Earth: ${projectile({ ...motion, gravity: 9.81 }).range.toFixed(1)} m. Moon: ${projectile({ ...motion, gravity: 1.62 }).range.toFixed(1)} m.`
      : lab === "pendulum"
        ? `One complete swing: ${pendulum(swing).period.toFixed(2)} s at ${swing.length.toFixed(2)} m length.`
        : `Mixed display colour: ${additive(light).hex}.`;
  function listen() {
    if (!("speechSynthesis" in window)) {
      setMessage("Audio is not available in this browser. All instructions are also written here.");
      return;
    }
    const voice = window.speechSynthesis
      .getVoices()
      .find((v) => v.lang.startsWith("en") && v.localService);
    if (!voice) {
      setMessage("No local English voice is available. Please read the instructions together.");
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(clock.done ? explanation[lab][age] : questions[lab]);
    u.voice = voice;
    u.lang = "en-US";
    u.rate = 0.85;
    window.speechSynthesis.speak(u);
  }
  function run() {
    if (!prediction) {
      setError("Choose what you think will happen first. Every guess is welcome.");
      return;
    }
    setError("");
    setMessage("");
    if (lab === "light") clock.finish();
    else clock.play();
  }
  function save() {
    try {
      const old = readNotebook(localStorage.getItem(notebookKey));
      const entry: Discovery = {
        id: crypto.randomUUID(),
        lab,
        age,
        prediction,
        observation,
        result,
        date: new Date().toISOString(),
        parameters: lab === "motion" ? motion : lab === "pendulum" ? swing : light,
      };
      localStorage.setItem(notebookKey, encodeNotebook([entry, ...old]));
      window.dispatchEvent(new Event("labspace-notebook"));
      setMessage("Saved in Our discoveries on this device. A little moment to keep.");
    } catch {
      setError(
        "We couldn’t save on this device. Your result is still here; you can download the picture.",
      );
    }
  }
  function picture() {
    const svg = stage.current?.querySelector("svg");
    if (!svg) return;
    const copy = svg.cloneNode(true) as SVGSVGElement;
    copy.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const blob = new Blob([new XMLSerializer().serializeToString(copy)], { type: "image/svg+xml" }),
      url = URL.createObjectURL(blob),
      a = document.createElement("a");
    a.href = url;
    a.download = `labspace-${lab}.svg`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <div className="wrap experiment-page">
      <div className="experiment-top">
        <Link href="/explore" className="text-link">
          <ArrowLeft size={16} />
          All experiments
        </Link>
        <label>
          Exploring with
          <select value={age} onChange={(e) => setAge(e.target.value as Age)}>
            <option value="4-6">Ages 4–6 + grown-up</option>
            <option value="7-10">Ages 7–10 together</option>
            <option value="10-14">Ages 10–14</option>
          </select>
        </label>
      </div>
      <div className="experiment-heading">
        <div>
          <p className="eyebrow">
            {lab === "motion"
              ? "MOTION & GRAVITY"
              : lab === "pendulum"
                ? "SWINGS & PATTERNS"
                : "LIGHT & COLOUR"}
          </p>
          <h1>
            {names[lab]}
            <span>✳</span>
          </h1>
        </div>
        <button className="listen" onClick={listen}>
          <Volume2 size={18} />
          Listen together
        </button>
      </div>
      <ol className="steps" aria-label="Experiment progress">
        {["Wonder", "Predict", "Try it", "Discover"].map((s, i) => (
          <li className={(clock.done ? 3 : prediction ? 2 : 1) === i ? "current" : ""} key={s}>
            <span>{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>
      <div className="experiment-layout">
        <section>
          <div className="question-card">
            <p className="eyebrow">WHAT DO YOU THINK?</p>
            <h2>{questions[lab]}</h2>
            <div className="prediction-buttons">
              {predictions[lab].map((p) => (
                <button
                  key={p}
                  aria-pressed={prediction === p}
                  disabled={clock.running}
                  onClick={() => {
                    setPrediction(p);
                    clock.reset();
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
            <small>There’s no wrong first guess. Let’s find out together.</small>
          </div>
          <div className="stage" ref={stage}>
            <ScienceStage
              lab={lab}
              motion={motion}
              swing={swing}
              light={light}
              time={clock.time}
              showPath={clock.done || clock.running || clock.time > 0}
            />
          </div>
          <div className="playback">
            <button className="button primary" onClick={clock.running ? clock.stop : run}>
              {clock.running ? <Pause size={19} /> : <Play size={19} />}{" "}
              {clock.running ? "Pause" : clock.done ? "Try again" : "Let’s try it"}
            </button>
            <button
              aria-label="Reset the experiment"
              onClick={() => {
                clock.reset();
                setMessage("");
              }}
            >
              <RotateCcw size={19} />
            </button>
            {lab !== "light" && (
              <>
                <span>{clock.time.toFixed(1)} s</span>
                <button
                  className="text-link"
                  onClick={() => {
                    if (prediction) clock.finish();
                    else setError("Choose a prediction first.");
                  }}
                >
                  See the result <ArrowRight size={14} />
                </button>
              </>
            )}
          </div>
          {clock.done && (
            <section className="discovery" aria-live="polite">
              <p className="eyebrow">LOOK WHAT WE DISCOVERED</p>
              <h2>
                {lab === "motion"
                  ? "A smaller pull. A bigger journey."
                  : lab === "pendulum"
                    ? "Longer strings take their time."
                    : "Three lights. So many possibilities."}
              </h2>
              <p>{explanation[lab][age]}</p>
              {age !== "4-6" && <div className="result-values">{result}</div>}
              <label>
                What did you notice? <span>(Optional, save on this device)</span>
                <textarea
                  value={observation}
                  onChange={(e) => setObservation(e.target.value)}
                  maxLength={600}
                  placeholder={
                    age === "4-6"
                      ? "Grown-up: write down your child’s discovery."
                      : "We noticed that…"
                  }
                />
              </label>
              <div className="discovery-actions">
                <button className="button primary" onClick={save}>
                  <Bookmark size={16} />
                  Keep our discovery
                </button>
                <button className="text-link" onClick={picture}>
                  Download the picture ↗
                </button>
              </div>
              <Link className="text-link" href="/notebook">
                Open our discoveries <ArrowRight size={15} />
              </Link>
            </section>
          )}
        </section>
        <aside>
          <div className="controls">
            <p className="eyebrow">YOUR EXPERIMENT</p>
            <ExperimentControls
              age={age}
              lab={lab}
              motion={motion}
              swing={swing}
              light={light}
              onMotion={(p) => {
                clock.reset();
                setMotion(p);
              }}
              onSwing={(p) => {
                clock.reset();
                setSwing(p);
              }}
              onLight={(p) => {
                clock.reset();
                setLight(p);
              }}
            />
          </div>
          <div className="parent-card">
            <Heart size={22} />
            <h3>A moment together.</h3>
            <p>
              {age === "4-6"
                ? "Before pressing play, ask: “What do you think?” Then watch your child’s face as you find out."
                : "Ask: “What did we change? What stayed the same? What could we try next?”"}
            </p>
            <small>You don’t need to know the answer first.</small>
          </div>
          <div className="model-note">
            <strong>A little note about our model</strong>
            <p>
              {lab === "motion"
                ? "Both balls start and land at the same height. Gravity stays constant. Air resistance is left out. Both paths share the same scale."
                : lab === "pendulum"
                  ? "An ideal pendulum with no friction. Small-angle approximation, limited to 10°. The drawing is illustrative; the period is calculated."
                  : "An RGB screen illustration. Channel values are not measurements of light power. Paint mixing and real spectra behave differently."}
            </p>
            <Link href="/how-it-works">Explore the science ↗</Link>
          </div>
        </aside>
      </div>
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      {message && (
        <p className="feedback" role="status">
          {message}
        </p>
      )}
    </div>
  );
}
