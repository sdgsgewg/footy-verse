import { AgeGroup } from "@/enums/AgeGroup";
import { Option } from "@/types/option";
import { getAgeGroupLabel, getGenderLabel } from "./labels";
import { Gender } from "@/enums/Gender";

type Translate = (key: string) => string;

/**
 *
 * @param t
 * @returns Option[]
 */
export const getAgeGroupOptions = (t: Translate): Option[] =>
  Object.values(AgeGroup).map((type) => ({
    label: getAgeGroupLabel(type, t),
    value: type,
  }));

/**
 *
 * @param t
 * @returns Option[]
 */
export const getGenderOptions = (t: Translate): Option[] =>
  Object.values(Gender).map((gender) => ({
    label: getGenderLabel(gender, t),
    value: gender,
  }));
