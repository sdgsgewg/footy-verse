"use client";

import { usePlayerDetail } from "@/hooks/dashboard/players";
import { PlayerLookupResponse } from "@/types/player";
import PlayerDetailPageLayout from "../layout/detail-page/PlayerDetailPageLayout";
import EntityLoading from "../feedback/loading/EntityLoading";
import ErrorState from "../feedback/ErrorState";

interface Props {
  playerLookup: PlayerLookupResponse;
  returnTo?: string;
}

export default function PlayerDetailPage({ playerLookup, returnTo }: Props) {
  const { player, isLoading, error, refetch } = usePlayerDetail(
    playerLookup.id,
  );

  // Initial request is still loading and no cached player data is available yet.
  if (!player && isLoading) {
    return <EntityLoading entity="player" />;
  }

  // Initial request failed before any player data could be loaded.
  if (!player && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  // Fallback: no player data is available even though loading has finished.
  if (!player) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  const { shortName } = player.summary;

  return (
    <PlayerDetailPageLayout
      title={shortName}
      player={player}
      returnTo={returnTo}
    />
  );
}
