import { NationalTeamType } from "@/enums/NationalTeamType";
import { NationalTeamListItem } from "@/types/national-team";
import { SelectOption } from "@/types/select";
import { getNationalTeamTypeLabel } from "./labels";

type Translate = (key: string) => string;

/**
 *
 * @param t
 * @returns SelectOption[]
 */
export const getNationalTeamTypeOptions = (t: Translate): SelectOption[] =>
  Object.values(NationalTeamType).map((type) => ({
    label: getNationalTeamTypeLabel(type, t),
    value: type,
  }));

/**
 *
 * @param nationalTeams
 * @returns
 */
export function getNationalTeamOptions(
  nationalTeams: NationalTeamListItem[],
): SelectOption[] {
  return nationalTeams.map((nt) => ({
    label: nt.name,
    value: nt.id,
    imageUrl: nt.imageUrl,
  }));
}
