import { PaginatedResponse } from "../api";
import { ClubTeamResponse } from "../club-team";
import { NationalityResponse } from "../nationality";
import { PlayerNationalityResponse } from "../player-nationality";
import { PlayerPositionResponse } from "../player-position";
import { PositionResponse } from "../position";
import { PositionCategoryResponse } from "../position-category";

// DTO API Response

export interface ShirtNumberResponse {
  club: number | null;
  nationalTeam: number | null;
}

// Player List

export interface PlayerListItem {
  id: string;

  shirtNumber: ShirtNumberResponse;

  imageUrl: string;
  name: string;
  slug: string;
  mainPosition: PositionResponse;

  dob: string;

  currentClubTeam: ClubTeamResponse | null;

  currentNationality: NationalityResponse;

  marketValue: string;
}

export type PlayerListResponse = PaginatedResponse<PlayerListItem>;

export interface GroupedPlayerListItem {
  category: PositionCategoryResponse;
  players: PlayerListItem[];
}

// Player Detail

// Model For Edit

export interface PlayerEditResponse {
  id: string;
  name: string;
  image: string | null;

  dob: string;
  pob: string;

  height: number;
  weight: number;

  preferredFoot: string;
  marketValue: number;

  positions: PlayerPositionResponse[];
  nationalities: PlayerNationalityResponse[];
}

// Model View Detail

export interface PlayerSummaryResponse {
  shirtNumber: ShirtNumberResponse;
  imageUrl: string | null;
  name: string;

  dob: string;
  pob: string;
  currentNationality: NationalityResponse;
  height: string;
  mainPosition: PositionResponse;

  marketValue: string;

  currentClubTeam: ClubTeamResponse | null;
  joinedAt: string | null;
  contractEnd: string | null;
}

export interface PlayerDetailResponse {
  id: string;
  image: string | null;
  name: string;
  slug: string;

  summary: PlayerSummaryResponse;

  profile: {
    name: string;
    dob: string;
    pob: string;
    height: string;
    weight: string;
    preferredFoot: string;
    marketValue: string;

    mainPosition: PositionResponse;
    otherPositions: PositionResponse[];

    nationalities: NationalityResponse[];

    currentClubTeam: ClubTeamResponse | null;
    joinedAt: string | null;
    contractEnd: string | null;
  };
}
