"use client";

import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { fetchPlayerClubCareerEdit } from "@/lib/api/player-club-career";
import { playerClubCareerKeys } from "@/lib/react-query/keys/playerClubCareerKeys";

interface UsePlayerClubCareerOptions {
  playerId: string;
  playerClubCareerId: string;
  enabled?: boolean;
}

export function usePlayerClubCareerEdit({
  playerId,
  playerClubCareerId,
  enabled = true,
}: UsePlayerClubCareerOptions) {
  const query = useQuery({
    queryKey: playerClubCareerKeys.edit(playerId, playerClubCareerId),
    queryFn: () => fetchPlayerClubCareerEdit(playerId!, playerClubCareerId!),
    enabled: enabled && !!playerId && !!playerClubCareerId,
    ...queryConfig,
  });

  return {
    ...query,
    playerClubCareer: query.data ?? null,
  };
}
