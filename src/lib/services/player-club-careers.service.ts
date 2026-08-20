import { UpsertPlayerClubCareerInput } from "@/types/player-club-career";
import {
  createPlayerClubCareerRepo,
  deletePlayerClubCareerRepo,
  getPlayerClubCareerDetailRepo,
  getPlayerClubCareerEditRepo,
  getPlayerClubCareerLookupRepo,
  getPlayerClubCareersRepo,
  updatePlayerClubCareerRepo,
} from "../repositories/player-club-careers.repo";
import {
  createPlayerClubCareerSchema,
  updatePlayerClubCareerSchema,
} from "../validations/player-club-careers.schema";
import { idSchema } from "../validations/primitives.schema";

export async function getPlayerClubCareersService(playerId: string) {
  const parsedId = idSchema.parse(playerId);

  return getPlayerClubCareersRepo(parsedId);
}

export async function getPlayerClubCareerEditService(
  playerClubCareerId: string,
) {
  const parsedId = idSchema.parse(playerClubCareerId);

  return getPlayerClubCareerEditRepo(parsedId);
}

export async function getPlayerClubCareerDetailService(
  playerClubCareerId: string,
) {
  const parsedId = idSchema.parse(playerClubCareerId);

  return getPlayerClubCareerDetailRepo(parsedId);
}

export async function getPlayerClubCareerLookupService(
  playerClubCareerId: string,
) {
  const parsedId = idSchema.parse(playerClubCareerId);

  return getPlayerClubCareerLookupRepo(parsedId);
}

export async function createPlayerClubCareerService(
  playerId: string,
  input: UpsertPlayerClubCareerInput,
) {
  const parsedPlayerId = idSchema.parse(playerId);
  const parsed = createPlayerClubCareerSchema.parse(input);

  return createPlayerClubCareerRepo(parsedPlayerId, parsed);
}

export async function updatePlayerClubCareerService(
  playerClubCareerId: string,
  playerId: string,
  input: unknown,
) {
  const parsedId = idSchema.parse(playerClubCareerId);
  const parsedPlayerId = idSchema.parse(playerId);
  const parsed = updatePlayerClubCareerSchema.parse(input);

  return updatePlayerClubCareerRepo(parsedId, parsedPlayerId, parsed);
}

export async function deletePlayerClubCareerService(
  playerClubCareerId: string,
) {
  const parsedId = idSchema.parse(playerClubCareerId);

  await deletePlayerClubCareerRepo(parsedId);
}
