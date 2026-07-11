import { createSeasonRepo, deleteSeasonRepo, getSeasonByIdRepo, getSeasonsRepo, updateSeasonRepo } from "../repositories/seasons.repo";
import { createSeasonSchema, seasonIdSchema, seasonsQuerySchema, updateSeasonSchema } from "../validations/seasons.schema";


export async function getSeasonsService(query: unknown) {
  const parsed = seasonsQuerySchema.parse(query);

  return getSeasonsRepo(parsed);
}

export async function getSeasonByIdService(id: string) {
  const parsedId = seasonIdSchema.parse(id);

  return getSeasonByIdRepo(parsedId);
}

export async function createSeasonService(input: unknown) {
  const parsed = createSeasonSchema.parse(input);

  return createSeasonRepo(parsed);
}

export async function updateSeasonService(id: string, input: unknown) {
  const parsedId = seasonIdSchema.parse(id);
  const parsed = updateSeasonSchema.parse(input);

  return updateSeasonRepo(parsedId, parsed);
}

export async function deleteSeasonService(id: string) {
  const parsedId = seasonIdSchema.parse(id);

  await deleteSeasonRepo(parsedId);
}
