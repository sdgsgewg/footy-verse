export enum ClubType {
  FIRST_TEAM = "FIRST_TEAM",
  B_TEAM = "B_TEAM",
  RESERVE = "RESERVE",
  U23 = "U23",
  U21 = "U21",
  U19 = "U19",
  U18 = "U18",
  U17 = "U17",
  ACADEMY = "ACADEMY",
}

export const ClubTypeLabels: Record<ClubType, string> = {
  [ClubType.FIRST_TEAM]: "First Team",
  [ClubType.B_TEAM]: "B Team",
  [ClubType.RESERVE]: "Reserve Team",
  [ClubType.U23]: "U23 Team",
  [ClubType.U21]: "U21 Team",
  [ClubType.U19]: "U19 Team",
  [ClubType.U18]: "U18 Team",
  [ClubType.U17]: "U17 Team",
  [ClubType.ACADEMY]: "Academy",
};
