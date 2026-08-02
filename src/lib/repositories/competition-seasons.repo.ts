import { ENTITY_CONFIG } from "@/config/entities";
import {
  CompetitionSeasonCreateInput,
  CompetitionSeasonDetailResponse,
  CompetitionSeasonEditResponse,
  CompetitionSeasonFilter,
  CompetitionSeasonListItem,
  CompetitionSeasonLookupResponse,
  CompetitionSeasonUpdateInput,
  DbCompetitionSeasonDetailRow,
  DbCompetitionSeasonListRow,
} from "@/types/competition-season";
import { createClient } from "@/utils/supabase/server";
import {
  mapCompetitionSeasonDetailResponse,
  mapCompetitionSeasonEditResponse,
  mapCompetitionSeasonListItem,
} from "../competition-seasons/mapper";
import { slugify } from "@/utils/string";
import { requireEntity } from "./helpers/require-entity";

async function getSupabase() {
  return createClient();
}

const getLabel = () => {
  return ENTITY_CONFIG["competitionSeason"]["label"];
};

const getTable = () => {
  return ENTITY_CONFIG["competitionSeason"]["table"];
};

function getCompetitionSeasonsBaseQuery() {
  return `
    id,
    image,
    name,
    season_label,
    slug,
    status,
    start_date,
    end_date,
    competition_id,

    winner_club_team:club_teams (
      id,
      squad_type,
      age_group,

      club: clubs (
        id,
        name,
        image
      )
    ),

    winner_national_team:national_teams (
      id,
      gender,
      age_group,
      team_type,

      nation:nationalities (
        id,
        name,
        image
      )
    )
  `;
}

/**
 *
 * @param competitionId
 * @param params
 * @returns CompetitionListResponse
 */
export async function getCompetitionSeasonsRepo(
  competitionId: string,
  params: CompetitionSeasonFilter,
): Promise<CompetitionSeasonListItem[]> {
  const supabase = await getSupabase();

  // Base Query
  let query = supabase
    .from(getTable())
    .select(getCompetitionSeasonsBaseQuery())
    .eq("competition_id", competitionId);

  // Filter

  if (params.search) {
    query = query.ilike("name", `%${params.search}%`);
  }

  // Sort

  query = query.order(params.sortBy, {
    ascending: params.sortOrder === "asc",
  });

  // Execute

  const { data, error } =
    await query.overrideTypes<DbCompetitionSeasonListRow[]>();

  if (error) throw error;
  if (!data || data.length === 0) return [];

  return data.map(mapCompetitionSeasonListItem);
}

function getCompetitionSeasonDetailBaseQuery() {
  return `
    *,

    winner_club_team:club_teams (
      id,
      squad_type,
      age_group,

      club: clubs (
        id,
        name,
        image
      )
    ),

    winner_national_team:national_teams (
      id,
      gender,
      age_group,
      team_type,

      nation:nationalities (
        id,
        name,
        image
      )
    )
  `;
}

/**
 *
 * @param id
 * @returns CompetitionSeasonEditResponse | null
 */
export async function getCompetitionSeasonEditRepo(
  id: string,
): Promise<CompetitionSeasonEditResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select(getCompetitionSeasonDetailBaseQuery())
    .eq("id", id)
    .maybeSingle()
    .overrideTypes<DbCompetitionSeasonDetailRow>();

  if (error) throw error;
  if (!data) return null;

  return mapCompetitionSeasonEditResponse(data);
}

/**
 *
 * @param id
 * @returns CompetitionSeasonDetailResponse | null
 */
export async function getCompetitionSeasonDetailRepo(
  id: string,
): Promise<CompetitionSeasonDetailResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select(getCompetitionSeasonDetailBaseQuery())
    .eq("id", id)
    .maybeSingle()
    .overrideTypes<DbCompetitionSeasonDetailRow>();

  if (error) throw error;
  if (!data) return null;

  return mapCompetitionSeasonDetailResponse(data);
}

/**
 *
 * @param slug
 * @returns CompetitionSeasonLookupResponse | null
 */
export async function getCompetitionSeasonLookupRepo(
  slug: string,
): Promise<CompetitionSeasonLookupResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select(`id, slug`)
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return data;
}

/**
 *
 * @param competitionId
 * @param competitionSeason
 * @returns CompetitionSeasonDetailResponse
 */
export async function createCompetitionSeasonRepo(
  competitionId: string,
  competitionSeason: CompetitionSeasonCreateInput,
): Promise<CompetitionSeasonDetailResponse> {
  const supabase = await getSupabase();

  const slug = slugify(competitionSeason.name);

  const { data: insertedCompetitionSeason, error } = await supabase
    .from(getTable())
    .insert({ ...competitionSeason, slug, competition_id: competitionId })
    .select("*")
    .single();

  if (error) throw error;

  const result = await getCompetitionSeasonDetailRepo(
    insertedCompetitionSeason.id,
  );

  if (!result) {
    throw new Error("Failed to retrieve created competition season");
  }

  return result;
}

/**
 *
 * @param id
 * @param competitionId
 * @param competitionSeason
 * @returns CompetitionSeasonDetailResponse
 */
export async function updateCompetitionSeasonRepo(
  id: string,
  competitionId: string,
  competitionSeason: CompetitionSeasonUpdateInput,
): Promise<CompetitionSeasonDetailResponse> {
  const supabase = await getSupabase();

  await requireEntity(getCompetitionSeasonDetailRepo, id, getLabel());

  const slug = slugify(competitionSeason.name);

  const { error } = await supabase
    .from(getTable())
    .update({
      ...competitionSeason,
      slug,
      competition_id: competitionId,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;

  const result = await getCompetitionSeasonDetailRepo(id);

  if (!result) {
    throw new Error("Failed to retrieve updated competition season");
  }

  return result;
}

/**
 *
 * @param id
 */
export async function deleteCompetitionSeasonRepo(id: string): Promise<void> {
  const supabase = await getSupabase();

  await requireEntity(getCompetitionSeasonDetailRepo, id, getLabel());

  const { error } = await supabase.from(getTable()).delete().eq("id", id);

  if (error) throw error;
}
