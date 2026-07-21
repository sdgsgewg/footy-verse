import { PlayerDetailResponse } from "@/types/player";

import SectionHeader from "./SectionHeader";
import { usePathname, useRouter } from "@/navigation";
import { isDashboardPath } from "@/lib/utils/navigation";
import { ROUTES } from "@/constants/routes";
import { useParams } from "next/navigation";
import CareerHistoryTable from "../tables/CareerHistoryTable";
import NationalTeamHistoryTable from "../tables/NationalTeamHistoryTable";

interface Props {
  player: PlayerDetailResponse;
}

const PlayerHistory = ({ player }: Props) => {
  const { playerId } = useParams() as {
    playerId: string;
  };

  const router = useRouter();
  const pathname = usePathname();
  const isDashboard = isDashboardPath(pathname);

  const { careers, nationalTeams } = player.history;

  const handleAddCareer = () => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${playerId}/careers/create`,
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

        <CareerHistoryTable careers={careers} />
      </section>

      <section>
        <SectionHeader title="National Team History" />
        <NationalTeamHistoryTable nationalTeams={nationalTeams} />
      </section>
    </div>
  );
};

export default PlayerHistory;
