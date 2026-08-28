import { UpsertPlayerClubTeamCareerInput } from "@/types/player-club-team-career";
import {
  createPlayerClubTeamCareerRepo,
  deletePlayerClubTeamCareerRepo,
  getPlayerClubTeamCareerDetailRepo,
  getPlayerClubTeamCareerEditRepo,
  getPlayerClubTeamCareerLookupRepo,
  getPlayerClubTeamCareersRepo,
  updatePlayerClubTeamCareerRepo,
} from "../repositories/player-club-team-careers.repo";
import {
  createPlayerClubTeamCareerSchema,
  updatePlayerClubTeamCareerSchema,
} from "../validations/player-club-team-careers.schema";
import { idSchema } from "../validations/primitives.schema";

export async function getPlayerClubTeamCareersService(playerId: string) {
  const parsedId = idSchema.parse(playerId);

  return getPlayerClubTeamCareersRepo(parsedId);
}

export async function getPlayerClubTeamCareerEditService(
  playerClubTeamCareerId: string,
) {
  const parsedId = idSchema.parse(playerClubTeamCareerId);

  return getPlayerClubTeamCareerEditRepo(parsedId);
}

export async function getPlayerClubTeamCareerDetailService(
  playerClubTeamCareerId: string,
) {
  const parsedId = idSchema.parse(playerClubTeamCareerId);

  return getPlayerClubTeamCareerDetailRepo(parsedId);
}

export async function getPlayerClubTeamCareerLookupService(
  playerClubTeamCareerId: string,
) {
  const parsedId = idSchema.parse(playerClubTeamCareerId);

  return getPlayerClubTeamCareerLookupRepo(parsedId);
}

export async function createPlayerClubTeamCareerService(
  playerId: string,
  input: UpsertPlayerClubTeamCareerInput,
) {
  const parsedPlayerId = idSchema.parse(playerId);
  const parsed = createPlayerClubTeamCareerSchema.parse(input);

  return createPlayerClubTeamCareerRepo(parsedPlayerId, parsed);
}

export async function updatePlayerClubTeamCareerService(
  playerClubTeamCareerId: string,
  playerId: string,
  input: unknown,
) {
  const parsedId = idSchema.parse(playerClubTeamCareerId);
  const parsedPlayerId = idSchema.parse(playerId);
  const parsed = updatePlayerClubTeamCareerSchema.parse(input);

  return updatePlayerClubTeamCareerRepo(parsedId, parsedPlayerId, parsed);
}

export async function deletePlayerClubTeamCareerService(
  playerClubTeamCareerId: string,
) {
  const parsedId = idSchema.parse(playerClubTeamCareerId);

  await deletePlayerClubTeamCareerRepo(parsedId);
}
