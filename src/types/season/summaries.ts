import { Season } from "./database";

export type SeasonSummary = Pick<Season, "id" | "name">;
