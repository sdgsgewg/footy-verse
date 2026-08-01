import {
  DbNationalTeamDetailRow,
  DbNationalTeamListRow,
  NationalTeamDetailResponse,
  NationalTeamEditResponse,
  NationalTeamListItem,
  NationalTeamResponse,
  DbNationalTeamRow,
} from "@/types/national-team";
import { getImageUrl } from "../images/image-url";
import { STORAGE_BUCKETS } from "../storage";
import { formatNationalTeamName } from "./formatter";
import { formatEuroValue } from "../formatters/currency";
import { mapNationalityWithConfederationResponse } from "../nationalities/mapper";
import { CompetitionSeasonWinnerResponse } from "@/types/competition-season";

export function mapNationalTeamListItem(
  nationalTeam: DbNationalTeamListRow,
): NationalTeamListItem {
  const { id, team_category, age_group, nation } = nationalTeam;

  return {
    id,
    imageUrl: getImageUrl(
      "nationality",
      STORAGE_BUCKETS.NATIONALITIES,
      nation.image,
    ),
    name: formatNationalTeamName(nationalTeam),
    teamCategory: team_category,
    ageGroup: age_group,
  };
}

export function mapNationalTeamEditResponse(
  nationalTeam: DbNationalTeamDetailRow,
): NationalTeamEditResponse {
  const { id, team_category, age_group, nation_id } = nationalTeam;

  return {
    id,
    teamCategory: team_category,
    ageGroup: age_group,
    nationId: nation_id,
  };
}

export function mapNationalTeamDetailResponse(
  nationalTeam: DbNationalTeamDetailRow,
): NationalTeamDetailResponse {
  const { id, team_category, age_group, nation, player_national_team_careers } =
    nationalTeam;

  const squadSize = player_national_team_careers.length;

  const marketValues = player_national_team_careers.map(
    (pntc) => pntc.player_career.player.market_value,
  );

  const totalMarketValue = marketValues.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  return {
    id,
    name: formatNationalTeamName(nationalTeam),
    teamCategory: team_category,
    ageGroup: age_group,

    nation: mapNationalityWithConfederationResponse(nation),

    squadSize: String(squadSize),
    totalMarketValue: formatEuroValue(totalMarketValue),
  };
}

// Helpers

export function mapNationalTeamResponse(
  nationalTeam: DbNationalTeamRow,
): NationalTeamResponse {
  const { id, team_category, age_group, nation } = nationalTeam;

  return {
    id,
    imageUrl: getImageUrl(
      "nationality",
      STORAGE_BUCKETS.NATIONALITIES,
      nation.image,
    ),
    name: formatNationalTeamName(nationalTeam),
    teamCategory: team_category,
    ageGroup: age_group,
  };
}

/**
 *
 * @param nationalTeam
 * @returns
 */
export function mapNationalTeamToWinnerResponse(
  nationalTeam: DbNationalTeamRow,
): CompetitionSeasonWinnerResponse {
  const { id, nation } = nationalTeam;

  return {
    id,
    imageUrl: getImageUrl(
      "nationality",
      STORAGE_BUCKETS.NATIONALITIES,
      nation.image,
    ),
    name: formatNationalTeamName(nationalTeam),
  };
}
