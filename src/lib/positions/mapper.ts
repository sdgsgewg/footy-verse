import {
  DbPositionDetailRow,
  DbPositionListRow,
  PositionDetailResponse,
  PositionEditResponse,
  PositionListItem,
} from "@/types/position";

/**
 *
 * @param position
 * @returns PositionListItem
 */
export function mapPositionListItem(
  position: DbPositionListRow,
): PositionListItem {
  const { id, name, slug, category } = position;

  return {
    id,
    name,
    slug,
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
    category,
  };
}
