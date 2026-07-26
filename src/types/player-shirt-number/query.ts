import { PlayerShirtNumber } from "./database";

// Supabase Query Result

// Player Shirt Number List

export type DbPlayerShirtNumberListRow = Pick<
  PlayerShirtNumber,
  "id" | "shirt_number" | "start_date" | "end_date"
>;

// Player Shirt Number Detail

export type DbPlayerShirtNumberDetailRow = Pick<
  PlayerShirtNumber,
  "id" | "shirt_number" | "start_date" | "end_date"
>;
