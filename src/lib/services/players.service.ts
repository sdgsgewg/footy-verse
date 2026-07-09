import {
  createPlayerRepo,
  deletePlayerRepo,
  getPlayerByIdRepo,
  getPlayersRepo,
  updatePlayerRepo,
} from "@/lib/repositories/players.repo";
import {
  playerIdSchema,
  playersQuerySchema,
  createPlayerSchema,
  updatePlayerSchema,
} from "@/lib/validations/players.schema";

export async function getPlayersService(query: unknown) {
  const parsed = playersQuerySchema.parse(query);

  return getPlayersRepo(parsed);
}

export async function getPlayerByIdService(id: string) {
  const parsedId = playerIdSchema.parse(id);

  return getPlayerByIdRepo(parsedId);
}

export async function createPlayerService(input: unknown) {
  const parsed = createPlayerSchema.parse(input);

  return createPlayerRepo(parsed);
}

export async function updatePlayerService(id: string, input: unknown) {
  const parsedId = playerIdSchema.parse(id);
  const parsed = updatePlayerSchema.parse(input);

  return updatePlayerRepo(parsedId, parsed);
}

export async function deletePlayerService(id: string) {
  const parsedId = playerIdSchema.parse(id);

  await deletePlayerRepo(parsedId);
}
