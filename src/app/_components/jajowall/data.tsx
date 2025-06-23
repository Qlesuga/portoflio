import BajoJajoSrDiffrances from "../bajojajoSr/diffrance";
import type { ProjectInfo } from "../ProjectDescription";

const Data: ProjectInfo = {
  name: "BajoJajo Sr",
  shortDescription: "twitch song request",
  description:
    "BajoJajo SR is a lightweight, open-source Twitch bot designed to handle song requests during livestreams. Built with simplicity and efficiency in mind, it allows both viewers and moderators to manage music playback with a set of easy-to-use chat commands.",
  information: [
    {
      category: "status",
      value: "Maintenance",
    },
    {
      category: "type",
      value: "Web Application",
    },
    {
      category: "source code",
      value: (
        <a
          style={{ textDecoration: "underline" }}
          href="https://github.com/Qlesuga/BajoJajo_Sr"
        >
          github.com/Qlesuga/bajojajo_sr
        </a>
      ),
    },
    {
      category: "started",
      value: "Jan 2025",
    },
  ],
  techStack: [
    { name: "TypeScript", color: "220, 38, 38" },
    { name: "Python", color: "220, 38, 38" },
    { name: "Next.js", color: "5, 150, 105" },
    { name: "FastAPI", color: "5, 150, 105" },
    { name: "React", color: "5, 150, 105" },
    { name: "yt-dlp", color: "5, 150, 105" },
    { name: "Prisma", color: "5, 150, 105" },
    { name: "tRPC", color: "5, 150, 105" },
    { name: "next-auth", color: "5, 150, 105" },
    { name: "Docker", color: "109, 40, 217" },
    { name: "Redis", color: "109, 40, 217" },
    { name: "PostgreSQL", color: "109, 40, 217" },
  ],
  images: [
    "/bajojajosr/image1.png",
    "/bajojajosr/image2.png",
    "/bajojajosr/image3.png",
  ],
  additionalSections: [
    {
      title: "What would I do diffrently",
      content: <BajoJajoSrDiffrances />,
    },
  ],
};

export { Data as JajoWallData };
