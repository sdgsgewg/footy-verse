import { useTranslations } from "next-intl";
import { useDeleteSeason } from "./useDeleteSeason";
import { useDeleteAction } from "@/hooks/crud/useDeleteAction";
import { SeasonListItem } from "@/types/season";

export function useSeasonActions() {
  const tEntities = useTranslations("entities");

  const deleteMutation = useDeleteSeason();

  const handleDelete = useDeleteAction({
    deleteMutation,
    entity: tEntities("season"),
    getVariables: (season: SeasonListItem) => ({
      id: season.id,
      data: season,
    }),
  });

  return {
    handleDelete,
  };
}
