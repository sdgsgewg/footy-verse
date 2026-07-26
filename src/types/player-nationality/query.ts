import { NationalitySummary } from "../nationality";
import { PlayerNationality } from "./database";

export type PlayerNationalityQuery = Pick<
  PlayerNationality,
  "display_order" | "nation_id"
> & {
  nationality: NationalitySummary;
};
