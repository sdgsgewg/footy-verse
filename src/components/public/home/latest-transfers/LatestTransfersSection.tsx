"use client";

import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";

// import { ROUTES } from "@/constants/routes";
import { useAllPlayerTransfers } from "@/hooks/dashboard/player-transfers";

import {
  CenteredContentSection,
  CenteredContentSectionProps,
} from "../Section";

import {
  PlayerTransferCard,
  PlayerTransferCardSkeleton,
} from "@/components/player-transfers/cards";
import { AllPlayerTransferListItem } from "@/types/player-transfer";
import { ENTITY_CONFIG } from "@/config/entities";

const LatestTransfersSection = () => {
  const t = useTranslations("public.home.latestTransfers");

  const router = useRouter();

  const { allPlayerTransfers, isLoading } = useAllPlayerTransfers({
    sortBy: "transfer_date",
    sortOrder: "desc",
  });

  const transfers = allPlayerTransfers.slice(0, 4);

  // const handleNavigate = () => {
  //   // Bisa diarahkan ke halaman transfer ketika route sudah tersedia.
  //   router.push(ROUTES.PLAYER_TRANSFERS);
  // };

  const handlePlayerNavigate = (transfer: AllPlayerTransferListItem) => {
    router.push(
      `${ENTITY_CONFIG["player"]["publicRoute"]}/${transfer.player.slug}`,
    );
  };

  const getContent = () => {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <PlayerTransferCardSkeleton key={index} />
            ))
          : transfers.map((transfer) => (
              <PlayerTransferCard
                key={transfer.id}
                transfer={transfer}
                onNavigate={handlePlayerNavigate}
              />
            ))}
      </div>
    );
  };

  const data: CenteredContentSectionProps = {
    title: t("title"),
    subtitle: t("subtitle"),
    children: getContent(),
    // ctaText: t("viewAll"),
    // onClickCTA: handleNavigate,
  };

  return <CenteredContentSection {...data} />;
};

export default LatestTransfersSection;
