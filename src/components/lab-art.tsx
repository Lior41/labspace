export function LabArt({ kind = "motion" }: { kind?: "motion" | "pendulum" | "light" }) {
  return (
    <svg
      viewBox="0 0 540 360"
      role="img"
      aria-label={
        kind === "motion"
          ? "An illustrated ball following a curved path"
          : kind === "pendulum"
            ? "An illustrated pendulum"
            : "Three overlapping circles of coloured light"
      }
    >
      <defs>
        <pattern id={`dots-${kind}`} width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="currentColor" opacity=".14" />
        </pattern>
      </defs>
      <rect width="540" height="360" fill={`url(#dots-${kind})`} />
      {kind === "motion" ? (
        <>
          <ellipse cx="290" cy="301" rx="175" ry="17" fill="#d8dcce" />
          <path
            d="M 80 284 Q 255 -40 458 264"
            fill="none"
            stroke="#7184bf"
            strokeWidth="3"
            strokeDasharray="7 10"
          />
          <circle cx="258" cy="124" r="47" fill="#f7c458" />
          <circle cx="245" cy="110" r="12" fill="#ffdd86" />
          <path
            d="M239 140 Q257 153 275 140"
            fill="none"
            stroke="#695b36"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="243" cy="130" r="3" fill="#695b36" />
          <circle cx="272" cy="130" r="3" fill="#695b36" />
          <path d="M65 283 L105 283 L90 256 Z" fill="#7b97cd" />
          <path
            d="M452 287 V205 L485 215 L452 229"
            stroke="#e48161"
            fill="#e48161"
            strokeWidth="3"
          />
          <circle cx="417" cy="68" r="25" fill="#eee9d9" />
          <path d="M62 87h20m-10-10v20M355 205h14m-7-7v14" stroke="#91a18a" strokeWidth="2" />
          <text x="338" y="325" fill="#657864" fontSize="12" fontFamily="sans-serif">
            a little curiosity goes a long way
          </text>
        </>
      ) : kind === "pendulum" ? (
        <>
          <path d="M90 65h360" stroke="#738579" strokeWidth="12" strokeLinecap="round" />
          <path d="M270 65L202 270" stroke="#899781" strokeWidth="4" />
          <circle cx="202" cy="270" r="33" fill="#edaa78" />
          <path d="M185 270a17 17 0 0 0 34 0" fill="none" stroke="#915d47" strokeWidth="2" />
          <path d="M180 298Q270 345 360 295" stroke="#899781" fill="none" strokeDasharray="5 8" />
          <circle cx="270" cy="65" r="9" fill="#4c655c" />
        </>
      ) : (
        <>
          <rect x="55" y="25" width="430" height="310" rx="32" fill="#263830" />
          <g style={{ mixBlendMode: "screen" }}>
            <circle cx="232" cy="141" r="76" fill="red" />
            <circle cx="302" cy="141" r="76" fill="#00ff00" />
            <circle cx="267" cy="204" r="76" fill="blue" />
          </g>
          <text
            x="270"
            y="310"
            textAnchor="middle"
            fill="#dde4d8"
            fontSize="12"
            fontFamily="sans-serif"
          >
            LIGHT + LIGHT = SOMETHING NEW
          </text>
        </>
      )}
    </svg>
  );
}
