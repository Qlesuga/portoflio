export default function FamilyLynkDiffrance() {
  return (
    <ol className="list-disc ml-8 text-base">
      <li>
        Use Convex for real-time data synchronization – {"It's"} just the right
        tool for the job. (Credits to{" "}
        <a
          href="https://www.youtube.com/@t3dotgg"
          target="_blank"
          className="text-blue-500"
        >
          Theo
        </a>{" "}
        for showcasing it.)
      </li>
      <li>
        Leverage authentication providers instead of manual credentials – More
        secure, with built-in features like automatic email verification.
      </li>
      <li>
        Avoid deeply passing props; use React Context or Redux – Makes the
        codebase cleaner and more maintainable.
      </li>
      <li>
        Use React Suspense for loading states instead of blocking the entire
        page – Results in a smoother and more responsive user experience.
      </li>
      <li>
        Pre-fetch all data needed for rendering a category upfront – Although it
        may increase initial load time, it dramatically improves perceived
        performance and overall UX. Learned this from{" "}
        <a
          href="https://www.youtube.com/@t3dotgg"
          target="_blank"
          className="text-blue-500"
        >
          {"Theo's"}
        </a>
        {" (yep, this guy again) "}
        while working on ping.gg.
      </li>
      <li>
        Use tRPC in Next.js apps – Type-safe, end-to-end communication between
        frontend and backend is a game-changer.
      </li>
    </ol>
  );
}
