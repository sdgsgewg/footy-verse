import { ClubTeamResponse } from "../club-team";
import { NationalTeamResponse } from "../national-team";

// API Response DTO

// Player Shirt Number List

export interface PlayerClubTeamShirtNumberListItem {
  id: string;
  clubTeam: ClubTeamResponse;
  shirtNumber: number;
  startDate: string;
  endDate: string | null;
}

export interface PlayerNationalTeamShirtNumberListItem {
  id: string;
  nationalTeam: NationalTeamResponse;
  shirtNumber: number;
  startDate: string;
  endDate: string | null;
}

// Player Shirt Number Detail

// Model for Edit

export interface PlayerShirtNumberEditResponse {
  shirtNumber: number;
  startDate: string;
  endDate: string | null;
}

// Model View Detail

export interface PlayerShirtNumberDetailResponse {
  id: string;
  shirtNumber: number;
  startDate: string;
  endDate: string | null;
}
