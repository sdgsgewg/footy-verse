// API Response DTO

import { ClubResponse } from "../club";
import { SeasonResponse } from "../season";

// Player Transfer List

export interface PlayerTransferListItem {
  id: string;
  transferType: string;
  transferFee: number;
  transferDate: string;

  season: SeasonResponse;
  fromClub: ClubResponse;
  toClub: ClubResponse;
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
  fromClub: ClubResponse;
  toClub: ClubResponse;
}
