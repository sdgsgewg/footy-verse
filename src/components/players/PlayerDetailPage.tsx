"use client";

import { usePlayerDetail } from "@/hooks/dashboard/players";
import { PlayerLookupResponse } from "@/types/player";
import PlayerDetailPageLayout from "../layout/detail-page/PlayerDetailPageLayout";
import EntityLoading from "../feedback/loading/EntityLoading";
import ErrorState from "../feedback/ErrorState";

interface Props {
  playerLookup: PlayerLookupResponse;
  backHref?: string;
}

export default function PlayerDetailPage({ playerLookup, backHref }: Props) {
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

  const { name } = player;

  return (
    <PlayerDetailPageLayout title={name} player={player} backHref={backHref} />
  );
}
