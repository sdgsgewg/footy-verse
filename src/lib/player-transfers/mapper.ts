import {
  DbPlayerTransferDetailRow,
  DbPlayerTransferListRow,
  PlayerTransferDetailResponse,
  PlayerTransferEditResponse,
  PlayerTransferListItem,
} from "@/types/player-transfer";

import { DbPlayerTransferRow } from "@/types/player-transfer";
import { mapSeasonResponse } from "../seasons/mapper";
import { mapClubTeamResponse } from "../club-teams/mapper";
import { formatEuroValue } from "../formatters/currency";

export function mapPlayerTransferListItem(
  playerTransfer: DbPlayerTransferListRow,
): PlayerTransferListItem {
  const {
    id,
    transfer_type,
    transfer_fee,
    transfer_date,
    from_club_team,
    to_club_team,
  } = playerTransfer;

  return {
    id,
    transferType: transfer_type,
    transferFee: formatEuroValue(transfer_fee),
    transferDate: transfer_date,

    season: mapSeasonResponse(transfer_date),
    fromClubTeam: mapClubTeamResponse(from_club_team),
    toClubTeam: mapClubTeamResponse(to_club_team),
  };
}

export function mapPlayerTransferEditResponse(
  playerTransfer: DbPlayerTransferDetailRow,
): PlayerTransferEditResponse {
  const {
    id,
    transfer_type,
    transfer_fee,
    transfer_date,
    from_club_team_id,
    to_club_team_id,
  } = playerTransfer;

  return {
    id,
    fromClubTeamId: from_club_team_id,
    toClubTeamId: to_club_team_id,
    transferType: transfer_type,
    transferFee: transfer_fee,
    transferDate: transfer_date,
  };
}

export function mapPlayerTransferDetailResponse(
  playerTransfer: DbPlayerTransferDetailRow | DbPlayerTransferRow,
): PlayerTransferDetailResponse {
  const {
    id,
    transfer_type,
    transfer_fee,
    transfer_date,
    from_club_team,
    to_club_team,
  } = playerTransfer;

  return {
    id,
    transferType: transfer_type,
    transferFee: transfer_fee,
    transferDate: transfer_date,

    season: mapSeasonResponse(transfer_date),
    fromClubTeam: mapClubTeamResponse(from_club_team),
    toClubTeam: mapClubTeamResponse(to_club_team),
  };
}
