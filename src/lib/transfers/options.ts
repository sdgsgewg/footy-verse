import { TransferType } from "@/enums/TransferType";
import { SelectOption } from "@/types/select";
import { getTransferTypeLabel } from "./labels";

type Translate = (key: string) => string;

/**
 *
 * @param t
 * @returns
 */
// Filter tinggal getClubTypeOptions()
// Form tinggal getClubTypeOptions()

export const getTransferTypeOptions = (t: Translate): SelectOption[] =>
  Object.values(TransferType).map((type) => ({
    label: getTransferTypeLabel(type, t),
    value: type,
  }));
