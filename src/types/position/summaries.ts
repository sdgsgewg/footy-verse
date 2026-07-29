import { PositionCategorySummary } from "../position-category";
import { Position } from "./database";

export type PositionSummary = Pick<Position, "id" | "name"> & {
  category: PositionCategorySummary;
};
