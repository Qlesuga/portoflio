import "~/styles/globals.css";

import { type Metadata } from "next";
import { Roboto, JetBrains_Mono } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Qłes PC",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="darkreader-lock" />
        <script src="https://hcaptcha.com/1/api.js" async defer />
      </head>
      <body className={`${roboto.variable} ${jetbrains.variable} dark`}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
