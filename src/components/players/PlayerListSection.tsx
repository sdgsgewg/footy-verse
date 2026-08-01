import ErrorState from "@/components/feedback/ErrorState";
import EmptyState from "@/components/feedback/EmptyState";
import { Users } from "lucide-react";

import PlayerList from "./PlayerList";
import PlayerListSkeleton from "./PlayerListSkeleton";

import type { GroupedPlayerListItem } from "@/types/player";

import type { TeamType } from "@/enums/TeamType";

interface Props {
  teamType: TeamType;
  groupedPlayers: GroupedPlayerListItem[];

  isLoading: boolean;

  error?: Error | null;

  onRetry?: () => void;

  baseRoute: string;
}

export default function PlayerListSection({
  teamType,
  groupedPlayers,
  isLoading,
  error,
  onRetry,
  baseRoute,
}: Props) {
  if (isLoading) {
    return <PlayerListSkeleton />;
  }

  if (error) {
    return <ErrorState onRetry={onRetry} />;
  }

  if (groupedPlayers.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No players found"
        description="There are no players registered for this team."
      />
    );
  }

  return (
    <PlayerList
      teamType={teamType}
      groupedPlayers={groupedPlayers}
      baseRoute={baseRoute}
    />
  );
}
