"use client";

import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import { ClubLookupResponse } from "@/types/club";
import { useClubDetail } from "@/hooks/dashboard/clubs";
import { useClubTeams } from "@/hooks/club-teams";
import { useClubTeamSubmit } from "@/hooks/dashboard/club-teams";
import TableFormLayout from "@/components/layout/dashboard/TableFormLayout";
import ClubTeamForm from "@/components/forms/club-teams/ClubTeamForm";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";
import { ClubTeamTable } from "@/components/clubs/table";

interface Props {
  clubLookup: ClubLookupResponse;
}

export default function CreateClubTeamPage({ clubLookup }: Props) {
  const { getTitle } = useCrudPageTitle();

  const { club, isLoading, error, refetch } = useClubDetail(clubLookup.id);

  const { clubTeams } = useClubTeams({
    clubId: clubLookup.id,
  });

  const { submit, isSubmitting } = useClubTeamSubmit(clubLookup);

  if (!club && isLoading) {
    return <EntityLoading entity="club" />;
  }

  if (!club && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  if (!club) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <TableFormLayout
      title={getTitle("create", "clubTeam", `${club.name}`)}
      columns={2}
      tableTitle="Club Teams"
      table={<ClubTeamTable clubTeams={clubTeams} />}
      form={
        <ClubTeamForm
          mode="create"
          loading={isSubmitting}
          onSubmit={(payload) =>
            submit({
              payload,
            })
          }
        />
      }
    />
  );
}
