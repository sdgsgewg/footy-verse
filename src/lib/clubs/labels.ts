import { ClubType } from "@/enums/ClubType";

type Translate = (key: string) => string;

/**
 *
 * @param type
 * @param t
 * @returns
 */
// Badge tinggal pakai getClubTypeLabel()
// Table tinggal pakai getClubTypeLabel()

export const getClubTypeLabel = (type: ClubType, t: Translate): string => {
  switch (type) {
    case ClubType.FIRST_TEAM:
      return t("firstTeam");
    case ClubType.B_TEAM:
      return t("bTeam");
    case ClubType.RESERVE:
      return t("reserve");
    case ClubType.U23:
      return t("u23");
    case ClubType.U21:
      return t("u21");
    case ClubType.U19:
      return t("u19");
    case ClubType.U18:
      return t("u18");
    case ClubType.U17:
      return t("u17");
    case ClubType.ACADEMY:
      return t("academy");
  }
};
