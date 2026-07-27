import {
  DbPlayerTransferDetailRow,
  PlayerTransferDetailResponse,
  PlayerTransferEditResponse,
  PlayerTransferQuery,
} from "@/types/player-transfer";
import { getImageUrl } from "../images/image-url";
import { STORAGE_BUCKETS } from "../storage";
import { formatClubName } from "../club-teams/formatter";

export function mapPlayerTransferEditResponse(
  playerTransfer: DbPlayerTransferDetailRow,
): PlayerTransferEditResponse {
  const {
    id,
    transfer_type,
    transfer_fee,
    transfer_date,
    season_id,
    from_club_team_id,
    to_club_team_id,
  } = playerTransfer;

  return {
    id,
    seasonId: season_id,
    fromClubTeamId: from_club_team_id,
    toClubTeamId: to_club_team_id,
    transferType: transfer_type,
    transferFee: transfer_fee,
    transferDate: transfer_date,
  };
}

export function mapPlayerTransferDetailResponse(
  playerTransfer: DbPlayerTransferDetailRow | PlayerTransferQuery,
): PlayerTransferDetailResponse {
  const {
    id,
    transfer_type,
    transfer_fee,
    transfer_date,

    season,
    from_club_team,
    to_club_team,
  } = playerTransfer;

  return {
    id,
    transferType: transfer_type,
    transferFee: transfer_fee,
    transferDate: transfer_date,

    season: {
      id: season.id,
      name: season.name,
    },

    fromClub: {
      id: from_club_team.id,
      imageUrl: getImageUrl(
        "club",
        STORAGE_BUCKETS.CLUBS,
        from_club_team.club.image,
      ),
      name: formatClubName(from_club_team),
    },

    toClub: {
      id: to_club_team.id,
      imageUrl: getImageUrl(
        "club",
        STORAGE_BUCKETS.CLUBS,
        to_club_team.club.image,
      ),
      name: formatClubName(to_club_team),
    },
  };
}
