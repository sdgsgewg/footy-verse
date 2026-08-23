import { createClient } from "@/utils/supabase/server";
import { STORAGE_BUCKETS } from "../storage";
import {
  DbNationalityDetailRow,
  DbNationalityListRow,
  NationalityCreateInput,
  NationalityDetailResponse,
  NationalityEditResponse,
  NationalityFilter,
  NationalityListResponse,
  NationalityLookupResponse,
  NationalityUpdateInput,
} from "@/types/nationality";
import { requireEntity } from "./helpers/require-entity";
import { ENTITY_CONFIG } from "@/config/entities";
import { deleteEntityImage, prepareUpdatedImage } from "./helpers/image";
import {
  mapNationalityDetailResponse,
  mapNationalityEditResponse,
  mapNationalityListItem,
  mapNationalityOption,
} from "../nationalities/mapper";
import { NationalTeamCreateInput } from "@/types/national-team";
import { AgeGroup } from "@/enums/AgeGroup";
import { createPaginatedResponse } from "../pagination";
import { slugify } from "@/utils/string";
import { Option } from "@/types/option";
import { Gender } from "@/enums/Gender";
import { NationalTeamType } from "@/enums/NationalTeamType";
import { createEntityActivityLog } from "./activity-logs.repo";
import { ActivityLogAction } from "@/enums/ActivityLogAction";
import { getChangedFields } from "./helpers/get-changed-field";
import { ConflictError } from "../errors/http-error";

async function getSupabase() {
  return createClient();
}

const getNationalityLabel = () => {
  return ENTITY_CONFIG["nationality"]["label"];
};

const getNationalityTable = () => {
  return ENTITY_CONFIG["nationality"]["table"];
};

const getNationalTeamTable = () => {
  return ENTITY_CONFIG["nationalTeam"]["table"];
};

function getNationalitiesBaseQuery() {
  return `
    *,

    confederation:confederations (
      id,
      name,
      image
    )
  `;
}

/**
 *
 * @param params
 * @returns NationalityFilter
 */
export async function getNationalitiesRepo(
  params: NationalityFilter,
): Promise<NationalityListResponse> {
  const supabase = await getSupabase();

  // Base Query
  let query = supabase
    .from(getNationalityTable())
    .select(getNationalitiesBaseQuery(), {
      count: "exact",
    });

  // Filter
  if (params.search) {
    query = query.ilike("name", `%${params.search}%`);
  }

  if (params.confederationId) {
    query = query.eq("confederation_id", params.confederationId);
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
    await query.overrideTypes<DbNationalityListRow[]>();

  if (error) throw error;

  return createPaginatedResponse({
    items: (data ?? []).map(mapNationalityListItem),
    count,
    page: params.page,
    limit: params.limit,
  });
}

/**
 *
 * @returns Option[]
 */
export async function getNationalityOptionsRepo(): Promise<Option[]> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getNationalityTable())
    .select(
      `
      id,
      name,
      image
    `,
    )
    .order("name", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  if (!data || data.length === 0) return [];

  return data.map(mapNationalityOption);
}

/**
 *
 * @param id
 * @returns NationalityEditResponse | null
 */
export async function getNationalityEditRepo(
  id: string,
): Promise<NationalityEditResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getNationalityTable())
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return mapNationalityEditResponse(data);
}

function getNationalityDetailQuery() {
  return `
    *,

    confederation:confederations (
      id,
      name,
      image
    )
  `;
}

/**
 *
 * @param id
 * @returns NationalityDetailResponse | null
 */
export async function getNationalityDetailRepo(
  id: string,
): Promise<NationalityDetailResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getNationalityTable())
    .select(getNationalityDetailQuery())
    .eq("id", id)
    .maybeSingle()
    .overrideTypes<DbNationalityDetailRow>();

  if (error) throw error;
  if (!data) return null;

  return mapNationalityDetailResponse(data);
}

/**
 *
 * @param slug
 * @returns NationalityLookupResponse | null
 */
export async function getNationalityLookupRepo(
  slug: string,
): Promise<NationalityLookupResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getNationalityTable())
    .select(`id, slug`)
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return data;
}

/**
 * Provides a friendly, deterministic duplicate error before a mutation.
 * The unique database constraints are still required to handle concurrent
 * requests that can pass this check at the same time.
 */
