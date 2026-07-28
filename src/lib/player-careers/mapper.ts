import {
  PlayerCareerDetailResponse,
  PlayerCareerEditResponse,
  PlayerCareerSummary,
} from "@/types/player-career";
import { DbPlayerCareerDetailRow } from "@/types/player-career/query";

export function mapPlayerCareerEditResponse(
  playerCareer: DbPlayerCareerDetailRow | PlayerCareerSummary,
): PlayerCareerEditResponse {
  const { joined_at, left_at } = playerCareer;

  return {
    joinedAt: joined_at,
    leftAt: left_at,
  };
}

export function mapPlayerCareerDetailResponse(
  playerCareer: DbPlayerCareerDetailRow | PlayerCareerSummary,
): PlayerCareerDetailResponse {
  const { id, joined_at, left_at } = playerCareer;

  return {
    id,
    joinedAt: joined_at,
    leftAt: left_at ?? "-",
  };
}
