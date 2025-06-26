import { useTranslation } from "react-i18next";

export default function JajoWallDiffrances() {
  const { t } = useTranslation();

  return (
    <ol className="list-disc ml-8 space-y-1 text-base">
      <li>{t("projects.jajowall.differences.item1")}</li>
      <li>{t("projects.jajowall.differences.item2")}</li>
    </ol>
  );
}
