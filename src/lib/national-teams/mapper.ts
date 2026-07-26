import {
  DbNationalTeamDetailRow,
  DbNationalTeamListRow,
  NationalTeamDetailResponse,
  NationalTeamEditResponse,
  NationalTeamListItem,
  NationalTeamResponse,
  NationalTeamSummary,
} from "@/types/national-team";
import { getImageUrl } from "../images/image-url";
import { STORAGE_BUCKETS } from "../storage";
import { formatNationalTeamName } from "./formatter";

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
  nationalTeam: DbNationalTeamDetailRow | NationalTeamSummary,
): NationalTeamDetailResponse {
  const { id, team_category, age_group, nation } = nationalTeam;

  return {
    id,
    teamCategory: team_category,
    ageGroup: age_group,

    nation: {
      id: nation.id,
      imageUrl: getImageUrl(
        "nationality",
        STORAGE_BUCKETS.NATIONALITIES,
        nation.image,
      ),
      name: formatNationalTeamName(nationalTeam),
    },
  };
}

export function mapNationalTeam(
  nationalTeam: NationalTeamSummary,
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
