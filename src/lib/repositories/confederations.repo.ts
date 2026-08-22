import { createClient } from "@/utils/supabase/server";
import { STORAGE_BUCKETS } from "../storage";
import { requireEntity } from "./helpers/require-entity";
import { ENTITY_CONFIG } from "@/config/entities";
import { deleteEntityImage, prepareUpdatedImage } from "./helpers/image";
import { slugify } from "@/utils/string";
import {
  ConfederationCreateInput,
  ConfederationDetailResponse,
  ConfederationEditResponse,
  ConfederationFilter,
  ConfederationListItem,
  ConfederationLookupResponse,
  ConfederationUpdateInput,
  DbConfederationDetailRow,
  DbConfederationListRow,
} from "@/types/confederation";
import {
  mapConfederationDetailResponse,
  mapConfederationEditResponse,
  mapConfederationListItem,
  mapConfederationOption,
} from "../confederations/mapper";
import { createEntityActivityLog } from "./activity-logs.repo";
import { ActivityLogAction } from "@/enums/ActivityLogAction";
import { getChangedFields } from "./helpers/get-changed-field";
import { Option } from "@/types/option";

async function getSupabase() {
  return createClient();
}

const getLabel = () => {
  return ENTITY_CONFIG["confederation"]["label"];
};

const getTable = () => {
  return ENTITY_CONFIG["confederation"]["table"];
};

function getConfederationsBaseQuery() {
  return `
    id,
    image,
    name,
    slug,
    founded,

    region:regions!confederations_region_id_fkey (
      id,
      name,
      image
    )
  `;
}

/**
 *
 * @param params
 * @returns ConfederationFilter
 */
export async function getConfederationsRepo(
  params: ConfederationFilter,
): Promise<ConfederationListItem[]> {
  const supabase = await getSupabase();

  // Base Query
  let query = supabase.from(getTable()).select(getConfederationsBaseQuery(), {
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

  const { data, error } = await query.overrideTypes<DbConfederationListRow[]>();

  if (error) throw error;
  if (!data || data.length === 0) return [];

  return data.map(mapConfederationListItem);
}

/**
 *
 * @returns Option[]
 */
export async function getConfederationOptionsRepo(): Promise<Option[]> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
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

  return data.map(mapConfederationOption);
}

function getConfederationDetailBaseQuery() {
  return `
    *,

    region:regions!confederations_region_id_fkey (
      id,
      name,
      image
    )
  `;
}

/**
 *
 * @param id
 * @returns ConfederationEditResponse | null
 */
export async function getConfederationEditRepo(
  id: string,
): Promise<ConfederationEditResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select(getConfederationDetailBaseQuery())
    .eq("id", id)
    .maybeSingle()
    .overrideTypes<DbConfederationDetailRow>();

  if (error) throw error;
  if (!data) return null;

  return mapConfederationEditResponse(data);
}

/**
 *
 * @param id
 * @returns ConfederationDetailResponse | null
 */
export async function getConfederationDetailRepo(
  id: string,
): Promise<ConfederationDetailResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select(getConfederationDetailBaseQuery())
    .eq("id", id)
    .maybeSingle()
    .overrideTypes<DbConfederationDetailRow>();

  if (error) throw error;
  if (!data) return null;

  return mapConfederationDetailResponse(data);
}

/**
 *
 * @param slug
 * @returns ConfederationLookupResponse | null
 */
export async function getConfederationLookupRepo(
  slug: string,
): Promise<ConfederationLookupResponse | null> {
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
 * @param confederation
 * @returns ConfederationDetailResponse
 */
export async function createConfederationRepo(
  confederation: ConfederationCreateInput,
): Promise<ConfederationDetailResponse> {
  const supabase = await getSupabase();

  const slug = slugify(confederation.name);

  const { data: insertedConfederation, error } = await supabase
    .from(getTable())
    .insert({ ...confederation, slug })
    .select("*")
    .single();

  if (error) throw error;

  const result = await getConfederationDetailRepo(insertedConfederation.id);

  if (!result) {
    throw new Error("Failed to retrieve created confederation");
  }

  await createEntityActivityLog({
    action: ActivityLogAction.CREATE,
    entity: "confederation",
    entityId: result.id,
    name: result.name,
  });

  return result;
}

export async function updateConfederationRepo(
  id: string,
  confederation: ConfederationUpdateInput,
): Promise<ConfederationEditResponse> {
  const supabase = await getSupabase();

  const oldConfederation = await requireEntity(
    getConfederationEditRepo,
    id,
    getLabel(),
  );

  const slug = slugify(confederation.name);

  const { image: newImage, ...rest } = confederation;

  const finalImage = await prepareUpdatedImage({
    oldName: oldConfederation.name,
    newName: confederation.name,
    oldImage: oldConfederation.image,
    newImage: newImage ?? "",
    bucket: STORAGE_BUCKETS.CONFEDERATIONS,
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

  const result = await getConfederationEditRepo(id);

  if (!result) {
    throw new Error("Failed to retrieve updated confederation");
  }

  const changes = getChangedFields(oldConfederation, result, [
    "image",
    "name",
    "shortName",
    "regionId",
    "founded",
    "headquarters",
    "website",
  ] as const);

  await createEntityActivityLog({
    action: ActivityLogAction.UPDATE,
    entity: "confederation",
    entityId: result.id,
    name: result.name,
    metadata: {
      changes,
    },
  });

  return result;
}

export async function deleteConfederationRepo(id: string): Promise<void> {
  const supabase = await getSupabase();

  const confederation = await requireEntity(
    getConfederationEditRepo,
    id,
    getLabel(),
  );

  await deleteEntityImage(confederation.image, STORAGE_BUCKETS.CONFEDERATIONS);

  const { error } = await supabase.from(getTable()).delete().eq("id", id);

  if (error) throw error;

  await createEntityActivityLog({
    action: ActivityLogAction.DELETE,
    entity: "confederation",
    entityId: id,
    name: confederation.name,
  });
}
