import { NationalTeamListItem } from "@/types/national-team";
import { SelectOption } from "@/types/select";

export function getNationalTeamOptions(
  nationalTeams: NationalTeamListItem[],
): SelectOption[] {
  return nationalTeams.map((nt) => ({
    label: nt.name,
    value: nt.id,
    imageUrl: nt.imageUrl,
  }));
}
