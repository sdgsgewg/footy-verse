import { createClient } from "@/utils/supabase/server";
import { STORAGE_BUCKETS } from "@/lib/storage";
import {
  DbPlayerDetailRow,
  DbPlayerListRow,
  GetPlayersParams,
  PlayerCreateInput,
  PlayerDetailResponse,
  PlayerEditResponse,
  PlayerListItem,
  PlayerLookupResponse,
  PlayerNationalTeamCreateInput,
  PlayerPositionCreateInput,
  PlayerUpdateInput,
} from "@/types/player";
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

const getPlayerCareerTable = () => {
  return ENTITY_CONFIG["playerCareer"]["table"];
};

const getPlayerNationalTeamTable = () => {
  return ENTITY_CONFIG["playerNationalTeam"]["table"];
};

function getPlayersBaseQuery(options?: {
  isClubFiltered?: boolean;
  isNationFiltered?: boolean;
}) {
  const clubJoin = options?.isClubFiltered ? "!inner" : "";
  const nationJoin = options?.isNationFiltered ? "!inner" : "";

  return `
    id,
    image,
    name,
    slug,
    market_value,

    player_positions (
      display_order,
      position:positions!player_positions_position_id_fkey (
        id,
        name
      )
    ),

    player_careers${clubJoin} (
      id,
      joined_at,
      left_at,
      club_id,

      club:clubs!player_careers_club_id_fkey (
        id,
        name,
        image
      ),

      player_shirt_numbers:player_shirt_numbers!player_shirt_numbers_player_career_id_fkey (
        start_date,
        end_date,
        shirt_number
      )
    ),

    player_national_teams${nationJoin} (
      id,
      start_date,
      end_date,
      shirt_number,
      nation_id,
      nationality:nationalities!player_nationalities_nation_id_fkey (
        id,
        name,
        image
      )
    )
  `;
}

/**
 *
 * @param params
 * @returns PlayerListItem[]
 */
export async function getPlayersRepo(
  params: GetPlayersParams,
): Promise<PlayerListItem[]> {
  const supabase = await getSupabase();

  let query = supabase
    .from(getPlayerTable())
    .select(
      getPlayersBaseQuery({
        isClubFiltered: !!params.clubId,
        isNationFiltered: !!params.nationId,
      }),
    )
    .order("name");

  // Filter
  if (params.name) {
    query = query.ilike("name", `%${params.name}%`);
  }

  if (params.nationId) {
    query = query.eq("player_national_teams.nation_id", params.nationId);
  }

  if (params.clubId) {
    query = query.eq("player_careers.club_id", params.clubId);
  }

  const { data, error } = await query.overrideTypes<DbPlayerListRow[]>();

  if (error) throw error;

  return (data ?? []).map(mapPlayerListItem);
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

    player_careers (
      id,
      joined_at,
      left_at,
      club_id,

      club:clubs!player_careers_club_id_fkey (
        id,
        name,
        image
      ),

      player_contracts:player_contracts!player_contracts_player_career_id_fkey (
        contract_start,
        contract_end
      ),

      player_shirt_numbers:player_shirt_numbers!player_shirt_numbers_player_career_id_fkey (
        start_date,
        end_date,
        shirt_number
      )
    ),

    player_national_teams (
      id,
      label,
      start_date,
      end_date,
      shirt_number,
      nation_id,
      nationality:nationalities!player_nationalities_nation_id_fkey (
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

/**
 *
 * @param playerId
 * @param playerNationalTeams
 */
async function insertPlayerNationalTeams(
  playerId: string,
  playerNationalTeams: PlayerNationalTeamCreateInput,
) {
  const supabase = await getSupabase();

  const playerNationalTeamInserts = playerNationalTeams.map((pnt) => ({
    player_id: playerId,
    nation_id: pnt.nation_id,
    label: pnt.label,
    start_date: pnt.start_date,
    end_date: pnt.end_date || null,
    shirt_number: pnt.shirt_number,
  }));
  const { error: playerNationalTeamError } = await supabase
    .from(getPlayerNationalTeamTable())
    .insert(playerNationalTeamInserts);
  if (playerNationalTeamError) throw playerNationalTeamError;
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

  const { market_value, positions, national_teams, ...rest } = player;

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
  if (positions && positions.length > 0) {
    insertPlayerPositions(insertedPlayer.id, positions);
  }

  //  Insert player national teams (table player_national_teams)
  if (national_teams && national_teams.length > 0) {
    insertPlayerNationalTeams(insertedPlayer.id, national_teams);
  }

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

  const { market_value, positions, national_teams, ...rest } = player;

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

  if (positions && positions.length > 0) {
    insertPlayerPositions(id, positions);
  }

  // Nationality History: Delete existing nationalities and insert new ones

  const { error: deleteNatError } = await supabase
    .from(getPlayerNationalTeamTable())
    .delete()
    .eq("player_id", id);
  if (deleteNatError) throw deleteNatError;

  if (national_teams && national_teams.length > 0) {
    insertPlayerNationalTeams(id, national_teams);
  }

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

  const { error: deleteCareerError } = await supabase
    .from(getPlayerCareerTable())
    .delete()
    .eq("player_id", id);
  if (deleteCareerError) throw deleteCareerError;

  const { error: deleteNatError } = await supabase
    .from(getPlayerNationalTeamTable())
    .delete()
    .eq("player_id", id);
  if (deleteNatError) throw deleteNatError;

  const { error: deletePlayerError } = await supabase
    .from(getPlayerTable())
    .delete()
    .eq("id", id);

  if (deletePlayerError) throw deletePlayerError;
}
