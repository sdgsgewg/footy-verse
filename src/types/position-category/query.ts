import { PositionCategory } from "./database";

// Position Category List

export type DbPositionCategoryListRow = PositionCategory;

// Position Category Detail

export type DbPositionCategoryDetailRow = PositionCategory;

// Helper

export type DbPositionCategoryRow = Pick<
  PositionCategory,
  "id" | "name" | "display_order"
>;
