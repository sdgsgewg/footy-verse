import { PaginatedResponse } from "../api";
import { CompetitionCategoryResponse } from "../competition-category";
import { CompetitionScopeResponse } from "../competition-scope";

// DTO helper

// API Response DTO

// Competition List

export type LocationResponse = {
  type: "nationality" | "confederation" | "region";

  id: string;

  name: string;

  imageUrl: string | null;
} | null;

export interface CompetitionListItem {
  id: string;
  imageUrl: string;
  name: string;
  slug: string;

  category: CompetitionCategoryResponse;
  scope: CompetitionScopeResponse;

  participantType: string;
  gender: string;

  location: LocationResponse;
}

export type CompetitionListResponse = PaginatedResponse<CompetitionListItem>;

// Competition Detail

// Model for Edit

export interface CompetitionEditResponse {
  id: string;
  image: string | null;
  name: string;
  shortName: string;
  description: string | null;
  foundedYear: number;
  gender: string;
  ageGroup: string;
  participantType: string;
  competitionCategoryId: string;
  competitionScopeId: string;
  confederationId: string | null;
  nationalityId: string | null;
  regionId: string | null;
}

// Model View Detail

export interface CompetitionDetailResponse {
  id: string;
  imageUrl: string;
  name: string;
  slug: string;
  participantType: string;
  gender: string;
  ageGroup: string;
  foundedYear: string;

  category: CompetitionCategoryResponse;
  scope: CompetitionScopeResponse;
  location: LocationResponse;
}

// Helper for other entity

export interface CompetitionResponse {
  id: string;
  imageUrl: string;
  name: string;
}
