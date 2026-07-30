import { createClient } from "@/utils/supabase/server";
import { STORAGE_BUCKETS } from "../storage";
import { requireEntity } from "./helpers/require-entity";
import { ENTITY_CONFIG } from "@/config/entities";
import { deleteEntityImage, prepareUpdatedImage } from "./helpers/image";
import { slugify } from "@/utils/string";
import {
  CompetitionCreateInput,
  CompetitionFilter,
  CompetitionUpdateInput,
} from "@/types/competition/inputs";
import {
  CompetitionDetailResponse,
  CompetitionEditResponse,
  CompetitionListResponse,
} from "@/types/competition/responses";
import {
  DbCompetitionDetailRow,
  DbCompetitionListRow,
} from "@/types/competition/query";
import {
  mapCompetitionDetailResponse,
  mapCompetitionEditResponse,
  mapCompetitionListItem,
} from "../competitions/mapper";
import { createPaginatedResponse } from "../pagination";
import { CompetitionLookupResponse } from "@/types/competition";

async function getSupabase() {
  return createClient();
}

const getLabel = () => {
  return ENTITY_CONFIG["competition"]["label"];
};

const getTable = () => {
  return ENTITY_CONFIG["competition"]["table"];
};

function getCompetitionsBaseQuery() {
  return `
    id,
    image,
    name,
    short_name,
    slug,
    gender,
    age_group,
    participant_type,

    category:competition_categories (
      id,
      name
    ),

    scope:competition_scopes (
      id,
      name
    ),

    nationality:nationalities (
      id,
      name,
      image
    ),

    confederation:confederations (
      id,
      name,
      image
    ),

    region:regions (
      id,
      name,
      image
    )
  `;
}

/**
 *
 * @param params
 * @returns CompetitionListResponse
 */
export async function getCompetitionsRepo(
  params: CompetitionFilter,
): Promise<CompetitionListResponse> {
  const supabase = await getSupabase();

  // Base Query
  let query = supabase.from(getTable()).select(getCompetitionsBaseQuery(), {
    count: "exact",
  });

  // Filter
  if (params.search) {
    query = query.ilike("name", `%${params.search}%`);
  }

  // Sort

  query = query.order(params.sortBy, {
    ascending: params.sortOrder === "asc",
  });

  // Pagination

  const from = (params.page - 1) * params.limit;
  const to = from + params.limit - 1;

  query = query.range(from, to);

  // Execute

  const { data, error, count } =
    await query.overrideTypes<DbCompetitionListRow[]>();

  if (error) throw error;

  return createPaginatedResponse({
    items: (data ?? []).map(mapCompetitionListItem),
    count,
    page: params.page,
    limit: params.limit,
  });
}

function getCompetitionDetailBaseQuery() {
  return `
    *,

    category:competition_categories (
      id,
      name
    ),

    scope:competition_scopes (
      id,
      name
    ),

    nationality:nationalities (
      id,
      name,
      image
    ),

    confederation:confederations (
      id,
      name,
      image
    ),

    region:regions (
      id,
      name,
      image
    )
  `;
}

/**
 *
 * @param id
 * @returns CompetitionEditResponse | null
 */
export async function getCompetitionEditRepo(
  id: string,
): Promise<CompetitionEditResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select(getCompetitionDetailBaseQuery())
    .eq("id", id)
    .maybeSingle()
    .overrideTypes<DbCompetitionDetailRow>();

  if (error) throw error;
  if (!data) return null;

  return mapCompetitionEditResponse(data);
}

/**
 *
 * @param id
 * @returns CompetitionDetailResponse | null
 */
export async function getCompetitionDetailRepo(
  id: string,
): Promise<CompetitionDetailResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select(getCompetitionDetailBaseQuery())
    .eq("id", id)
    .maybeSingle()
    .overrideTypes<DbCompetitionDetailRow>();

  if (error) throw error;
  if (!data) return null;

  return mapCompetitionDetailResponse(data);
}

/**
 *
 * @param slug
 * @returns CompetitionLookupResponse | null
 */
export async function getCompetitionLookupRepo(
  slug: string,
): Promise<CompetitionLookupResponse | null> {
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
 * @param competition
 * @returns CompetitionDetailResponse
 */
export async function createCompetitionRepo(
  competition: CompetitionCreateInput,
): Promise<CompetitionDetailResponse> {
  const supabase = await getSupabase();

  const slug = slugify(competition.name);

  const { data: insertedCompetition, error } = await supabase
    .from(getTable())
    .insert({ ...competition, slug })
    .select("*")
    .single();

  if (error) throw error;

  const result = await getCompetitionDetailRepo(insertedCompetition.id);

  if (!result) {
    throw new Error("Failed to retrieve created competition");
  }

  return result;
}

/**
 *
 * @param id
 * @param region
 * @returns CompetitionDetailResponse
 */
export async function updateCompetitionRepo(
  id: string,
  competition: CompetitionUpdateInput,
): Promise<CompetitionDetailResponse> {
  const supabase = await getSupabase();

  const oldCompetition = await requireEntity(
    getCompetitionEditRepo,
    id,
    getLabel(),
  );

  const { image: newImage, ...rest } = competition;

  const slug = slugify(competition.name);

  const finalImage = await prepareUpdatedImage({
    oldName: oldCompetition.name,
    newName: competition.name,
    oldImage: oldCompetition.image,
    newImage: newImage ?? "",
    bucket: STORAGE_BUCKETS.COMPETITIONS,
  });

  const { error } = await supabase
    .from(getTable())
    .update({
      ...rest,
      image: finalImage,
      slug,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;

  const result = await getCompetitionDetailRepo(id);

  if (!result) {
    throw new Error("Failed to retrieve updated competition");
  }

  return result;
}

export async function deleteCompetitionRepo(id: string): Promise<void> {
  const supabase = await getSupabase();

  const competition = await requireEntity(
    getCompetitionEditRepo,
    id,
    getLabel(),
  );

  await deleteEntityImage(competition.image, STORAGE_BUCKETS.COMPETITIONS);

  const { error } = await supabase.from(getTable()).delete().eq("id", id);

  if (error) throw error;
}
