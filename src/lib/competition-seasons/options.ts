import { CompetitionSeasonStatus } from "@/enums/CompetitionSeasonStatus";
import { Option } from "@/types/option";
import { getCompetitionSeasonStatusLabel } from "./labels";

type Translate = (key: string) => string;

/**
 *
 * @param t
 * @returns
 */
export const getCompetitionSeasonStatusOptions = (t: Translate): Option[] =>
  Object.values(CompetitionSeasonStatus).map((status) => ({
    label: getCompetitionSeasonStatusLabel(status, t),
    value: status,
  }));
