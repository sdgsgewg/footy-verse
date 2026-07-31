import DetailPageLayout from "./DetailPageLayout";
import SectionHeader from "@/components/players/sections/SectionHeader";
import { useTranslations } from "next-intl";
import PlayerTable from "@/components/shared/tables/PlayerTable";
import { useGroupedPlayers } from "@/hooks/players";
import { flattenGroupedPlayers } from "@/lib/players/player.util";
import { ClubTeamDetailResponse } from "@/types/club-team";
import ClubTeamSummary from "@/components/dashboard/club-teams/summary/ClubTeamSummary";

interface Props {
  clubTeam: ClubTeamDetailResponse;
  returnTo: string;
}

const ClubTeamDetailPageLayout = ({ clubTeam, returnTo }: Props) => {
  const tPlayerTable = useTranslations("dashboard.players.table");

  const { id, name } = clubTeam;

  const { groupedPlayers } = useGroupedPlayers({
    clubTeamId: id,
  });

  const summary = <ClubTeamSummary summary={clubTeam} />;

  const players = flattenGroupedPlayers(groupedPlayers);

  const content = (
    <section>
      <SectionHeader title={tPlayerTable("title")} />
      <PlayerTable
        players={players}
        returnTo={returnTo}
        visibleColumns={[
          "shirtNumber",
          "player",
          "dob",
          "nationality",
          "marketValue",
        ]}
      />
    </section>
  );

  return <DetailPageLayout title={name} summary={summary} content={content} />;
};

export default ClubTeamDetailPageLayout;
