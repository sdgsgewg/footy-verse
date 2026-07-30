import {
  CompetitionCategoryDetailResponse,
  CompetitionCategoryEditResponse,
  CompetitionCategoryListItem,
  CompetitionCategoryResponse,
  DbCompetitionCategoryDetailRow,
  DbCompetitionCategoryListRow,
  DbCompetitionCategoryRow,
} from "@/types/competition-category";

/**
 *
 * @param competitionCategory
 * @returns competitionCategoryListItem
 */
export function mapCompetitionCategoryListItem(
  competitionCategory: DbCompetitionCategoryListRow,
): CompetitionCategoryListItem {
  const { id, name, slug, description } = competitionCategory;

  return {
    id,
    name,
    slug,
    description,
  };
}

/**
 *
 * @param competitionCategory
 * @returns competitionCategoryEditResponse
 */
export function mapCompetitionCategoryEditResponse(
  competitionCategory: DbCompetitionCategoryDetailRow,
): CompetitionCategoryEditResponse {
  const { id, name, description } = competitionCategory;

  return {
    id,
    name,
    description,
  };
}

/**
 *
 * @param competitionCategory
 * @returns competitionCategoryDetailResponse
 */
export function mapCompetitionCategoryDetailResponse(
  competitionCategory: DbCompetitionCategoryDetailRow,
): CompetitionCategoryDetailResponse {
  const { id, name, description } = competitionCategory;

  return {
    id,
    name,
    description,
  };
}

export function mapCompetitionCategoryResponse(
  competitionCategory: DbCompetitionCategoryRow,
): CompetitionCategoryResponse {
  const { id, name } = competitionCategory;

  return {
    id,
    name,
  };
}
