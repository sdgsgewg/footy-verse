import { TransferType } from "@/enums/TransferType";

type Translate = (key: string) => string;

/**
 *
 * @param type
 * @param t
 * @returns
 */

export const getTransferTypeLabel = (
  type: TransferType,
  t: Translate,
): string => {
  switch (type) {
    case TransferType.TRANSFER:
      return t("transfer");
    case TransferType.LOAN:
      return t("loan");
    case TransferType.LOAN_RETURN:
      return t("loanReturn");
    case TransferType.FREE:
      return t("free");
    case TransferType.RELEASED:
      return t("released");
    case TransferType.YOUTH_PROMOTION:
      return t("youthPromotion");
    case TransferType.RETIRED:
      return t("retired");
  }
};
