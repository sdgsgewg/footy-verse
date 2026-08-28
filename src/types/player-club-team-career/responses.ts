import { ClubTeamResponse } from "../club-team";
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

export interface PlayerClubTeamCareerListItem {
  id: string;
  imageUrl: string;
  name: string;
  joinedAt: string;
  leftAt: string | null;
}

// Player Club Career Detail

// Model For Edit

export interface PlayerClubTeamCareerEditResponse {
  id: string;
  clubTeamId: string;
  playerCareerId: string;

  career: PlayerCareerEditResponse;
  contracts: PlayerContractEditResponse[];
  shirtNumbers: PlayerShirtNumberEditResponse[];
  transfer: PlayerTransferEditResponse;
}

// Model View Detail

export interface PlayerClubTeamCareerDetailResponse {
  id: string;

  clubTeam: ClubTeamResponse;
  career: PlayerCareerDetailResponse;
  contracts: PlayerContractDetailResponse[];
  shirtNumbers: PlayerShirtNumberDetailResponse[];
  transfer: PlayerTransferDetailResponse;
}
