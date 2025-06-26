import React from "react";
import { useTranslation } from "react-i18next";

export default function Commands() {
  const { t } = useTranslation();

  const commands = [
    "sr",
    "voteskip",
    "skip",
    "current",
    "queue",
    "whenmysr",
    "forceskip",
    "srping",
    "play",
    "stop",
    "volume",
    "clear",
    "sron",
    "sroff",
  ];

  return (
    <div className="p-4 dark">
      <table className="min-w-full border ">
        <thead>
          <tr>
            <th className="border px-4 py-2">Command</th>
            <th className="border px-4 py-2">Param</th>
            <th className="border px-4 py-2">Permission</th>
            <th className="border px-4 py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {commands.map((cmd) => (
            <tr key={cmd}>
              <td className="border px-4 py-2">!{cmd}</td>
              <td className="border px-4 py-2">
                {t(`projects.bajojajosr.commands.list.${cmd}.param`)}
              </td>
              <td className="border px-4 py-2">
                {t(`projects.bajojajosr.commands.list.${cmd}.permission`)}
              </td>
              <td
                className="border px-4 py-2"
                dangerouslySetInnerHTML={{
                  __html: t(
                    `projects.bajojajosr.commands.list.${cmd}.description`,
                  ),
                }}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
