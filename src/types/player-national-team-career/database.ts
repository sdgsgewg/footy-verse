import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";

export type PlayerNationalTeamCareer = Tables<"player_national_team_careers">;
export type PlayerNationalTeamCareerInsert =
  TablesInsert<"player_national_team_careers">;
export type PlayerNationalTeamCareerUpdate =
  TablesUpdate<"player_national_team_careers">;
