import { SquadType } from "@/enums/SquadType";

type Translate = (key: string) => string;

/**
 *
 * @param type
 * @param t
 * @returns string
 */
// Badge tinggal pakai getSquadTypeLabel()
// Table tinggal pakai getSquadTypeLabel()

export const getSquadTypeLabel = (type: SquadType, t: Translate): string => {
  switch (type) {
    case SquadType.FIRST_TEAM:
      return t("dashboard.clubTeams.form.options.firstTeam");
    case SquadType.B_TEAM:
      return t("dashboard.clubTeams.form.options.bTeam");
    case SquadType.RESERVE:
      return t("dashboard.clubTeams.form.options.reserve");
    case SquadType.ACADEMY:
      return t("dashboard.clubTeams.form.options.academy");
  }
};
