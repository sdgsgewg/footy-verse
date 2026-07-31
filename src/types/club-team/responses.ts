import { ClubResponse } from "../club";

// API Response DTO

// Club Team List

export interface ClubTeamListItem {
  id: string;
  imageUrl: string;
  name: string;
  squadType: string;
  ageGroup: string | null;
}

// Club Team Detail

// Model for Edit

export interface ClubTeamEditResponse {
  id: string;
  squadType: string;
  ageGroup: string | null;
  clubId: string;
}

// Model for Detail

export interface ClubTeamDetailResponse {
  id: string;
  name: string;
  squadType: string;
  ageGroup: string | null;

  club: ClubResponse;

  squadSize: string;
  totalMarketValue: string;
}

// Helper for other entity

export interface ClubTeamResponse {
  id: string;
  imageUrl: string;
  name: string;
  squadType: string;
  ageGroup: string | null;
}
