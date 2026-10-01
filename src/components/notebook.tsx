"use client";
import { useSyncExternalStore, useState } from "react";
import Link from "next/link";
import { Bookmark, Download, Trash2 } from "lucide-react";
import { readNotebook, encodeNotebook, notebookKey, type Discovery } from "@/lib/notebook";
import { names, motionSchema, pendulumSchema, lightSchema } from "@/lib/science";
import { ScienceStage } from "./science-stage";
import { LabArt } from "./lab-art";
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("labspace-notebook", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("labspace-notebook", callback);
  };
}
function snapshot() {
  try {
    return localStorage.getItem(notebookKey) ?? "";
  } catch {
    return "unavailable";
  }
}
export function Notebook() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => ""),
    [message, setMessage] = useState("");
  let entries: Discovery[] | null;
  try {
    entries = readNotebook(raw || null);
  } catch {
    entries = null;
  }
  function remove(id: string) {
    if (!entries) return;
    if (!window.confirm("Remove this discovery from this device?")) return;
    try {
      localStorage.setItem(notebookKey, encodeNotebook(entries.filter((e) => e.id !== id)));
      window.dispatchEvent(new Event("labspace-notebook"));
    } catch {
      setMessage("Could not update this device’s notebook.");
    }
  }
  function download() {
    if (!entries) return;
    const url = URL.createObjectURL(
        new Blob([encodeNotebook(entries)], { type: "application/json" }),
      ),
      a = document.createElement("a");
    a.href = url;
    a.download = "our-labspace-discoveries.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <section className="wrap notebook-page">
      <p className="eyebrow">
        <Bookmark size={15} /> A LITTLE COLLECTION OF WONDER
      </p>
      <h1>Our discoveries.</h1>
      <p className="lead">
        The questions you asked. The things you noticed.
        <br />
        Saved only in this browser, on this device.
      </p>
      {entries === null ? (
        <div className="error" role="alert">
          This notebook could not be read. Export your browser data before clearing storage if you
          want to keep it.
        </div>
      ) : entries.length === 0 ? (
        <div className="empty-notebook">
          <LabArt />
          <h2>Your first discovery is waiting.</h2>
          <p>Explore an experiment and choose “Keep our discovery”.</p>
          <Link className="button primary" href="/explore">
            Let’s find something out ↗
          </Link>
        </div>
      ) : (
        <>
          <button className="button" onClick={download}>
            <Download size={16} />
            Export our notebook
          </button>
          <div className="notebook-grid">
            {entries.map((e) => (
              <article className="notebook-card" key={e.id}>
                <div className="notebook-art">
                  <ScienceStage
                    lab={e.lab}
                    motion={motionSchema.parse(
                      e.lab === "motion" ? e.parameters : { speed: 8, angle: 45, gravity: 9.81 },
                    )}
                    swing={pendulumSchema.parse(
                      e.lab === "pendulum"
                        ? e.parameters
                        : { length: 1, gravity: 9.81, amplitude: 8 },
                    )}
                    light={lightSchema.parse(
                      e.lab === "light" ? e.parameters : { red: 255, green: 0, blue: 0 },
                    )}
                    time={100}
                    showPath
                  />
                </div>
                <div className="notebook-copy">
                  <p className="eyebrow">
                    {new Date(e.date).toLocaleDateString("en-GB", { dateStyle: "medium" })} · AGES{" "}
                    {e.age}
                  </p>
                  <h2>{names[e.lab]}</h2>
                  <p>
                    <strong>We thought:</strong> {e.prediction}
                  </p>
                  <p>
                    <strong>We found:</strong> {e.result}
                  </p>
                  {e.observation && <blockquote>“{e.observation}”</blockquote>}
                  <details>
                    <summary>Our experiment settings</summary>
                    <ul>
                      {Object.entries(e.parameters).map(([k, v]) => (
                        <li key={k}>
                          {k}: {v}
                        </li>
                      ))}
                    </ul>
                  </details>
                  <div>
                    <Link
                      className="text-link"
                      href={`/explore/${e.lab}?age=${e.age}&settings=${encodeURIComponent(JSON.stringify(e.parameters))}`}
                    >
                      Try these settings again ↗
                    </Link>
                    <button aria-label={`Remove discovery ${e.id}`} onClick={() => remove(e.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
      {message && (
        <p role="alert" className="error">
          {message}
        </p>
      )}
      <p className="privacy-note">
        No names or birth dates are needed. Up to 50 discoveries are kept. Clearing browser storage
        removes them; export a copy to keep them.
      </p>
    </section>
  );
}
