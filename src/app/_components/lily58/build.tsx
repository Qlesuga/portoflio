import { Trans, useTranslation } from "react-i18next";

export default function BuildFeatures() {
  const { t } = useTranslation();
  return (
    <ul className="list-disc space-y-1 ml-8 text-base">
      <li>{t("projects.lily58.build.item1")}</li>
      <li>{t("projects.lily58.build.item2")}</li>
      <li>{t("projects.lily58.build.item3")}</li>
      <li>
        <Trans i18nKey="projects.lily58.build.item4">
          low-profiel PBT keycaps from
          <a
            href="https://keychronpoland.com/products/low-profile-dye-sub-pbt-lsa-full-set-keycap-set?variant=49016078795081"
            target="_blank"
            className="text-blue-500"
          >
            keychron
          </a>
        </Trans>
      </li>
      <li>{t("projects.lily58.build.item5")}</li>
    </ul>
  );
}
