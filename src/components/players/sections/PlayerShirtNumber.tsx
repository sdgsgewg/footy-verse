import { useTranslations } from "next-intl";
import SectionHeader from "./SectionHeader";
import { PlayerDetailResponse } from "@/types/player";
import SubsectionHeader from "./SubsectionHeader";
import {
  usePlayerClubTeamShirtNumbers,
  usePlayerNationalTeamShirtNumbers,
} from "@/hooks/dashboard/player-shirt-numbers";
import PlayerClubTeamShirtNumberHistoryTable from "../table/PlayerClubTeamShirtNumberHistoryTable";
import { PlayerNationalTeamShirtNumberHistoryTable } from "../table";

interface Props {
  player: PlayerDetailResponse;
}

const PlayerShirtNumber = ({ player }: Props) => {
  const tShirtNumberTable = useTranslations(
    "dashboard.playerShirtNumbers.table",
  );
  const tEntities = useTranslations("entities");

  const {
    playerClubTeamShirtNumbers,
    loading: isPlayerClubTeamShirtNumbersLoading,
  } = usePlayerClubTeamShirtNumbers({
    playerId: player.id,
  });

  const {
    playerNationalTeamShirtNumbers,
    loading: isPlayerNationalTeamShirtNumbersLoading,
  } = usePlayerNationalTeamShirtNumbers({
    playerId: player.id,
  });

  return (
    <section>
      <SectionHeader title={tShirtNumberTable("title")} />

      <div className="flex flex-col gap-2">
        <section className="flex h-full min-w-0 flex-col">
          <SubsectionHeader title={tEntities("club")} />

          <PlayerClubTeamShirtNumberHistoryTable
            playerClubTeamShirtNumbers={playerClubTeamShirtNumbers}
            loading={isPlayerClubTeamShirtNumbersLoading}
          />
        </section>

        <section className="flex h-full min-w-0 flex-col">
          <SubsectionHeader title={tEntities("nationalTeam")} />

          <PlayerNationalTeamShirtNumberHistoryTable
            playerNationalTeamShirtNumbers={playerNationalTeamShirtNumbers}
            loading={isPlayerNationalTeamShirtNumbersLoading}
          />
        </section>
      </div>
    </section>
  );
};

export default PlayerShirtNumber;
