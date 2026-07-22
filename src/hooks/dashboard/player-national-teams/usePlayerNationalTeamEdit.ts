"use client";

import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { playerNationalTeamKeys } from "@/lib/react-query/keys/playerNationalTeamKeys";
import { fetchPlayerNationalTeamEdit } from "@/lib/api/player-national-team";

interface UsePlayerNationalTeamOptions {
  playerId: string;
  nationalTeamId: string;
  enabled?: boolean;
}

export function usePlayerNationalTeamEdit({
  playerId,
  nationalTeamId,
  enabled = true,
}: UsePlayerNationalTeamOptions) {
  const query = useQuery({
    queryKey: playerNationalTeamKeys.edit(playerId, nationalTeamId),
    queryFn: () => fetchPlayerNationalTeamEdit(playerId!, nationalTeamId!),
    enabled: enabled && !!playerId && !!nationalTeamId,
    ...queryConfig,
  });

  return {
    ...query,
    playerNationalTeam: query.data ?? null,
  };
}
