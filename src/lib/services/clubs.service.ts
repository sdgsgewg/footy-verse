import {
  createClubRepo,
  deleteClubRepo,
  getClubByIdRepo,
  getClubBySlugRepo,
  getClubsRepo,
  updateClubRepo,
} from "@/lib/repositories/clubs.repo";
import {
  clubsQuerySchema,
  createClubSchema,
  updateClubSchema,
} from "@/lib/validations/clubs.schema";
import { idSchema, slugSchema } from "../validations/primitives.schema";

export async function getClubsService(query: unknown) {
  const parsed = clubsQuerySchema.parse(query);

  return getClubsRepo(parsed);
}

export async function getClubByIdService(id: string) {
  const parsedId = idSchema.parse(id);

  return getClubByIdRepo(parsedId);
}

export async function getClubBySlugService(slug: string) {
  const parsedSlug = slugSchema.parse(slug);

  return getClubBySlugRepo(parsedSlug);
}

export async function createClubService(input: unknown) {
  const parsed = createClubSchema.parse(input);

  return createClubRepo(parsed);
}

export async function updateClubService(id: string, input: unknown) {
  const parsedId = idSchema.parse(id);
  const parsed = updateClubSchema.parse(input);

  return updateClubRepo(parsedId, parsed);
}

export async function deleteClubService(id: string) {
  const parsedId = idSchema.parse(id);

  await deleteClubRepo(parsedId);
}
