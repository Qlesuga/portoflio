import { Trans, useTranslation } from "react-i18next";

export default function FamilyLynkDiffrance() {
  const { t } = useTranslation();

  return (
    <ol className="list-disc ml-8 text-base">
      <li>
        <Trans i18nKey="projects.familylynk.differences.item1">
          Use Convex for real-time data synchronization – It&apos;s just the
          right tool for the job. (Credits to
          <a
            href="https://www.youtube.com/@t3dotgg"
            target="_blank"
            className="text-blue-500"
          >
            Theo
          </a>
          for showcasing it.)
        </Trans>
      </li>
      <li>{t("projects.familylynk.differences.item2")}</li>
      <li>{t("projects.familylynk.differences.item3")}</li>
      <li>{t("projects.familylynk.differences.item4")}</li>
      <li>
        <Trans i18nKey="projects.familylynk.differences.item5">
          Wstępnie pobrałbym wszystkie dane potrzebne do renderowania kategorii
          z góry – Chociaż może to zwiększyć początkowy czas ładowania,
          drastycznie poprawia postrzeganą wydajność i ogólne UX. Nauczyłem się
          tego od
          <a
            href="https://www.youtube.com/@t3dotgg"
            target="_blank"
            className="text-blue-500"
          >
            Theo
          </a>
          (tak, znowu ten gość) podczas pracy nad ping.gg.
        </Trans>
      </li>
      <li>{t("projects.familylynk.differences.item6")}</li>
    </ol>
  );
}
