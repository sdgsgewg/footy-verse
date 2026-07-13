import { UpsertPlayerCareerInput } from "@/types/player-career";
import {
  createPlayerCareerRepo,
  deletePlayerCareerRepo,
  getPlayerCareerByIdRepo,
  getPlayerCareersRepo,
  updatePlayerCareerRepo,
} from "../repositories/player-careers.repo";
import {
  createPlayerCareerSchema,
  playerCareerIdSchema,
  updatePlayerCareerSchema,
} from "../validations/player-careers.schema";
import { playerIdSchema } from "../validations/players.schema";

export async function getPlayerCareersService(playerId: string) {
  return getPlayerCareersRepo(playerId);
}

export async function getPlayerCareerByIdService(id: string) {
  const parsedId = playerCareerIdSchema.parse(id);

  return getPlayerCareerByIdRepo(parsedId);
}

export async function createPlayerCareerService(
  playerId: string,
  input: UpsertPlayerCareerInput,
) {
  const parsedPlayerId = playerIdSchema.parse(playerId);
  const parsed = createPlayerCareerSchema.parse(input);

  return createPlayerCareerRepo(parsedPlayerId, parsed);
}

export async function updatePlayerCareerService(
  id: string,
  playerId: string,
  input: unknown,
) {
  const parsedId = playerCareerIdSchema.parse(id);
  const parsedPlayerId = playerIdSchema.parse(playerId);
  const parsed = updatePlayerCareerSchema.parse(input);

  return updatePlayerCareerRepo(parsedId, parsedPlayerId, parsed);
}

export async function deletePlayerCareerService(id: string) {
  const parsedId = playerCareerIdSchema.parse(id);

  await deletePlayerCareerRepo(parsedId);
}
