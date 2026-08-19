import {
  DbPositionDetailRow,
  DbPositionListRow,
  DbPositionRow,
  PositionDetailResponse,
  PositionEditResponse,
  PositionListItem,
  PositionResponse,
} from "@/types/position";
import { mapPositionCategoryResponse } from "../position-categories/mapper";

/**
 *
 * @param position
 * @returns PositionListItem
 */
export function mapPositionListItem(
  position: DbPositionListRow,
): PositionListItem {
  const { id, name, slug, display_order, category } = position;

  return {
    id,
    name,
    slug,
    display_order,
    categoryName: category.name,
  };
}

/**
 *
 * @param position
 * @returns PositionEditResponse
 */
export function mapPositionEditResponse(
  position: DbPositionDetailRow,
): PositionEditResponse {
  const { id, name, position_category_id } = position;

  return {
    id,
    name,
    categoryId: position_category_id,
  };
}

/**
 *
 * @param position
 * @returns PositionDetailResponse
 */
export function mapPositionDetailResponse(
  position: DbPositionDetailRow,
): PositionDetailResponse {
  const { id, name, category } = position;

  return {
    id,
    name,
    category: mapPositionCategoryResponse(category),
  };
}

// Helper

export function mapPositionResponse(position: DbPositionRow): PositionResponse {
  const { id, name, display_order, category } = position;

  return {
    id,
    name,
    displayOrder: display_order,
    category: mapPositionCategoryResponse(category),
  };
}
