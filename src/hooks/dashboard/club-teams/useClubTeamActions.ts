import { useTranslations } from "next-intl";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/navigation";
import { useDeleteClubTeam } from "./useDeleteClubTeam";
import { ClubLookupResponse } from "@/types/club";
import { useDeleteAction } from "@/hooks/crud/useDeleteAction";
import { ClubTeamListItem } from "@/types/club-team";

export function useClubTeamActions(clubLookup: ClubLookupResponse) {
  const tEntities = useTranslations("entities");

  const router = useRouter();

  const deleteMutation = useDeleteClubTeam(clubLookup.id);

  const handleCreate = () => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.CLUBS.BASE}/${clubLookup.slug}/teams/create`,
    );
  };

  const handleView = (teamId: string) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.CLUBS.BASE}/${clubLookup.slug}/teams/${teamId}`,
    );
  };

  const handleEdit = (teamId: string) => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.CLUBS.BASE}/${clubLookup.slug}/teams/${teamId}/edit`,
    );
  };

  const handleDelete = useDeleteAction({
    deleteMutation,
    entity: tEntities("clubTeam"),
    getVariables: (team: ClubTeamListItem) => ({
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
