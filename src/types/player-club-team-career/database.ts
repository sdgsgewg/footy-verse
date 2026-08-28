import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";

export type PlayerClubTeamCareer = Tables<"player_club_team_careers">;
export type PlayerClubTeamCareerInsert = TablesInsert<"player_club_team_careers">;
export type PlayerClubTeamCareerUpdate = TablesUpdate<"player_club_team_careers">;
