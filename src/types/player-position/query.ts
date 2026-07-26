import { PositionSummary } from "../position";
import { PlayerPosition } from "./database";

export type PlayerPositionQuery = Pick<
  PlayerPosition,
  "display_order" | "position_id"
> & {
  position: PositionSummary;
};
