import { ProjectRoom } from "./project-room";

export const metadata = {
  title: "Lior Lev — Project Room",
  description: "Six captioned walkthroughs: SLOT, LABSPACE and SIGNBRIDGE, in English and French.",
};

export default function Page() {
  return (
    <article className="wrap prose">
      <p className="eyebrow">LIOR LEV / PORTFOLIO</p>
      <h1>
        Three projects.
        <br />
        One place to explore.
      </h1>
      <p>
        Choose a project and press Play. English overviews for a first look; French explanations for
        learning. These videos stay available when the developer’s computer is off.
      </p>
      <ProjectRoom />
    </article>
  );
}
