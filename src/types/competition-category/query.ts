import { CompetitionCategory } from "./database";

// Competition Category List

export type DbCompetitionCategoryListRow = CompetitionCategory;

// Competition Category Detail

export type DbCompetitionCategoryDetailRow = CompetitionCategory;

// Helper

export type DbCompetitionCategoryRow = Pick<CompetitionCategory, "id" | "name">;
