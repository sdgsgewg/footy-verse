import {
  DbPlayerDetailRow,
  DbPlayerListRow,
  GroupedPlayerListItem,
  PlayerDetailResponse,
  PlayerEditResponse,
  PlayerListItem,
} from "@/types/player";

import {
  getCurrentCareer,
  getCurrentClubCareer,
  getCurrentClubTeam,
  getCurrentContract,
  getCurrentNationality,
  getCurrentShirtNumber,
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

export function mapPlayerListItem(player: DbPlayerListRow): PlayerListItem {
  const shirtNumber = getCurrentShirtNumber(player);

  const mainPosition = getMainPosition(player.player_positions);

  const currentNationality = getCurrentNationality(player.player_nationalities);

  const currentClub = getCurrentClubTeam(player);

  const marketValue = formatEuroValue(player.market_value);

  return {
    ...player,
    imageUrl: getImageUrl("player", STORAGE_BUCKETS.PLAYERS, player.image),
    shirtNumber,
    mainPosition,
    currentNationality,
    currentClubTeam: currentClub ?? null,
    marketValue,
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

  // Kalau position category sudah ada 'display_order' mending pakai kolom itu buat sorting

  const CATEGORY_ORDER = ["Goalkeepers", "Defenders", "Midfielders", "Forwards"];

  return Array.from(grouped.values()).sort(
    (a, b) =>
      CATEGORY_ORDER.indexOf(a.category.name) -
      CATEGORY_ORDER.indexOf(b.category.name),
  );
}

export function mapPlayerEditResponse(
  player: DbPlayerDetailRow,
): PlayerEditResponse {
  const {
    preferred_foot,
    market_value,
    player_positions,
    player_nationalities,
  } = player;

  return {
    ...player,
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
  const shirtNumber = getCurrentShirtNumber(player);

  const dob = formatDateOfBirth(player);
  const height = formatPlayerHeight(player.height);
  const weight = formatPlayerWeight(player.weight);
  const marketValue = formatEuroValue(player.market_value);

  const mainPosition = getMainPosition(player.player_positions);
  const otherPositions = getOtherPositions(player.player_positions);

  const nationalities = getNationalities(player.player_nationalities);

  const currentNationality = getCurrentNationality(player.player_nationalities);

  const currentClubCareer = getCurrentClubCareer(player);

  const currentContract = getCurrentContract(
    currentClubCareer ? currentClubCareer.player_contracts : [],
  );

  const currentCareer = currentClubCareer
    ? getCurrentCareer(player.player_careers, currentClubCareer)
    : null;

  const joinedAt = currentCareer ? formatDate(currentCareer.joined_at) : null;

  const contractEnd = currentContract
    ? formatDate(currentContract.contract_end)
    : null;

  const currentClubTeam = getCurrentClubTeam(player);

  return {
    id: player.id,
    image: player.image,
    name: player.name,
    slug: player.slug,

    summary: {
      shirtNumber,
      imageUrl: getImageUrl("player", STORAGE_BUCKETS.PLAYERS, player.image),
      name: player.name,
      dob,
      pob: player.pob,
      currentNationality: currentNationality,
      height,
      mainPosition,
      marketValue,
      currentClubTeam: currentClubTeam ?? null,
      joinedAt,
      contractEnd,
    },

    profile: {
      name: player.name,
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
      joinedAt,
      contractEnd,
    },
  };
}
