import { CompetitionCategory } from "./database";

// API Response DTO

// Competition List

export type CompetitionCategoryListItem = Pick<
  CompetitionCategory,
  "id" | "name" | "slug" | "description"
>;

// Competition Detail

// Model for Edit

export type CompetitionCategoryEditResponse = Pick<
  CompetitionCategory,
  "id" | "name" | "description"
>;

// Model View Detail

export type CompetitionCategoryDetailResponse = Pick<
  CompetitionCategory,
  "id" | "name" | "description"
>;

// Helper

export type CompetitionCategoryResponse = Pick<
  CompetitionCategory,
  "id" | "name"
>;
