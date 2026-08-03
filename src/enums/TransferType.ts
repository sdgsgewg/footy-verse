export enum TransferType {
  TRANSFER = "TRANSFER",
  LOAN = "LOAN",
  LOAN_RETURN = "LOAN_RETURN",
  FREE = "FREE",
  RELEASED = "RELEASED",
  YOUTH_PROMOTION = "YOUTH_PROMOTION",
  RETIRED = "RETIRED",
}

export const TransferTypeLabels: Record<TransferType, string> = {
  [TransferType.TRANSFER]: "Transfer",
  [TransferType.LOAN]: "Loan",
  [TransferType.LOAN_RETURN]: "Loan Return",
  [TransferType.FREE]: "Free",
  [TransferType.RELEASED]: "Released",
  [TransferType.YOUTH_PROMOTION]: "Youth Promotion",
  [TransferType.RETIRED]: "Retired",
};
