import { CompetitionScopeListItem } from "@/types/competition-scope";
import { Option } from "@/types/option";

/**
 *
 * @param competitionScopes
 * @returns
 */
export function getCompetitionScopeOptions(
  competitionScopes: CompetitionScopeListItem[],
): Option[] {
  return competitionScopes.map((scope) => ({
    label: scope.name,
    value: scope.id,
  }));
}
