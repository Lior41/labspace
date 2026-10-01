import Link from "next/link";
import { WalkthroughPlayer } from "@/components/walkthrough-player";

export default function Page() {
  return (
    <article className="wrap prose">
      <p className="eyebrow">A CLOSER LOOK</p>
      <h1>LABSPACE, explained.</h1>
      <p>Choose a language, then press Play. Written explanations appear inside the video.</p>
      <WalkthroughPlayer project="LABSPACE" />
      <p>
        <a href="https://lior-labspace.vercel.app/project-room">Watch all three projects ↗</a>
      </p>
      <Link className="button primary" href="/how-it-works">
        Explore the implementation ↗
      </Link>
    </article>
  );
}
