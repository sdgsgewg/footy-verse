import React from "react";
import Statistic from "./Statistic";
import { usePlayers } from "@/hooks/dashboard/players";
import { useClubs } from "@/hooks/clubs";
import { useNationalities } from "@/hooks/nationalities";
import { useCompetitions } from "@/hooks/competitions";
import { useTranslations } from "next-intl";

const HeroStatistics = () => {
  const t = useTranslations("public.home.hero");

  const { total: totalPlayers, loading: isLoadingPlayers } = usePlayers();

  const { total: totalClubs, loading: isLoadingClubs } = useClubs();

  const { total: totalNationalities, loading: isLoadingNationalities } =
    useNationalities();

  const { total: totalCompetitions, loading: isLoadingCompetitions } =
    useCompetitions();

  return (
    <div className="mt-16 grid w-full max-w-3xl grid-cols-2 divide-x divide-y overflow-hidden rounded-xl border bg-card/60 backdrop-blur sm:grid-cols-4 sm:divide-y-0">
      <Statistic
        value={totalPlayers.toString()}
        label={t("statistics.players.label")}
        isLoading={isLoadingPlayers}
      />

      <Statistic
        value={totalClubs.toString()}
        label={t("statistics.clubs.label")}
        isLoading={isLoadingClubs}
      />

      <Statistic
        value={totalNationalities.toString()}
        label={t("statistics.nations.label")}
        isLoading={isLoadingNationalities}
      />

      <Statistic
        value={totalCompetitions.toString()}
        label={t("statistics.competitions.label")}
        isLoading={isLoadingCompetitions}
      />
    </div>
  );
};

export default HeroStatistics;
