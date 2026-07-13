import {
  DbPlayerCareerDetailRow,
  DbPlayerCareerListRow,
  PlayerCareerDetailResponse,
  PlayerCareerListItem,
} from "@/types/player-career";

export function mapPlayerCareerListItem(
  playerCareer: DbPlayerCareerListRow,
): PlayerCareerListItem {
  const { id, joined_at, left_at } = playerCareer;
  return {
    id,
    joined_at,
    left_at,
    club: {
      id: playerCareer.club.id,
      name: playerCareer.club.name,
      image: playerCareer.club.image,
    },
  };
}

export function mapPlayerCareerDetailResponse(
  playerCareer: DbPlayerCareerDetailRow,
): PlayerCareerDetailResponse {
  return {
    ...playerCareer,
    contracts: playerCareer.player_contracts,
    shirt_numbers: playerCareer.player_shirt_numbers,
    transfer: playerCareer.transfer,
  };
}
