import { ClubTeamListItem } from "@/types/club-team";
import { SelectOption } from "@/types/select";

export function getClubTeamOptions(
  clubTeams: ClubTeamListItem[],
): SelectOption[] {
  return clubTeams.map((ct) => ({
    label: ct.name,
    value: ct.id,
    imageUrl: ct.imageUrl,
  }));
}
