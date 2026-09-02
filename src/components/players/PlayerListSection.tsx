import ErrorState from "@/components/feedback/ErrorState";
import EmptyState from "@/components/feedback/EmptyState";
import { Users } from "lucide-react";

import PlayerList from "./PlayerList";
import PlayerListSkeleton from "./PlayerListSkeleton";

import type { GroupedPlayerListItem } from "@/types/player";

import type { TeamType } from "@/enums/TeamType";
import { useTranslations } from "next-intl";

interface Props {
  teamType: TeamType;
  groupedPlayers: GroupedPlayerListItem[];

  isLoading: boolean;

  error?: Error | null;

  onRetry?: () => void;
}

export default function PlayerListSection({
  teamType,
  groupedPlayers,
  isLoading,
  error,
  onRetry,
}: Props) {
  const tCommonStates = useTranslations("common.states");
  const tEntities = useTranslations("entities");

  const modifiedEntity = tEntities("player").toLocaleLowerCase();

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
        title={tCommonStates("empty.title", {
          entity: modifiedEntity,
        })}
        description={tCommonStates("empty.description", {
          entity: modifiedEntity,
        })}
      />
    );
  }

  return <PlayerList teamType={teamType} groupedPlayers={groupedPlayers} />;
}
