import { createClient } from "@/utils/supabase/server";
import { STORAGE_BUCKETS } from "../storage";
import {
  ClubCreateInput,
  ClubDetailResponse,
  ClubEditResponse,
  ClubFilter,
  ClubLookupResponse,
  ClubUpdateInput,
  DbClubDetailRow,
  DbClubListRow,
} from "@/types/club";
import { requireEntity } from "./helpers/require-entity";
import { ENTITY_CONFIG } from "@/config/entities";
import { deleteEntityImage, prepareUpdatedImage } from "./helpers/image";
import {
  mapClubDetailResponse,
  mapClubEditResponse,
  mapClubListItem,
} from "../clubs/mapper";
import { ClubTeamCreateInput } from "@/types/club-team";
import { SquadType } from "@/enums/SquadType";
import { ClubListResponse } from "@/types/club/responses";
import { createPaginatedResponse } from "../pagination";
import { slugify } from "@/lib/utils/slugify";
import { createEntityActivityLog } from "./activity-logs.repo";
import { ActivityLogAction } from "@/enums/ActivityLogAction";
import { getChangedFields } from "./helpers/get-changed-field";
import { ensureUniqueFieldsRepo } from "./helpers/uniqueness";
import { SearchResult } from "@/types/search";
import { DbEntitySearchRow } from "@/types/entity";
import { mapEntitySearchResult } from "../entities/mapper";

async function getSupabase() {
  return createClient();
}

const getClubLabel = () => {
  return ENTITY_CONFIG["club"]["label"];
};

const getClubTable = () => {
  return ENTITY_CONFIG["club"]["table"];
};

const getClubTeamTable = () => {
  return ENTITY_CONFIG["clubTeam"]["table"];
};

function getClubsBaseQuery(options?: { isNationFiltered?: boolean }) {
  const nationJoin = options?.isNationFiltered ? "!inner" : "";

  return `
    id,
    image,
    name,
    slug,

    nation:nationalities!clubs_nation_id_fkey${nationJoin} (
      id,
      name,
      image
    )
  `;
}

/**
 *
 * @param params
 * @returns ClubListResponse
 */
export async function getClubsRepo(
  params: ClubFilter,
): Promise<ClubListResponse> {
  const supabase = await getSupabase();

  // Base Query
  let query = supabase.from(getClubTable()).select(
    getClubsBaseQuery({
      isNationFiltered: !!params.nationId,
    }),
    {
      count: "exact",
    },
  );

  // Filter
  if (params.search) {
    query = query.ilike("name", `%${params.search}%`);
  }

  if (params.nationId) {
    query = query.eq("nation.id", params.nationId);
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

  const { data, error, count } = await query.overrideTypes<DbClubListRow[]>();

  if (error) throw error;

  return createPaginatedResponse({
    items: (data ?? []).map(mapClubListItem),
    count,
    page: params.page,
    limit: params.limit,
  });
}

/**
 *
 * @param search
 * @param limit
 * @returns SearchResult[]
 */
export async function searchClubsRepo(
  search: string,
  limit = 5,
): Promise<SearchResult[]> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getClubTable())
    .select(
      `
      id,
      name,
      slug,
      image
    `,
    )
    .ilike("name", `%${search}%`)
    .order("name", {
      ascending: true,
    })
    .limit(limit)
    .overrideTypes<DbEntitySearchRow[]>();

  if (error) throw error;

  if (!data || data.length === 0) return [];

  return data.map((data) =>
    mapEntitySearchResult(data, "club", STORAGE_BUCKETS.CLUBS),
  );
}

function getClubDetailBaseQuery() {
  return `
    *,

    nation:nationalities!clubs_nation_id_fkey(
      id,
      name,
      image
    )
  `;
}

/**
 *
 * @param id
 * @returns ClubEditResponse | null
 */
export async function getClubEditRepo(
  id: string,
): Promise<ClubEditResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getClubTable())
    .select(getClubDetailBaseQuery())
    .eq("id", id)
    .maybeSingle()
    .overrideTypes<DbClubDetailRow>();

  if (error) throw error;
  if (!data) return null;

  return mapClubEditResponse(data);
}

