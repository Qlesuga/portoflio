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
  subsets: ["latin", "latin-ext"],
  variable: "--font-roboto",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
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
        <BotIdClient protect={protectedRoutes} />
      </head>
      <body className={`${roboto.variable} ${jetbrains.variable} dark`}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
