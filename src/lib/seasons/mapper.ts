import { SeasonResponse, SeasonSummary } from "@/types/season";

// Helper

export function mapSeasonResponse(season: SeasonSummary): SeasonResponse {
  const { id, name } = season;

  return {
    id,
    name,
  };
}
