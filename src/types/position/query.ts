import { Position } from "./database";
import { PositionCategorySummary } from "./summaries";

// Position List

export type DbPositionListRow = Position & {
  category: PositionCategorySummary;
};

// Position Detail

export type DbPositionDetailRow = Position & {
  category: PositionCategorySummary;
};
