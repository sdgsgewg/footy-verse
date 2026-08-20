import { PlayerDetailResponse } from "@/types/player";

import SectionHeader from "./SectionHeader";
import { usePathname, useRouter } from "@/navigation";
import { isDashboardPath } from "@/lib/utils/navigation";
import { ROUTES } from "@/constants/routes";
import { useParams } from "next/navigation";
import { usePlayerClubCareers } from "@/hooks/dashboard/player-club-careers";
import { usePlayerNationalTeamCareers } from "@/hooks/dashboard/player-national-teams";
import {
  PlayerClubCareerHistoryTable,
  PlayerNationalTeamCareerHistoryTable,
} from "../table";
import { useTranslations } from "next-intl";

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

  const tClubCareerTable = useTranslations("dashboard.playerClubCareers.table");
  const tNationalTeamCareerTable = useTranslations(
    "dashboard.playerNationalTeamCareers.table",
  );

  const { playerClubCareers, loading: isPlayerClubCareersLoading } =
    usePlayerClubCareers({ playerId: player.id });

  const {
    playerNationalTeamCareers,
    loading: isPlayerNationalTeamCareersLoading,
  } = usePlayerNationalTeamCareers({
    playerId: player.id,
  });

  const handleAddClubCareer = () => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${playerSlug}/club-careers/create`,
    );
  };

  const handleAddNationalTeamCareer = () => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${playerSlug}/national-team-careers/create`,
    );
  };

  return (
    <div className="space-y-8">
      {isDashboard && (
        <section>
          <SectionHeader
            title={tClubCareerTable("title")}
            onAdd={handleAddClubCareer}
          />

          <PlayerClubCareerHistoryTable
            playerLookup={player}
            playerClubCareers={playerClubCareers}
            loading={isPlayerClubCareersLoading}
            showActions
          />
        </section>
      )}

      <section>
        {isDashboard ? (
          <SectionHeader
            title={tNationalTeamCareerTable("title")}
            onAdd={handleAddNationalTeamCareer}
          />
        ) : (
          <SectionHeader title={tNationalTeamCareerTable("title")} />
        )}

        <PlayerNationalTeamCareerHistoryTable
          playerNationalTeamCareers={playerNationalTeamCareers}
          loading={isPlayerNationalTeamCareersLoading}
          showActions
        />
      </section>
    </div>
  );
};

export default PlayerHistory;
