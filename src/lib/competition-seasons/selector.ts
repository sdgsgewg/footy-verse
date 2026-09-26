import { CompetitionSeasonStatus } from "@/enums/CompetitionSeasonStatus";
import { parseDateString } from "../utils/date";

export function getCompetitionSeasonStatus(
  startDateStr: string,
  endDateStr: string,
) {
  const today = new Date();

  const startDate = parseDateString(startDateStr);
  const endDate = parseDateString(endDateStr);

  let status = "";

  if (startDate && today < startDate) {
    status = CompetitionSeasonStatus.UPCOMING;
  } else if (endDate && today > endDate) {
    status = CompetitionSeasonStatus.COMPLETED;
  } else {
    status = CompetitionSeasonStatus.ONGOING;
  }

  return `${status.charAt(0).toUpperCase()}${status.slice(1).toLowerCase()}`;
}
