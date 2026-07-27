export enum CompetitionType {
  LEAGUE = "LEAGUE",
  DOMESTIC_CUP = "DOMESTIC_CUP",
  SUPER_CUP = "SUPER_CUP",
  CONTINENTAL_CLUB = "CONTINENTAL_CLUB",
  INTERNATIONAL = "INTERNATIONAL",
  INTERNATIONAL_QUALIFIER = "INTERNATIONAL_QUALIFIER",
  QUALIFICATION = "QUALIFICATION",
  PLAYOFF = "PLAYOFF",
  FRIENDLY = "FRIENDLY",
}

export const CompetitionTypeLabels: Record<CompetitionType, string> = {
  [CompetitionType.LEAGUE]: "League",
  [CompetitionType.DOMESTIC_CUP]: "Domestic Cup",
  [CompetitionType.SUPER_CUP]: "Super Cup",
  [CompetitionType.CONTINENTAL_CLUB]: "Continental Club",
  [CompetitionType.INTERNATIONAL]: "International",
  [CompetitionType.INTERNATIONAL_QUALIFIER]: "International Qualifier",
  [CompetitionType.QUALIFICATION]: "Qualification",
  [CompetitionType.PLAYOFF]: "Playoff",
  [CompetitionType.FRIENDLY]: "Friendly",
};
