"use client";

import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import { ClubLookupResponse } from "@/types/club";
import { useClubDetail } from "@/hooks/dashboard/clubs";
import { useClubTeams } from "@/hooks/club-teams";
import { useClubTeamSubmit } from "@/hooks/dashboard/club-teams";
import TableFormLayout from "@/components/layout/dashboard/TableFormLayout";
import ClubTeamForm from "@/components/forms/club-teams/ClubTeamForm";
import { useCrudPageTitle } from "@/hooks/crud/useCrudPageTitle";
import { ClubTeamTable } from "@/components/dashboard/clubs/table";
import { useRouter } from "@/navigation";
import { ROUTES } from "@/constants/routes";

interface Props {
  clubLookup: ClubLookupResponse;
}

export default function CreateClubTeamPage({ clubLookup }: Props) {
  const router = useRouter();

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
      title={getTitle("create", "clubTeam", `${club.shortName}`)}
      columns={2}
      tableTitle="Club Teams"
      table={<ClubTeamTable clubLookup={clubLookup} clubTeams={clubTeams} />}
      form={
        <ClubTeamForm
          mode="create"
          loading={isSubmitting}
          onSubmit={(payload) =>
            submit({
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
}
