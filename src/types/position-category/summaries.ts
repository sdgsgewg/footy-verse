import { PositionCategory } from "./database";

export type PositionCategorySummary = Pick<PositionCategory, "id" | "name">;
