export enum NationalTeamType {
  STANDARD = "STANDARD",
  OLYMPIC = "OLYMPIC",
}

export const NationalTeamTypeLabels: Record<NationalTeamType, string> = {
  [NationalTeamType.STANDARD]: "Standard Team",
  [NationalTeamType.OLYMPIC]: "Olympic Team",
};
