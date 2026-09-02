import { getClubTeamOptions } from "@/lib/club-teams/options";
import { useClubTeams } from "../club-teams";
import { usePositionOptions } from "../dashboard/positions";
import { useNationalityOptions } from "../nationalities";

export function usePlayerFilterOptions() {
  const { positionOptions, loading: positionLoading } = usePositionOptions();

  const { nationalityOptions, loading: nationalityLoading } =
    useNationalityOptions();

  const { clubTeams, loading: clubTeamLoading } = useClubTeams();

  return {
    positionOptions,
    nationalityOptions,
    clubTeamOptions: getClubTeamOptions(clubTeams),

    loading: {
      position: positionLoading,
      nationality: nationalityLoading,
      clubTeam: clubTeamLoading,
    },
  };
}
