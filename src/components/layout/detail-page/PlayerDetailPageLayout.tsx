import DetailPageLayout from "./DetailPageLayout";
import { PlayerDetailResponse } from "@/types/player";
import PlayerProfile from "@/components/players/sections/PlayerProfile";
import PlayerHistory from "@/components/players/sections/PlayerHistory";
import PlayerSummary from "@/components/players/summary/PlayerSummary";
import SectionHeader from "@/components/players/sections/SectionHeader";
import PlayerTransferHistoryTable from "@/components/shared/tables/PlayerTransferHistoryTable";
import { usePlayerTransfers } from "@/hooks/dashboard/player-transfers/usePlayerTransfers";
import { useTranslations } from "next-intl";

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PlayerProfile player={player} />
        <PlayerHistory player={player} />
      </div>

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
