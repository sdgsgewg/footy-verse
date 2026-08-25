"use client";

import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import TableFormLayout from "@/components/layout/dashboard/TableFormLayout";
import { NationalityLookupResponse } from "@/types/nationality";
import { NationalTeamLookupResponse } from "@/types/national-team";
import { useNationalityDetail } from "@/hooks/dashboard/nationalities";
import {
  useNationalTeamEdit,
  useNationalTeamSubmit,
} from "@/hooks/dashboard/national-teams";
import { useNationalTeams } from "@/hooks/national-teams";
import NationalTeamTable from "@/components/nationalities/table/NationalTeamTable";
import NationalTeamForm from "@/components/forms/national-teams/NationalTeamForm";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";
import { useRouter } from "@/navigation";
import { ROUTES } from "@/constants/routes";

interface Props {
  nationalityLookup: NationalityLookupResponse;
  nationalTeamLookup: NationalTeamLookupResponse;
}

const EditNationalTeamPage = ({
  nationalityLookup,
  nationalTeamLookup,
}: Props) => {
  const router = useRouter();

  const { getTitle } = useCrudPageTitle();

  const { nationality } = useNationalityDetail(nationalityLookup.id);

  const { nationalTeam, isLoading, error, refetch } = useNationalTeamEdit({
    nationId: nationalityLookup.id,
    teamId: nationalTeamLookup.id,
  });

  const { nationalTeams } = useNationalTeams({
    nationId: nationalityLookup.id,
  });

  const { submit, isSubmitting } = useNationalTeamSubmit(nationalityLookup);

  if (!nationality && isLoading) {
    return <EntityLoading entity="nationality" />;
  }

  if (!nationality && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  if (!nationality) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  if (!nationalTeam && isLoading) {
    return <EntityLoading entity="nationalTeam" />;
  }

  if (!nationalTeam && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  if (!nationalTeam) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <TableFormLayout
      title={getTitle("edit", "nationalTeam", `${nationality.name}`)}
      columns={2}
      tableTitle="National Teams"
      table={
        <NationalTeamTable
          nationalityLookup={nationalityLookup}
          nationalTeams={nationalTeams}
        />
      }
      form={
        <NationalTeamForm
          mode="edit"
          nationalTeam={nationalTeam}
          loading={isSubmitting}
          onSubmit={(payload) =>
            submit({
              teamId: nationalTeam.id,
              payload,
              onSuccess: () => {
                router.push(
                  `${ROUTES.DASHBOARD.CONTENT.NATIONALITIES.BASE}/${nationality.slug}`,
                );
              },
            })
          }
        />
      }
      backHref={`${ROUTES.DASHBOARD.CONTENT.NATIONALITIES.BASE}/${nationality.slug}`}
    />
  );
};

export default EditNationalTeamPage;
