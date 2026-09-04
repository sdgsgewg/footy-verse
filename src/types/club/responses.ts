import { PaginatedResponse } from "../api";
import { NationalityResponse } from "../nationality";

// DTO API Response

// Club List

export interface ClubListItem {
  id: string;
  imageUrl: string;
  shortName: string;
  slug: string;

  nation: NationalityResponse | null;
}

export type ClubListResponse = PaginatedResponse<ClubListItem>;

// Club Detail

// Model for Edit

export interface ClubEditResponse {
  id: string;
  image: string | null;
  fullName: string;
  shortName: string;
  nationId: string;
}

// Model View Detail

export interface ClubDetailResponse {
  id: string;
  imageUrl: string;
  fullName: string;
  shortName: string;
  slug: string;

  nation: NationalityResponse | null;
}

// Helper for other entity response model

export interface ClubResponse {
  id: string;
  imageUrl: string;
  shortName: string;
}

export interface ClubWithNationalityResponse {
  id: string;
  imageUrl: string;
  shortName: string;

  nation: NationalityResponse;
}
