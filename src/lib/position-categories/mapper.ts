import {
  DbPositionCategoryDetailRow,
  DbPositionCategoryListRow,
  DbPositionCategoryRow,
  PositionCategoryDetailResponse,
  PositionCategoryEditResponse,
  PositionCategoryListItem,
  PositionCategoryResponse,
} from "@/types/position-category";

/**
 *
 * @param positionCategory
 * @returns PositionCategoryListItem
 */
export function mapPositionCategoryListItem(
  positionCategory: DbPositionCategoryListRow,
): PositionCategoryListItem {
  const { id, name, slug, display_order } = positionCategory;

  return {
    id,
    name,
    slug,
    display_order,
  };
}

/**
 *
 * @param positionCategory
 * @returns PositionCategoryEditResponse
 */
export function mapPositionCategoryEditResponse(
  positionCategory: DbPositionCategoryDetailRow,
): PositionCategoryEditResponse {
  const { id, name } = positionCategory;

  return {
    id,
    name,
  };
}

/**
 *
 * @param positionCategory
 * @returns PositionCategoryDetailResponse
 */
export function mapPositionCategoryDetailResponse(
  positionCategory: DbPositionCategoryDetailRow,
): PositionCategoryDetailResponse {
  const { id, name } = positionCategory;

  return {
    id,
    name,
  };
}

// Helper

export function mapPositionCategoryResponse(
  positionCategory: DbPositionCategoryRow,
): PositionCategoryResponse {
  const { id, name, display_order } = positionCategory;

  return {
    id,
    name,
    displayOrder: display_order,
  };
}
