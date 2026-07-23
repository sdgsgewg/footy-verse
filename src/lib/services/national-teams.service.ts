import { GetNationalTeamsParams, NationalTeamCreateInput, NationalTeamUpdateInput } from "@/types/national-team";
import { idSchema } from "../validations/primitives.schema";
import { createNationalTeamSchema, nationalTeamsQuerySchema, updateNationalTeamSchema } from "../validations/national-teams.schema";
import { createNationalTeamRepo, deleteNationalTeamRepo, getNationalTeamDetailRepo, getNationalTeamEditRepo, getNationalTeamLookupRepo, getNationalTeamsRepo, updateNationalTeamRepo } from "../repositories/national-teams.repo";

export async function getNationalTeamsService(query: GetNationalTeamsParams) {
  const parsed = nationalTeamsQuerySchema.parse(query);

  return getNationalTeamsRepo(parsed);
}

export async function getNationalTeamEditService(id: string) {
  const parsedId = idSchema.parse(id);

  return getNationalTeamEditRepo(parsedId);
}

export async function getNationalTeamDetailService(id: string) {
  const parsedId = idSchema.parse(id);

  return getNationalTeamDetailRepo(parsedId);
}

export async function getNationalTeamLookupService(slug: string) {
  const parsedId = idSchema.parse(slug);

  return getNationalTeamLookupRepo(parsedId);
}

export async function createNationalTeamService(
  clubId: string,
  input: NationalTeamCreateInput,
) {
  const parsedClubId = idSchema.parse(clubId);
  const parsed = createNationalTeamSchema.parse(input);

  return createNationalTeamRepo(parsedClubId, parsed);
}

export async function updateNationalTeamService(
  teamId: string,
  clubId: string,
  input: NationalTeamUpdateInput,
) {
  const parsedTeamId = idSchema.parse(teamId);
  const parsedClubId = idSchema.parse(clubId);
  const parsed = updateNationalTeamSchema.parse(input);

  return updateNationalTeamRepo(parsedTeamId, parsedClubId, parsed);
}

export async function deleteNationalTeamService(id: string) {
  const parsedId = idSchema.parse(id);

  await deleteNationalTeamRepo(parsedId);
}
