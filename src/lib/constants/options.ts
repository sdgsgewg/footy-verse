import { AgeGroup } from "@/enums/AgeGroup";
import { SelectOption } from "@/types/select";
import { getAgeGroupLabel, getTeamCategoryLabel } from "./labels";
import { TeamCategory } from "@/enums/TeamCategory";

type Translate = (key: string) => string;

/**
 *
 * @param t
 * @returns SelectOption[]
 */
export const getTeamCategoryOptions = (t: Translate): SelectOption[] =>
  Object.values(TeamCategory).map((type) => ({
    label: getTeamCategoryLabel(type, t),
    value: type,
  }));

/**
 *
 * @param t
 * @returns SelectOption[]
 */
export const getAgeGroupOptions = (t: Translate): SelectOption[] =>
  Object.values(AgeGroup).map((type) => ({
    label: getAgeGroupLabel(type, t),
    value: type,
  }));
