import {
  DbPlayerDetailRow,
  DbPlayerListRow,
  PlayerDetailResponse,
  PlayerEditResponse,
  PlayerListItem,
} from "@/types/player";
import {
  getCurrentClub,
  getCurrentNationality,
  getCurrentShirtNumber,
  getMainPosition,
} from "./formatter";
import {
  formatMarketValue,
  getCurrentContract,
  getDateOfBirth,
  getHeight,
  getNationalities,
  getOtherPositions,
  getPlayerCareers,
  getPlayerDetailCurrentCareer,
  getPlayerNationalTeams,
  getWeight,
} from "./detail/formatter";
import { getImageUrl } from "../images/image-url";
import { STORAGE_BUCKETS } from "../storage";

export function mapPlayerListItem(player: DbPlayerListRow): PlayerListItem {
  const shirtNumber = getCurrentShirtNumber(player);

  const mainPosition = getMainPosition(player.player_positions);

  const currentClub = getCurrentClub(player);

  const currentNationality = getCurrentNationality(player);

  return {
    ...player,
    imageUrl: getImageUrl("player", STORAGE_BUCKETS.PLAYERS, player.image),
    shirtNumber,
    mainPosition,
    currentClub: currentClub ?? null,
    currentNationality: currentNationality ?? null,
    marketValue: player.market_value,
  };
}

export function mapPlayerEditResponse(
  player: DbPlayerDetailRow,
): PlayerEditResponse {
  return {
    ...player,
    preferredFoot: player.preferred_foot,
    marketValue: player.market_value,
    positions: player.player_positions.map((pp) => ({
      positionId: pp.position.id,
      displayOrder: pp.display_order,
    })),
    nationalTeams: player.player_national_teams.map((pnt) => ({
      id: pnt.id,
      label: pnt.label,
      startDate: pnt.start_date,
      endDate: pnt.end_date,
      shirtNumber: pnt.shirt_number,
      nationality: pnt.nationality,
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
  const currentContract = getCurrentContract(currentCareer.player_contracts);

  const currentClub = getCurrentClub(player);
  const currentNationality = getCurrentNationality(player);

  const nationalities = getNationalities(player);

  const careers = getPlayerCareers(player);
  const nationalTeams = getPlayerNationalTeams(player);

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
      currentNationality: currentNationality ?? null,
      height,
      mainPosition,
      currentClub: currentClub ?? null,
      joinedAt: currentCareer.joined_at,
      contractEnd: currentContract.contract_end,
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
      currentClub: currentClub ?? null,
      joinedAt: currentCareer.joined_at,
      contractEnd: currentContract.contract_end,
    },

    history: {
      careers,
      nationalTeams,
    },
  };
}
