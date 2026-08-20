import { useTranslations } from "next-intl";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/navigation";
import { useDeleteNationalTeam } from "./useDeleteNationalTeam";
import { NationalityLookupResponse } from "@/types/nationality";
import { useDeleteAction } from "@/hooks/crud/useDeleteAction";
import { NationalTeamListItem } from "@/types/national-team";

export function useNationalTeamActions(
  nationalityLookup: NationalityLookupResponse,
) {
  const tEntities = useTranslations("entities");

  const router = useRouter();

  const deleteMutation = useDeleteNationalTeam(nationalityLookup.id);

  const handleCreate = () => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.NATIONALITIES.BASE}/${nationalityLookup.slug}/teams/create`,
    );
  };

  const handleView = (teamId: string) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.NATIONALITIES.BASE}/${nationalityLookup.slug}/teams/${teamId}`,
    );
  };

  const handleEdit = (teamId: string) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.NATIONALITIES.BASE}/${nationalityLookup.slug}/teams/${teamId}/edit`,
    );
  };

  const handleDelete = useDeleteAction({
    deleteMutation,
    entity: tEntities("nationalTeam"),
    getVariables: (team: NationalTeamListItem) => ({
      teamId: team.id,
      data: team,
    }),
  });

  return {
    handleCreate,
    handleView,
    handleEdit,
    handleDelete,
  };
}
