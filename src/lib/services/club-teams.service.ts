import {
  ClubTeamCreateInput,
  ClubTeamUpdateInput,
  GetClubTeamsParams,
} from "@/types/club-team";
import {
  createClubTeamRepo,
  deleteClubTeamRepo,
  getClubTeamDetailRepo,
  getClubTeamEditRepo,
  getClubTeamLookupRepo,
  getClubTeamsRepo,
  updateClubTeamRepo,
} from "../repositories/club-teams.repo";
import { idSchema } from "../validations/primitives.schema";
import {
  clubTeamsQuerySchema,
  createClubTeamSchema,
  updateClubTeamSchema,
} from "../validations/club-teams.schema";

export async function getClubTeamsService(query: GetClubTeamsParams) {
  const parsed = clubTeamsQuerySchema.parse(query);

  return getClubTeamsRepo(parsed);
}

export async function getClubTeamEditService(id: string) {
  const parsedId = idSchema.parse(id);

  return getClubTeamEditRepo(parsedId);
}

export async function getClubTeamDetailService(id: string) {
  const parsedId = idSchema.parse(id);

  return getClubTeamDetailRepo(parsedId);
}

export async function getClubTeamLookupService(slug: string) {
  const parsedId = idSchema.parse(slug);

  return getClubTeamLookupRepo(parsedId);
}

export async function createClubTeamService(
  clubId: string,
  input: ClubTeamCreateInput,
) {
  const parsedClubId = idSchema.parse(clubId);
  const parsed = createClubTeamSchema.parse(input);

  return createClubTeamRepo(parsedClubId, parsed);
}

export async function updateClubTeamService(
  teamId: string,
  clubId: string,
  input: ClubTeamUpdateInput,
) {
  const parsedTeamId = idSchema.parse(teamId);
  const parsedClubId = idSchema.parse(clubId);
  const parsed = updateClubTeamSchema.parse(input);

  return updateClubTeamRepo(parsedTeamId, parsedClubId, parsed);
}

export async function deleteClubTeamService(id: string) {
  const parsedId = idSchema.parse(id);

  await deleteClubTeamRepo(parsedId);
}
