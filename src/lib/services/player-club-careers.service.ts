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
  return getPlayerClubCareersRepo(playerId);
}

export async function getPlayerClubCareerEditService(careerId: string) {
  const parsedId = idSchema.parse(careerId);

  return getPlayerClubCareerEditRepo(parsedId);
}

export async function getPlayerClubCareerDetailService(careerId: string) {
  const parsedId = idSchema.parse(careerId);

  return getPlayerClubCareerDetailRepo(parsedId);
}

export async function getPlayerClubCareerLookupService(careerId: string) {
  const parsedId = idSchema.parse(careerId);

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
  careerId: string,
  playerId: string,
  input: unknown,
) {
  const parsedId = idSchema.parse(careerId);
  const parsedPlayerId = idSchema.parse(playerId);
  const parsed = updatePlayerClubCareerSchema.parse(input);

  return updatePlayerClubCareerRepo(parsedId, parsedPlayerId, parsed);
}

export async function deletePlayerClubCareerService(careerId: string) {
  const parsedId = idSchema.parse(careerId);

  await deletePlayerClubCareerRepo(parsedId);
}
