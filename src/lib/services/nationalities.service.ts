import {
  createNationalityRepo,
  deleteNationalityRepo,
  getNationalityByIdRepo,
  getNationalitiesRepo,
  updateNationalityRepo,
  getNationalityBySlugRepo,
} from "@/lib/repositories/nationalities.repo";
import {
  nationalitiesQuerySchema,
  createNationalitySchema,
  updateNationalitySchema,
} from "@/lib/validations/nationalities.schema";
import { idSchema, slugSchema } from "../validations/primitives.schema";

export async function getNationalitiesService(query: unknown) {
  const parsed = nationalitiesQuerySchema.parse(query);

  return getNationalitiesRepo(parsed);
}

export async function getNationalityByIdService(id: string) {
  const parsedId = idSchema.parse(id);

  return getNationalityByIdRepo(parsedId);
}

export async function getNationalityBySlugService(slug: string) {
  const parsedSlug = slugSchema.parse(slug);

  return getNationalityBySlugRepo(parsedSlug);
}

export async function createNationalityService(input: unknown) {
  const parsed = createNationalitySchema.parse(input);

  return createNationalityRepo(parsed);
}

export async function updateNationalityService(id: string, input: unknown) {
  const parsedId = idSchema.parse(id);
  const parsed = updateNationalitySchema.parse(input);

  return updateNationalityRepo(parsedId, parsed);
}

export async function deleteNationalityService(id: string) {
  const parsedId = idSchema.parse(id);

  await deleteNationalityRepo(parsedId);
}
