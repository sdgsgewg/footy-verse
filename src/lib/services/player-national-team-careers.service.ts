import {
  createPlayerNationalTeamCareerRepo,
  deletePlayerNationalTeamCareerRepo,
  getPlayerNationalTeamCareerDetailRepo,
  getPlayerNationalTeamCareerEditRepo,
  getPlayerNationalTeamCareerLookupRepo,
  getPlayerNationalTeamCareersRepo,
  updatePlayerNationalTeamCareerRepo,
} from "../repositories/player-national-team-careers.repo";
import { idSchema } from "../validations/primitives.schema";
import {
  createPlayerNationalTeamCareerSchema,
  updatePlayerNationalTeamCareerSchema,
} from "../validations/player-national-team-careers.schema";
import {
  PlayerNationalTeamCareerCreateInput,
  PlayerNationalTeamCareerUpdateInput,
} from "@/types/player-national-team-career";

export async function getPlayerNationalTeamCareersService(playerId: string) {
  return getPlayerNationalTeamCareersRepo(playerId);
}

export async function getPlayerNationalTeamCareerEditService(careerId: string) {
  const parsedId = idSchema.parse(careerId);

  return getPlayerNationalTeamCareerEditRepo(parsedId);
}

export async function getPlayerNationalTeamCareerDetailService(
  careerId: string,
) {
  const parsedId = idSchema.parse(careerId);

  return getPlayerNationalTeamCareerDetailRepo(parsedId);
}

export async function getPlayerNationalTeamCareerLookupService(
  careerId: string,
) {
  const parsedId = idSchema.parse(careerId);

  return getPlayerNationalTeamCareerLookupRepo(parsedId);
}

export async function createPlayerNationalTeamCareerService(
  playerId: string,
  input: PlayerNationalTeamCareerCreateInput,
) {
  const parsedPlayerId = idSchema.parse(playerId);
  const parsed = createPlayerNationalTeamCareerSchema.parse(input);

  return createPlayerNationalTeamCareerRepo(parsedPlayerId, parsed);
}

export async function updatePlayerNationalTeamCareerService(
  careerId: string,
  playerId: string,
  input: PlayerNationalTeamCareerUpdateInput,
) {
  const parsedId = idSchema.parse(careerId);
  const parsedPlayerId = idSchema.parse(playerId);
  const parsed = updatePlayerNationalTeamCareerSchema.parse(input);

  return updatePlayerNationalTeamCareerRepo(parsedId, parsedPlayerId, parsed);
}

export async function deletePlayerNationalTeamCareerService(careerId: string) {
  const parsedId = idSchema.parse(careerId);

  await deletePlayerNationalTeamCareerRepo(parsedId);
}
