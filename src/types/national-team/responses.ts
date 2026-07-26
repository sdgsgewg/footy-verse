import { NationalityResponse } from "../nationality";

// API Response DTO

// National Team List

export interface NationalTeamListItem {
  id: string;
  imageUrl: string;
  name: string;
  teamCategory: string;
  ageGroup: string;
}

// National Team Detail

// Model for Edit

export interface NationalTeamEditResponse {
  id: string;
  teamCategory: string;
  ageGroup: string;
  nationId: string;
}

// Model for Detail

export interface NationalTeamDetailResponse {
  id: string;
  teamCategory: string;
  ageGroup: string;

  nation: NationalityResponse;
}

// Helper for other entity

export interface NationalTeamResponse {
  id: string;
  imageUrl: string;
  name: string;
  teamCategory: string;
  ageGroup: string | null;
}
