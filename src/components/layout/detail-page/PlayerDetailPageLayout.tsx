import DetailPageLayout from "./DetailPageLayout";
import { PlayerDetailResponse } from "@/types/player";
import PlayerHistory from "@/components/players/sections/PlayerHistory";
import PlayerSummary from "@/components/players/summary/PlayerSummary";
import SectionHeader from "@/components/players/sections/SectionHeader";
import { usePlayerTransfers } from "@/hooks/dashboard/player-transfers/usePlayerTransfers";
import { useTranslations } from "next-intl";
import { PlayerTransferHistoryTable } from "@/components/players/table";
import PlayerData from "@/components/players/sections/PlayerData";

interface Props {
  title: string;
  player: PlayerDetailResponse;
  backHref?: string;
}

const PlayerDetailPageLayout = ({ title, player, backHref }: Props) => {
  const tTransferTable = useTranslations("dashboard.playerTransfers.table");

  const { summary: playerSummaryData } = player;

  const summary = <PlayerSummary summary={playerSummaryData} />;

  const { playerTransfers } = usePlayerTransfers({
    playerId: player.id,
  });

  const content = (
    <>
      {/* Profile + Position */}
      <PlayerData player={player} />

      {/* Player Club and National Team Career */}
      <PlayerHistory player={player} />

      {/* Player Transfer History */}
      <section>
        <SectionHeader title={tTransferTable("title")} />
        <PlayerTransferHistoryTable playerTransfers={playerTransfers} />
      </section>
    </>
  );

  return (
    <DetailPageLayout
      title={title}
      summary={summary}
      content={content}
      backHref={backHref}
    />
  );
};

export default PlayerDetailPageLayout;
