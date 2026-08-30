import { createClient } from "@/utils/supabase/server";
import { STORAGE_BUCKETS } from "../storage";
import { requireEntity } from "./helpers/require-entity";
import { ENTITY_CONFIG } from "@/config/entities";
import { deleteEntityImage, prepareUpdatedImage } from "./helpers/image";
import { slugify } from "@/utils/string";
import {
  DbRegionListRow,
  RegionCreateInput,
  RegionDetailResponse,
  RegionEditResponse,
  RegionFilter,
  RegionListItem,
  RegionLookupResponse,
  RegionUpdateInput,
} from "@/types/region";
import {
  mapRegionDetailResponse,
  mapRegionEditResponse,
  mapRegionListItem,
} from "../regions/mapper";
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
  return ENTITY_CONFIG["region"]["label"];
};

const getTable = () => {
  return ENTITY_CONFIG["region"]["table"];
};

function getRegionsBaseQuery() {
  return `
    id,
    image,
    name,
    slug,
    region_type,
    parent_region_id
  `;
}

/**
 *
 * @param params
 * @returns RegionListItem[]
 */
export async function getRegionsRepo(
  params: RegionFilter,
): Promise<RegionListItem[]> {
  const supabase = await getSupabase();

  // Base Query
  let query = supabase.from(getTable()).select(getRegionsBaseQuery(), {
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

  const { data, error } = await query.overrideTypes<DbRegionListRow[]>();

  if (error) throw error;
  if (!data || data.length === 0) return [];

  const regionMap = new Map(data.map((region) => [region.id, region]));

  return data.map((region) => mapRegionListItem(region, regionMap));
}

/**
 *
 * @returns Option[]
 */
export async function getRegionOptionsRepo(): Promise<Option[]> {
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

  return data.map((data) =>
    mapEntityOption(data, "region", STORAGE_BUCKETS.REGIONS),
  );
}

/**
 *
 * @param id
 * @returns RegionEditResponse | null
 */
export async function getRegionEditRepo(
  id: string,
): Promise<RegionEditResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return mapRegionEditResponse(data);
}

/**
 *
 * @param id
 * @returns RegionDetailResponse | null
 */
export async function getRegionDetailRepo(
  id: string,
): Promise<RegionDetailResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return mapRegionDetailResponse(data);
}

/**
 *
 * @param slug
 * @returns RegionLookupResponse | null
 */
export async function getRegionLookupRepo(
  slug: string,
): Promise<RegionLookupResponse | null> {
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

export async function ensureRegionUniqueRepo({
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
        message: "Region name already exists",
      },
    ],
    ignoreId,
  });

  return slug;
}

/**
 *
 * @param region
 * @returns
 */
export async function createRegionRepo(
  region: RegionCreateInput,
): Promise<RegionDetailResponse> {
  const supabase = await getSupabase();

  const slug = ensureRegionUniqueRepo({
    name: region.name,
  });

  const { data: insertedRegion, error } = await supabase
    .from(getTable())
    .insert({ ...region, slug })
    .select("*")
    .single();

  if (error) throw error;

  const result = await getRegionDetailRepo(insertedRegion.id);

  if (!result) {
    throw new Error("Failed to retrieve created region");
  }

  await createEntityActivityLog({
    action: ActivityLogAction.CREATE,
    entity: "region",
    entityId: result.id,
    name: result.name,
  });

  return result;
}

export async function updateRegionRepo(
  id: string,
  region: RegionUpdateInput,
): Promise<RegionEditResponse> {
  const supabase = await getSupabase();

  const oldRegion = await requireEntity(getRegionEditRepo, id, getLabel());

  const slug = ensureRegionUniqueRepo({
    name: region.name,
    ignoreId: id,
  });

  const finalImage = await prepareUpdatedImage({
    oldName: oldRegion.name,
    newName: region.name,
    oldImage: oldRegion.image,
    newImage: region.image ?? "",
    bucket: STORAGE_BUCKETS.REGIONS,
  });

  const { ...rest } = region;

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

  const result = await getRegionEditRepo(id);

  if (!result) {
    throw new Error("Failed to retrieve updated region");
  }

  const changes = getChangedFields(oldRegion, result, [
    "name",
    "image",
    "regionType",
    "parentRegionId",
  ] as const);

  await createEntityActivityLog({
    action: ActivityLogAction.UPDATE,
    entity: "region",
    entityId: result.id,
    name: result.name,
    metadata: {
      changes,
    },
  });

  return result;
}

export async function deleteRegionRepo(id: string): Promise<void> {
  const supabase = await getSupabase();

  const region = await requireEntity(getRegionEditRepo, id, getLabel());

  await deleteEntityImage(region.image, STORAGE_BUCKETS.REGIONS);

  const { error } = await supabase.from(getTable()).delete().eq("id", id);

  if (error) throw error;

  await createEntityActivityLog({
    action: ActivityLogAction.DELETE,
    entity: "region",
    entityId: id,
    name: region.name,
  });
}
