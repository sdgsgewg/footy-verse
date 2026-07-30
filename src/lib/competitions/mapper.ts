import { getImageUrl } from "../images/image-url";
import { STORAGE_BUCKETS } from "../storage";
import { mapCompetitionCategoryResponse } from "../competition-categories/mapper";
import { mapCompetitionScopeResponse } from "../competition-scopes/mapper";
import {
  CompetitionDetailResponse,
  CompetitionEditResponse,
  CompetitionListItem,
  CompetitionResponse,
  DbCompetitionDetailRow,
  DbCompetitionListRow,
  DbCompetitionRow,
} from "@/types/competition";
import { mapNationalityToLocationResponse } from "../nationalities/mapper";
import { mapConfederationToLocationResponse } from "../confederations/mapper";
import { mapRegionToLocationResponse } from "../regions/mapper";

export function mapCompetitionListItem(
  competition: DbCompetitionListRow,
): CompetitionListItem {
  const {
    id,
    image,
    name,
    slug,
    category,
    scope,
    participant_type,
    gender,
    confederation,
    nationality,
    region,
  } = competition;

  const location = nationality
    ? mapNationalityToLocationResponse(nationality)
    : confederation
      ? mapConfederationToLocationResponse(confederation)
      : region
        ? mapRegionToLocationResponse(region)
        : null;

  return {
    id,
    imageUrl: getImageUrl("competition", STORAGE_BUCKETS.COMPETITIONS, image),
    name,
    slug,
    participantType: participant_type,
    gender,

    category: mapCompetitionCategoryResponse(category),
    scope: mapCompetitionScopeResponse(scope),
    location,
  };
}

export function mapCompetitionEditResponse(
  competition: DbCompetitionDetailRow,
): CompetitionEditResponse {
  const {
    id,
    image,
    name,
    short_name,
    description,
    founded_year,
    gender,
    age_group,
    participant_type,
    competition_category_id,
    competition_scope_id,
    confederation_id,
    nationality_id,
    region_id,
  } = competition;

  return {
    id,
    image,
    name,
    shortName: short_name ?? "",
    description,
    foundedYear: founded_year,
    gender,
    ageGroup: age_group,
    participantType: participant_type,
    competitionCategoryId: competition_category_id,
    competitionScopeId: competition_scope_id,
    confederationId: confederation_id,
    nationalityId: nationality_id,
    regionId: region_id,
  };
}

export function mapCompetitionDetailResponse(
  competition: DbCompetitionDetailRow,
): CompetitionDetailResponse {
  const {
    id,
    image,
    name,
    slug,
    category,
    scope,
    participant_type,
    gender,
    age_group,
    founded_year,
    confederation,
    nationality,
    region,
  } = competition;

  const location = nationality
    ? mapNationalityToLocationResponse(nationality)
    : confederation
      ? mapConfederationToLocationResponse(confederation)
      : region
        ? mapRegionToLocationResponse(region)
        : null;

  return {
    id,
    imageUrl: getImageUrl("competition", STORAGE_BUCKETS.COMPETITIONS, image),
    name,
    slug,
    participantType: participant_type,
    gender,
    ageGroup: age_group,
    foundedYear: String(founded_year),

    category: mapCompetitionCategoryResponse(category),
    scope: mapCompetitionScopeResponse(scope),
    location,
  };
}

// Helpers

export function mapCompetitionResponse(
  competition: DbCompetitionRow,
): CompetitionResponse {
  const { id, image, name } = competition;

  return {
    id,
    name,
    imageUrl: getImageUrl("competition", STORAGE_BUCKETS.COMPETITIONS, image),
  };
}
