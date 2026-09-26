import { PaginatedResponse } from "../api";
import { ConfederationResponse } from "../confederation";
import { RegionResponse } from "../region";

// DTO helper

// API Response DTO

// Nationality List

export interface NationalityListItem {
  id: string;
  imageUrl: string;
  name: string;
  slug: string;
  fifaCode: string;

  confederation: ConfederationResponse | null;
  region: RegionResponse | null;
}

export type NationalityListResponse = PaginatedResponse<NationalityListItem>;

// Nationality Detail

// Model for Edit

export interface NationalityEditResponse {
  id: string;
  image: string | null;
  name: string;
  fifaCode: string;
  confederationId: string | null;
  regionId: string | null;
}

// Model View Detail

export interface NationalityDetailResponse {
  id: string;
  imageUrl: string;
  name: string;
  slug: string;

  confederation: ConfederationResponse | null;
  region: RegionResponse | null;
}

// Helper for other entity

export interface NationalityResponse {
  id: string;
  imageUrl: string;
  name: string;
}

export interface NationalityWithConfederationResponse {
  id: string;
  imageUrl: string;
  name: string;

  confederation: ConfederationResponse | null;
}
