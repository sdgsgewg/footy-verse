import { ClubSummary } from "../club";
import { ClubTeam } from "./database";

export type ClubTeamSummary = Pick<
  ClubTeam,
  "id" | "squad_type" | "age_group"
> & {
  club: ClubSummary;
};
