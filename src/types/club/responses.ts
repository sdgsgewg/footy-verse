// DTO API Response

import { PaginatedResponse } from "../api";

export interface NationalityResponse {
  id: string;
  imageUrl: string;
  name: string;
}

// Club List

export interface ClubListItem {
  id: string;
  imageUrl: string;
  name: string;
  slug: string;

  nation: NationalityResponse | null;
}

export type ClubListResponse = PaginatedResponse<ClubListItem>;

// Club Detail

// Model for Edit

export interface ClubEditResponse {
  id: string;
  image: string | null;
  name: string;
  nationId: string | null;
}

// Model View Detail

export interface ClubDetailResponse {
  id: string;
  imageUrl: string;
  name: string;
  slug: string;

  nation: NationalityResponse | null;
}
