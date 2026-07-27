export enum CompetitionSquadPlayerStatus {
  REGISTERED = "REGISTERED",
  WITHDRAWN = "WITHDRAWN",
  REPLACED = "REPLACED",
}

export const CompetitionSquadPlayerStatusLabels: Record<CompetitionSquadPlayerStatus, string> = {
  [CompetitionSquadPlayerStatus.REGISTERED]: "Registered",
  [CompetitionSquadPlayerStatus.WITHDRAWN]: "Withdrawn",
  [CompetitionSquadPlayerStatus.REPLACED]: "Replaced",
};
