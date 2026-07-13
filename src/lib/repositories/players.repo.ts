import { slugify } from "@/utils/string";
import { createClient } from "@/utils/supabase/server";
import { renameImage, tryDeleteImage } from "@/lib/services/storage.service";
import { STORAGE_BUCKETS } from "@/lib/storage";
import {
  DbPlayerListRow,
  GetPlayersParams,
  PlayerCreateInput,
  PlayerDetailResponse,
  PlayerListItem,
  PlayerNationalTeamCreateInput,
  PlayerPositionCreateInput,
  PlayerUpdateInput,
} from "@/types/player";
import { mapPlayerDetailResponse, mapPlayerListItem } from "../players/mapper";
import { ensureUniqueRecord } from "./helpers/uniqueness";

async function getSupabase() {
  return createClient();
}

export async function getPlayersRepo(
  params: GetPlayersParams,
): Promise<PlayerListItem[]> {
  const supabase = await getSupabase();

  let query = supabase
    .from("players")
    .select(
      `
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

    player_careers (
      joined_at,
      left_at,
      club:clubs!player_careers_club_id_fkey (
        id,
        name,
        image
      )
    ),

    player_national_teams (
      end_date,
      nationality:nationalities!player_nationalities_nation_id_fkey (
        id,
        name,
        image
      )
    )
  `,
    )
    .order("name");

  if (params.name) {
    query = query.ilike("name", `%${params.name}%`);
  }

  const { data, error } = await query.overrideTypes<DbPlayerListRow[]>();

  if (error) throw error;

  return (data ?? []).map(mapPlayerListItem);
}

export async function getPlayerByIdRepo(
  id: string,
): Promise<PlayerDetailResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from("players")
    .select(
      `
        *,
        player_positions(
            *,
            position:positions(*)
        ),
        player_careers(
            *,
            club:clubs(*)
        ),
        player_national_teams(
            *,
            nationality:nationalities(*)
        )
    `,
    )
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return mapPlayerDetailResponse(data);
}

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
    .from("player_positions")
    .insert(playerPositionInserts);
  if (playerPositionError) throw playerPositionError;
}

async function insertPlayerNationalTeams(
  playerId: string,
  playerNationalTeams: PlayerNationalTeamCreateInput[],
) {
  const supabase = await getSupabase();

  const playerNationalTeamInserts = playerNationalTeams.map((pnt) => ({
    player_id: playerId,
    nation_id: pnt.nation_id,
    start_date: pnt.start_date,
    end_date: pnt.end_date || null,
    shirt_number: pnt.shirt_number,
  }));
  const { error: playerNationalTeamError } = await supabase
    .from("player_national_teams")
    .insert(playerNationalTeamInserts);
  if (playerNationalTeamError) throw playerNationalTeamError;
}

export async function createPlayerRepo(
  player: PlayerCreateInput,
): Promise<PlayerDetailResponse> {
  const supabase = await getSupabase();

  const slug = slugify(player.name);

  await ensureUniqueRecord({
    table: "players",
    name: player.name,
    slug,
  });

  const { market_value, positions, national_teams, ...rest } = player;

  const { data: insertedPlayer, error: playerError } = await supabase
    .from("players")
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

  const result = await getPlayerByIdRepo(insertedPlayer.id);
  if (!result) {
    throw new Error("Failed to retrieve created player");
  }

  return result;
}

export async function updatePlayerRepo(
  id: string,
  player: PlayerUpdateInput,
): Promise<PlayerDetailResponse> {
  const supabase = await getSupabase();
  const oldPlayer = await getPlayerByIdRepo(id);
  const slug = slugify(player.name);

  if (!oldPlayer) {
    throw new Error("Player not found");
  }

  await ensureUniqueRecord({
    table: "players",
    name: player.name,
    slug,
    ignoreId: id,
  });

  let finalImage = player.image;

  if (
    oldPlayer.name !== player.name &&
    oldPlayer.image &&
    oldPlayer.image === player.image
  ) {
    finalImage = await renameImage(
      oldPlayer.image,
      player.name,
      STORAGE_BUCKETS.PLAYERS,
    );
  }

  if (oldPlayer.image && oldPlayer.image !== player.image) {
    await tryDeleteImage(oldPlayer.image, STORAGE_BUCKETS.PLAYERS);
  }

  const { market_value, positions, national_teams, ...rest } = player;

  const { error: playerError } = await supabase
    .from("players")
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
    .from("player_positions")
    .delete()
    .eq("player_id", id);
  if (deletePosError) throw deletePosError;

  if (positions && positions.length > 0) {
    insertPlayerPositions(id, positions);
  }

  // Nationality History: Delete existing nationalities and insert new ones

  const { error: deleteNatError } = await supabase
    .from("player_national_teams")
    .delete()
    .eq("player_id", id);
  if (deleteNatError) throw deleteNatError;

  if (national_teams && national_teams.length > 0) {
    insertPlayerNationalTeams(id, national_teams);
  }

  const result = await getPlayerByIdRepo(id);
  if (!result) {
    throw new Error("Failed to retrieve updated player");
  }

  return result;
}

export async function deletePlayerRepo(id: string): Promise<void> {
  const supabase = await getSupabase();

  const player = await getPlayerByIdRepo(id);

  if (player?.image) {
    await tryDeleteImage(player.image, STORAGE_BUCKETS.PLAYERS);
  }

  const { error: deletePosError } = await supabase
    .from("player_positions")
    .delete()
    .eq("player_id", id);
  if (deletePosError) throw deletePosError;

  const { error: deleteCareerError } = await supabase
    .from("player_careers")
    .delete()
    .eq("player_id", id);
  if (deleteCareerError) throw deleteCareerError;

  const { error: deleteNatError } = await supabase
    .from("player_national_teams")
    .delete()
    .eq("player_id", id);
  if (deleteNatError) throw deleteNatError;

  const { error: deletePlayerError } = await supabase
    .from("players")
    .delete()
    .eq("id", id);

  if (deletePlayerError) throw deletePlayerError;
}
