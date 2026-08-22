import { NationalTeamType } from "@/enums/NationalTeamType";
import { NationalTeamListItem } from "@/types/national-team";
import { Option } from "@/types/option";
import { getNationalTeamTypeLabel } from "./labels";

type Translate = (key: string) => string;

/**
 *
 * @param t
 * @returns Option[]
 */
export const getNationalTeamTypeOptions = (t: Translate): Option[] =>
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
): Option[] {
  return nationalTeams.map((nt) => ({
    label: nt.name,
    value: nt.id,
    imageUrl: nt.imageUrl,
  }));
}
