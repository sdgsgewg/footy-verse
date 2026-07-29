import { RegionResponse } from "../region";

// DTO helper

// API Response DTO

// Region List

export interface ConfederationListItem {
  id: string;
  imageUrl: string;
  name: string;
  slug: string;
  founded: string | null;
  region: RegionResponse;
}

// Region Detail

// Model for Edit

export interface ConfederationEditResponse {
  id: string;
  image: string | null;
  name: string;
  shortName: string;
  founded: string | null;
  headquarters: string | null;
  website: string | null;
  regionId: string;
}

// Model View Detail

export interface ConfederationDetailResponse {
  id: string;
  imageUrl: string;
  name: string;
  shortName: string;
  slug: string;
  founded: string;
  headquarters: string;
  website: string;
  region: RegionResponse;
}

// Helper for other entity

export interface ConfederationResponse {
  id: string;
  imageUrl: string;
  name: string;
}
