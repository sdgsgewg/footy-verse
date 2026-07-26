import { Position } from "./database";

export type PositionSummary = Pick<Position, "id" | "name">;
