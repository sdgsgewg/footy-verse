import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";

export type ClubTeam = Tables<"club_teams">;
export type ClubTeamInsert = TablesInsert<"club_teams">;
export type ClubTeamUpdate = TablesUpdate<"club_teams">;
