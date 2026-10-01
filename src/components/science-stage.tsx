import {
  projectile,
  pendulum,
  additive,
  type Lab,
  type Motion,
  type Pendulum,
  type Light,
} from "@/lib/science";
export function ScienceStage({
  lab,
  motion,
  swing,
  light,
  time,
  showPath,
}: {
  lab: Lab;
  motion: Motion;
  swing: Pendulum;
  light: Light;
  time: number;
  showPath: boolean;
}) {
  if (lab === "light") {
    const c = additive(light);
    return (
      <svg viewBox="0 0 660 390" role="img" aria-label={`Mixed light colour ${c.hex}`}>
        <rect width="660" height="390" rx="22" fill="#243830" />
        <g style={{ mixBlendMode: "screen" }}>
          <circle cx="280" cy="150" r="98" fill={`rgb(${light.red},0,0)`} />
          <circle cx="380" cy="150" r="98" fill={`rgb(0,${light.green},0)`} />
          <circle cx="330" cy="239" r="98" fill={`rgb(0,0,${light.blue})`} />
        </g>
        <text x="40" y="40" fill="#bdcabc" fontSize="11">
          ADDITIVE LIGHT · NOT PAINT
        </text>
        <rect x="470" y="324" width="155" height="40" rx="10" fill={c.css} />
        <text x="38" y="351" fill="white" fontSize="13">
          Red {light.red} · Green {light.green} · Blue {light.blue}
        </text>
      </svg>
    );
  }
  if (lab === "pendulum") {
    const p = pendulum(swing),
      a = p.angle(time),
      length = 80 + swing.length * 78,
      x = 330 + length * Math.sin(a),
      y = 67 + length * Math.cos(a);
    return (
      <svg
        viewBox="0 0 660 390"
        role="img"
        aria-label={`A ${swing.length} metre pendulum. Period ${p.period.toFixed(2)} seconds.`}
      >
        <rect width="660" height="390" rx="22" fill="#f0e9dc" />
        <path d="M100 65H560" stroke="#9bab94" strokeWidth="12" strokeLinecap="round" />
        <path d="M330 65V335" stroke="#b7c1ab" strokeDasharray="4 6" />
        <path d={`M330 65L${x} ${y}`} stroke="#647b60" strokeWidth="4" />
        <circle cx="330" cy="65" r="9" fill="#486143" />
        <circle cx={x} cy={y} r="26" fill="#e19f73" />
        <circle cx={x - 7} cy={y - 8} r="6" fill="#f4c6a0" />
        <text x="35" y="35" fill="#5b7256" fontSize="11">
          SMALL SWINGS · NO FRICTION
        </text>
        <text x="35" y="353" fill="#536a4c" fontSize="13">
          Length {swing.length.toFixed(2)} m
        </text>
        <text x="445" y="353" fill="#536a4c" fontSize="13">
          One full swing: {p.period.toFixed(2)} s
        </text>
        <path d="M278 330Q330 351 382 330" fill="none" stroke="#a7b292" strokeWidth="2" />
      </svg>
    );
  }
  const moon = projectile({ ...motion, gravity: 1.62 }),
    earth = projectile({ ...motion, gravity: 9.81 }),
    scale = Math.min(560 / Math.max(15, moon.range * 1.12), 240 / Math.max(1, moon.height)),
    maxX = 560 / scale,
    base = 322;
  const path = (m: ReturnType<typeof projectile>) =>
    Array.from({ length: 61 }, (_, i) => {
      const p = m.point((m.duration * i) / 60);
      return `${i ? "L" : "M"}${45 + p.x * scale},${base - p.y * scale}`;
    }).join(" ");
  const point = (m: ReturnType<typeof projectile>) => {
    const p = m.point(time);
    return { x: 45 + p.x * scale, y: base - p.y * scale };
  };
  const e = point(earth),
    m = point(moon);
  return (
    <svg
      viewBox="0 0 660 390"
      role="img"
      aria-label={`Equal launches: Earth range ${earth.range.toFixed(1)} metres; Moon range ${moon.range.toFixed(1)} metres. Shared scale.`}
    >
      <defs>
        <pattern id="lab-grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#c6cfb8" />
        </pattern>
      </defs>
      <rect width="660" height="390" rx="22" fill="#edf1e4" />
      <rect width="660" height="320" fill="url(#lab-grid)" />
      <path d="M30 323H630" stroke="#9eae8c" strokeWidth="2" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <path d={`M${45 + i * 140} 322v7`} stroke="#839575" />
          <text x={45 + i * 140} y="350" textAnchor="middle" fill="#677a5c" fontSize="10">
            {((maxX * i) / 4).toFixed(0)} m
          </text>
        </g>
      ))}
      {showPath && (
        <>
          <path d={path(moon)} stroke="#c68d28" fill="none" strokeWidth="2" strokeDasharray="5 6" />
          <path
            d={path(earth)}
            stroke="#668979"
            fill="none"
            strokeWidth="2"
            strokeDasharray="4 5"
          />
        </>
      )}
      <circle cx={m.x} cy={m.y} r="13" fill="#f3bf4e" stroke="#c48b22" strokeWidth="2" />
      <circle cx={e.x} cy={e.y} r="10" fill="#648c77" stroke="#436951" strokeWidth="2" />
      <text x="36" y="34" fontSize="11" fill="#5d7254">
        SAME PUSH · TWO WORLDS · SHARED SCALE
      </text>
      <circle cx="445" cy="30" r="5" fill="#648c77" />
      <text x="457" y="34" fontSize="11" fill="#4f6651">
        Earth
      </text>
      <circle cx="530" cy="30" r="5" fill="#f3bf4e" />
      <text x="542" y="34" fontSize="11" fill="#4f6651">
        Moon
      </text>
      <text x="35" y="378" fontSize="10" fill="#6d7a66">
        Flat ground · Constant gravity · No air resistance
      </text>
    </svg>
  );
}
