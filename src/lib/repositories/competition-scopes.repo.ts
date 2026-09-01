import { createClient } from "@/utils/supabase/server";
import { requireEntity } from "./helpers/require-entity";
import { ENTITY_CONFIG } from "@/config/entities";

import { slugify } from "@/lib/utils/slugify";
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
import { createEntityActivityLog } from "./activity-logs.repo";
import { ActivityLogAction } from "@/enums/ActivityLogAction";
import { getChangedFields } from "./helpers/get-changed-field";
import { Option } from "@/types/option";
import { mapEntityOption } from "../entities/mapper";
import { ensureUniqueFieldsRepo } from "./helpers/uniqueness";

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
 * @returns Option[]
 */
export async function getCompetitionScopeOptionsRepo(): Promise<Option[]> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select(
      `
      id,
      name
    `,
    )
    .order("name", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  if (!data || data.length === 0) return [];

  return data.map((data) => mapEntityOption(data, "competitionScope"));
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

export async function ensureCompetitionScopeUniqueRepo({
  name,
  ignoreId,
}: {
  name: string;
  ignoreId?: string;
}): Promise<string> {
  const slug = slugify(name);

  await ensureUniqueFieldsRepo({
    table: getTable(),
    fields: [
      {
        field: "slug",
        value: slug,
        message: "Competition scope name already exists",
      },
    ],
    ignoreId,
  });

  return slug;
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

  const slug = await ensureCompetitionScopeUniqueRepo({
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
    throw new Error("Failed to retrieve created competition scope");
  }

  await createEntityActivityLog({
    action: ActivityLogAction.CREATE,
    entity: "competitionScope",
    entityId: result.id,
    name: result.name,
  });

  return result;
}

export async function updateCompetitionScopeRepo(
  id: string,
  competitionScope: CompetitionScopeUpdateInput,
): Promise<CompetitionScopeDetailResponse> {
  const supabase = await getSupabase();

  const oldCompetitionScope = await requireEntity(
    getCompetitionScopeDetailRepo,
    id,
    getLabel(),
  );

  const slug = await ensureCompetitionScopeUniqueRepo({
    name: competitionScope.name,
    ignoreId: id,
  });

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
    throw new Error("Failed to retrieve updated competition scope");
  }

  const changes = getChangedFields(oldCompetitionScope, result, [
    "name",
    "description",
  ] as const);

  await createEntityActivityLog({
    action: ActivityLogAction.UPDATE,
    entity: "competitionScope",
    entityId: result.id,
    name: result.name,
    metadata: {
      changes,
    },
  });

  return result;
}

export async function deleteCompetitionScopeRepo(id: string): Promise<void> {
  const supabase = await getSupabase();

  const competitionScope = await requireEntity(
    getCompetitionScopeDetailRepo,
    id,
    getLabel(),
  );

  const { error } = await supabase.from(getTable()).delete().eq("id", id);

  if (error) throw error;

  await createEntityActivityLog({
    action: ActivityLogAction.DELETE,
    entity: "competitionScope",
    entityId: id,
    name: competitionScope.name,
  });
}
