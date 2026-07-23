import { AgeGroup } from "@/enums/AgeGroup";
import { TeamCategory } from "@/enums/TeamCategory";

type Translate = (key: string) => string;

/**
 *
 * @param type
 * @param t
 * @returns
 */
export const getTeamCategoryLabel = (
  type: TeamCategory,
  t: Translate,
): string => {
  switch (type) {
    case TeamCategory.MEN:
      return t("common.options.teamCategory.men");
    case TeamCategory.WOMEN:
      return t("common.options.teamCategory.women");
  }
};

/**
 *
 * @param type
 * @param t
 * @returns string
 */
export const getAgeGroupLabel = (type: AgeGroup, t: Translate): string => {
  switch (type) {
    case AgeGroup.SENIOR:
      return t("common.options.ageGroup.senior");
    case AgeGroup.U23:
      return t("common.options.ageGroup.u23");
    case AgeGroup.U21:
      return t("common.options.ageGroup.u21");
    case AgeGroup.U19:
      return t("common.options.ageGroup.u19");
    case AgeGroup.U18:
      return t("common.options.ageGroup.u18");
    case AgeGroup.U17:
      return t("common.options.ageGroup.u17");
  }
};
