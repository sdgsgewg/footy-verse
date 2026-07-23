import { useTranslations } from "next-intl";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/navigation";
import { useDeleteNationalTeam } from "./useDeleteNationalTeam";
import { NationalTeamListItem } from "@/types/national-team";

export function useNationalTeamActions(nationSlug: string) {
  const t = useTranslations("common");
  const tEntities = useTranslations("entities");

  const router = useRouter();

  const deleteMutation = useDeleteNationalTeam(nationSlug);

  const handleCreate = () => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.NATIONALITIES}/${nationSlug}/teams/create`,
    );
  };

  const handleView = (teamId: string) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.NATIONALITIES}/${nationSlug}/teams/${teamId}`,
    );
  };

  const handleEdit = (teamId: string) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.CLUBS}/${nationSlug}/teams/${teamId}/edit`,
    );
  };

  const handleDelete = (ct: NationalTeamListItem) => {
    if (
      !confirm(
        `${t("crud.confirm.delete", {
          entity: tEntities("nationalTeam").toLowerCase(),
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
