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
  [TransferType.LOAN]: "Transfer",
  [TransferType.LOAN_RETURN]: "Transfer",
  [TransferType.FREE]: "Transfer",
  [TransferType.RELEASED]: "Transfer",
  [TransferType.YOUTH_PROMOTION]: "Transfer",
  [TransferType.RETIRED]: "Transfer",
};
