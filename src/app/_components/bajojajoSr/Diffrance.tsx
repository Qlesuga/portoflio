import { useTranslation } from "react-i18next";

export default function BajoJajoSrDiffrances() {
  const { t } = useTranslation();

  return (
    <ol className="list-disc space-y-1 ml-8 text-base">
      <li>{t("projects.bajojajosr.differences.item1")}</li>
      <li>{t("projects.bajojajosr.differences.item2")}</li>
    </ol>
  );
}
