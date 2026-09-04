import { PlayerListItem } from "@/types/player/responses";
import { PositionResponse } from "@/types/position";
import { PositionCategoryResponse } from "@/types/position-category";

export interface SquadDepthPosition {
  position: PositionResponse;
  players: PlayerListItem[];
}

export interface SquadDepthCategory {
  category: PositionCategoryResponse;
  positions: SquadDepthPosition[];
}

export type SquadDepthResponse = SquadDepthCategory[];
