"use client";

import { useRouter } from "@/navigation";

import { useTranslations } from "next-intl";
import { ENTITY_CONFIG } from "@/config/entities";
import {
  CenteredContentSection,
  CenteredContentSectionProps,
} from "../Section";
import { usePlayers } from "@/hooks/dashboard/players";
import { PlayerCard, PlayerCardSkeleton } from "@/components/players/cards";
import { TeamType } from "@/enums/TeamType";
import { ROUTES } from "@/constants/routes";

const FeaturedPlayersSection = () => {
  const t = useTranslations("public.home.featuredPlayers");

  const router = useRouter();

  const { players, loading } = usePlayers({
    sortBy: "marketValue",
    sortOrder: "desc",
    page: 1,
    limit: 4,
  });

  const getContent = () => {
    const handleNavigate = (slug: string) => {
      router.push(`${ENTITY_CONFIG["player"]["publicRoute"]}/${slug}`);
    };

    return (
      <>
        {/* Players */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <PlayerCardSkeleton key={index} />
              ))
            : players.map((player) => (
                <PlayerCard
                  key={player.id}
                  teamType={TeamType.CLUB}
                  player={player}
                  onNavigate={() => handleNavigate(player.slug)}
                />
              ))}
        </div>
      </>
    );
  };

  const data: CenteredContentSectionProps = {
    title: t("title"),
    subtitle: t("subtitle"),
    children: getContent(),
    ctaText: t("viewAll"),
    onClickCTA: () => router.push(`${ROUTES.PLAYERS}`),
  };

  return <CenteredContentSection {...data} />;
};

export default FeaturedPlayersSection;
