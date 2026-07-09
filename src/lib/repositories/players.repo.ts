import { slugify } from "@/common/utils/slug.util";
import { type Tables } from "@/lib/database.types";
import { createClient } from "@/utils/supabase/server";
import {
  createPlayerSchema,
  playersQuerySchema,
  updatePlayerSchema,
} from "@/lib/validations/players.schema";
import { renameImage, tryDeleteImage } from "@/lib/services/storage.service";
import z from "zod";
import { STORAGE_BUCKETS } from "@/lib/storage";
import { createPlayerPositionSchema } from "../validations/player-positions.schema";
import { createPlayerCareerSchema } from "../validations/player-careers.schema";
import { createPlayerNationalTeamSchema } from "../validations/player-national-teams.schema";

export type Player = Tables<"players">;
export type PlayerCreateInput = z.infer<typeof createPlayerSchema>;
export type PlayerUpdateInput = z.infer<typeof updatePlayerSchema>;

type PlayerPositionInsertInput = z.infer<typeof createPlayerPositionSchema>;
type PlayerCareerInsertInput = z.infer<typeof createPlayerCareerSchema>;
type PlayerNationalTeamInsertInput = z.infer<
  typeof createPlayerNationalTeamSchema
>;

type GetPlayersParams = z.infer<typeof playersQuerySchema>;

export type PlayerPosition = Tables<"player_positions"> & {
  position: Tables<"positions">;
};
type PlayerCareer = Tables<"player_careers"> & {
  club: Tables<"clubs">;
};
type PlayerNationalTeam = Tables<"player_national_teams"> & {
  nationality: Tables<"nationalities">;
};

export type PlayerWithDetails = Player & {
  positions: PlayerPosition[];
  careers: PlayerCareer[];
  national_teams: PlayerNationalTeam[];
};

type DbClub = Tables<"clubs">;
type DbNationality = Tables<"nationalities">;
type DbPosition = Tables<"positions">;
type DbPlayerPosition = Tables<"player_positions"> & {
  position: DbPosition | null;
};
type DbPlayerCareer = Tables<"player_careers"> & {
  club: DbClub | null;
};
type DbPlayerNationalTeam = Tables<"player_national_teams"> & {
  nationality: DbNationality | null;
};
type DbPlayerResponse = Tables<"players"> & {
  player_positions: DbPlayerPosition[];
  player_careers: DbPlayerCareer[];
  player_national_teams: DbPlayerNationalTeam[];
};

function mapPlayerResponse(player: DbPlayerResponse): PlayerWithDetails {
  const mappedPositions: PlayerPosition[] = [];
  if (player.player_positions) {
    for (const pp of player.player_positions) {
      const position = Array.isArray(pp.position)
        ? pp.position[0]
        : pp.position;

      if (position) {
        mappedPositions.push({
          id: pp.id,
          player_id: pp.player_id,
          position_id: pp.position_id,
          display_order: pp.display_order,
          created_at: pp.created_at,
          updated_at: pp.updated_at,
          position,
        });
      }
    }
  }

  const mappedCareers: PlayerCareer[] = [];
  if (player.player_careers) {
    for (const pc of player.player_careers) {
      const club = Array.isArray(pc.club) ? pc.club[0] : pc.club;

      if (club) {
        mappedCareers.push({
          id: pc.id,
          player_id: pc.player_id,
          club_id: pc.club_id,
          joined_at: pc.joined_at,
          left_at: pc.left_at,
          is_current: pc.is_current,
          created_at: pc.created_at,
          updated_at: pc.updated_at,
          club,
        });
      }
    }
  }

  const mappedNationalTeams: PlayerNationalTeam[] = [];
  if (player.player_national_teams) {
    for (const pn of player.player_national_teams) {
      const nationality = Array.isArray(pn.nationality)
        ? pn.nationality[0]
        : pn.nationality;

      if (nationality) {
        mappedNationalTeams.push({
          id: pn.id,
          player_id: pn.player_id,
          nation_id: pn.nation_id,
          start_date: pn.start_date,
          end_date: pn.end_date,
          label: pn.label,
          shirt_number: pn.shirt_number,
          created_at: pn.created_at,
          updated_at: pn.updated_at,
          nationality,
        });
      }
    }
  }

  const data: PlayerWithDetails = {
    id: player.id,
    image: player.image,
    name: player.name,
    slug: player.slug,
    dob: player.dob,
    pob: player.pob,
    preferred_foot: player.preferred_foot,
    height: player.height,
    weight: player.weight,
    market_value: player.market_value,
    created_at: player.created_at,
    updated_at: player.updated_at,
    positions: mappedPositions.sort(
      (a, b) => a.display_order - b.display_order,
    ),
    careers: mappedCareers,
    national_teams: mappedNationalTeams,
  };

  return data;
}

async function getSupabase() {
  return createClient();
}

async function ensureUniquePlayer(params: {
  name: string;
  slug: string;
  ignoreId?: string;
}) {
  const supabase = await getSupabase();

  let nameQuery = supabase
    .from("players")
    .select("id")
    .eq("name", params.name)
    .limit(1);

  if (params.ignoreId) {
    nameQuery = nameQuery.neq("id", params.ignoreId);
  }

  const { data: existingName, error: nameError } =
    await nameQuery.maybeSingle();

  if (nameError) throw nameError;
  if (existingName) {
    throw new Error("Player name already exists");
  }

  let slugQuery = supabase
    .from("players")
    .select("id")
    .eq("slug", params.slug)
    .limit(1);

  if (params.ignoreId) {
    slugQuery = slugQuery.neq("id", params.ignoreId);
  }

  const { data: existingSlug, error: slugError } =
    await slugQuery.maybeSingle();

  if (slugError) throw slugError;
  if (existingSlug) {
    throw new Error("Player slug already exists");
  }
}

