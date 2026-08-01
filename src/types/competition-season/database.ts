import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";

export type CompetitionSeason = Tables<"competition_seasons">;
export type CompetitionSeasonInsert = TablesInsert<"competition_seasons">;
export type CompetitionSeasonUpdate = TablesUpdate<"competition_seasons">;
