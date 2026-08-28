"use client";

import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { fetchPlayerClubTeamCareerEdit } from "@/lib/api/player-club-team-career";
import { playerClubTeamCareerKeys } from "@/lib/react-query/keys/playerClubTeamCareerKeys";

interface UsePlayerClubTeamCareerOptions {
  playerId: string;
  playerClubTeamCareerId: string;
  enabled?: boolean;
}

export function usePlayerClubTeamCareerEdit({
  playerId,
  playerClubTeamCareerId,
  enabled = true,
}: UsePlayerClubTeamCareerOptions) {
  const query = useQuery({
    queryKey: playerClubTeamCareerKeys.edit(playerId, playerClubTeamCareerId),
    queryFn: () =>
      fetchPlayerClubTeamCareerEdit(playerId!, playerClubTeamCareerId!),
    enabled: enabled && !!playerId && !!playerClubTeamCareerId,
    ...queryConfig,
  });

  return {
    ...query,
    playerClubTeamCareer: query.data ?? null,
  };
}
