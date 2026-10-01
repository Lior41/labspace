"use client";

import { useState } from "react";
import { WalkthroughPlayer } from "@/components/walkthrough-player";
import styles from "./project-room.module.css";

const projects = {
  slot: {
    name: "SLOT",
    description: "Booking that protects the last available place.",
    summary:
      "Clients reserve and manage sessions. Coaches manage availability, services and attendance. The server and database enforce capacity and prevent overlapping bookings.",
    limit:
      "The application currently runs locally. Public hosting needs a PostgreSQL database. The video is online; payments shown are simulated.",
    site: null,
  },
  labspace: {
    name: "LABSPACE",
    description: "Little questions. Big discoveries. Together.",
    summary:
      "Make a prediction, explore motion, pendulums and colored light, then save a discovery. Age groups change the controls and explanations.",
    limit:
      "Virtual experiments with documented model limits. Activity planning uses curated templates; no AI provider is currently enabled.",
    site: "https://lior-labspace.vercel.app",
  },
  signbridge: {
    name: "SIGNBRIDGE",
    description: "An honest starting point for accessible communication.",
    summary:
      "Preview local video, explore a scripted recognition scenario and correct a suggestion. The prototype explains what is available and what still needs research.",
    limit:
      "ASL recognition and validated signed-video replies are not implemented. Scripted suggestions are labeled as demo content.",
    site: "https://lior-signbridge.vercel.app",
  },
} as const;
type Project = keyof typeof projects;

export function ProjectRoom() {
  const [selected, setSelected] = useState<Project>("slot");
  const project = projects[selected];
  return (
    <>
      <div className={styles.tabs} role="group" aria-label="Choose a project">
        {(Object.keys(projects) as Project[]).map((key) => (
          <button
            key={key}
            type="button"
            aria-pressed={selected === key}
            onClick={() => setSelected(key)}
          >
            {projects[key].name}
          </button>
        ))}
      </div>
      <h2 className={styles.title}>
        {project.name} — {project.description}
      </h2>
      <WalkthroughPlayer
        key={selected}
        project={project.name}
        initialLanguage="fr"
        basePath={selected === "labspace" ? "/demo/walkthrough" : `/demo/${selected}/walkthrough`}
      />
      <section className={styles.details} aria-label="Project details">
        <p>{project.summary}</p>
        <p>
          <strong>Current limits.</strong> {project.limit}
        </p>
        <div className={styles.links}>
          {project.site ? (
            <a href={project.site}>Open the application ↗</a>
          ) : (
            <a href="https://github.com/Lior41/slot#getting-started">Run SLOT locally ↗</a>
          )}
          <a href={`https://github.com/Lior41/${selected}`}>View the source code ↗</a>
          <a href={`https://github.com/Lior41/${selected}/blob/main/docs/INTERVIEW.fr.md`}>
            French interview guide ↗
          </a>
        </div>
      </section>
    </>
  );
}
