import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";

export type PlayerClubCareer = Tables<"player_club_careers">;
export type PlayerClubCareerInsert = TablesInsert<"player_club_careers">;
export type PlayerClubCareerUpdate = TablesUpdate<"player_club_careers">;
