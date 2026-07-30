import { DbPositionCategoryRow } from "../position-category";
import { Position } from "./database";

// Position List

export type DbPositionListRow = Position & {
  category: DbPositionCategoryRow;
};

// Position Detail

export type DbPositionDetailRow = Position & {
  category: DbPositionCategoryRow;
};

// Helper

export type DbPositionRow = Pick<Position, "id" | "name" | "display_order"> & {
  category: DbPositionCategoryRow;
};
