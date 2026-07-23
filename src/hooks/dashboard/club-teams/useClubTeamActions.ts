import { useTranslations } from "next-intl";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/navigation";
import { useDeleteClubTeam } from "./useDeleteClubTeam";
import { ClubTeamListItem } from "@/types/club-team";

export function useClubTeamActions(clubSlug: string) {
  const t = useTranslations("common");
  const tEntities = useTranslations("entities");

  const router = useRouter();

  const deleteMutation = useDeleteClubTeam(clubSlug);

  const handleCreate = () => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.CLUBS.BASE}/${clubSlug}/teams/create`,
    );
  };

  const handleView = (teamId: string) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.CLUBS.BASE}/${clubSlug}/teams/${teamId}`,
    );
  };

  const handleEdit = (teamId: string) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.CLUBS}/${clubSlug}/teams/${teamId}/edit`,
    );
  };

  const handleDelete = (ct: ClubTeamListItem) => {
    if (
      !confirm(
        `${t("crud.confirm.delete", {
          entity: tEntities("clubTeam").toLowerCase(),
        })}`,
      )
    )
      return;

    deleteMutation.mutate({
      teamId: ct.id,
      data: ct,
    });
  };

  return {
    handleCreate,
    handleView,
    handleEdit,
    handleDelete,
  };
}
