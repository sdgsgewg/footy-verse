import { CompetitionSeasonStatus } from "@/enums/CompetitionSeasonStatus";

type Translate = (key: string) => string;

/**
 *
 * @param type
 * @param t
 * @returns
 */

export const getCompetitionSeasonStatusLabel = (
  status: CompetitionSeasonStatus,
  t: Translate,
): string => {
  switch (status) {
    case CompetitionSeasonStatus.UPCOMING:
      return t("dashboard.competitionSeasons.form.options.status.upcoming");
    case CompetitionSeasonStatus.ONGOING:
      return t("dashboard.competitionSeasons.form.options.status.ongoing");
    case CompetitionSeasonStatus.COMPLETED:
      return t("dashboard.competitionSeasons.form.options.status.completed");
    case CompetitionSeasonStatus.CANCELLED:
      return t("dashboard.competitionSeasons.form.options.status.cancelled");
  }
};
