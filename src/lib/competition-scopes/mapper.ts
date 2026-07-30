import {
  CompetitionScopeDetailResponse,
  CompetitionScopeEditResponse,
  CompetitionScopeListItem,
  CompetitionScopeResponse,
  DbCompetitionScopeDetailRow,
  DbCompetitionScopeListRow,
  DbCompetitionScopeRow,
} from "@/types/competition-scope";

/**
 *
 * @param competitionScope
 * @returns competitionScopeListItem
 */
export function mapCompetitionScopeListItem(
  competitionScope: DbCompetitionScopeListRow,
): CompetitionScopeListItem {
  const { id, name, slug, description } = competitionScope;

  return {
    id,
    name,
    slug,
    description,
  };
}

/**
 *
 * @param competitionScope
 * @returns competitionScopeEditResponse
 */
export function mapCompetitionScopeEditResponse(
  competitionScope: DbCompetitionScopeDetailRow,
): CompetitionScopeEditResponse {
  const { id, name, description } = competitionScope;

  return {
    id,
    name,
    description,
  };
}

/**
 *
 * @param competitionScope
 * @returns competitionScopeDetailResponse
 */
export function mapCompetitionScopeDetailResponse(
  competitionScope: DbCompetitionScopeDetailRow,
): CompetitionScopeDetailResponse {
  const { id, name, description } = competitionScope;

  return {
    id,
    name,
    description,
  };
}

export function mapCompetitionScopeResponse(
  competitionScope: DbCompetitionScopeRow,
): CompetitionScopeResponse {
  const { id, name } = competitionScope;

  return {
    id,
    name,
  };
}
