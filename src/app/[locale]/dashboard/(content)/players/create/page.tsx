"use client";

import PlayerForm from "@/components/forms/players/PlayerForm";
import { usePlayerSubmit } from "@/hooks/dashboard/players";
import FormPageLayout from "@/components/layout/dashboard/FormPageLayout";
import { useCrudPageTitle } from "@/hooks/crud/useCrudPageTitle";
import { useRouter } from "@/navigation";
import { ROUTES } from "@/constants/routes";

export default function CreatePlayerPage() {
  const router = useRouter();

  const { getTitle } = useCrudPageTitle();

  const { submit, isSubmitting } = usePlayerSubmit();

  return (
    <FormPageLayout
      title={getTitle("create", "player")}
      formSize="large"
      form={
        <PlayerForm
          mode="create"
          loading={isSubmitting}
          onSubmit={(payload) =>
            submit({
              payload,
              onSuccess: () => {
                router.push(ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE);
              },
            })
          }
        />
      }
    />
  );
}
