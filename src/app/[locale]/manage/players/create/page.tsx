"use client";

import PlayerForm from "@/components/forms/players/PlayerForm";
import { usePlayerSubmit } from "@/hooks/manage/players";

export default function CreatePlayerPage() {
  const { submit, isSubmitting } = usePlayerSubmit();

  return (
    <PlayerForm
      mode="create"
      loading={isSubmitting}
      onSubmit={(payload) =>
        submit({
          payload,
        })
      }
    />
  );
}
