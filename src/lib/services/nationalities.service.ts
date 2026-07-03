import {
  createNationalityRepo,
  deleteNationalityRepo,
  getNationalityByIdRepo,
  getNationalitiesRepo,
  updateNationalityRepo,
} from "@/lib/repositories/nationalities.repo";
import {
  nationalityIdSchema,
  nationalitiesQuerySchema,
  createNationalitySchema,
  updateNationalitySchema,
} from "@/lib/validations/nationalities.schema";

export async function getNationalitiesService(query: unknown) {
  const parsed = nationalitiesQuerySchema.parse(query);

  return getNationalitiesRepo(parsed);
}

export async function getNationalityByIdService(id: string) {
  const parsedId = nationalityIdSchema.parse(id);

  return getNationalityByIdRepo(parsedId);
}

export async function createNationalityService(input: unknown) {
  const parsed = createNationalitySchema.parse(input);

  return createNationalityRepo(parsed);
}

export async function updateNationalityService(id: string, input: unknown) {
  const parsedId = nationalityIdSchema.parse(id);
  const parsed = updateNationalitySchema.parse(input);

  return updateNationalityRepo(parsedId, parsed);
}

export async function deleteNationalityService(id: string) {
  const parsedId = nationalityIdSchema.parse(id);

  await deleteNationalityRepo(parsedId);
}
