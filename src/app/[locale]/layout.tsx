import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Providers from "./providers";
import { getCurrentAuth } from "@/lib/auth/current-auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FootyVerse",
  description: "The best website for football lovers",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  const { user, profile } = await getCurrentAuth();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Providers initialUser={user} initialProfile={profile}>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
