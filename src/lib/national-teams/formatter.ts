import { AgeGroup } from "@/enums/AgeGroup";
import { DbNationalTeamListRow } from "@/types/national-team";

export function formatNationalTeamName(
  nationalTeam: DbNationalTeamListRow,
): string {
  const { age_group, nation } = nationalTeam;

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
