import { PlayerShirtNumber } from "./database";

export type PlayerShirtNumberSummary = Pick<
  PlayerShirtNumber,
  "id" | "shirt_number" | "start_date" | "end_date"
>;
