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
      return t("form.options.clubType.firstTeam");
    case ClubType.B_TEAM:
      return t("form.options.clubType.bTeam");
    case ClubType.RESERVE:
      return t("form.options.clubType.reserve");
    case ClubType.U23:
      return t("form.options.clubType.u23");
    case ClubType.U21:
      return t("form.options.clubType.u21");
    case ClubType.U19:
      return t("form.options.clubType.u19");
    case ClubType.U18:
      return t("form.options.clubType.u18");
    case ClubType.U17:
      return t("form.options.clubType.u17");
    case ClubType.ACADEMY:
      return t("form.options.clubType.academy");
  }
};
