// DTO helper

import { PaginatedResponse } from "../api";

// API Response DTO

// Nationality List

export interface NationalityListItem {
  id: string;
  image: string | null;
  imageUrl: string;
  name: string;
  slug: string;
}

export type NationalityListResponse = PaginatedResponse<NationalityListItem>;

// Nationality Detail

// Model for Edit

export interface NationalityEditResponse {
  id: string;
  image: string | null;
  name: string;
}

// Model View Detail

export interface NationalityDetailResponse {
  id: string;
  imageUrl: string;
  name: string;
}
