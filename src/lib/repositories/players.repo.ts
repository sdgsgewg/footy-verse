import { createClient } from "@/utils/supabase/server";
import { STORAGE_BUCKETS } from "@/lib/storage";

import {
  mapPlayerDetailResponse,
  mapPlayerEditResponse,
  mapPlayerListItem,
} from "../players/mapper";
import { ENTITY_CONFIG } from "@/config/entities";
import { ensureUniqueSlug } from "./helpers/slug";
import { requireEntity } from "./helpers/require-entity";
import { deleteEntityImage, prepareUpdatedImage } from "./helpers/image";
import { slugify } from "@/utils/string";
import {
  DbPlayerDetailRow,
  DbPlayerListRow,
  PlayerCreateInput,
  PlayerDetailResponse,
  PlayerEditResponse,
  PlayerFilter,
  PlayerListResponse,
  PlayerLookupResponse,
  PlayerNationalityCreateInput,
  PlayerPositionCreateInput,
  PlayerUpdateInput,
} from "@/types/player";
import { createPaginatedResponse } from "../pagination";

async function getSupabase() {
  return createClient();
}

const getPlayerLabel = () => {
  return ENTITY_CONFIG["player"]["label"];
};

const getPlayerTable = () => {
  return ENTITY_CONFIG["player"]["table"];
};

const getPlayerPositionTable = () => {
  return ENTITY_CONFIG["playerPosition"]["table"];
};

const getPlayerNationalityTable = () => {
  return ENTITY_CONFIG["playerNationality"]["table"];
};

function getPlayersBaseQuery(options?: {
  isClubTeamFiltered?: boolean;
  isNationFiltered?: boolean;
}) {
  const clubJoin = options?.isClubTeamFiltered ? "!inner" : "";
  const nationJoin = options?.isNationFiltered ? "!inner" : "";

  return `
    id,
    image,
    name,
    slug,
    market_value,

    player_positions (
      display_order,
      position_id,

      position:positions!player_positions_position_id_fkey (
        id,
        name
      )
    ),

    player_nationalities${nationJoin} (
      display_order,
      nation_id,

      nationality:nationalities!player_nationalities_nationality_id_fkey (
        id,
        name,
        image
      )
    ),

    player_careers (
      id,
      joined_at,
      left_at,
      career_type,

      player_shirt_numbers (
        id,
        shirt_number,
        start_date,
        end_date
      ),

      player_club_career:player_club_careers${clubJoin} (
        id,
        club_team_id,
  
        club_team:club_teams!player_club_careers_club_team_id_fkey (
          id,
          squad_type,
          age_group,
  
          club:clubs!club_teams_club_id_fkey (
            id,
            name,
            image
          )
        ),

        player_contracts (
          id,
          salary,
          contract_start,
          contract_end
        )
      ),
  
      player_national_team_career:player_national_team_careers (
        id,
        national_team_id,
  
        national_team:national_teams!player_national_team_careers_national_team_id_fkey (
          id,
          team_category,
          age_group,
  
          nationality:nationalities!national_teams_nation_id_fkey (
            id,
            name,
            image
          )
        )
      )
    )
  `;
}

/**
 *
 * @param params
 * @returns PlayerListResponse
 */
export async function getPlayersRepo(
  params: PlayerFilter,
): Promise<PlayerListResponse> {
  const supabase = await getSupabase();

  let query = supabase.from(getPlayerTable()).select(
    getPlayersBaseQuery({
      isClubTeamFiltered: !!params.clubTeamId,
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
    query = query.eq("player_nationalities.nation_id", params.nationId);
  }

  if (params.clubTeamId) {
    query = query.eq("player_club_careers.club_team_id", params.clubTeamId);
  }

  if (params.positionId) {
    query = query
      .eq("player_positions.position_id", params.positionId)
      .eq("player_positions.display_order", 1);
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

  const { data, error, count } = await query.overrideTypes<DbPlayerListRow[]>();

  if (error) throw error;

  return createPaginatedResponse({
    items: (data ?? []).map(mapPlayerListItem),
    count,
    page: params.page,
    limit: params.limit,
  });
}

function getPlayerDetailBaseQuery() {
  return `
    *,

    player_positions (
      display_order,

      position:positions!player_positions_position_id_fkey (
        id,
        name
      )
    ),

    player_nationalities (
      display_order,
      nation_id,

      nationality:nationalities!player_nationalities_nationality_id_fkey (
        id,
        name,
        image
      )
    ),

    player_careers (
      id,
      joined_at,
      left_at,
      career_type,
  
      player_shirt_numbers (
        id,
        shirt_number,
        start_date,
        end_date
      ),

      player_club_careers (
        id,
        club_team_id,
  
        club_team:club_teams!player_club_careers_club_team_id_fkey (
          id,
          squad_type,
          age_group,
  
          club:clubs!club_teams_club_id_fkey (
            id,
            name,
            image
          )
        ),
  
        player_contracts:player_contracts!player_contracts_player_club_career_id_fkey (
          contract_start,
          contract_end
        )
      ),
  
      player_national_team_careers (
        id,
        national_team_id,
  
        national_team:national_teams!player_national_team_careers_national_team_id_fkey (
          id,
          team_category,
          age_group,
  
          nationality:nationalities!national_teams_nation_id_fkey (
            id,
            name,
            image
          )
        )
      )
    )
  `;
}

/**
 *
 * @param id
 * @returns PlayerEditResponse | null
 */
export async function getPlayerEditRepo(
  id: string,
): Promise<PlayerEditResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getPlayerTable())
    .select(getPlayerDetailBaseQuery())
    .eq("id", id)
    .maybeSingle()
    .overrideTypes<DbPlayerDetailRow>();

  if (error) throw error;
  if (!data) return null;

  return mapPlayerEditResponse(data);
}

/**
 *
 * @param id
 * @returns PlayerDetailResponse | null
 */
export async function getPlayerDetailRepo(
  id: string,
): Promise<PlayerDetailResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getPlayerTable())
    .select(getPlayerDetailBaseQuery())
    .eq("id", id)
    .maybeSingle()
    .overrideTypes<DbPlayerDetailRow>();

  if (error) throw error;
  if (!data) return null;

  return mapPlayerDetailResponse(data);
}

