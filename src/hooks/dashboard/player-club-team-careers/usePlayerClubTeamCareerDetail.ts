import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { fetchPlayerClubTeamCareerDetail } from "@/lib/api/player-club-team-career";
import { playerClubTeamCareerKeys } from "@/lib/react-query/keys/playerClubTeamCareerKeys";

interface UsePlayerClubTeamCareerOptions {
  playerId: string;
  playerClubTeamCareerId: string;
  enabled?: boolean;
}

export function usePlayerClubTeamCareerDetail({
  playerId,
  playerClubTeamCareerId,
  enabled = true,
}: UsePlayerClubTeamCareerOptions) {
  const query = useQuery({
    queryKey: playerClubTeamCareerKeys.detail(playerId, playerClubTeamCareerId),
    queryFn: () =>
      fetchPlayerClubTeamCareerDetail(playerId!, playerClubTeamCareerId!),
    enabled: enabled && !!playerId && !!playerClubTeamCareerId,
    ...queryConfig,
  });

  return {
    ...query,
    playerClubTeamCareer: query.data ?? null,
  };
}
