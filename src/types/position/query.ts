import { PositionCategorySummary } from "../position-category";
import { Position } from "./database";

// Position List

export type DbPositionListRow = Position & {
  category: PositionCategorySummary;
};

// Position Detail

export type DbPositionDetailRow = Position & {
  category: PositionCategorySummary;
};
