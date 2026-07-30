// API Response DTO

import { PaginatedResponse } from "../api";
import { PositionCategoryResponse } from "../position-category";
import { Position } from "./database";

// Position List

export type PositionListItem = Pick<Position, "id" | "name" | "slug"> & {
  categoryName: string;
};

export type PositionListResponse = PaginatedResponse<PositionListItem>;

// Position Detail

// Model for Edit

export type PositionEditResponse = Pick<Position, "id" | "name"> & {
  categoryId: string;
};

// Model View Detail

export type PositionDetailResponse = Pick<Position, "id" | "name"> & {
  category: PositionCategoryResponse;
};

// Helper for other entity

export type PositionResponse = Pick<Position, "id" | "name"> & {
  displayOrder: number;
  
  category: PositionCategoryResponse;
};
