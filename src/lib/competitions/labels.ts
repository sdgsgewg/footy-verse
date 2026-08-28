import { ParticipantType } from "@/enums/ParticipantType";
import { Translate } from "@/types/translate";

/**
 *
 * @param type
 * @param t
 * @returns
 */
export const getParticipantTypeLabel = (
  type: ParticipantType,
  t: Translate,
): string => {
  switch (type) {
    case ParticipantType.CLUB:
      return t("dashboard.competitions.form.options.participantType.club");
    case ParticipantType.NATIONAL_TEAM:
      return t(
        "dashboard.competitions.form.options.participantType.nationalTeam",
      );
  }
};
