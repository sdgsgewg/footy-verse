import { PositionCategory } from "./database";

// API Response DTO

// Position List

export type PositionCategoryListItem = Pick<
  PositionCategory,
  "id" | "name" | "slug"
>;

// Position Detail

// Model for Edit

export type PositionCategoryEditResponse = Pick<
  PositionCategory,
  "id" | "name"
>;

// Model View Detail

export type PositionCategoryDetailResponse = Pick<
  PositionCategory,
  "id" | "name"
>;

// Helper

export type PositionCategoryResponse = Pick<PositionCategory, "id" | "name">;
