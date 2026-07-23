"use client";

import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import { useTranslations } from "next-intl";
import TableFormLayout from "@/components/layout/dashboard/TableFormLayout";
import { NationalityLookupResponse } from "@/types/nationality";
import { useNationalityDetail } from "@/hooks/dashboard/nationalities";
import { useNationalTeams } from "@/hooks/national-teams";
import { useNationalTeamSubmit } from "@/hooks/dashboard/national-teams";
import NationalTeamTable from "@/components/shared/tables/NationalTeamTable";
import NationalTeamForm from "@/components/forms/national-teams/NationalTeamForm";

interface Props {
  nationLookup: NationalityLookupResponse;
}

export default function CreateNationalTeamPage({ nationLookup }: Props) {
  const t = useTranslations("common.pages.create");
  const tEntities = useTranslations("entities");

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
      title={t("title", {
        entity: tEntities("nationalTeam"),
        entityName: nationality ? `(${nationality.name})` : "",
      })}
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
