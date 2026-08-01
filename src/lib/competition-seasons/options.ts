import { CompetitionSeasonStatus } from "@/enums/CompetitionSeasonStatus";
import { SelectOption } from "@/types/select";
import { getCompetitionSeasonStatusLabel } from "./labels";

type Translate = (key: string) => string;

/**
 *
 * @param t
 * @returns
 */
export const getCompetitionSeasonStatusOptions = (
  t: Translate,
): SelectOption[] =>
  Object.values(CompetitionSeasonStatus).map((status) => ({
    label: getCompetitionSeasonStatusLabel(status, t),
    value: status,
  }));
