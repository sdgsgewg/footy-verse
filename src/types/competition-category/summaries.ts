import { CompetitionCategory } from "./database";

export type CompetitionCategorySummary = Pick<
  CompetitionCategory,
  "id" | "name"
>;
