"use client";
export default function Page({ reset }: { reset: () => void }) {
  return (
    <section className="wrap prose">
      <h1>A little pause.</h1>
      <p>We couldn’t open this experiment. Your saved notebook has not been cleared.</p>
      <button className="button primary" onClick={reset}>
        Try again
      </button>
    </section>
  );
}
