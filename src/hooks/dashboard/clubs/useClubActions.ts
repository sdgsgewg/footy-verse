import { useTranslations } from "next-intl";
import { useDeleteClub } from "./useDeleteClub";
import { ROUTES } from "@/constants/routes";
import { ClubListItem } from "@/types/club";
import { useRouter } from "@/navigation";
import { useDeleteAction } from "@/hooks/crud/useDeleteAction";

export function useClubActions() {
  const tEntities = useTranslations("entities");

  const router = useRouter();

  const deleteMutation = useDeleteClub();

  const handleCreate = () => {
    router.push(`${ROUTES.DASHBOARD.CONTENT.CLUBS.CREATE}`);
  };

  const handleView = (club: ClubListItem) => {
    router.push(`${ROUTES.DASHBOARD.CONTENT.CLUBS.BASE}/${club.slug}`);
  };

  const handleEdit = (club: ClubListItem) => {
    router.push(`${ROUTES.DASHBOARD.CONTENT.CLUBS.BASE}/${club.slug}/edit`);
  };

  const handleDelete = useDeleteAction({
    deleteMutation,
    entity: tEntities("club"),
    getVariables: (club: ClubListItem) => ({
      id: club.id,
      data: club,
    }),
  });

  return {
    handleCreate,
    handleView,
    handleEdit,
    handleDelete,
  };
}
