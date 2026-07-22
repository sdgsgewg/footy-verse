import { UpsertPlayerCareerInput } from "@/types/player-career";
import {
  createPlayerCareerRepo,
  deletePlayerCareerRepo,
  getPlayerCareerDetailRepo,
  getPlayerCareerEditRepo,
  getPlayerCareerLookupRepo,
  getPlayerCareersRepo,
  updatePlayerCareerRepo,
} from "../repositories/player-careers.repo";
import {
  createPlayerCareerSchema,
  updatePlayerCareerSchema,
} from "../validations/player-careers.schema";
import { idSchema } from "../validations/primitives.schema";

export async function getPlayerCareersService(playerId: string) {
  return getPlayerCareersRepo(playerId);
}

export async function getPlayerCareerEditService(careerId: string) {
  const parsedId = idSchema.parse(careerId);

  return getPlayerCareerEditRepo(parsedId);
}

export async function getPlayerCareerDetailService(careerId: string) {
  const parsedId = idSchema.parse(careerId);

  return getPlayerCareerDetailRepo(parsedId);
}

export async function getPlayerCareerLookupService(careerId: string) {
  const parsedId = idSchema.parse(careerId);

  return getPlayerCareerLookupRepo(parsedId);
}

export async function createPlayerCareerService(
  playerId: string,
  input: UpsertPlayerCareerInput,
) {
  console.log("Player Id: ", playerId);
  const parsedPlayerId = idSchema.parse(playerId);
  const parsed = createPlayerCareerSchema.parse(input);

  return createPlayerCareerRepo(parsedPlayerId, parsed);
}

export async function updatePlayerCareerService(
  careerId: string,
  playerId: string,
  input: unknown,
) {
  const parsedId = idSchema.parse(careerId);
  const parsedPlayerId = idSchema.parse(playerId);
  const parsed = updatePlayerCareerSchema.parse(input);

  return updatePlayerCareerRepo(parsedId, parsedPlayerId, parsed);
}

export async function deletePlayerCareerService(careerId: string) {
  const parsedId = idSchema.parse(careerId);

  await deletePlayerCareerRepo(parsedId);
}
