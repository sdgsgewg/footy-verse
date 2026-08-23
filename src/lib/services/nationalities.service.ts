import {
  createNationalityRepo,
  deleteNationalityRepo,
  getNationalitiesRepo,
  getNationalityDetailRepo,
  getNationalityEditRepo,
  getNationalityLookupRepo,
  getNationalityOptionsRepo,
  ensureNationalityUniqueRepo,
  updateNationalityRepo,
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

export async function getNationalityOptionsService() {
  return getNationalityOptionsRepo();
}

export async function getNationalityEditService(id: string) {
  const parsedId = idSchema.parse(id);

  return getNationalityEditRepo(parsedId);
}

export async function getNationalityDetailService(id: string) {
  const parsedId = idSchema.parse(id);

  return getNationalityDetailRepo(parsedId);
}

export async function getNationalityLookupService(slug: string) {
  const parsedSlug = slugSchema.parse(slug);

  return getNationalityLookupRepo(parsedSlug);
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

/**
 * Runs the same validated duplicate check before a route uploads an image.
 * Mutation repositories repeat the check immediately before writing because
 * only the database constraint can close a concurrent-request race.
 */
export async function precheckCreateNationalityService(input: unknown) {
  const parsed = createNationalitySchema.parse(input);

  await ensureNationalityUniqueRepo({
    name: parsed.name,
    fifaCode: parsed.fifa_code,
  });

  return parsed;
}

export async function precheckUpdateNationalityService(
  id: string,
  input: unknown,
) {
  const parsedId = idSchema.parse(id);
  const parsed = updateNationalitySchema.parse(input);

  await ensureNationalityUniqueRepo({
    name: parsed.name,
    fifaCode: parsed.fifa_code,
    ignoreId: parsedId,
  });

  return parsed;
}

export async function deleteNationalityService(id: string) {
  const parsedId = idSchema.parse(id);

  await deleteNationalityRepo(parsedId);
}
