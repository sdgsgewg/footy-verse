import { Option } from "@/types/option";
import { getSquadTypeLabel } from "./labels";
import { SquadType } from "@/enums/SquadType";

type Translate = (key: string) => string;

/**
 *
 * @param t
 * @returns
 */
// Filter tinggal getSquadTypeOptions()
// Form tinggal getSquadTypeOptions()

export const getSquadTypeOptions = (t: Translate): Option[] =>
  Object.values(SquadType).map((type) => ({
    label: getSquadTypeLabel(type, t),
    value: type,
  }));
