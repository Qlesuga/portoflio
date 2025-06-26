import type { ProjectInfo } from "../ProjectDescription";
import { useTranslation } from "react-i18next";

const useLily58Data = (): ProjectInfo => {
  const { t } = useTranslation();

  return {
    name: "lily58",
    shortDescription: t("projects.lily58.shortDescription"),
    description: t("projects.lily58.description"),
    information: [
      {
        category: t("projects.categories.status"),
        value: t("projects.status.completed"),
      },
      {
        category: t("projects.categories.type"),
        value: t("projects.types.hardware"),
      },
      {
        category: t("projects.categories.schema"),
        value: (
          <a
            style={{ textDecoration: "underline" }}
            href="https://github.com/kata0510/Lily58"
          >
            github.com/kata0510/Lily58
          </a>
        ),
      },
      {
        category: t("projects.categories.started"),
        value: `${t("months.short.12")} 2024`,
      },
      {
        category: t("projects.categories.ended"),
        value: `${t("months.short.1")} 2025`,
      },
    ],
    techStack: [{ name: "zmk", color: "109, 40, 217" }],
    images: ["/lily58.png"],
    additionalSections: [],
  };
};

export { useLily58Data as lily58Data };
