import {
  createPlayerRepo,
  deletePlayerRepo,
  getPlayerEditRepo,
  getPlayerDetailRepo,
  getPlayersRepo,
  updatePlayerRepo,
  getPlayerLookupRepo,
} from "@/lib/repositories/players.repo";
import {
  playersQuerySchema,
  createPlayerSchema,
  updatePlayerSchema,
} from "@/lib/validations/players.schema";
import { idSchema, slugSchema } from "../validations/primitives.schema";

export async function getPlayersService(query: unknown) {
  const parsed = playersQuerySchema.parse(query);

  return getPlayersRepo(parsed);
}

export async function getPlayerEditService(id: string) {
  const parsedId = idSchema.parse(id);

  return getPlayerEditRepo(parsedId);
}

export async function getPlayerDetailService(id: string) {
  const parsedId = idSchema.parse(id);

  return getPlayerDetailRepo(parsedId);
}

export async function getPlayerLookupService(slug: string) {
  const parsedSlug = slugSchema.parse(slug);

  return getPlayerLookupRepo(parsedSlug);
}

export async function createPlayerService(input: unknown) {
  const parsed = createPlayerSchema.parse(input);

  return createPlayerRepo(parsed);
}

export async function updatePlayerService(id: string, input: unknown) {
  const parsedId = idSchema.parse(id);
  const parsed = updatePlayerSchema.parse(input);

  return updatePlayerRepo(parsedId, parsed);
}

export async function deletePlayerService(id: string) {
  const parsedId = idSchema.parse(id);

  await deletePlayerRepo(parsedId);
}
