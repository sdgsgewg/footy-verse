import { NationalTeamType } from "@/enums/NationalTeamType";

type Translate = (key: string) => string;

/**
 *
 * @param type
 * @param t
 * @returns string
 */
export const getNationalTeamTypeLabel = (
  type: NationalTeamType,
  t: Translate,
): string => {
  switch (type) {
    case NationalTeamType.STANDARD:
      return t(
        "dashboard.nationalTeams.form.options.nationalTeamType.standard",
      );
    case NationalTeamType.OLYMPIC:
      return t("dashboard.nationalTeams.form.options.nationalTeamType.olympic");
  }
};
