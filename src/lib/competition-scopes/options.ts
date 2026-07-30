import { CompetitionScopeListItem } from "@/types/competition-scope";
import { SelectOption } from "@/types/select";

/**
 *
 * @param competitionScopes
 * @returns
 */
export function getCompetitionScopeOptions(
  competitionScopes: CompetitionScopeListItem[],
): SelectOption[] {
  return competitionScopes.map((scope) => ({
    label: scope.name,
    value: scope.id,
  }));
}
