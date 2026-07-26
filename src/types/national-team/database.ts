import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";

// Supabase Table

export type NationalTeam = Tables<"national_teams">;
export type NationalTeamInsert = TablesInsert<"national_teams">;
export type NationalTeamUpdate = TablesUpdate<"national_teams">;
