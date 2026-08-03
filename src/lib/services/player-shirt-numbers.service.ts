import { idSchema } from "../validations/primitives.schema";
import { playerShirtNumbersQuerySchema } from "../validations/player-shirt-numbers.schema";
import {
  PlayerClubTeamShirtNumberListItem,
  PlayerNationalTeamShirtNumberListItem,
} from "@/types/player-shirt-number";
import {
  getPlayerClubShirtNumbersRepo,
  getPlayerNationalTeamShirtNumbersRepo,
} from "../repositories/player-shirt-numbers.repo";

export async function getPlayerClubTeamShirtNumbersService(
  playerId: string,
  query: unknown,
): Promise<PlayerClubTeamShirtNumberListItem[]> {
  const parsedId = idSchema.parse(playerId);
  const parsedQuery = playerShirtNumbersQuerySchema.parse(query);

  return getPlayerClubShirtNumbersRepo(parsedId, parsedQuery);
}

export async function getPlayerNationalTeamShirtNumbersService(
  playerId: string,
  query: unknown,
): Promise<PlayerNationalTeamShirtNumberListItem[]> {
  const parsedId = idSchema.parse(playerId);
  const parsedQuery = playerShirtNumbersQuerySchema.parse(query);

  return getPlayerNationalTeamShirtNumbersRepo(parsedId, parsedQuery);
}
