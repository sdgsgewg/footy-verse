import { PaginatedResponse } from "../api";
import { ClubTeamResponse } from "../club-team";
import { NationalityResponse } from "../nationality";
import { PlayerNationalityResponse } from "../player-nationality";
import { PlayerPositionResponse } from "../player-position";
import { PositionResponse } from "../position";

// DTO API Response

export interface ShirtNumberResponse {
  club: number | null;
  nationalTeam: number | null;
}

// Player List

export interface PlayerListItem {
  id: string;
  imageUrl: string;
  name: string;
  slug: string;

  shirtNumber: ShirtNumberResponse;

  mainPosition: PositionResponse;
  currentNationality: NationalityResponse | null;

  currentClubTeam: ClubTeamResponse | null;

  marketValue: string;
}

export type PlayerListResponse = PaginatedResponse<PlayerListItem>;

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

export interface PlayerDetailResponse {
  id: string;
  image: string | null;
  name: string;
  slug: string;

  summary: {
    shirtNumber: ShirtNumberResponse;
    imageUrl: string | null;
    name: string;

    dob: string;
    pob: string;
    currentNationality: NationalityResponse | null;
    height: string;
    mainPosition: PositionResponse;

    currentClubTeam: ClubTeamResponse | null;
    joinedAt: string | null;
    contractEnd: string | null;
  };

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
