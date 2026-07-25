import {
  DbPositionCategoryDetailRow,
  DbPositionCategoryListRow,
  PositionCategoryDetailResponse,
  PositionCategoryEditResponse,
  PositionCategoryListItem,
} from "@/types/position-category";

/**
 *
 * @param positionCategory
 * @returns PositionCategoryListItem
 */
export function mapPositionCategoryListItem(
  positionCategory: DbPositionCategoryListRow,
): PositionCategoryListItem {
  const { id, name, slug } = positionCategory;

  return {
    id,
    name,
    slug,
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
