import { PlayerDetailResponse } from "@/types/player";

import SectionHeader from "./SectionHeader";
import { usePathname, useRouter } from "@/navigation";
import { isDashboardPath } from "@/lib/utils/navigation";
import { ROUTES } from "@/constants/routes";
import { useParams } from "next/navigation";
import {
  PlayerCareerHistoryTable,
  PlayerNationalTeamHistoryTable,
} from "@/components/shared/tables";
import { usePlayerCareers } from "@/hooks/dashboard/player-careers";
import { usePlayerNationalTeams } from "@/hooks/dashboard/player-national-teams";

interface Props {
  player: PlayerDetailResponse;
}

const PlayerHistory = ({ player }: Props) => {
  const { playerSlug } = useParams() as {
    playerSlug: string;
  };

  const router = useRouter();
  const pathname = usePathname();
  const isDashboard = isDashboardPath(pathname);

  const { playerCareers } = usePlayerCareers({ playerId: player.id });
  const { playerNationalTeams } = usePlayerNationalTeams({
    playerId: player.id,
  });

  const handleAddCareer = () => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${playerSlug}/careers/create`,
    );
  };

  const handleAddNationalTeam = () => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${playerSlug}/national-teams/create`,
    );
  };

  return (
    <div className="space-y-10">
      <section>
        {isDashboard ? (
          <SectionHeader title="Career History" onAdd={handleAddCareer} />
        ) : (
          <SectionHeader title="Career History" />
        )}

        <PlayerCareerHistoryTable playerCareers={playerCareers} showActions />
      </section>

      <section>
        {isDashboard ? (
          <SectionHeader
            title="National Team History"
            onAdd={handleAddNationalTeam}
          />
        ) : (
          <SectionHeader title="National Team History" />
        )}

        <PlayerNationalTeamHistoryTable
          playerNationalTeams={playerNationalTeams}
          showActions
        />
      </section>
    </div>
  );
};

export default PlayerHistory;
