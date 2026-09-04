import DetailPageLayout from "./DetailPageLayout";
import { NationalTeamDetailResponse } from "@/types/national-team";
import NationalTeamSummary from "@/components/dashboard/national-teams/summary/NationalTeamSummary";
import SectionHeader from "@/components/players/sections/SectionHeader";
import { useTranslations } from "next-intl";
import PlayerTable from "@/components/shared/tables/PlayerTable";
import { useGroupedPlayers } from "@/hooks/players";
import { flattenGroupedPlayers } from "@/lib/players/player.util";
import SquadDepthPitch from "@/components/teams/squad-depth/SquadDepthPitch";
import { getSquadDepth } from "@/lib/teams/squad-depth";
import { SquadDepthPitchSkeleton } from "@/components/teams/squad-depth";

interface Props {
  nationalTeam: NationalTeamDetailResponse;
  returnTo: string;
}

const NationalTeamDetailPageLayout = ({ nationalTeam, returnTo }: Props) => {
  const tPlayerTable = useTranslations("dashboard.players.table");

  const { id, name } = nationalTeam;

  const { groupedPlayers, isLoading: isPlayersLoading } = useGroupedPlayers({
    nationalTeamId: id,
  });

  const summary = <NationalTeamSummary summary={nationalTeam} />;

  const players = flattenGroupedPlayers(groupedPlayers);

  const squadDepth = getSquadDepth(groupedPlayers);

  const content = (
    <>
      {/* Squad Depth */}
      {(isPlayersLoading || players.length > 0) && (
        <section className="w-full">
          <SectionHeader title="Squad Depth" />

          {isPlayersLoading ? (
            <SquadDepthPitchSkeleton />
          ) : (
            <SquadDepthPitch squadDepth={squadDepth} />
          )}
        </section>
      )}

      <section>
        <SectionHeader title={tPlayerTable("title")} />
        <PlayerTable
          players={players}
          returnTo={returnTo}
          visibleColumns={[
            "shirtNumber",
            "player",
            "dob",
            "club",
            "marketValue",
          ]}
        />
      </section>
    </>
  );

  return <DetailPageLayout title={name} summary={summary} content={content} />;
};

export default NationalTeamDetailPageLayout;