export async function ensureNationalityUniqueRepo({
  name,
  fifaCode,
  ignoreId,
}: {
  name: string;
  fifaCode: string;
  ignoreId?: string;
}): Promise<string> {
  const supabase = await getSupabase();
  const slug = slugify(name);

  let slugQuery = supabase
    .from(getNationalityTable())
    .select("id")
    .eq("slug", slug)
    .limit(1);
  let fifaCodeQuery = supabase
    .from(getNationalityTable())
    .select("id")
    .eq("fifa_code", fifaCode)
    .limit(1);

  if (ignoreId) {
    slugQuery = slugQuery.neq("id", ignoreId);
    fifaCodeQuery = fifaCodeQuery.neq("id", ignoreId);
  }

  const [slugResult, fifaCodeResult] = await Promise.all([
    slugQuery.maybeSingle(),
    fifaCodeQuery.maybeSingle(),
  ]);

  if (slugResult.error) throw slugResult.error;
  if (fifaCodeResult.error) throw fifaCodeResult.error;

  if (slugResult.data) {
    throw new ConflictError("Nationality name already exists");
  }

  if (fifaCodeResult.data) {
    throw new ConflictError("FIFA code already exists");
  }

  return slug;
}

async function insertNationalTeam(nationId: string) {
  const supabase = await getSupabase();

  const nationalTeamInsert: NationalTeamCreateInput = {
    gender: Gender.MEN,
    age_group: AgeGroup.SENIOR,
    team_type: NationalTeamType.STANDARD,
    nation_id: nationId,
  };

  const { error } = await supabase
    .from(getNationalTeamTable())
    .insert(nationalTeamInsert);

  if (error) throw error;
}

/**
 *
 * @param nationality
 * @returns
 */
export async function createNationalityRepo(
  nationality: NationalityCreateInput,
): Promise<NationalityDetailResponse> {
  const supabase = await getSupabase();

  const slug = await ensureNationalityUniqueRepo({
    name: nationality.name,
    fifaCode: nationality.fifa_code,
  });

  const { data: insertedNationality, error } = await supabase
    .from(getNationalityTable())
    .insert({ ...nationality, slug })
    .select("*")
    .single();

  if (error) throw error;

  // Auto insert national men senior team
  insertNationalTeam(insertedNationality.id);

  const result = await getNationalityDetailRepo(insertedNationality.id);
  if (!result) {
    throw new Error("Failed to retrieve created nationality");
  }

  await createEntityActivityLog({
    action: ActivityLogAction.CREATE,
    entity: "nationality",
    entityId: result.id,
    name: result.name,
  });

  return result;
}

export async function updateNationalityRepo(
  id: string,
  nationality: NationalityUpdateInput,
): Promise<NationalityEditResponse> {
  const supabase = await getSupabase();

  const oldNationality = await requireEntity(
    getNationalityEditRepo,
    id,
    getNationalityLabel(),
  );

  const slug = await ensureNationalityUniqueRepo({
    name: nationality.name,
    fifaCode: nationality.fifa_code,
    ignoreId: id,
  });

  const { image: newImage, ...rest } = nationality;

  const finalImage = await prepareUpdatedImage({
    oldName: oldNationality.name,
    newName: nationality.name,
    oldImage: oldNationality.image,
    newImage: newImage ?? "",
    bucket: STORAGE_BUCKETS.NATIONALITIES,
  });

  const { error } = await supabase
    .from(getNationalityTable())
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

  const result = await getNationalityEditRepo(id);
  if (!result) {
    throw new Error("Failed to retrieve updated nationality");
  }

  const changes = getChangedFields(oldNationality, result, [
    "name",
    "fifaCode",
    "confederationId",
    "image",
  ] as const);

  await createEntityActivityLog({
    action: ActivityLogAction.UPDATE,
    entity: "nationality",
    entityId: result.id,
    name: result.name,
    metadata: {
      changes,
    },
  });

  return result;
}

export async function deleteNationalityRepo(id: string): Promise<void> {
  const supabase = await getSupabase();

  const nationality = await requireEntity(
    getNationalityEditRepo,
    id,
    getNationalityLabel(),
  );

  await deleteEntityImage(nationality.image, STORAGE_BUCKETS.NATIONALITIES);

  const { error } = await supabase
    .from(getNationalityTable())
    .delete()
    .eq("id", id);

  if (error) throw error;

  await createEntityActivityLog({
    action: ActivityLogAction.DELETE,
    entity: "nationality",
    entityId: id,
    name: nationality.name,
  });
}
