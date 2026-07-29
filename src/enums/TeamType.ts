export enum TeamType {
  CLUB = "CLUB",
  NATIONAL_TEAM = "NATIONAL_TEAM",
}

export const TeamTypeLabels: Record<TeamType, string> = {
  [TeamType.CLUB]: "Club",
  [TeamType.NATIONAL_TEAM]: "National Team",
};
