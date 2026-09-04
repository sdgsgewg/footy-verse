import { createClient } from "@/utils/supabase/server";
import { STORAGE_BUCKETS } from "@/lib/storage";

import {
  mapGroupedPlayers,
  mapPlayerDetailResponse,
  mapPlayerEditResponse,
  mapPlayerListItem,
} from "../players/mapper";
import { ENTITY_CONFIG } from "@/config/entities";
import { requireEntity } from "./helpers/require-entity";
import { deleteEntityImage, prepareUpdatedImage } from "./helpers/image";
import { slugify } from "@/lib/utils/slugify";
import {
  DbPlayerDetailRow,
  DbPlayerListRow,
  GroupedPlayerFilter,
  GroupedPlayerListItem,
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
import { DbPlayerNationalTeamCareerRow } from "@/types/player-national-team-career";
import { DbPlayerClubTeamCareerRow } from "@/types/player-club-team-career";
import { createEntityActivityLog } from "./activity-logs.repo";
import { ActivityLogAction } from "@/enums/ActivityLogAction";
import { getChangedFields } from "./helpers/get-changed-field";
import { SearchResult } from "@/types/search";
import { DbEntitySearchRow } from "@/types/entity";
import { mapEntitySearchResult } from "../entities/mapper";

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

function getPlayersBaseQuery({
  isPositionFiltered = false,
  isNationFiltered = false,
  isClubTeamFiltered = false,
}: {
  isPositionFiltered: boolean;
  isNationFiltered: boolean;
  isClubTeamFiltered: boolean;
}) {
  const positionFilterJoin = isPositionFiltered
    ? `
      player_positions_filter:player_positions!inner (
        position_id
      ),
    `
    : "";

  const nationFilterJoin = isNationFiltered
    ? `
      player_nationalities_filter:player_nationalities!inner (
        nation_id
      ),
    `
    : "";

  const clubTeamFilterJoin = isClubTeamFiltered
    ? `
      club_team_filter:player_careers!inner (
        left_at,

        player_club_team_career:player_club_team_careers!inner (
          club_team_id
        )
      ),
    `
    : "";

  return `
    id,
    image,
    short_name,
    slug,
    dob,
    market_value,

    ${positionFilterJoin}

    player_positions (
      display_order,
      position_id,

      position:positions!player_positions_position_id_fkey (
        id,
        name,
        display_order,

        category:position_categories (
          id,
          name,
          display_order
        )
      )
    ),

    ${nationFilterJoin}

    player_nationalities (
      display_order,
      nation_id,

      nationality:nationalities!player_nationalities_nationality_id_fkey (
        id,
        name,
        image
      )
    ),

    ${clubTeamFilterJoin}

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

      player_club_team_career:player_club_team_careers (
        id,
        club_team_id,

        club_team:club_teams!player_club_team_careers_club_team_id_fkey (
          id,
          squad_type,
          age_group,

          club:clubs!club_teams_club_id_fkey (
            id,
            short_name,
            image
          )
        ),

        player_contracts (
          id,
          salary,
          contract_start,
          contract_end
        ),

        player_transfer:player_transfers!player_transfers_player_club_team_career_id_fkey (
          id,
          transfer_type
        )
      ),

      player_national_team_career:player_national_team_careers (
        id,
        national_team_id,

        national_team:national_teams!player_national_team_careers_national_team_id_fkey (
          id,
          gender,
          age_group,
          team_type,

          nation:nationalities!national_teams_nation_id_fkey (
            id,
            name,
            image
          )
        )
      )
    )
  `;
}

const sortColumnMap = {
  shortName: "short_name",
  dob: "dob",
  marketValue: "market_value",
} as const;

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
      isPositionFiltered: !!params.positionId,
      isNationFiltered: !!params.nationId,
      isClubTeamFiltered: !!params.clubTeamId,
    }),
    {
      count: "exact",
    },
  );

  // Filter
  if (params.search) {
    query = query.ilike("short_name", `%${params.search}%`);
  }

  if (params.positionId) {
    query = query
      .eq("player_positions_filter.position_id", params.positionId)
      .eq("player_positions.display_order", 1);
  }

  if (params.nationId) {
    query = query
      .eq("player_nationalities_filter.nation_id", params.nationId)
      .eq("player_nationalities.display_order", 1);
  }

  if (params.clubTeamId) {
    query = query
      .eq(
        "club_team_filter.player_club_team_career.club_team_id",
        params.clubTeamId,
      )
      .is("club_team_filter.left_at", null);
  }

  // Sort

  const sortColumn = sortColumnMap[params.sortBy];

  query = query.order(sortColumn, {
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

async function getPlayerIdsByClubTeam(clubTeamId: string): Promise<string[]> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from("player_club_team_careers")
    .select(
      `
      player_career:player_careers!player_club_team_careers_player_career_id_fkey (
        left_at,
        player_id
      )
    `,
    )
    .eq("club_team_id", clubTeamId)
    .is("player_career.left_at", null)
    .overrideTypes<DbPlayerClubTeamCareerRow[]>();

  if (error) {
    throw error;
  }

  return (data ?? [])
    .map((item) => item.player_career?.player_id)
    .filter((playerId): playerId is string => Boolean(playerId));
}

async function getPlayerIdsByNationalTeam(
  nationalTeamId: string,
): Promise<string[]> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from("player_national_team_careers")
    .select(
      `
      player_career:player_careers!player_national_team_careers_player_career_id_fkey (
        player_id
      )
    `,
    )
    .eq("national_team_id", nationalTeamId)
    .is("player_career.left_at", null)
    .overrideTypes<DbPlayerNationalTeamCareerRow[]>();

  if (error) {
    throw error;
  }

  return (data ?? [])
    .map((item) => item.player_career?.player_id)
    .filter((playerId): playerId is string => Boolean(playerId));
}

