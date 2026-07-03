import {
  createClubRepo,
  deleteClubRepo,
  getClubByIdRepo,
  getClubsRepo,
  updateClubRepo,
} from "@/lib/repositories/clubs.repo";
import {
  clubIdSchema,
  clubsQuerySchema,
  createClubSchema,
  updateClubSchema,
} from "@/lib/validations/clubs.schema";

export async function getClubsService(query: unknown) {
  const parsed = clubsQuerySchema.parse(query);

  return getClubsRepo(parsed);
}

export async function getClubByIdService(id: string) {
  const parsedId = clubIdSchema.parse(id);

  return getClubByIdRepo(parsedId);
}

export async function createClubService(input: unknown) {
  const parsed = createClubSchema.parse(input);

  return createClubRepo(parsed);
}

export async function updateClubService(id: string, input: unknown) {
  const parsedId = clubIdSchema.parse(id);
  const parsed = updateClubSchema.parse(input);

  return updateClubRepo(parsedId, parsed);
}

export async function deleteClubService(id: string) {
  const parsedId = clubIdSchema.parse(id);

  await deleteClubRepo(parsedId);
}
