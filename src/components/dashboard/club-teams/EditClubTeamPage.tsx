import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import { useClubDetail } from "@/hooks/dashboard/clubs";
import { ClubLookupResponse } from "@/types/club";
import { useTranslations } from "next-intl";
import { ClubTeamLookupResponse } from "@/types/club-team";
import {
  useClubTeamEdit,
  useClubTeamSubmit,
} from "@/hooks/dashboard/club-teams";
import { useClubTeams } from "@/hooks/club-teams";
import TableFormLayout from "@/components/layout/dashboard/TableFormLayout";
import ClubTeamTable from "@/components/shared/tables/ClubTeamTable";
import ClubTeamForm from "@/components/forms/club-teams/ClubTeamForm";

interface Props {
  clubLookup: ClubLookupResponse;
  clubTeamLookup: ClubTeamLookupResponse;
}

const EditClubTeamPage = ({ clubLookup, clubTeamLookup }: Props) => {
  const t = useTranslations("common.pages.edit");
  const tEntities = useTranslations("entities");

  const { club } = useClubDetail(clubLookup.id);

  const { clubTeam, isLoading, error, refetch } = useClubTeamEdit({
    clubId: clubLookup.id,
    teamId: clubTeamLookup.id,
  });

  const { clubTeams } = useClubTeams({
    clubId: clubLookup.id,
    params: { clubId: clubLookup.id },
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
      title={t("title", {
        entity: tEntities("clubTeam"),
        entityName: club ? `(${club.name})` : "",
      })}
      columns={2}
      tableTitle="Club Teams"
      table={<ClubTeamTable clubTeams={clubTeams} />}
      form={
        <ClubTeamForm
          mode="edit"
          clubTeam={clubTeam}
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
};

export default EditClubTeamPage;
