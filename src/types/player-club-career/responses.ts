import { ClubTeamDetailResponse } from "../club-team";
import {
  PlayerCareerDetailResponse,
  PlayerCareerEditResponse,
} from "../player-career";
import {
  PlayerContractDetailResponse,
  PlayerContractEditResponse,
} from "../player-contract";
import {
  PlayerShirtNumberDetailResponse,
  PlayerShirtNumberEditResponse,
} from "../player-shirt-number";
import {
  PlayerTransferDetailResponse,
  PlayerTransferEditResponse,
} from "../player-transfer";

// API Response DTO

// Player Club Career List

export interface PlayerClubCareerListItem {
  id: string;
  imageUrl: string;
  name: string;
  joinedAt: string;
  leftAt: string | null;
}

// Player Club Career Detail

// Model For Edit

export interface PlayerClubCareerEditResponse {
  id: string;
  clubTeamId: string;
  playerCareerId: string;

  career: PlayerCareerEditResponse;
  contracts: PlayerContractEditResponse[];
  shirtNumbers: PlayerShirtNumberEditResponse[];
  transfer: PlayerTransferEditResponse;
}

// Model View Detail

export interface PlayerClubCareerDetailResponse {
  id: string;

  clubTeam: ClubTeamDetailResponse;
  career: PlayerCareerDetailResponse;
  contracts: PlayerContractDetailResponse[];
  shirtNumbers: PlayerShirtNumberDetailResponse[];
  transfer: PlayerTransferDetailResponse;
}
