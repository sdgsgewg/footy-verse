export enum CareerType {
  CLUB = "CLUB",
  NATIONAL_TEAM = "NATIONAL_TEAM",
}

export const CareerTypeLabels: Record<CareerType, string> = {
  [CareerType.CLUB]: "Club",
  [CareerType.NATIONAL_TEAM]: "National Team",
};
