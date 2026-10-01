"use client";
import type { Age, Lab, Motion, Pendulum, Light } from "@/lib/science";
export function ExperimentControls({
  age,
  lab,
  motion,
  swing,
  light,
  onMotion,
  onSwing,
  onLight,
}: {
  age: Age;
  lab: Lab;
  motion: Motion;
  swing: Pendulum;
  light: Light;
  onMotion: (p: Motion) => void;
  onSwing: (p: Pendulum) => void;
  onLight: (p: Light) => void;
}) {
  if (lab === "motion")
    return (
      <>
        <h3>Give it a little push.</h3>
        {age === "4-6" ? (
          <div className="big-choices">
            {[
              { v: 5, label: "Little push", symbol: "↗" },
              { v: 8, label: "Bigger push", symbol: "↗↗" },
              { v: 11, label: "Biggest push", symbol: "↗↗↗" },
            ].map((p) => (
              <button
                key={p.v}
                aria-pressed={motion.speed === p.v}
                onClick={() => onMotion({ ...motion, speed: p.v })}
              >
                <span>{p.symbol}</span>
                {p.label}
              </button>
            ))}
          </div>
        ) : (
          <>
            <label>
              Launch speed <strong>{motion.speed} m/s</strong>
              <input
                type="range"
                min={2}
                max={12}
                step={1}
                value={motion.speed}
                onChange={(e) => onMotion({ ...motion, speed: Number(e.target.value) })}
              />
            </label>
            <label>
              Launch angle <strong>{motion.angle}°</strong>
              <input
                type="range"
                min={15}
                max={75}
                step={5}
                value={motion.angle}
                onChange={(e) => onMotion({ ...motion, angle: Number(e.target.value) })}
              />
            </label>
          </>
        )}
        <p>Both balls get exactly the same push. Only gravity changes.</p>
      </>
    );
  if (lab === "pendulum")
    return (
      <>
        <h3>Choose your string.</h3>
        {age === "4-6" ? (
          <div className="big-choices">
            {[
              { v: 0.5, label: "Short" },
              { v: 1, label: "Medium" },
              { v: 2, label: "Long" },
            ].map((p) => (
              <button
                key={p.v}
                aria-pressed={swing.length === p.v}
                onClick={() => onSwing({ ...swing, length: p.v })}
              >
                <span>{"│".repeat(p.v === 0.5 ? 1 : p.v === 1 ? 2 : 3)}</span>
                {p.label}
              </button>
            ))}
          </div>
        ) : (
          <label>
            String length <strong>{swing.length.toFixed(2)} m</strong>
            <input
              type="range"
              min={0.25}
              max={2}
              step={0.25}
              value={swing.length}
              onChange={(e) => onSwing({ ...swing, length: Number(e.target.value) })}
            />
          </label>
        )}
        {age === "10-14" && (
          <label>
            Amplitude <strong>{swing.amplitude}°</strong>
            <input
              type="range"
              min={1}
              max={10}
              value={swing.amplitude}
              onChange={(e) => onSwing({ ...swing, amplitude: Number(e.target.value) })}
            />
          </label>
        )}
        <p>
          A gentle swing on Earth. The drawing uses a display scale; the period comes from the
          physical length.
        </p>
      </>
    );
  return (
    <>
      <h3>Let there be colour.</h3>
      {(["red", "green", "blue"] as const).map((c) =>
        age === "4-6" ? (
          <button
            className={`light-toggle ${c}`}
            key={c}
            aria-pressed={light[c] > 0}
            onClick={() => onLight({ ...light, [c]: light[c] ? 0 : 255 })}
          >
            <span className={`colour-dot ${c}`} />
            {c} light <strong>{light[c] ? "On" : "Off"}</strong>
          </button>
        ) : (
          <label key={c}>
            <span className={`colour-dot ${c}`} />
            {c} channel <strong>{light[c]}</strong>
            <input
              type="range"
              min={0}
              max={255}
              value={light[c]}
              onChange={(e) => onLight({ ...light, [c]: Number(e.target.value) })}
            />
          </label>
        ),
      )}
      <p>We’re mixing light on a screen, not paint. These behave differently.</p>
    </>
  );
}
