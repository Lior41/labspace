import Link from "next/link";
export default function Page() {
  return (
    <section className="wrap prose">
      <p className="eyebrow">AN UNDISCOVERED CORNER</p>
      <h1>
        This experiment
        <br />
        isn’t here yet.
      </h1>
      <Link className="button primary" href="/explore">
        Explore our available labs ↗
      </Link>
    </section>
  );
}
