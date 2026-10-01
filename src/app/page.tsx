import Link from "next/link";
import { ArrowRight, Heart, ShieldCheck, Volume2, MoveUpRight } from "lucide-react";
import { LabArt } from "@/components/lab-art";
export default function Page() {
  return (
    <>
      <section className="hero wrap">
        <div>
          <p className="eyebrow">
            <span className="tiny-star">✳</span> A LITTLE WONDER, SHARED
          </p>
          <h1>
            Big discoveries.
            <br />
            Little hands.
            <br />
            <em>Time together.</em>
          </h1>
          <p className="lead">
            A playful science lab for curious kids
            <br />
            and their favourite grown-ups.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/explore">
              Let’s explore together <ArrowRight size={20} />
            </Link>
            <Link className="text-link" href="/how-it-works">
              Take a look inside ↗
            </Link>
          </div>
          <div className="trust">
            <span>
              <ShieldCheck size={15} /> No account needed
            </span>
            <span>
              <Heart size={15} /> Ages 4–14
            </span>
          </div>
        </div>
        <div className="hero-illustration">
          <div className="paper-note">
            TODAY’S BIG QUESTION
            <br />
            <strong>
              Could I jump higher
              <br />
              on the Moon?
            </strong>
            <span>Let’s find out ↴</span>
          </div>
          <LabArt />
          <div className="art-sticker">
            Small experiments.
            <br />
            <strong>Wonderful conversations.</strong>
          </div>
        </div>
      </section>
      <div className="principles">
        <span>✳ WONDER OUT LOUD</span>
        <span>✳ TRY SOMETHING NEW</span>
        <span>✳ LEARN BY DOING</span>
        <span>✳ MAKE IT A MOMENT</span>
      </div>
      <section className="wrap section">
        <div className="section-title">
          <div>
            <p className="eyebrow">PICK YOUR FIRST “WHAT IF?”</p>
            <h2>A world of little wonders.</h2>
          </div>
          <p>
            No special equipment. No right first guesses.
            <br />
            Just a question and a few minutes together.
          </p>
        </div>
        <div className="lab-grid">
          {(
            [
              {
                kind: "motion",
                name: "Moon jump",
                tag: "MOTION & GRAVITY",
                copy: "Same little ball. Two different worlds. Which one lets it travel farther?",
                time: "5–8 min",
              },
              {
                kind: "pendulum",
                name: "Find your rhythm",
                tag: "SWINGS & PATTERNS",
                copy: "A short string, a long string. Let’s listen with our eyes and count together.",
                time: "4–6 min",
              },
              {
                kind: "light",
                name: "A little light magic",
                tag: "LIGHT & COLOUR",
                copy: "Mix three coloured lights and discover a whole new rainbow.",
                time: "4–6 min",
              },
            ] as const
          ).map((l) => (
            <Link className={`lab-card ${l.kind}`} key={l.kind} href={`/explore/${l.kind}`}>
              <div className="lab-card-art">
                <LabArt kind={l.kind} />
                <span className="time-pill">{l.time}</span>
              </div>
              <div className="lab-card-copy">
                <p className="eyebrow">{l.tag}</p>
                <h3>
                  {l.name}
                  <MoveUpRight size={20} />
                </h3>
                <p>{l.copy}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="family wrap">
        <div>
          <p className="eyebrow">YOU DON’T NEED ALL THE ANSWERS</p>
          <h2>
            “I wonder…”
            <br />
            is a perfect start.
          </h2>
        </div>
        <div>
          <p className="lead">
            We’ll give you the questions. Your child brings the curiosity. Together, you get to find
            out.
          </p>
          <div className="family-features">
            <span>
              <Heart /> Made for shared moments
            </span>
            <span>
              <Volume2 /> Read or listen together
            </span>
            <span>
              <ShieldCheck /> No ads. No public profiles.
            </span>
          </div>
          <Link className="text-link" href="/grown-ups">
            A note for grown-ups <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
