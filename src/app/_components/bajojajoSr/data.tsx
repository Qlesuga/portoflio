import BajoJajoSrDiffrances from "../bajojajoSr/diffrance";
import type { ProjectInfo } from "../ProjectDescription";
import { useTranslation } from "react-i18next";

function useBajoJajoSrData(): ProjectInfo {
  const { t } = useTranslation();

  return {
    name: t("projects.bajojajosr.name"),
    shortDescription: "twitch song request",
    description: t("projects.bajojajosr.description"),
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
        category: t("projects.categories.sourceCode"),
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
        category: t("projects.categories.started"),
        value: `${t("months.short.1")} 2025`,
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
        title: t("projects.sections.whatWouldIDoMoshaicly"),
        content: <BajoJajoSrDiffrances />,
      },
    ],
  };
}

export { useBajoJajoSrData as BajoJajoSr };
