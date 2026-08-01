export enum CompetitionSeasonStatus {
  UPCOMING = "UPCOMING",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export const CompetitionSeasonStatusLabels: Record<
  CompetitionSeasonStatus,
  string
> = {
  [CompetitionSeasonStatus.UPCOMING]: "Upcoming",
  [CompetitionSeasonStatus.ONGOING]: "Ongoing",
  [CompetitionSeasonStatus.COMPLETED]: "Completed",
  [CompetitionSeasonStatus.CANCELLED]: "Cancelled",
};
