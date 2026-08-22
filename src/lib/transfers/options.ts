import { TransferType } from "@/enums/TransferType";
import { Option } from "@/types/option";
import { getTransferTypeLabel } from "./labels";

type Translate = (key: string) => string;

/**
 *
 * @param t
 * @returns
 */

export const getTransferTypeOptions = (t: Translate): Option[] =>
  Object.values(TransferType).map((type) => ({
    label: getTransferTypeLabel(type, t),
    value: type,
  }));
