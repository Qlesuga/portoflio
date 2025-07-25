import type { ProjectInfo } from "../ProjectDescription";
import FamilyLynkDiffrance from "./Diffrence";
import { useTranslation } from "react-i18next";

const useFamilyLynkData = (): ProjectInfo => {
  const { t } = useTranslation();

  return {
    name: "FamilyLynk",
    shortDescription: t("projects.familylynk.shortDescription"),
    description: t("projects.familylynk.description"),
    information: [
      {
        category: t("projects.categories.status"),
        value: t("projects.status.maintenance"),
      },
      {
        category: t("projects.categories.type"),
        value: t("projects.types.webApplication"),
      },
      {
        category: t("projects.categories.websiteLink"),
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
        category: t("projects.categories.sourceCode"),
        value: (
          <a className="text-blue-500" href="https://github.com/Yndh/FamiLynk">
            github.com/Yndh/FamiLynk
          </a>
        ),
      },
      {
        category: t("projects.categories.otherDev"),
        value: (
          <a
            className="text-blue-500"
            href={t("projects.familylynk.yndhLink")}
            target="_blank"
          >
            yndh
          </a>
        ),
      },
      {
        category: t("projects.categories.started"),
        value: `${t("months.short.10")} 2023`,
      },
      {
        category: t("projects.categories.ended"),
        value: `${t("months.short.11")} 2023`,
      },
      {
        category: t("projects.categories.teamSize"),
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
      "/familylynk/image1.webp",
      "/familylynk/image2.webp",
      "/familylynk/image3.webp",
      "/familylynk/image4.webp",
      "/familylynk/image5.webp",
    ],
    additionalSections: [
      {
        title: t("projects.sections.whatWouldIDoMoshaicly"),
        content: <FamilyLynkDiffrance />,
      },
    ],
  };
};

export { useFamilyLynkData as FamilyLynkData };
