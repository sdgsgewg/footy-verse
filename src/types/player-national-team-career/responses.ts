import { NationalTeamResponse } from "../national-team";
import {
  PlayerCareerDetailResponse,
  PlayerCareerEditResponse,
  PlayerCareerResponse,
} from "../player-career";
import {
  PlayerShirtNumberDetailResponse,
  PlayerShirtNumberEditResponse,
} from "../player-shirt-number";

// API Response DTO

// Player National Team Career List

export interface PlayerNationalTeamCareerListItem {
  id: string;
  imageUrl: string;
  name: string;
  joinedAt: string;
  leftAt: string | null;
}

// Player National Team Career Detail

// Model For Edit

export interface PlayerNationalTeamCareerEditResponse {
  id: string;
  nationalTeamId: string;
  playerCareerId: string;

  career: PlayerCareerEditResponse;
  shirtNumbers: PlayerShirtNumberEditResponse[];
}

// Model View Detail

export interface PlayerNationalTeamCareerDetailResponse {
  id: string;

  nationalTeam: NationalTeamResponse;
  career: PlayerCareerDetailResponse;
  shirtNumbers: PlayerShirtNumberDetailResponse[];
}

// Helper for other entity

export interface PlayerNationalTeamCareerResponse {
  id: string;

  nationalTeam: NationalTeamResponse;

  career: PlayerCareerResponse;
}
