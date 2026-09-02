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
  const { id, gender, age_group, team_type, nation } = nationalTeam;

  return {
    id,
    imageUrl: getImageUrl(
      "nationality",
      STORAGE_BUCKETS.NATIONALITIES,
      nation.image,
    ),
    name: formatNationalTeamName(nationalTeam),
    gender: gender,
    ageGroup: age_group,
    teamType: team_type,
  };
}

export function mapNationalTeamEditResponse(
  nationalTeam: DbNationalTeamDetailRow,
): NationalTeamEditResponse {
  const { id, gender, age_group, team_type, nation_id } = nationalTeam;

  return {
    id,
    gender,
    ageGroup: age_group,
    teamType: team_type,
    nationId: nation_id,
  };
}

export function mapNationalTeamDetailResponse(
  nationalTeam: DbNationalTeamDetailRow,
): NationalTeamDetailResponse {
  const {
    id,
    gender,
    age_group,
    team_type,
    nation,
    player_national_team_careers,
  } = nationalTeam;

  // Get players that still play here currently
  const filteredPlayerNationalTeamCareers = player_national_team_careers.filter(
    (pntc) => pntc.player_career.left_at === null,
  );

  const squadSize = filteredPlayerNationalTeamCareers.length;

  const marketValues = filteredPlayerNationalTeamCareers.map(
    (pntc) => pntc.player_career.player.market_value,
  );

  const totalMarketValue = marketValues.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  return {
    id,
    name: formatNationalTeamName(nationalTeam),
    gender,
    ageGroup: age_group,
    teamType: team_type,

    nation: mapNationalityWithConfederationResponse(nation),

    squadSize: String(squadSize),
    totalMarketValue: formatEuroValue(totalMarketValue),
  };
}

// Helpers

export function mapNationalTeamResponse(
  nationalTeam: DbNationalTeamRow,
): NationalTeamResponse {
  const { id, gender, age_group, team_type, nation } = nationalTeam;

  return {
    id,
    imageUrl: getImageUrl(
      "nationality",
      STORAGE_BUCKETS.NATIONALITIES,
      nation.image,
    ),
    name: formatNationalTeamName(nationalTeam),
    gender,
    ageGroup: age_group,
    teamType: team_type,
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
