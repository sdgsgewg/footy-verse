"use client";

import Loading from "@/components/feedback/Loading";
import NotFound from "@/components/feedback/NotFound";
import PlayerForm from "@/components/forms/players/PlayerForm";
import { usePlayer, usePlayerSubmit } from "@/hooks/manage/players";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const EditPlayerPage = () => {
  const t = useTranslations("manage.players");

  const params = useParams();

  const id = params.id as string;

  const { player, loading } = usePlayer({
    id,
  });

  const { submit, isSubmitting } = usePlayerSubmit();

  if (loading) {
    return <Loading />;
  }

  if (!player) {
    return <NotFound text={t("notFound")} />;
  }

  return (
    <PlayerForm
      mode="edit"
      player={player}
      loading={isSubmitting}
      onSubmit={(payload) =>
        submit({
          id,
          payload,
        })
      }
    />
  );
};

export default EditPlayerPage;
