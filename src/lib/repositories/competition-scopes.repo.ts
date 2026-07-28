import { createClient } from "@/utils/supabase/server";
import { ensureUniqueSlug } from "./helpers/slug";
import { requireEntity } from "./helpers/require-entity";
import { ENTITY_CONFIG } from "@/config/entities";

import { slugify } from "@/utils/string";
import {
  CompetitionScopeCreateInput,
  CompetitionScopeDetailResponse,
  CompetitionScopeEditResponse,
  CompetitionScopeFilter,
  CompetitionScopeListItem,
  CompetitionScopeLookupResponse,
  CompetitionScopeUpdateInput,
} from "@/types/competition-scope";
import {
  mapCompetitionScopeDetailResponse,
  mapCompetitionScopeEditResponse,
  mapCompetitionScopeListItem,
} from "../competition-scopes/mapper";

async function getSupabase() {
  return createClient();
}

const getLabel = () => {
  return ENTITY_CONFIG["competitionScope"]["label"];
};

const getTable = () => {
  return ENTITY_CONFIG["competitionScope"]["table"];
};

/**
 *
 * @param params
 * @returns CompetitionScopeListItem[]
 */
export async function getCompetitionScopesRepo(
  params: CompetitionScopeFilter,
): Promise<CompetitionScopeListItem[]> {
  const supabase = await getSupabase();

  // Base Query

  let query = supabase.from(getTable()).select("*", {
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

  // Execute

  const { data, error } = await query;

  if (error) throw error;

  return (data ?? []).map(mapCompetitionScopeListItem);
}

/**
 *
 * @param id
 * @returns CompetitionScopeEditResponse | null
 */
export async function getCompetitionScopeEditRepo(
  id: string,
): Promise<CompetitionScopeEditResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return mapCompetitionScopeEditResponse(data);
}

/**
 *
 * @param id
 * @returns CompetitionScopeDetailResponse | null
 */
export async function getCompetitionScopeDetailRepo(
  id: string,
): Promise<CompetitionScopeDetailResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return mapCompetitionScopeDetailResponse(data);
}

/**
 *
 * @param slug
 * @returns CompetitionScopeLookupResponse | null
 */
export async function getCompetitionScopeLookupRepo(
  slug: string,
): Promise<CompetitionScopeLookupResponse | null> {
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
 * @param competitionScope
 * @returns CompetitionScopeDetailResponse
 */
export async function createCompetitionScopeRepo(
  competitionScope: CompetitionScopeCreateInput,
): Promise<CompetitionScopeDetailResponse> {
  const supabase = await getSupabase();

  const slug = await ensureUniqueSlug({
    table: getTable(),
    name: competitionScope.name,
  });

  const { data: insertedCompetitionScope, error } = await supabase
    .from(getTable())
    .insert({ ...competitionScope, slug })
    .select("*")
    .single();

  if (error) throw error;

  const result = await getCompetitionScopeDetailRepo(
    insertedCompetitionScope.id,
  );
  if (!result) {
    throw new Error("Failed to retrieve created competition category");
  }

  return result;
}

export async function updateCompetitionScopeRepo(
  id: string,
  competitionScope: CompetitionScopeUpdateInput,
): Promise<CompetitionScopeDetailResponse> {
  const supabase = await getSupabase();

  await requireEntity(getCompetitionScopeDetailRepo, id, getLabel());

  const slug = slugify(competitionScope.name);

  const { error } = await supabase
    .from(getTable())
    .update({
      ...competitionScope,
      slug,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;

  const result = await getCompetitionScopeDetailRepo(id);
  if (!result) {
    throw new Error("Failed to retrieve updated competition category");
  }

  return result;
}

export async function deleteCompetitionScopeRepo(id: string): Promise<void> {
  const supabase = await getSupabase();

  await requireEntity(getCompetitionScopeDetailRepo, id, getLabel());

  const { error } = await supabase.from(getTable()).delete().eq("id", id);

  if (error) throw error;
}
