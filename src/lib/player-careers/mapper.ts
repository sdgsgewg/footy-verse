import {
  DbPlayerCareerDetailRow,
  DbPlayerCareerListRow,
  PlayerCareerDetailResponse,
  PlayerCareerEditResponse,
  PlayerCareerListItem,
} from "@/types/player-career";
import { getImageUrl } from "../images/image-url";
import { STORAGE_BUCKETS } from "../storage";
import { formatClubName } from "../club-teams/formatter";

export function mapPlayerCareerListItem(
  playerCareer: DbPlayerCareerListRow,
): PlayerCareerListItem {
  const { id, joined_at, left_at, clubTeam } = playerCareer;

  return {
    id,
    imageUrl: getImageUrl("club", STORAGE_BUCKETS.CLUBS, clubTeam.club.image),
    name: formatClubName(clubTeam),
    joinedAt: joined_at,
    leftAt: left_at,
  };
}

export function mapPlayerCareerEditResponse(
  playerCareer: DbPlayerCareerDetailRow,
): PlayerCareerEditResponse {
  return {
    id: playerCareer.id,
    clubTeamId: playerCareer.club_team_id,
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
      fromClubTeamId: playerCareer.transfer.from_club_team_id,
      toClubTeamId: playerCareer.transfer.to_club_team_id,
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
    clubTeamId: playerCareer.club_team_id,
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
      fromClubTeamId: playerCareer.transfer.from_club_team_id,
      toClubTeamId: playerCareer.transfer.to_club_team_id,
      transferType: playerCareer.transfer.transfer_type,
      transferFee: playerCareer.transfer.transfer_fee,
      transferDate: playerCareer.transfer.transfer_date,
    },
  };
}
