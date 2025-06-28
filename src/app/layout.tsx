import "~/styles/globals.css";

import { type Metadata } from "next";
import { Roboto, JetBrains_Mono } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

import { BotIdClient } from "botid/client";

export const metadata: Metadata = {
  title: "Qłes PC",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const protectedRoutes = [
  {
    path: "/api/trpc/email.sendEmial",
    method: "POST",
  },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="darkreader-lock" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <script src="https://hcaptcha.com/1/api.js" async defer />
        <BotIdClient protect={protectedRoutes} />
      </head>
      <body className={`${roboto.variable} ${jetbrains.variable} dark`}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
