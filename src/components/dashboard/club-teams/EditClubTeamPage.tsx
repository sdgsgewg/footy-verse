"use client";

import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import { useClubDetail } from "@/hooks/dashboard/clubs";
import { ClubLookupResponse } from "@/types/club";
import { ClubTeamLookupResponse } from "@/types/club-team";
import {
  useClubTeamEdit,
  useClubTeamSubmit,
} from "@/hooks/dashboard/club-teams";
import { useClubTeams } from "@/hooks/club-teams";
import TableFormLayout from "@/components/layout/dashboard/TableFormLayout";
import ClubTeamForm from "@/components/forms/club-teams/ClubTeamForm";
import { useCrudPageTitle } from "@/hooks/crud/useCrudPageTitle";
import { ClubTeamTable } from "@/components/dashboard/clubs/table";
import { useRouter } from "@/navigation";
import { ROUTES } from "@/constants/routes";

interface Props {
  clubLookup: ClubLookupResponse;
  clubTeamLookup: ClubTeamLookupResponse;
}

const EditClubTeamPage = ({ clubLookup, clubTeamLookup }: Props) => {
  const router = useRouter();

  const { getTitle } = useCrudPageTitle();

  const { club } = useClubDetail(clubLookup.id);

  const { clubTeam, isLoading, error, refetch } = useClubTeamEdit({
    clubId: clubLookup.id,
    teamId: clubTeamLookup.id,
  });

  const { clubTeams } = useClubTeams({ clubId: clubLookup.id });

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

  if (!clubTeam && isLoading) {
    return <EntityLoading entity="clubTeam" />;
  }

  if (!clubTeam && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  if (!clubTeam) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <TableFormLayout
      title={getTitle("edit", "clubTeam", `${club.name}`)}
      columns={2}
      tableTitle="Club Teams"
      table={<ClubTeamTable clubLookup={clubLookup} clubTeams={clubTeams} />}
      form={
        <ClubTeamForm
          mode="edit"
          clubTeam={clubTeam}
          loading={isSubmitting}
          onSubmit={(payload) =>
            submit({
              teamId: clubTeam.id,
              payload,
              onSuccess: () => {
                router.push(
                  `${ROUTES.DASHBOARD.CONTENT.CLUBS.BASE}/${club.slug}`,
                );
              },
            })
          }
        />
      }
      backHref={`${ROUTES.DASHBOARD.CONTENT.CLUBS.BASE}/${club.slug}`}
    />
  );
};

export default EditClubTeamPage;
