import { DbClubTeamRow } from "../club-team";
import { DbNationalTeamRow } from "../national-team";
import { PlayerShirtNumber } from "./database";

// Supabase Query Result

// Player Shirt Number List

export type DbPlayerClubTeamShirtNumberListRow = PlayerShirtNumber & {
  player_career: {
    player_id: string;

    player_club_team_career: {
      club_team: DbClubTeamRow;
    };
  };
};

export type DbPlayerNationalTeamShirtNumberListRow = PlayerShirtNumber & {
  player_career: {
    player_id: string;

    player_national_team_career: {
      national_team: DbNationalTeamRow;
    };
  };
};

// Player Shirt Number Detail

export type DbPlayerShirtNumberDetailRow = Pick<
  PlayerShirtNumber,
  "id" | "shirt_number" | "start_date" | "end_date"
>;

// Helper

export type DbPlayerShirtNumberRow = Pick<
  PlayerShirtNumber,
  "id" | "shirt_number" | "start_date" | "end_date"
>;
