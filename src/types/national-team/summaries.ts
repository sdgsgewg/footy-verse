import { NationalitySummary } from "../nationality";
import { NationalTeam } from "./database";

export type NationalTeamSummary = Pick<
  NationalTeam,
  "id" | "team_category" | "age_group"
> & {
  nation: NationalitySummary;
};
