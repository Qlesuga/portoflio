"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        skills: {
          title: "Skills",
          proficient: {
            title: "Proficient Programming Languages",
            description:
              "Languages I've used in larger projects with hands-on experience",
          },
          familiar: {
            title: "Familiar Programming Languages",
            description:
              "Languages I’ve played around with in smaller projects",
          },
          libaries: {
            title: "Libraries/Frameworks",
            description:
              "Stuff I use to build things on the front-end, back-end, styling, you name it",
          },
          tools: {
            title: "Software/Tools",
            description:
              "Other software I use that doesn't fit in any categorie above",
          },
        },
        contact: {
          title: "Contact Form",
          description:
            "Have a question or want to get in touch? Fill out the form below or contact me directly, and I will get back to you as soon as possible.",
          form: {
            nameLabel: "Name",
            messageLabel: "Message",
            sendMessage: "Send Message",
          },
        },
        imageViewer: {
          title: "Image Viewer",
          imageSize: "image size",
          resizedImageSize: "resized image size",
          scale: "scale",
        },
        textEditor: {
          title: "Text Editor",
        },
      },
    },
    pl: {
      translation: {
        skills: {
          title: "Umiejętności",
          proficient: {
            title: "Języki Programowania w których jestem biegły",
            description:
              "Języki, których używałem w większych projektach i mam z nimi praktyczne doświadczenie",
          },
          familiar: {
            title: "Języki, z którymi miałem Styczność",
            description:
              "Języki, z którymi miałem styczność w mniejszych projektach",
          },
          libaries: {
            title: "Biblioteki/Frameworki",
            description:
              "Rzeczy, których używam do tworzenia aplikacji front-end, back-end, stylowanie, co sobie wymyśle",
          },
          tools: {
            title: "Oprogramowanie/Narzędzia",
            description:
              "Inne oprogramowania których używam które nie pasują do kategori powyżej",
          },
        },
        contact: {
          title: "Formularz Kontaktowy",
          description:
            "Masz pytanie lub chcesz się skontaktować? Wypełnij poniższy formularz lub skontaktuj się ze mną bezpośrednio, a odezwę się tak szybko, jak to możliwe.",
          form: {
            nameLabel: "Nazwa",
            messageLabel: "Wiadomość",
            sendMessage: "Wyślij Wiadomość",
          },
        },
        imageViewer: {
          title: "Przeglądarka obrazów",
          imageSize: "rozmiar obrazu",
          resizedImageSize: "rozmiar przeskalowanego obrazu",
          scale: "skala",
        },
        textEditor: {
          title: "Edytor Tekstu",
        },
      },
    },
  },
});

export default i18n;