export async function getPlayersRepo(
  params: GetPlayersParams,
): Promise<PlayerWithDetails[]> {
  const supabase = await getSupabase();

  let query = supabase
    .from("players")
    .select(
      `
      id,
      image,
      name,
      slug,
      dob,
      pob,
      preferred_foot,
      height,
      weight,
      market_value,
      created_at,
      updated_at,
    .player_careers (
        id,
        player_id,
        club_id,
        start_date,
        end_date,
        shirt_number,
        created_at,
        updated_at,
        club:clubs (
          id,
          name,
          slug,
          image,
          created_at,
          updated_at
        )
      ),
      player_national_teams (
        id,
        player_id,
        nation_id,
        start_date,
        end_date,
        shirt_number,
        created_at,
        updated_at,
        nationality:nationalities (
          id,
          name,
          slug,
          image,
          created_at,
          updated_at
        )
      ),
      player_positions (
        id,
        player_id,
        position_id,
        display_order,
        created_at,
        updated_at,
        position:positions (
          id,
          name,
          slug,
          created_at,
          updated_at
        )
      )
    `,
    )
    .order("name");

  if (params.name) {
    query = query.ilike("name", `%${params.name}%`);
  }

  const { data, error } = await query;

  if (error) throw error;

  return ((data as unknown as DbPlayerResponse[]) || []).map(mapPlayerResponse);
}

export async function getPlayerByIdRepo(
  id: string,
): Promise<PlayerWithDetails | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from("players")
    .select(
      `
      id,
      image,
      name,
      slug,
      dob,
      pob,
      preferred_foot,
      height,
      weight,
      market_value,
      created_at,
      updated_at,
    .player_careers (
        id,
        player_id,
        club_id,
        start_date,
        end_date,
        shirt_number,
        created_at,
        updated_at,
        club:clubs (
          id,
          name,
          slug,
          image,
          created_at,
          updated_at
        )
      ),
      player_national_teams (
        id,
        player_id,
        nation_id,
        start_date,
        end_date,
        shirt_number,
        created_at,
        updated_at,
        nationality:nationalities (
          id,
          name,
          slug,
          image,
          created_at,
          updated_at
        )
      ),
      player_positions (
        id,
        player_id,
        position_id,
        display_order,
        created_at,
        updated_at,
        position:positions (
          id,
          name,
          slug,
          created_at,
          updated_at
        )
      )
    `,
    )
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return mapPlayerResponse(data as unknown as DbPlayerResponse);
}

async function insertPlayerPositions(
  playerId: string,
  playerPositions: PlayerPositionInsertInput[],
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

async function insertPlayerCareers(
  playerId: string,
  playerCareers: PlayerCareerInsertInput[],
) {
  const supabase = await getSupabase();

  const playerCareerInserts = playerCareers.map((pc) => ({
    player_id: playerId,
    club_id: pc.club_id,
    joied_at: pc.joined_at,
    left_at: pc.left_at || null,
    is_current: pc.is_current,
  }));
  const { error: playerCareerError } = await supabase
    .from("player_careers")
    .insert(playerCareerInserts);
  if (playerCareerError) throw playerCareerError;
}

async function insertPlayerNationalTeams(
  playerId: string,
  playerNationalTeams: PlayerNationalTeamInsertInput[],
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
): Promise<PlayerWithDetails> {
  const supabase = await getSupabase();

  const slug = slugify(player.name);

  await ensureUniquePlayer({
    name: player.name,
    slug,
  });

  const {
    market_value,
    player_positions,
    player_careers,
    player_national_teams,
    ...rest
  } = player;

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
  if (player_positions && player_positions.length > 0) {
    insertPlayerPositions(insertedPlayer.id, player_positions);
  }

  //  Insert player careers (table.player_careers)
  if (player_careers && player_careers.length > 0) {
    insertPlayerCareers(insertedPlayer.id, player_careers);
  }

  //  Insert player national teams (table player_national_teams)
  if (player_national_teams && player_national_teams.length > 0) {
    insertPlayerNationalTeams(insertedPlayer.id, player_national_teams);
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
): Promise<PlayerWithDetails> {
  const supabase = await getSupabase();
  const oldPlayer = await getPlayerByIdRepo(id);
  const slug = slugify(player.name);

  if (!oldPlayer) {
    throw new Error("Player not found");
  }

  await ensureUniquePlayer({ name: player.name, slug, ignoreId: id });

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

  const {
    market_value,
    player_positions,
    player_careers,
    player_national_teams,
    ...rest
  } = player;

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

  if (player_positions && player_positions.length > 0) {
    insertPlayerPositions(id, player_positions);
  }

  // Club History: Delete existing clubs and insert new ones

  const { error: deleteCareerError } = await supabase
    .from("player_careers")
    .delete()
    .eq("player_id", id);
  if (deleteCareerError) throw deleteCareerError;

  if (player_careers && player_careers.length > 0) {
    insertPlayerCareers(id, player_careers);
  }

  // Nationality History: Delete existing nationalities and insert new ones

  const { error: deleteNatError } = await supabase
    .from("player_national_teams")
    .delete()
    .eq("player_id", id);
  if (deleteNatError) throw deleteNatError;

  if (player_national_teams && player_national_teams.length > 0) {
    insertPlayerNationalTeams(id, player_national_teams);
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
