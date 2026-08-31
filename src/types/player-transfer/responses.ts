import { ClubTeamResponse } from "../club-team";

// API Response DTO

// Player Transfer List

export interface PlayerTransferListItem {
  id: string;
  transferType: string;
  transferFee: string;
  transferDate: string;

  season: string;
  fromClubTeam: ClubTeamResponse;
  toClubTeam: ClubTeamResponse;
}

// Player Transfer Detail

// Model for Edit

export interface PlayerTransferEditResponse {
  id: string;
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

  season: string;
  fromClubTeam: ClubTeamResponse;
  toClubTeam: ClubTeamResponse;
}
