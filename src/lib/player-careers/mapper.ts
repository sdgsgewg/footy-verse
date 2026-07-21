import {
  DbPlayerCareerDetailRow,
  DbPlayerCareerListRow,
  PlayerCareerDetailResponse,
  PlayerCareerEditResponse,
  PlayerCareerListItem,
} from "@/types/player-career";

export function mapPlayerCareerListItem(
  playerCareer: DbPlayerCareerListRow,
): PlayerCareerListItem {
  const { id, joined_at, left_at } = playerCareer;
  return {
    id,
    joinedAt: joined_at,
    leftAt: left_at,
    club: {
      id: playerCareer.club.id,
      name: playerCareer.club.name,
      image: playerCareer.club.image,
    },
  };
}

export function mapPlayerCareerEditResponse(
  playerCareer: DbPlayerCareerDetailRow,
): PlayerCareerEditResponse {
  return {
    id: playerCareer.id,
    clubId: playerCareer.club_id,
    joinedAt: playerCareer.joined_at,
    leftAt: playerCareer.left_at,

    contracts: playerCareer.player_contracts.map((pc) => ({
      contractStart: pc.contract_start,
      contractEnd: pc.contract_end,
      salary: pc.salary,
    })),

    shirtNumbers: playerCareer.player_shirt_numbers.map((psn) => ({
      shirtNumber: psn.shirt_number,
      startDate: psn.start_date,
      endDate: psn.end_date,
    })),

    transfer: {
      seasonId: playerCareer.transfer.season_id,
      fromClubId: playerCareer.transfer.from_club_id,
      toClubId: playerCareer.transfer.to_club_id,
      transferType: playerCareer.transfer.transfer_type,
      transferFee: playerCareer.transfer.transfer_fee,
      transferDate: playerCareer.transfer.transfer_date,
    },
  };
}

export function mapPlayerCareerDetailResponse(
  playerCareer: DbPlayerCareerDetailRow,
): PlayerCareerDetailResponse {
  return {
    id: playerCareer.id,
    clubId: playerCareer.club_id,
    joinedAt: playerCareer.joined_at,
    leftAt: playerCareer.left_at,

    contracts: playerCareer.player_contracts.map((pc) => ({
      contractStart: pc.contract_start,
      contractEnd: pc.contract_end,
      salary: pc.salary,
    })),

    shirtNumbers: playerCareer.player_shirt_numbers.map((psn) => ({
      shirtNumber: psn.shirt_number,
      startDate: psn.start_date,
      endDate: psn.end_date,
    })),

    transfer: {
      seasonId: playerCareer.transfer.season_id,
      fromClubId: playerCareer.transfer.from_club_id,
      toClubId: playerCareer.transfer.to_club_id,
      transferType: playerCareer.transfer.transfer_type,
      transferFee: playerCareer.transfer.transfer_fee,
      transferDate: playerCareer.transfer.transfer_date,
    },
  };
}
