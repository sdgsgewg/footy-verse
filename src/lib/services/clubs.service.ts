import {
  createClubRepo,
  deleteClubRepo,
  getClubDetailRepo,
  getClubEditRepo,
  getClubLookupRepo,
  getClubsRepo,
  updateClubRepo,
} from "@/lib/repositories/clubs.repo";
import {
  clubsQuerySchema,
  createClubSchema,
  updateClubSchema,
} from "@/lib/validations/clubs.schema";
import { idSchema, slugSchema } from "../validations/primitives.schema";
import { GetClubsParams } from "@/types/club";

export async function getClubsService(query: GetClubsParams) {
  const parsed = clubsQuerySchema.parse(query);

  return getClubsRepo(parsed);
}

export async function getClubEditService(id: string) {
  const parsedId = idSchema.parse(id);

  return getClubEditRepo(parsedId);
}

export async function getClubDetailService(id: string) {
  const parsedId = idSchema.parse(id);

  return getClubDetailRepo(parsedId);
}

export async function getClubLookupService(slug: string) {
  const parsedSlug = slugSchema.parse(slug);

  return getClubLookupRepo(parsedSlug);
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
