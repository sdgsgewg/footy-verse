import { SquadType } from "@/enums/SquadType";
import { DbClubTeamListRow, DbClubTeamRow } from "@/types/club-team";

/**
 *
 * @param clubTeam
 * @returns string
 */
export function formatClubName(
  clubTeam: DbClubTeamListRow | DbClubTeamRow,
): string {
  const { squad_type, age_group, club } = clubTeam;

  switch (squad_type) {
    case SquadType.FIRST_TEAM:
      return club.short_name;
    case SquadType.B_TEAM:
      return `${club.short_name} B`;
    case SquadType.ACADEMY:
      return `${club.short_name} ${age_group}`;
    case SquadType.RESERVE:
      return `${club.short_name} Reserve`;
    default:
      return club.short_name;
  }
}
