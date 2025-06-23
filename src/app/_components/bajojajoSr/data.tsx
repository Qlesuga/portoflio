import JajoWallDiffrances from "../jajowall/diffrance";
import type { ProjectInfo } from "../ProjectDescription";

const Data: ProjectInfo = {
  name: "JajoWall",
  shortDescription: "wallpaper manipulator",
  description:
    "JajoWall is simple wallpaper manager that allows user to set .mp4/.gif files as wallpaper with audio support. Nothing more, nothing less",
  information: [
    {
      category: "status",
      value: "Archived",
    },
    {
      category: "type",
      value: "Desktop Application",
    },
    {
      category: "source code",
      value: (
        <a
          style={{ textDecoration: "underline" }}
          href="https://github.com/Qlesuga/jajowall"
        >
          github.com/Qlesuga/jajowall
        </a>
      ),
    },
    {
      category: "started",
      value: "Febuary 2023",
    },
    {
      category: "ended",
      value: "April 2023",
    },
  ],
  techStack: [
    { name: "python", color: "220, 38, 38" },
    { name: "PyQt6", color: "5, 150, 105" },
    { name: "windowsAPI", color: "5, 150, 105" },
    { name: "pywin32", color: "5, 150, 105" },
    { name: "opencv", color: "5, 150, 105" },
    { name: "Spy++", color: "109, 40, 217" },
  ],
  images: ["/jajowall.gif"],
  additionalSections: [
    {
      title: "What would I do diffrently",
      content: <JajoWallDiffrances />,
    },
  ],
};

export { Data as BajoJajoSr };
