import JajoWallDiffrances from "./Diffrance";
import type { ProjectInfo } from "../ProjectDescription";
import { useTranslation } from "react-i18next";

const useJajoWallData = (): ProjectInfo => {
  const { t } = useTranslation();

  return {
    name: "jajowall",
    shortDescription: t("projects.jajowall.shortDescription"),
    description: t("projects.jajowall.description"),
    information: [
      {
        category: t("projects.categories.status"),
        value: t("projects.status.archived"),
      },
      {
        category: t("projects.categories.type"),
        value: t("projects.types.desktopApplication"),
      },
      {
        category: t("projects.categories.sourceCode"),
        value: (
          <a
            href="https://github.com/Qlesuga/jajowall"
            className="text-blue-500"
          >
            github.com/Qlesuga/jajowall
          </a>
        ),
      },
      {
        category: t("projects.categories.started"),
        value: `${t("months.short.2")} 2023`,
      },
      {
        category: t("projects.categories.ended"),
        value: `${t("months.short.4")} 2023`,
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
        title: t("projects.sections.whatWouldIDoMoshaicly"),
        content: <JajoWallDiffrances />,
      },
    ],
  };
};

export { useJajoWallData as JajoWallData };
