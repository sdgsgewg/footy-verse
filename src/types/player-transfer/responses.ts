import { ClubTeamResponse } from "../club-team";
import { SeasonResponse } from "../season";

// API Response DTO

// Player Transfer List

export interface PlayerTransferListItem {
  id: string;
  transferType: string;
  transferFee: string;
  transferDate: string;

  season: SeasonResponse;
  fromClubTeam: ClubTeamResponse;
  toClubTeam: ClubTeamResponse;
}

// Player Transfer Detail

// Model for Edit

export interface PlayerTransferEditResponse {
  id: string;
  seasonId: string;
  fromClubTeamId: string;
  toClubTeamId: string;
  transferType: string;
  transferFee: number;
  transferDate: string;
}

// Model View Detail

export interface PlayerTransferDetailResponse {
  id: string;
  transferType: string;
  transferFee: number;
  transferDate: string;

  season: SeasonResponse;
  fromClubTeam: ClubTeamResponse;
  toClubTeam: ClubTeamResponse;
}
