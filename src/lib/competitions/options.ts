import { ParticipantType } from "@/enums/ParticipantType";
import { SelectOption } from "@/types/select";
import { getParticipantTypeLabel } from "./labels";

type Translate = (key: string) => string;

/**
 *
 * @param t
 * @returns
 */
export const getParticipantTypeOptions = (t: Translate): SelectOption[] =>
  Object.values(ParticipantType).map((type) => ({
    label: getParticipantTypeLabel(type, t),
    value: type,
  }));
