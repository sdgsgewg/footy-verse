import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Navbar from "@/components/layout/navbar/Navbar";
import Footer from "@/components/layout/footer/Footer";
import PageWrapper from "@/components/wrappers/PageWrapper";
import Providers from "./providers";
import { createClient } from "@/utils/supabase/server";

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

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile = null;

  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    profile = data;
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        // className="min-h-full flex flex-col"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Providers initialUser={user} initialProfile={profile}>
            <Navbar />
            <main className="content flex-1 min-h-screen">
              <PageWrapper>{children}</PageWrapper>
            </main>
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
