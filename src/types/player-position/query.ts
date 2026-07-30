import { DbPositionRow } from "../position";
import { PlayerPosition } from "./database";

export type DbPlayerPositionRow = Pick<
  PlayerPosition,
  "display_order" | "position_id"
> & {
  position: DbPositionRow;
};
