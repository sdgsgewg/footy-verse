export enum SquadType {
  FIRST_TEAM = "FIRST_TEAM",
  B_TEAM = "B_TEAM",
  RESERVE = "RESERVE",
  ACADEMY = "ACADEMY",
}

export const SquadTypeLabels: Record<SquadType, string> = {
  [SquadType.FIRST_TEAM]: "First Team",
  [SquadType.B_TEAM]: "B Team",
  [SquadType.RESERVE]: "Reserve Team",
  [SquadType.ACADEMY]: "Academy",
};