/**
 *
 * @param id
 * @returns ClubDetailResponse | null
 */
export async function getClubDetailRepo(
  id: string,
): Promise<ClubDetailResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getClubTable())
    .select(getClubDetailBaseQuery())
    .eq("id", id)
    .maybeSingle()
    .overrideTypes<DbClubDetailRow>();

  if (error) throw error;
  if (!data) return null;

  return mapClubDetailResponse(data);
}

/**
 *
 * @param id
 * @returns ClubLookupResponse
 */
export async function getClubLookupRepo(
  slug: string,
): Promise<ClubLookupResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getClubTable())
    .select(`id, slug`)
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return data;
}

export async function ensureClubUniqueRepo({
  name,
  ignoreId,
}: {
  name: string;
  ignoreId?: string;
}): Promise<string> {
  const slug = slugify(name);

  await ensureUniqueFieldsRepo({
    table: getClubTable(),
    fields: [
      {
        field: "slug",
        value: slug,
        message: "Club name already exists",
      },
    ],
    ignoreId,
  });

  return slug;
}

/**
 *
 * @param clubId
 */
async function insertClubTeam(clubId: string) {
  const supabase = await getSupabase();

  const clubTeamInsert: ClubTeamCreateInput = {
    squad_type: SquadType.FIRST_TEAM,
    age_group: "",
    club_id: clubId,
  };

  const { error } = await supabase
    .from(getClubTeamTable())
    .insert(clubTeamInsert);

  if (error) throw error;
}

/**
 *
 * @param club
 * @returns ClubDetailResponse
 */
export async function createClubRepo(
  club: ClubCreateInput,
): Promise<ClubDetailResponse> {
  const supabase = await getSupabase();

  const slug = await ensureClubUniqueRepo({
    name: club.name,
  });

  const { data: insertedClub, error } = await supabase
    .from(getClubTable())
    .insert({ ...club, slug })
    .select(`*`)
    .single();

  if (error) throw error;

  // Auto insert club first team
  insertClubTeam(insertedClub.id);

  const result = await getClubDetailRepo(insertedClub.id);
  if (!result) {
    throw new Error("Failed to retrieve created club");
  }

  await createEntityActivityLog({
    action: ActivityLogAction.CREATE,
    entity: "club",
    entityId: result.id,
    name: result.name,
  });

  return result;
}

/**
 *
 * @param id
 * @param club
 * @returns ClubEditResponse
 */
export async function updateClubRepo(
  id: string,
  club: ClubUpdateInput,
): Promise<ClubEditResponse> {
  const supabase = await getSupabase();

  const oldClub = await requireEntity(getClubEditRepo, id, getClubLabel());

  const slug = await ensureClubUniqueRepo({
    name: club.name,
    ignoreId: id,
  });

  const finalImage = await prepareUpdatedImage({
    oldName: oldClub.name,
    newName: club.name,
    oldImage: oldClub.image,
    newImage: club.image ?? "",
    bucket: STORAGE_BUCKETS.CLUBS,
  });

  const { error } = await supabase
    .from(getClubTable())
    .update({
      name: club.name,
      nation_id: club.nation_id,
      image: finalImage,
      slug,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;

  const result = await getClubEditRepo(id);
  if (!result) {
    throw new Error("Failed to retrieve updated club");
  }

  const changes = getChangedFields(oldClub, result, [
    "name",
    "image",
    "nationId",
  ] as const);

  await createEntityActivityLog({
    action: ActivityLogAction.UPDATE,
    entity: "club",
    entityId: result.id,
    name: result.name,
    metadata: {
      changes,
    },
  });

  return result;
}

/**
 *
 * @param id
 */
export async function deleteClubRepo(id: string): Promise<void> {
  const supabase = await getSupabase();

  const club = await requireEntity(getClubEditRepo, id, getClubLabel());

  await deleteEntityImage(club.image, STORAGE_BUCKETS.CLUBS);

  const { error } = await supabase.from(getClubTable()).delete().eq("id", id);

  if (error) throw error;

  await createEntityActivityLog({
    action: ActivityLogAction.DELETE,
    entity: "club",
    entityId: id,
    name: club.name,
  });
}
