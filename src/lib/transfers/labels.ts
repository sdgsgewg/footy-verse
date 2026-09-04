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
  const translationKeyPrefix =
    "dashboard.playerClubTeamCareers.form.options.transferType";

  switch (type) {
    case TransferType.TRANSFER:
      return t(`${translationKeyPrefix}.transfer`);
    case TransferType.LOAN:
      return t(`${translationKeyPrefix}.loan`);
    case TransferType.LOAN_RETURN:
      return t(`${translationKeyPrefix}.loanReturn`);
    case TransferType.FREE:
      return t(`${translationKeyPrefix}.free`);
    case TransferType.RELEASED:
      return t(`${translationKeyPrefix}.released`);
    case TransferType.YOUTH_PROMOTION:
      return t(`${translationKeyPrefix}.youthPromotion`);
    case TransferType.RETIRED:
      return t(`${translationKeyPrefix}.retired`);
  }
};
