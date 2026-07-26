"use client";

import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { fetchPlayerClubCareerEdit } from "@/lib/api/player-club-career";
import { playerClubCareerKeys } from "@/lib/react-query/keys/playerClubCareerKeys";

interface UsePlayerClubCareerOptions {
  playerId: string;
  careerId: string;
  enabled?: boolean;
}

export function usePlayerClubCareerEdit({
  playerId,
  careerId,
  enabled = true,
}: UsePlayerClubCareerOptions) {
  const query = useQuery({
    queryKey: playerClubCareerKeys.edit(playerId, careerId),
    queryFn: () => fetchPlayerClubCareerEdit(playerId!, careerId!),
    enabled: enabled && !!playerId && !!careerId,
    ...queryConfig,
  });

  return {
    ...query,
    playerClubCareer: query.data ?? null,
  };
}
