"use client";

import i18n from "i18next";
import { permission } from "process";
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
        months: {
          long: {
            1: "January",
            2: "February",
            3: "March",
            4: "April",
            5: "May",
            6: "June",
            7: "July",
            8: "August",
            9: "September",
            10: "October",
            11: "November",
            12: "December",
          },
          short: {
            1: "Jan",
            2: "Feb",
            3: "Mar",
            4: "Apr",
            5: "May",
            6: "Jun",
            7: "Jul",
            8: "Aug",
            9: "Sep",
            10: "Oct",
            11: "Nov",
            12: "Dec",
          },
        },
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
              "Languages I've played around with in smaller projects",
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
        projects: {
          status: {
            archived: "Archived",
            maintenance: "Maintenance",
            active: "Active",
            development: "In Development",
            completed: "Completed",
          },
          clickOnImage: "Click on image above to make it bigger",
          categories: {
            status: "status",
            type: "type",
            websiteLink: "website link",
            sourceCode: "source code",
            started: "started",
            ended: "ended",
            teamSize: "team size",
            schema: "schema",
          },
          types: {
            desktopApplication: "Desktop Application",
            webApplication: "Web Application",
            mobileApplication: "Mobile Application",
            library: "Library",
            tool: "Tool",
            hardware: "Hardware Project",
          },
          sections: {
            whatWouldIDoMoshaicly: "What would I do differently",
            technologyUsed: "Technology used",
          },
          jajowall: {
            shortDescription: "wallpaper manipulator",
            description:
              "JajoWall is simple wallpaper manager that allows user to set .mp4/.gif files as wallpaper with audio support. Nothing more, nothing less",
            differences: {
              item1:
                "Choose C# or C over Python for low-level API interactions – Python wasn't the best fit for low-level tasks. In the future, I'd prefer using a more suitable language like C# or C.",
              item2:
                "Design a better UI – The user interface could have been much more polished.",
            },
          },
          familylynk: {
            shortDescription: "family organization app",
            description:
              "FamiLynk is a web application built with Next.js and TypeScript that helps organize family life. The app allows family members to share various types of information, such as calendars, notes, chores, and recipes.",
            differences: {
              item1:
                "Use Convex for real-time data synchronization – It's just the right tool for the job. (Credits to <1>Theo</1> for showcasing it.)",
              item2:
                "Leverage authentication providers instead of manual credentials – More secure, with built-in features like automatic email verification.",
              item3:
                "Avoid deeply passing props; use React Context or Redux – Makes the codebase cleaner and more maintainable.",
              item4:
                "Use React Suspense for loading states instead of blocking the entire page – Results in a smoother and more responsive user experience.",
              item5:
                "Pre-fetch all data needed for rendering a category upfront – Although it may increase initial load time, it dramatically improves perceived performance and overall UX. Learned this from <1>Theo's</1> (yep, this guy again) while working on ping.gg.",
              item6:
                "Use tRPC in Next.js apps – Type-safe, end-to-end communication between frontend and backend is a game-changer.",
            },
          },
          bajojajosr: {
            description:
              "BajoJajo SR is a lightweight, open-source Twitch bot designed to handle song requests during livestreams. Built with simplicity in mind, it allows both viewers and moderators to manage music playback with a set of easy-to-use chat commands.",
            differences: {
              item1:
                "Start with the riskiest part first – I would begin with integrating the YouTube API and deploying it on the server early, to identify potential blockers upfront. YouTube's anti-bot measures forced me to make poor architectural decisions and switch implementations multiple times.",
              item2:
                "Research libraries more thoroughly – The yt-dlp JavaScript library turned out to be a poor choice. It lacked support for setting cookies, which is essential to bypass YouTube's detection. If I had done better research, I would have used the official yt-dlp Python implementation from the start.",
            },
            commands: {
              title: "Command List",
              list: {
                sr: {
                  param: "video id or url",
                  permission: "None",
                  description: "Add song to song queue",
                },
                voteskip: {
                  param: "None",
                  permission: "None",

                  description: "Vote on skipping current song",
                },
                skip: {
                  param: "None",
                  permission: "None",

                  description: "Same as !voteskip",
                },
                current: {
                  param: "None",
                  permission: "None",

                  description: "Write name of current song in chat",
                },
                queue: {
                  param: "None",
                  permission: "None",

                  description: "Send link to song queue",
                },
                whenmysr: {
                  param: "None",
                  permission: "None",

                  description: "Respond with the time your song will be played",
                },
                forceskip: {
                  param: "None",
                  permission: "Moderator",
                  description: "skips current song",
                },
                play: {
                  param: "None",
                  permission: "Moderator",

                  description: "starts player",
                },
                stop: {
                  param: "None",
                  permission: "Moderator",

                  description: "stops player",
                },
                volume: {
                  param: "volume in percentage",
                  permission: "Moderator",

                  description: "changes volume of player",
                },
                clear: {
                  param: "None",
                  permission: "Broadcaster",
                  description: "clears song queue",
                },
                sron: {
                  param: "None",
                  permission: "Broadcaster",

                  description: "turns on song request (every command)",
                },
                sroff: {
                  param: "None",
                  permission: "Broadcaster",

                  description: "turns off song request (every command)",
                },
                srping: {
                  param: "None",
                  permission: "None",
                  description: "Checks if bot is working",
                },
              },
            },
          },
          lily58: {
            shortDescription: "custom keyboard",
            description:
              "This project is a fully customized build of the Lily58, a 58-key, open-source split ergonomic mechanical keyboard designed for comfort, portability, and programmability. The goal was to create a personalized keyboard setup perfect for me for daily use in programmingand and good enought compability while gaming.",
            build: {
              item1: "Hot-swap Lily58 Pro PCBs",
              item2: "Dual NTRF52840 for Bluetooth wireless support",
              item3: "Akko Penguin Silent switches",
              item4: "low-profiel PBT keycaps from <1>keychron</1>",
              item5:
                "Dual nice!view for layer/battery status and cool spining diamond",
            },
          },
        },
      },
    },
    pl: {
      translation: {
        months: {
          long: {
            1: "Styczeń",
            2: "Luty",
            3: "Marzec",
            4: "Kwiecień",
            5: "Maj",
            6: "Czerwiec",
            7: "Lipiec",
            8: "Sierpień",
            9: "Wrzesień",
            10: "Październik",
            11: "Listopad",
            12: "Grudzień",
          },
          short: {
            1: "Sty",
            2: "Lut",
            3: "Mar",
            4: "Kwi",
            5: "Maj",
            6: "Cze",
            7: "Lip",
            8: "Sie",
            9: "Wrz",
            10: "Paź",
            11: "Lis",
            12: "Gru",
          },
        },
        skills: {
          title: "Umiejętności",
          proficient: {
            title: "Języki Programowania w których jestem biegły",
            description:
              "Języki, których używałem w większych projektach i mam z nimi praktyczne doświadczenie",
          },
          familiar: {
            title: "Języki, z którymi jestem zaznajomiony",
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
        projects: {
          status: {
            archived: "Zarchiwizowany",
            maintenance: "Konserwacja",
            active: "Aktywny",
            development: "W trakcie rozwoju",
            completed: "Skończony",
          },
          categories: {
            status: "status",
            type: "typ",
            websiteLink: "link do strony",
            sourceCode: "kod źródłowy",
            started: "rozpoczęcie",
            ended: "zakończenie",
            teamSize: "wielkość zespołu",
            schema: "schemat",
          },
          types: {
            desktopApplication: "Aplikacja Desktopowa",
            webApplication: "Aplikacja Webowa",
            mobileApplication: "Aplikacja Mobilna",
            library: "Biblioteka",
            tool: "Narzędzie",
            hardware: "Projekt Hardwarowy",
          },
          sections: {
            whatWouldIDoMoshaicly: "Co zrobiłbym inaczej",
            technologyUsed: "Użyte Technologie",
          },
          clickOnImage: "Kliknij na obraz powyżej by go powiększyć",
          jajowall: {
            shortDescription: "manipulator tapet",
            description:
              "JajoWall to prosty menedżer tapet, który pozwala użytkownikowi ustawić pliki .mp4/.gif jako tapetę z obsługą dźwięku. Nic więcej, nic mniej",
            differences: {
              item1:
                "Wybrałbym C# lub C zamiast Pythona do interakcji z niskopoziomowymi API – Python nie był najlepszym wyborem do zadań niskopoziomowych ponieważ nie takie jest jego główne zastosowanie. W przyszłości wolałbym użyć bardziej odpowiedniego języka jak C# lub C.",
              item2:
                "Zaprojektowałbym lepszy interfejs użytkownika – Interfejs mógł być znacznie bardziej dopracowany.",
            },
          },
          familylynk: {
            shortDescription: "aplikacja do organizacji życia rodzinnego",
            description:
              "FamiLynk to aplikacja webowa zbudowana w Next.js i TypeScript, która pomaga organizować życie rodzinne. Aplikacja pozwala członkom rodziny dzielić się różnymi informacjami, takimi jak kalendarze, notatki, obowiązki domowe i przepisy.",
            differences: {
              item1:
                "Użyłbym Convex do synchronizacji danych w czasie rzeczywistym – ktoś kiedyś powiedział 'use the right tool for the job', nie wiem kto ale staram się tego trzymać. (Podziękowania dla <1>Theo</1> za przedstawienie tego narzędzia.)",
              item2:
                "Wykorzystałbym dostawców uwierzytelniania zamiast ręcznych danych logowania – Bardziej bezpieczne, z wbudowanymi funkcjami jak automatyczna weryfikacja e-mail.",
              item3:
                "Unikałbym głębokiego przekazywania propsów; użyłbym React Context lub Redux – Sprawia, że kod jest czystszy i łatwiejszy w utrzymaniu.",
              item4:
                "Użyłbym React Suspense do stanów ładowania zamiast blokowania całej strony – Skutkuje płynniejszym i bardziej responsywnym doświadczeniem użytkownika.",
              item5:
                "Wstępnie pobrałbym wszystkie dane potrzebne do renderowania kategorii z góry – Chociaż może to zwiększyć początkowy czas ładowania, drastycznie poprawia postrzeganą wydajność i ogólne UX. Wziąłem te metode od <1>Theo</1> (tak, znowu ten gość) podczas pracy nad ping.gg.",
              item6:
                "Używałbym tRPC w aplikacjach Next.js – Type-safe, end-to-end komunikacja między frontendem a backendem jest super.",
            },
          },
          bajojajosr: {
            description:
              "BajoJajo SR to lekki, open-source bot Twitch zaprojektowany do obsługi próśb o piosenki podczas transmisji na żywo. Zbudowany z myślą o prostocie, pozwala zarówno widzom jak i moderatorom zarządzać odtwarzaniem muzyki za pomocą zestawu łatwych w użyciu komend czatu.",
            differences: {
              item1:
                "Zacząłbym od najbardziej ryzykownej części jako pierwszej – Rozpocząłbym od integracji YouTube API i zhostowania go na serwerze, aby zidentyfikować potencjalne blokady z góry. Walka anty-botowa YouTube zmusiły mnie do podejmowania złych decyzji podczas metod hostowania oraz wielokrotnej zmiany implementacji.",
              item2:
                "Dokładniej zbadałbym biblioteki – Biblioteka yt-dlp JavaScript okazała się złym wyborem. Brakowało jej wsparcia dla ustawiania cookies, co jest niezbędne do ominięcia wykrywania YouTube. Gdybym przeprowadził lepsze badania, użyłbym oficjalnej implementacji yt-dlp Python od początku.",
            },
            commands: {
              title: "Lista Komend",
              list: {
                sr: {
                  param: "id wideo albo url",
                  permission: "Żadne",
                  description: "Dodanie piosenki do kolejki",
                },
                voteskip: {
                  param: "Brak",
                  permission: "Żadne",
                  description: "Zagłosowanie na pominięcie piosenki",
                },
                skip: {
                  param: "Brak",
                  permission: "Żadne",
                  description: "To samo co !voteskip",
                },
                current: {
                  param: "Brak",
                  permission: "Żadne",
                  description: "Bot odpiwiada z nazwą aktualnej piosenki",
                },
                queue: {
                  param: "Brak",
                  permission: "Żadne",
                  description: "Bot wysyła link do kolejki",
                },
                whenmysr: {
                  param: "Brak",
                  permission: "Żadne",
                  description:
                    "Bot odpiwiada z czasem za ile twoja następna piosenka zostanie odtworzona ",
                },
                forceskip: {
                  param: "Brak",
                  permission: "Moderator",
                  description: "Wymusza pominięcie aktualnej piosenki",
                },
                play: {
                  param: "Brak",
                  permission: "Moderator",
                  description: "Puszcza odtwarzacz",
                },
                stop: {
                  param: "Brak",
                  permission: "Moderator",
                  description: "Zatrzymuje odtwarzacz",
                },
                volume: {
                  param: "głośność w procentach",
                  permission: "Moderator",
                  description: "Zmienia głośność odtwarzacza",
                },
                clear: {
                  param: "Brak",
                  permission: "Strimer",
                  description: "Czyści kolejke",
                },
                sron: {
                  param: "Brak",
                  permission: "Strimer",
                  description: "Włącza komendy song requesta",
                },
                sroff: {
                  param: "Brak",
                  permission: "Strimer",
                  description: "Wyłącza komendy song requesta",
                },
                srping: {
                  param: "Brak",
                  permission: "Żadne",
                  description: "Sprwadza czy bot jest odpalony na tym kanale",
                },
              },
            },
          },
          lily58: {
            shortDescription: "customowa klawiatura",
            description:
              "Ten projekt to w pełni spersonalizowana wersja Lily58 — 58-klawiszowej, open-source, split, ergonomicznej klawiatury mechanicznej zaprojektowanej z myślą o wygodzie, mobilności i możliwości programowania. Celem było stworzenie spersonalizowanych klawiatur idealnego do codziennego programowania oraz wystarczająco dobrych do grania.",
            build: {
              item1: "Hot-swap Lily58 Pro PCB",
              item2: "Podwójne NTRF52840 z wsparciem bluetooth",
              item3: "Akko Penguin Silent switche",
              item4: "nisko profilowe keycapy PBT od <1>keychrona</1>",
              item5:
                "Podwójne nice!view do wyświetlania warstw, baterii oraz fajnego kręconcego się kryształka",
            },
          },
        },
      },
    },
  },
});

export default i18n;
