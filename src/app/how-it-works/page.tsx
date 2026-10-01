import Link from "next/link";
export default function Page() {
  return (
    <article className="wrap prose">
      <p className="eyebrow">CURIOUS ABOUT THE SCIENCE?</p>
      <h1>
        Playful on the outside.
        <br />
        Thoughtful underneath.
      </h1>
      <p className="lead">
        These experiments use deterministic calculations. The same inputs produce the same results.
        AI never controls the laws of physics.
      </p>
      <div className="architecture">
        Your idea → Validated activity → Scientific model → Observation
      </div>
      <h2>Motion Lab</h2>
      <p>
        We compare two launches with identical speed and angle. Constant gravity, equal launch and
        landing heights, no air resistance. Positions follow x = v cos(θ)t and y = v sin(θ)t − ½gt².
        The visual paths share a scale and stop at the calculated landing time.
      </p>
      <p>
        <a
          href="https://openstax.org/books/university-physics-volume-1/pages/4-3-projectile-motion"
          target="_blank"
          rel="noreferrer"
        >
          Reference: OpenStax — Projectile motion ↗
        </a>
      </p>
      <h2>Pendulum Lab</h2>
      <p>
        The small-angle approximation gives T = 2π√(L/g). The initial angle is limited to 10°. We
        omit friction and treat the bob as a point mass on a massless string. The visual string uses
        an illustrative display scale; its physical length determines the period.
      </p>
      <p>
        <a
          href="https://openstax.org/books/university-physics-volume-1/pages/15-4-pendulums"
          target="_blank"
          rel="noreferrer"
        >
          Reference: OpenStax — Pendulums ↗
        </a>
      </p>
      <h2>Light Lab</h2>
      <p>
        A bounded RGB screen model illustrates additive colour. It does not model light spectra,
        pigment mixing or linear physical intensity. The channels range from 0 to 255.
      </p>
      <p>
        <a
          href="https://www.physicsclassroom.com/class/light/Lesson-2/Color-Addition"
          target="_blank"
          rel="noreferrer"
        >
          Reference: The Physics Classroom — Colour addition ↗
        </a>
      </p>
      <h2>For the technically curious</h2>
      <p>
        Next.js serves the pages; focused React components handle interaction. Pure TypeScript
        functions calculate results and Zod validates inputs. The notebook is a versioned, validated
        local document. The optional AI route only accepts supported module/preset combinations and
        falls back transparently to curated activities.
      </p>
      <h2>A two-minute exploration</h2>
      <ol>
        <li>Open Moon jump for ages 4–6.</li>
        <li>Make a prediction, change the push and run the experiment.</li>
        <li>Switch to ages 10–14 to see the numerical controls and explanation.</li>
        <li>Save a discovery and reload the notebook.</li>
        <li>
          Ask the planner for an unsupported volcano experiment and observe the honest refusal.
        </li>
      </ol>
      <Link className="button primary" href="/explore/motion?age=4-6">
        Explore the demo ↗
      </Link>
    </article>
  );
}
