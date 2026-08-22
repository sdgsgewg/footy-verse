import { ParticipantType } from "@/enums/ParticipantType";
import { Option } from "@/types/option";
import { getParticipantTypeLabel } from "./labels";

type Translate = (key: string) => string;

/**
 *
 * @param t
 * @returns
 */
export const getParticipantTypeOptions = (t: Translate): Option[] =>
  Object.values(ParticipantType).map((type) => ({
    label: getParticipantTypeLabel(type, t),
    value: type,
  }));
