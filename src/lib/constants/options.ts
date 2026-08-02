import { AgeGroup } from "@/enums/AgeGroup";
import { SelectOption } from "@/types/select";
import { getAgeGroupLabel, getGenderLabel } from "./labels";
import { Gender } from "@/enums/Gender";

type Translate = (key: string) => string;

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
