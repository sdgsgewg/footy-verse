import { AgeGroup } from "@/enums/AgeGroup";
import { NationalTeamType } from "@/enums/NationalTeamType";
import {
  DbNationalTeamListRow,
  DbNationalTeamRow,
} from "@/types/national-team";

export function formatNationalTeamName(
  nationalTeam: DbNationalTeamListRow | DbNationalTeamRow,
): string {
  const { age_group, team_type, nation } = nationalTeam;

  if (team_type === NationalTeamType.OLYMPIC)
    return `${nation.name} Olympic Team`;

  switch (age_group) {
    case AgeGroup.SENIOR:
      return nation.name;
    case AgeGroup.U23:
      return `${nation.name} ${age_group}`;
    case AgeGroup.U21:
      return `${nation.name} ${age_group}`;
    case AgeGroup.U19:
      return `${nation.name} ${age_group}`;
    case AgeGroup.U18:
      return `${nation.name} ${age_group}`;
    case AgeGroup.U17:
      return `${nation.name} ${age_group}`;
    default:
      return nation.name;
  }
}