/**
 *
 * @param params
 * @returns GroupedPlayerListItem[]
 */
export async function getGroupedPlayersRepo(
  params: GroupedPlayerFilter,
): Promise<GroupedPlayerListItem[]> {
  const supabase = await getSupabase();

  // Get player ids from selected club or national team

  let playerIds: string[] | undefined;

  if (params.clubTeamId) {
    playerIds = await getPlayerIdsByClubTeam(params.clubTeamId);

    if (playerIds.length === 0) {
      return [];
    }
  }

  if (params.nationalTeamId) {
    playerIds = await getPlayerIdsByNationalTeam(params.nationalTeamId);

    if (playerIds.length === 0) {
      return [];
    }
  }

  // Base Query

  let query = supabase.from(getPlayerTable()).select(
    getPlayersBaseQuery({
      isPositionFiltered: !!params.positionId,
      isNationFiltered: !!params.nationId,
      isClubTeamFiltered: !!params.clubTeamId,
    }),
  );

  // Filter

  if (playerIds) {
    query = query.in("id", playerIds);
  }

  // Search
  if (params.search) {
    query = query.ilike("short_name", `%${params.search}%`);
  }

  // Position
  if (params.positionId) {
    query = query
      .eq("player_positions.position_id", params.positionId)
      .eq("player_positions.display_order", 1);
  }

  // Nation
  if (params.nationId) {
    query = query.eq("player_nationalities.nation_id", params.nationId);
  }

  // Sort

  const sortColumn = sortColumnMap[params.sortBy];

  query = query.order(sortColumn, {
    ascending: params.sortOrder === "asc",
  });

  // Execute

  const { data, error } = await query.overrideTypes<DbPlayerListRow[]>();

  if (error) {
    throw error;
  }

  if (!data?.length) {
    return [];
  }

  return mapGroupedPlayers(data);
}

/**
 *
 * @param search
 * @param limit
 * @returns SearchResult[]
 */
export async function searchPlayersRepo(
  search: string,
  limit = 5,
): Promise<SearchResult[]> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getPlayerTable())
    .select(
      `
      id,
      name:short_name,
      slug,
      image
    `,
    )
    .ilike("short_name", `%${search}%`)
    .order("short_name", {
      ascending: true,
    })
    .limit(limit)
    .overrideTypes<DbEntitySearchRow[]>();

  if (error) throw error;

  if (!data || data.length === 0) return [];

  return data.map((data) =>
    mapEntitySearchResult(data, "player", STORAGE_BUCKETS.PLAYERS),
  );
}

function getPlayerDetailBaseQuery() {
  return `
    *,

    player_positions (
      display_order,
      position_id,

      position:positions!player_positions_position_id_fkey (
        id,
        name,
        display_order,

        category:position_categories (
          id,
          name,
          display_order
        )
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

      player_club_team_career:player_club_team_careers (
        id,
        club_team_id,
  
        club_team:club_teams!player_club_team_careers_club_team_id_fkey (
          id,
          squad_type,
          age_group,
  
          club:clubs!club_teams_club_id_fkey (
            id,
            short_name,
            image
          )
        ),
  
        player_contracts:player_contracts!player_contracts_player_club_team_career_id_fkey (
          contract_start,
          contract_end
        ),

        player_transfer:player_transfers!player_transfers_player_club_team_career_id_fkey (
          id,
          transfer_type
        )
      ),
  
      player_national_team_career:player_national_team_careers (
        id,
        national_team_id,
  
        national_team:national_teams!player_national_team_careers_national_team_id_fkey (
          id,
          gender,
          age_group,
          team_type,
  
          nation:nationalities!national_teams_nation_id_fkey (
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

  const slug = slugify(player.short_name ?? "");

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

  await createEntityActivityLog({
    action: ActivityLogAction.CREATE,
    entity: "player",
    entityId: result.id,
    name: result.shortName,
  });

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

  const slug = slugify(player.short_name);

  const finalImage = await prepareUpdatedImage({
    oldName: oldPlayer.shortName,
    newName: player.short_name,
    oldImage: oldPlayer.shortName,
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

  const changes = getChangedFields(oldPlayer, result, [
    "fullName",
    "shortName",
    "image",
    "dob",
    "pob",
    "preferredFoot",
    "height",
    "weight",
    "marketValue",
    "positions",
    "nationalities",
  ] as const);

  await createEntityActivityLog({
    action: ActivityLogAction.UPDATE,
    entity: "player",
    entityId: result.id,
    name: result.shortName,
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

  await createEntityActivityLog({
    action: ActivityLogAction.DELETE,
    entity: "player",
    entityId: id,
    name: player.shortName,
  });
}
