export type SearchEntityType =
  | "player"
  | "club"
  | "competition"
  | "nationality";

export interface SearchResult {
  id: string;
  name: string;
  slug: string;
  type: SearchEntityType;
  imageUrl?: string | null;
  subtitle?: string | null;
}

export interface SearchResultGroup {
  type: SearchEntityType;
  total: number;
  results: SearchResult[];
}

export interface GlobalSearchResponse {
  query: string;
  total: number;
  groups: SearchResultGroup[];
}
