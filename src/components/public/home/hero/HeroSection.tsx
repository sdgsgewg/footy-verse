"use client";

import { useTranslations } from "next-intl";
import HeroSearch from "./search/HeroSearch";
import HeroStatistics from "./HeroStatistics";

const HeroSection = () => {
  const t = useTranslations("public.home.hero");

  return (
    <>
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute left-1/2 top-0 h-125 w-200 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--primary)_8%,transparent)_0,transparent_55%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex max-w-7xl flex-col items-center justify-center px-6 text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center rounded-full border bg-background/80 px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur">
            <span className="mr-2 h-2 w-2 rounded-full bg-primary" />
            {t("badge")}
          </div>

          {/* Heading */}
          <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            {t("title")}{" "}
            <span className="text-primary">{t("titleHighlight")}</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            {t("subtitle")}
          </p>

          {/* Search */}
          <HeroSearch />

          {/* Statistics */}
          <HeroStatistics />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
