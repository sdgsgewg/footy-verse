import { PlayerDetailResponse } from "@/types/player";

import SectionHeader from "./SectionHeader";
import { usePathname, useRouter } from "@/navigation";
import { isDashboardPath } from "@/lib/utils/navigation";
import { ROUTES } from "@/constants/routes";
import { usePlayerClubTeamCareers } from "@/hooks/dashboard/player-club-team-careers";
import { usePlayerNationalTeamCareers } from "@/hooks/dashboard/player-national-teams";
import {
  PlayerClubTeamCareerHistoryTable,
  PlayerNationalTeamCareerHistoryTable,
} from "../table";
import { useTranslations } from "next-intl";
import SubsectionHeader from "./SubsectionHeader";

interface Props {
  player: PlayerDetailResponse;
}

const PlayerCareerHistory = ({ player }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const isDashboard = isDashboardPath(pathname);

  const tCareerTable = useTranslations("dashboard.playerCareers.table");

  const tClubCareerTable = useTranslations(
    "dashboard.playerClubTeamCareers.table",
  );
  const tNationalTeamCareerTable = useTranslations(
    "dashboard.playerNationalTeamCareers.table",
  );

  const { playerClubTeamCareers, loading: isPlayerClubTeamCareersLoading } =
    usePlayerClubTeamCareers({ playerId: player.id });

  const {
    playerNationalTeamCareers,
    loading: isPlayerNationalTeamCareersLoading,
  } = usePlayerNationalTeamCareers({
    playerId: player.id,
  });

  const handleAddClubCareer = () => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${player.slug}/club-team-careers/create`,
    );
  };

  const handleAddNationalTeamCareer = () => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${player.slug}/national-team-careers/create`,
    );
  };

  return (
    <div className="w-full">
      <SectionHeader title={tCareerTable("title")} />

      <div className="flex flex-col gap-2">
        {/* Player Club Team Career */}
        <section>
          {isDashboard ? (
            <SubsectionHeader
              title={tClubCareerTable("title")}
              onAdd={handleAddClubCareer}
            />
          ) : (
            <SubsectionHeader title={tClubCareerTable("title")} />
          )}

          <PlayerClubTeamCareerHistoryTable
            playerLookup={player}
            playerClubTeamCareers={playerClubTeamCareers}
            loading={isPlayerClubTeamCareersLoading}
            showActions
          />
        </section>

        {/* Player National Team Career */}
        <section>
          {isDashboard ? (
            <SubsectionHeader
              title={tNationalTeamCareerTable("title")}
              onAdd={handleAddNationalTeamCareer}
            />
          ) : (
            <SubsectionHeader title={tNationalTeamCareerTable("title")} />
          )}

          <PlayerNationalTeamCareerHistoryTable
            playerLookup={player}
            playerNationalTeamCareers={playerNationalTeamCareers}
            loading={isPlayerNationalTeamCareersLoading}
            showActions
          />
        </section>
      </div>
    </div>
  );
};

export default PlayerCareerHistory;
