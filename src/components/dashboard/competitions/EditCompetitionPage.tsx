"use client";

import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import FormPageLayout from "@/components/layout/dashboard/FormPageLayout";
import { useCrudPageTitle } from "@/hooks/crud/useCrudPageTitle";
import { CompetitionLookupResponse } from "@/types/competition";
import {
  useCompetitionEdit,
  useCompetitionSubmit,
} from "@/hooks/dashboard/competitions";
import CompetitionForm from "@/components/forms/competitions/CompetitionForm";
import { useRouter } from "@/navigation";
import { ROUTES } from "@/constants/routes";

interface Props {
  competitionLookup: CompetitionLookupResponse;
}

export default function EditCompetitionPage({ competitionLookup }: Props) {
  const router = useRouter();

  const { getTitle } = useCrudPageTitle();

  const { competition, isLoading, error, refetch } = useCompetitionEdit(
    competitionLookup.id,
  );

  const { submit, isSubmitting } = useCompetitionSubmit();

  if (!competition && isLoading) {
    return <EntityLoading entity="competition" />;
  }

  if (!competition && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  if (!competition) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <FormPageLayout
      title={getTitle("edit", "competition")}
      formSize="large"
      form={
        <CompetitionForm
          mode="edit"
          competition={competition}
          loading={isSubmitting}
          onSubmit={(payload) =>
            submit({
              id: competition.id,
              payload,
              onSuccess: () => {
                router.push(ROUTES.DASHBOARD.CONTENT.COMPETITIONS.BASE);
              },
            })
          }
        />
      }
    />
  );
}
