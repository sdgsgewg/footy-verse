import { ClubTeamListItem } from "@/types/club-team";
import { Option } from "@/types/option";

export function getClubTeamOptions(clubTeams: ClubTeamListItem[]): Option[] {
  return clubTeams.map((ct) => ({
    label: ct.name,
    value: ct.id,
    imageUrl: ct.imageUrl,
  }));
}
