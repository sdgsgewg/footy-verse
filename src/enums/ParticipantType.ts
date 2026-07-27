export enum ParticipantType {
  CLUB = "CLUB",
  NATIONAL_TEAM = "NATIONAL_TEAM",
}

export const ParticipantTypeLabels: Record<ParticipantType, string> = {
  [ParticipantType.CLUB]: "Club",
  [ParticipantType.NATIONAL_TEAM]: "National Team",
};
