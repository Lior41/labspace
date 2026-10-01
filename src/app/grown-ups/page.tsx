import Link from "next/link";
export default function Page() {
  return (
    <article className="wrap prose">
      <p className="eyebrow">A NOTE FOR GROWN-UPS</p>
      <h1>
        You bring the time.
        <br />
        We’ll bring the wonder.
      </h1>
      <p className="lead">
        LABSPACE is a virtual science playground for shared discoveries. It is a portfolio project,
        not a certified curriculum or a substitute for a teacher.
      </p>
      <div className="info-grid">
        <section>
          <h2>Little hands, ages 4–6</h2>
          <p>
            Stay together. Use big choices, read the question aloud and let your child make a guess.
            A local English device voice can read instructions when available.
          </p>
        </section>
        <section>
          <h2>Explorers, ages 7–10</h2>
          <p>
            Change one thing at a time. Ask what stayed the same. Talk about surprises without
            scoring guesses as failures.
          </p>
        </section>
        <section>
          <h2>Investigators, ages 10–14</h2>
          <p>
            Use measurements and compare predictions with model results. Explore the assumptions and
            equations on our science page.
          </p>
        </section>
      </div>
      <h2>A small digital footprint</h2>
      <p>
        No child accounts, public profiles, advertising or social messaging. Choose an age band, not
        a birth date. The notebook stays in your browser. Nothing in it is sent to the activity
        planner.
      </p>
      <h2>About “Create together”</h2>
      <p>
        The free-text planner is a grown-up space. Don’t include personal information. By default it
        selects prewritten activities without an AI request. If an operator explicitly enables the
        AI provider, your request is sent to that provider to select a module. Only a bounded module
        choice is accepted; the instructions are curated and the physics is calculated locally.
      </p>
      <h2>Real limits, clearly explained</h2>
      <p>
        All experiments are virtual. We leave out some real-world effects to keep the models
        understandable. Scientific references and assumptions are documented. We do not provide
        physical chemistry experiments or claim that the activities have been independently assessed
        by educators.
      </p>
      <h2>A moment, not a streak</h2>
      <p>
        There are no public rankings or daily streaks. An experiment has a natural end. Save a
        discovery, close the screen and keep the conversation going.
      </p>
      <Link className="button primary" href="/explore">
        Explore together ↗
      </Link>
    </article>
  );
}
