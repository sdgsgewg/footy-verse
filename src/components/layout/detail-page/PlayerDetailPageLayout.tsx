import DetailPageLayout from "./DetailPageLayout";
import { PlayerDetailResponse } from "@/types/player";
import PlayerCareerHistory from "@/components/players/sections/PlayerCareerHistory";
import PlayerSummary from "@/components/players/summary/PlayerSummary";
import PlayerData from "@/components/players/sections/PlayerData";
import PlayerTransfer from "@/components/players/sections/PlayerTransfer";
import PlayerShirtNumber from "@/components/players/sections/PlayerShirtNumber";

interface Props {
  title: string;
  player: PlayerDetailResponse;
  returnTo?: string;
}

const PlayerDetailPageLayout = ({ title, player, returnTo }: Props) => {
  const { summary: playerSummaryData } = player;

  const summary = <PlayerSummary summary={playerSummaryData} />;

  const content = (
    <>
      {/* Profile + Position */}
      <PlayerData player={player} />

      {/* Player Club and National Team Career */}
      <PlayerCareerHistory player={player} />

      {/* Player Transfer History */}
      <PlayerTransfer player={player} />

      {/* Player Shirt Number History */}
      <PlayerShirtNumber player={player} />
    </>
  );

  return (
    <DetailPageLayout
      title={title}
      summary={summary}
      content={content}
      returnTo={returnTo}
    />
  );
};

export default PlayerDetailPageLayout;
