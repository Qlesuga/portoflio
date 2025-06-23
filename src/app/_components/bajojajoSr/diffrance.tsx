export default function BajoJajoSrDiffrances() {
  return (
    <ol className="list-disc ml-8 text-base">
      <li>
        Start with the riskiest part first – I would begin with integrating the
        YouTube API and deploying it on the server early, to identify potential
        blockers upfront. YouTube’s anti-bot measures forced me to make poor
        architectural decisions and switch implementations multiple times.
      </li>
      <li>
        Research libraries more thoroughly – The yt-dlp JavaScript library
        turned out to be a poor choice. It lacked support for setting cookies,
        which is essential to bypass {"YouTube's"} detection. If I had done
        better research, I would have used the official yt-dlp Python
        implementation from the start.
      </li>
    </ol>
  );
}
