import DetailPageLayout from "./DetailPageLayout";
import { PlayerDetailResponse } from "@/types/player";
import PlayerHistory from "@/components/players/sections/PlayerHistory";
import PlayerSummary from "@/components/players/summary/PlayerSummary";
import { usePlayerTransfers } from "@/hooks/dashboard/player-transfers/usePlayerTransfers";
import PlayerData from "@/components/players/sections/PlayerData";
import PlayerTransfer from "@/components/players/sections/PlayerTransfer";
import PlayerShirtNumber from "@/components/players/sections/PlayerShirtNumber";

interface Props {
  title: string;
  player: PlayerDetailResponse;
  backHref?: string;
}

const PlayerDetailPageLayout = ({ title, player, backHref }: Props) => {
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
      <PlayerTransfer playerTransfers={playerTransfers} />

      {/* Player Shirt Number History */}
      <PlayerShirtNumber player={player} />
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
