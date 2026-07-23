export enum AgeGroup {
  SENIOR = "SENIOR",
  U23 = "U23",
  U21 = "U21",
  U19 = "U19",
  U18 = "U18",
  U17 = "U17",
}

export const AgeGroupLabels: Record<AgeGroup, string> = {
  [AgeGroup.SENIOR]: "Senior Team",
  [AgeGroup.U23]: "U23 Team",
  [AgeGroup.U21]: "U21 Team",
  [AgeGroup.U19]: "U19 Team",
  [AgeGroup.U18]: "U18 Team",
  [AgeGroup.U17]: "U17 Team",
};
