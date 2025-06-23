import type { ProjectInfo } from "../ProjectDescription";
import FamilyLynkDiffrance from "./diffrence";

const Data: ProjectInfo = {
  name: "Familylynk",
  shortDescription: "family organization app",
  description:
    "FamiLynk is a web application built with Next.js and TypeScript that helps organize family life. The app allows family members to share various types of information, such as calendars, notes, chores, and recipes.",
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
      category: "website link",
      value: (
        <a
          style={{ textDecoration: "underline" }}
          href="https://hakhiros.vercel.app/"
        >
          hakhiros.vercel.app
        </a>
      ),
    },
    {
      category: "source code",
      value: (
        <a
          style={{ textDecoration: "underline" }}
          href="https://github.com/Yndh/FamiLynk"
        >
          github.com/Yndh/FamiLynk
        </a>
      ),
    },
    {
      category: "started",
      value: "October 2023",
    },
    {
      category: "ended",
      value: "November 2023",
    },
    {
      category: "team size",
      value: "4",
    },
  ],
  techStack: [
    { name: "TypeScript", color: "220, 38, 38" },
    { name: "Next.js", color: "5, 150, 105" },
    { name: "React", color: "5, 150, 105" },
    { name: "Prisma", color: "5, 150, 105" },
    { name: "next-auth", color: "5, 150, 105" },
    { name: "Docker", color: "109, 40, 217" },
    { name: "PostgreSQL", color: "109, 40, 217" },
  ],
  images: [
    "/familylynk/image1.png",
    "/familylynk/image2.png",
    "/familylynk/image3.png",
    "/familylynk/image4.png",
    "/familylynk/image5.png",
  ],
  additionalSections: [
    {
      title: "What would I do diffrently",
      content: <FamilyLynkDiffrance />,
    },
  ],
};

export { Data as FamilyLynkData };
