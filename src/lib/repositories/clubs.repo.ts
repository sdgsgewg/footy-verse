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
import { ensureUniqueSlug } from "./helpers/slug";
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
import { slugify } from "@/utils/string";

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

  const slug = await ensureUniqueSlug({
    table: getClubTable(),
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

  return result;
}

/**
 *
 * @param id
 * @param club
 * @returns ClubDetailResponse
 */
export async function updateClubRepo(
  id: string,
  club: ClubUpdateInput,
): Promise<ClubDetailResponse> {
  const supabase = await getSupabase();

  const oldClub = await requireEntity(getClubEditRepo, id, getClubLabel());

  const slug = slugify(club.name);

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

  const result = await getClubDetailRepo(id);
  if (!result) {
    throw new Error("Failed to retrieve updated club");
  }

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
}
