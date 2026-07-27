import { SquadType } from "@/enums/SquadType";
import { ClubTeamSummary, DbClubTeamListRow } from "@/types/club-team";

/**
 *
 * @param clubTeam
 * @returns string
 */
export function formatClubName(
  clubTeam: DbClubTeamListRow | ClubTeamSummary,
): string {
  const { squad_type, age_group, club } = clubTeam;

  switch (squad_type) {
    case SquadType.FIRST_TEAM:
      return club.name;
    case SquadType.B_TEAM:
      return `${club.name} B`;
    case SquadType.ACADEMY:
      return `${club.name} ${age_group}`;
    case SquadType.RESERVE:
      return `${club.name} Reserve`;
    default:
      return club.name;
  }
}
