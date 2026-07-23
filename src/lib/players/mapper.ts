import {
  DbPlayerDetailRow,
  DbPlayerListRow,
  PlayerDetailResponse,
  PlayerEditResponse,
  PlayerListItem,
} from "@/types/player";
import {
  getCurrentClubTeam,
  getCurrentNationalTeam,
  getCurrentShirtNumber,
  getMainPosition,
} from "./formatter";
import {
  formatMarketValue,
  getCurrentContract,
  getDateOfBirth,
  getHeight,
  getNationalTeams,
  getOtherPositions,
  getPlayerDetailCurrentCareer,
  getWeight,
} from "./detail/formatter";
import { getImageUrl } from "../images/image-url";
import { STORAGE_BUCKETS } from "../storage";

export function mapPlayerListItem(player: DbPlayerListRow): PlayerListItem {
  const shirtNumber = getCurrentShirtNumber(player);

  const mainPosition = getMainPosition(player.player_positions);

  const currentClub = getCurrentClubTeam(player);

  const currentNationalTeam = getCurrentNationalTeam(player);

  return {
    ...player,
    imageUrl: getImageUrl("player", STORAGE_BUCKETS.PLAYERS, player.image),
    shirtNumber,
    mainPosition,
    currentClubTeam: currentClub ?? null,
    currentNationalTeam: currentNationalTeam ?? null,
    marketValue: player.market_value,
  };
}

export function mapPlayerEditResponse(
  player: DbPlayerDetailRow,
): PlayerEditResponse {
  const { preferred_foot, market_value, player_positions } = player;

  return {
    ...player,
    preferredFoot: preferred_foot,
    marketValue: market_value,
    positions: player_positions.map((pp) => ({
      positionId: pp.position.id,
      displayOrder: pp.display_order,
    })),
  };
}

export function mapPlayerDetailResponse(
  player: DbPlayerDetailRow,
): PlayerDetailResponse {
  const shirtNumber = getCurrentShirtNumber(player);

  const dob = getDateOfBirth(player);
  const height = getHeight(player.height);
  const weight = getWeight(player.weight);
  const marketValue = formatMarketValue(player.market_value);

  const mainPosition = getMainPosition(player.player_positions);
  const otherPositions = getOtherPositions(player.player_positions);

  const currentCareer = getPlayerDetailCurrentCareer(player);
  const currentContract = getCurrentContract(
    currentCareer ? currentCareer.player_contracts : [],
  );

  const joinedAt = currentCareer ? currentCareer.joined_at : null;
  const contractEnd = currentContract ? currentContract.contract_end : null;

  const currentClubTeam = getCurrentClubTeam(player);
  const currentNationalTeam = getCurrentNationalTeam(player);

  const nationalTeams = getNationalTeams(player);

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
      currentNationalTeam: currentNationalTeam ?? null,
      height,
      mainPosition,
      currentClub: currentClubTeam ?? null,
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
      nationalTeams,
      currentClubTeam: currentClubTeam ?? null,
      joinedAt,
      contractEnd,
    },
  };
}
