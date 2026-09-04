import React from "react";
import Statistic from "./Statistic";
import { useTranslations } from "next-intl";
import { useHomeStatistics } from "@/hooks/statistics";

const HeroStatistics = () => {
  const t = useTranslations("public.home.hero");
  const { data, isLoading } = useHomeStatistics();

  return (
    <div className="mt-16 grid w-full max-w-3xl grid-cols-2 divide-x divide-y overflow-hidden rounded-xl border bg-card/60 backdrop-blur sm:grid-cols-4 sm:divide-y-0">
      <Statistic
        value={data?.players?.toLocaleString() ?? "0"}
        label={t("statistics.players.label")}
        isLoading={isLoading}
      />

      <Statistic
        value={data?.clubs?.toLocaleString() ?? "0"}
        label={t("statistics.clubs.label")}
        isLoading={isLoading}
      />

      <Statistic
        value={data?.nationalities?.toLocaleString() ?? "0"}
        label={t("statistics.nationalities.label")}
        isLoading={isLoading}
      />

      <Statistic
        value={data?.competitions?.toLocaleString() ?? "0"}
        label={t("statistics.competitions.label")}
        isLoading={isLoading}
      />
    </div>
  );
};

export default HeroStatistics;
