import { AgeGroup } from "@/enums/AgeGroup";
import { SelectOption } from "@/types/select";
import {
  getAgeGroupLabel,
  getGenderLabel,
  getTeamCategoryLabel,
} from "./labels";
import { TeamCategory } from "@/enums/TeamCategory";
import { Gender } from "@/enums/Gender";

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

/**
 *
 * @param t
 * @returns SelectOption[]
 */
export const getGenderOptions = (t: Translate): SelectOption[] =>
  Object.values(Gender).map((gender) => ({
    label: getGenderLabel(gender, t),
    value: gender,
  }));
