import { RegionType } from "@/enums/RegionType";

// DTO helper

// API Response DTO

// Region List

export interface RegionListItem {
  id: string;
  imageUrl: string;
  name: string;
  slug: string;
  regionType: string;
  parentRegion: RegionResponse | null;
}

// Region Detail

// Model for Edit

export interface RegionEditResponse {
  id: string;
  image: string | null;
  name: string;
  regionType: RegionType;
  parentRegionId: string | null;
}

// Model View Detail

export interface RegionDetailResponse {
  id: string;
  imageUrl: string;
  name: string;
}

// Helper for other entity

export interface RegionResponse {
  id: string;
  imageUrl: string;
  name: string;
}
