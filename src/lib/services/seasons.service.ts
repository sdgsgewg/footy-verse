import {
  createSeasonRepo,
  deleteSeasonRepo,
  getSeasonByIdRepo,
  getSeasonsRepo,
  updateSeasonRepo,
} from "../repositories/seasons.repo";
import { idSchema } from "../validations/primitives.schema";
import {
  createSeasonSchema,
  seasonsQuerySchema,
  updateSeasonSchema,
} from "../validations/seasons.schema";

export async function getSeasonsService(query: unknown) {
  const parsed = seasonsQuerySchema.parse(query);

  return getSeasonsRepo(parsed);
}

export async function getSeasonByIdService(id: string) {
  const parsedId = idSchema.parse(id);

  return getSeasonByIdRepo(parsedId);
}

export async function createSeasonService(input: unknown) {
  const parsed = createSeasonSchema.parse(input);

  return createSeasonRepo(parsed);
}

export async function updateSeasonService(id: string, input: unknown) {
  const parsedId = idSchema.parse(id);
  const parsed = updateSeasonSchema.parse(input);

  return updateSeasonRepo(parsedId, parsed);
}

export async function deleteSeasonService(id: string) {
  const parsedId = idSchema.parse(id);

  await deleteSeasonRepo(parsedId);
}
