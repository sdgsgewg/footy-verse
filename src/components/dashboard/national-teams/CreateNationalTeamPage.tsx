"use client";

import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import TableFormLayout from "@/components/layout/dashboard/TableFormLayout";
import { NationalityLookupResponse } from "@/types/nationality";
import { useNationalityDetail } from "@/hooks/dashboard/nationalities";
import { useNationalTeams } from "@/hooks/national-teams";
import { useNationalTeamSubmit } from "@/hooks/dashboard/national-teams";
import NationalTeamTable from "@/components/shared/tables/NationalTeamTable";
import NationalTeamForm from "@/components/forms/national-teams/NationalTeamForm";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";

interface Props {
  nationLookup: NationalityLookupResponse;
}

export default function CreateNationalTeamPage({ nationLookup }: Props) {
  const { getTitle } = useCrudPageTitle();

  const { nationality, isLoading, error, refetch } = useNationalityDetail(
    nationLookup.id,
  );

  const { nationalTeams } = useNationalTeams({
    nationId: nationLookup.id,
  });

  const { submit, isSubmitting } = useNationalTeamSubmit(nationLookup);

  if (!nationality && isLoading) {
    return <EntityLoading entity="nationality" />;
  }

  if (!nationality && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  if (!nationality) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <TableFormLayout
      title={getTitle("create", "nationalTeam", `${nationality.name}`)}
      columns={2}
      tableTitle="National Teams"
      table={<NationalTeamTable nationalTeams={nationalTeams} />}
      form={
        <NationalTeamForm
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
