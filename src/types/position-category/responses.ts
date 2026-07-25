// API Response DTO

import { PositionCategory } from "./database";

// Position List

export type PositionCategoryListItem = Pick<PositionCategory, "id" | "name" | "slug">;

// Position Detail

// Model for Edit

export type PositionCategoryEditResponse = Pick<PositionCategory, "id" | "name">;

// Model View Detail

export type PositionCategoryDetailResponse = Pick<PositionCategory, "id" | "name">;