/**
 *
 * @param slug
 * @returns PlayerLookupResponse
 */
export async function getPlayerLookupRepo(
  slug: string,
): Promise<PlayerLookupResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getPlayerTable())
    .select(`id, slug`)
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return data;
}

/**
 *
 * @param playerId
 * @param playerPositions
 */
async function insertPlayerPositions(
  playerId: string,
  playerPositions: PlayerPositionCreateInput[],
) {
  const supabase = await getSupabase();

  const playerPositionInserts = playerPositions.map((pp, index) => ({
    player_id: playerId,
    position_id: pp.position_id,
    display_order: pp.display_order ?? index + 1,
  }));

  const { error: playerPositionError } = await supabase
    .from(getPlayerPositionTable())
    .insert(playerPositionInserts);
  if (playerPositionError) throw playerPositionError;
}

async function insertPlayerNationalities(
  playerId: string,
  playerNationalities: PlayerNationalityCreateInput[],
) {
  const supabase = await getSupabase();

  const playerNationalityInserts = playerNationalities.map((pn, index) => ({
    player_id: playerId,
    nation_id: pn.nation_id,
    display_order: pn.display_order ?? index + 1,
  }));

  const { error: playerNationalityError } = await supabase
    .from(getPlayerNationalityTable())
    .insert(playerNationalityInserts);
  if (playerNationalityError) throw playerNationalityError;
}

/**
 *
 * @param player
 * @returns PlayerEditResponse
 */
export async function createPlayerRepo(
  player: PlayerCreateInput,
): Promise<PlayerEditResponse> {
  const supabase = await getSupabase();

  const slug = await ensureUniqueSlug({
    table: getPlayerTable(),
    name: player.name,
  });

  const { market_value, positions, nationalities, ...rest } = player;

  const { data: insertedPlayer, error: playerError } = await supabase
    .from(getPlayerTable())
    .insert({
      ...rest,
      slug,
      market_value: market_value,
    })
    .select("id")
    .single();

  if (playerError) throw playerError;

  //  Insert player positions (table player_positions)
  insertPlayerPositions(insertedPlayer.id, positions);

  //  Insert player nationalities (table player_nationalities)
  insertPlayerNationalities(insertedPlayer.id, nationalities);

  const result = await getPlayerEditRepo(insertedPlayer.id);
  if (!result) {
    throw new Error("Failed to retrieve created player");
  }

  return result;
}

/**
 *
 * @param id
 * @param player
 * @returns PlayerEditResponse
 */
export async function updatePlayerRepo(
  id: string,
  player: PlayerUpdateInput,
): Promise<PlayerEditResponse> {
  const supabase = await getSupabase();

  const oldPlayer = await requireEntity(
    getPlayerEditRepo,
    id,
    getPlayerLabel(),
  );

  const slug = slugify(player.name);

  const finalImage = await prepareUpdatedImage({
    oldName: oldPlayer.name,
    newName: player.name,
    oldImage: oldPlayer.name,
    newImage: player.image ?? "",
    bucket: STORAGE_BUCKETS.PLAYERS,
  });

  const { market_value, positions, nationalities, ...rest } = player;

  const { error: playerError } = await supabase
    .from(getPlayerTable())
    .update({
      ...rest,
      image: finalImage,
      slug,
      market_value: market_value,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (playerError) throw playerError;

  // Positions: Delete existing positions and insert new ones

  const { error: deletePosError } = await supabase
    .from(getPlayerPositionTable())
    .delete()
    .eq("player_id", id);
  if (deletePosError) throw deletePosError;

  insertPlayerPositions(id, positions);

  // Nationalities: Delete existing nationalities and insert new ones

  const { error: deleteNationalityError } = await supabase
    .from(getPlayerNationalityTable())
    .delete()
    .eq("player_id", id);
  if (deleteNationalityError) throw deleteNationalityError;

  insertPlayerNationalities(id, nationalities);

  const result = await getPlayerEditRepo(id);
  if (!result) {
    throw new Error("Failed to retrieve updated player");
  }

  return result;
}

/**
 *
 * @param id
 */
export async function deletePlayerRepo(id: string): Promise<void> {
  const supabase = await getSupabase();

  const player = await requireEntity(getPlayerEditRepo, id, getPlayerLabel());

  await deleteEntityImage(player.image, STORAGE_BUCKETS.PLAYERS);

  const { error: deletePosError } = await supabase
    .from(getPlayerPositionTable())
    .delete()
    .eq("player_id", id);
  if (deletePosError) throw deletePosError;

  const { error: deleteNatError } = await supabase
    .from(getPlayerNationalityTable())
    .delete()
    .eq("player_id", id);
  if (deleteNatError) throw deleteNatError;

  const { error: deletePlayerError } = await supabase
    .from(getPlayerTable())
    .delete()
    .eq("id", id);

  if (deletePlayerError) throw deletePlayerError;
}
