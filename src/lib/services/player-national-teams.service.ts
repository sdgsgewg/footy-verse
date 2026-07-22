import {
  createPlayerNationalTeamRepo,
  deletePlayerNationalTeamRepo,
  getPlayerNationalTeamDetailRepo,
  getPlayerNationalTeamEditRepo,
  getPlayerNationalTeamLookupRepo,
  getPlayerNationalTeamsRepo,
  updatePlayerNationalTeamRepo,
} from "../repositories/player-national-teams.repo";
import { idSchema } from "../validations/primitives.schema";
import {
  createPlayerNationalTeamSchema,
  updatePlayerNationalTeamSchema,
} from "../validations/player-national-teams.schema";
import { PlayerNationalTeamCreateInput } from "@/types/player";
import { PlayerNationalTeamUpdateInput } from "@/types/player-national-teams";

export async function getPlayerNationalTeamsService(playerId: string) {
  return getPlayerNationalTeamsRepo(playerId);
}

export async function getPlayerNationalTeamEditService(nationalTeamId: string) {
  const parsedId = idSchema.parse(nationalTeamId);

  return getPlayerNationalTeamEditRepo(parsedId);
}

export async function getPlayerNationalTeamDetailService(
  nationalTeamId: string,
) {
  const parsedId = idSchema.parse(nationalTeamId);

  return getPlayerNationalTeamDetailRepo(parsedId);
}

export async function getPlayerNationalTeamLookupService(
  nationalTeamId: string,
) {
  const parsedId = idSchema.parse(nationalTeamId);

  return getPlayerNationalTeamLookupRepo(parsedId);
}

export async function createPlayerNationalTeamService(
  playerId: string,
  input: PlayerNationalTeamCreateInput,
) {
  const parsedPlayerId = idSchema.parse(playerId);
  const parsed = createPlayerNationalTeamSchema.parse(input);

  return createPlayerNationalTeamRepo(parsedPlayerId, parsed);
}

export async function updatePlayerNationalTeamService(
  nationalTeamId: string,
  playerId: string,
  input: PlayerNationalTeamUpdateInput,
) {
  const parsedId = idSchema.parse(nationalTeamId);
  const parsedPlayerId = idSchema.parse(playerId);
  const parsed = updatePlayerNationalTeamSchema.parse(input);

  return updatePlayerNationalTeamRepo(parsedId, parsedPlayerId, parsed);
}

export async function deletePlayerNationalTeamService(nationalTeamId: string) {
  const parsedId = idSchema.parse(nationalTeamId);

  await deletePlayerNationalTeamRepo(parsedId);
}
