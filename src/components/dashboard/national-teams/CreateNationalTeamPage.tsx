"use client";

import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import TableFormLayout from "@/components/layout/dashboard/TableFormLayout";
import { NationalityLookupResponse } from "@/types/nationality";
import { useNationalityDetail } from "@/hooks/dashboard/nationalities";
import { useNationalTeams } from "@/hooks/national-teams";
import { useNationalTeamSubmit } from "@/hooks/dashboard/national-teams";
import NationalTeamTable from "@/components/nationalities/table/NationalTeamTable";
import NationalTeamForm from "@/components/forms/national-teams/NationalTeamForm";
import { useCrudPageTitle } from "@/hooks/crud/useCrudPageTitle";
import { useRouter } from "@/navigation";
import { ROUTES } from "@/constants/routes";

interface Props {
  nationalityLookup: NationalityLookupResponse;
}

export default function CreateNationalTeamPage({ nationalityLookup }: Props) {
  const router = useRouter();

  const { getTitle } = useCrudPageTitle();

  const { nationality, isLoading, error, refetch } = useNationalityDetail(
    nationalityLookup.id,
  );

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

  return (
    <TableFormLayout
      title={getTitle("create", "nationalTeam", `${nationality.name}`)}
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
          mode="create"
          loading={isSubmitting}
          onSubmit={(payload) =>
            submit({
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
}
