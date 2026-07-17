import { PlayerDetailResponse } from "@/types/player";
import CareerHistoryTable from "./CareerHistoryTable";
import NationalTeamHistoryTable from "./NationalTeamHistoryTable";
import SectionHeader from "./SectionHeader";

interface Props {
  player: PlayerDetailResponse;
}

const PlayerHistory = ({ player }: Props) => {
  return (
    <div className="space-y-10">
      <section>
        <SectionHeader title="Career History" />
        <CareerHistoryTable careers={player.careers} />
      </section>

      <section>
        <SectionHeader title="National Team History" />
        <NationalTeamHistoryTable nationalTeams={player.national_teams} />
      </section>
    </div>
  );
};

export default PlayerHistory;
