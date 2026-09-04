import {
  DbPlayerDetailRow,
  DbPlayerListRow,
  GroupedPlayerListItem,
  PlayerDetailResponse,
  PlayerEditResponse,
  PlayerListItem,
} from "@/types/player";

import {
  getCurrentClubTeam,
  getCurrentContract,
  getCurrentNationality,
  getCurrentNationalTeam,
  getCurrentShirtNumber,
  getJoinedAtDate,
  getMainPosition,
  getNationalities,
  getOtherPositions,
} from "./selector";

import { getImageUrl } from "../images/image-url";
import { STORAGE_BUCKETS } from "../storage";
import {
  formatDateOfBirth,
  formatPlayerHeight,
  formatPlayerWeight,
} from "./formatter";
import { formatDate } from "../utils/date";
import { formatEuroValue } from "../formatters/currency";

/**
 *
 * @param player
 * @returns PlayerListItem
 */
export function mapPlayerListItem(player: DbPlayerListRow): PlayerListItem {
  const { short_name, market_value, player_positions, player_nationalities } =
    player;

  const shirtNumber = getCurrentShirtNumber(player);

  const mainPosition = getMainPosition(player_positions);

  const currentNationality = getCurrentNationality(player_nationalities);

  const currentClubTeam = getCurrentClubTeam(player);

  return {
    ...player,
    imageUrl: getImageUrl("player", STORAGE_BUCKETS.PLAYERS, player.image),
    shirtNumber,
    shortName: short_name,
    dob: formatDateOfBirth(player.dob),
    mainPosition,
    currentNationality,
    currentClubTeam: currentClubTeam ?? null,
    marketValue: market_value,
  };
}

/**
 * Group players by their main position category.
 */
export function mapGroupedPlayers(
  players: DbPlayerListRow[],
): GroupedPlayerListItem[] {
  const grouped = new Map<string, GroupedPlayerListItem>();

  for (const player of players) {
    const playerItem = mapPlayerListItem(player);

    const category = playerItem.mainPosition.category;

    const existing = grouped.get(category.id);

    if (existing) {
      existing.players.push(playerItem);
      continue;
    }

    grouped.set(category.id, {
      category,
      players: [playerItem],
    });
  }

  return Array.from(grouped.values())
    .map((group) => ({
      ...group,

      players: [...group.players].sort(
        (a, b) => a.mainPosition.displayOrder - b.mainPosition.displayOrder,
      ),
    }))
    .sort((a, b) => a.category.displayOrder - b.category.displayOrder);
}

export function mapPlayerEditResponse(
  player: DbPlayerDetailRow,
): PlayerEditResponse {
  const {
    full_name,
    short_name,
    preferred_foot,
    market_value,
    player_positions,
    player_nationalities,
  } = player;

  return {
    ...player,

    fullName: full_name,
    shortName: short_name,

    preferredFoot: preferred_foot,
    marketValue: market_value,

    positions: player_positions.map((pp) => ({
      positionId: pp.position.id,
      displayOrder: pp.display_order,
    })),

    nationalities: player_nationalities.map((pn) => ({
      nationId: pn.nationality.id,
      displayOrder: pn.display_order,
    })),
  };
}

export function mapPlayerDetailResponse(
  player: DbPlayerDetailRow,
): PlayerDetailResponse {
  // Main Highlight

  const shirtNumber = getCurrentShirtNumber(player);

  // Player Summary or Profile Data

  const dob = formatDateOfBirth(player.dob);
  const height = formatPlayerHeight(player.height);
  const weight = formatPlayerWeight(player.weight);
  const marketValue = formatEuroValue(player.market_value);

  const mainPosition = getMainPosition(player.player_positions);
  const otherPositions = getOtherPositions(player.player_positions);

  const nationalities = getNationalities(player.player_nationalities);

  const currentNationality = getCurrentNationality(player.player_nationalities);

  const currentNationalTeam = getCurrentNationalTeam(player);

  // Current Club Team Information

  const joinedAt = getJoinedAtDate(player);

  const currentContract = getCurrentContract(player);

  const contractEnd = currentContract
    ? formatDate(currentContract.contract_end)
    : null;

  const currentClubTeam = getCurrentClubTeam(player);

  return {
    id: player.id,
    slug: player.slug,

    summary: {
      shirtNumber,
      imageUrl: getImageUrl("player", STORAGE_BUCKETS.PLAYERS, player.image),
      shortName: player.short_name,
      dob,
      pob: player.pob,
      currentNationality,
      height,
      mainPosition,
      marketValue,
      currentClubTeam: currentClubTeam ?? null,
      currentNationalTeam: currentNationalTeam ?? null,
      joinedAt: joinedAt ? formatDate(joinedAt) : null,
      contractEnd,
    },

    profile: {
      fullName: player.full_name,
      dob,
      pob: player.pob,
      height,
      weight,
      preferredFoot: player.preferred_foot,
      marketValue,
      mainPosition,
      otherPositions,
      nationalities,
      currentClubTeam: currentClubTeam ?? null,
      joinedAt: joinedAt ? formatDate(joinedAt) : null,
      contractEnd,
    },
  };
}
