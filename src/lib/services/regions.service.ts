import {
  createRegionSchema,
  regionsQuerySchema,
  updateRegionSchema,
} from "../validations/regions.schema";
import {
  createRegionRepo,
  deleteRegionRepo,
  ensureRegionUniqueRepo,
  getRegionDetailRepo,
  getRegionEditRepo,
  getRegionLookupRepo,
  getRegionOptionsRepo,
  getRegionsRepo,
  updateRegionRepo,
} from "../repositories/regions.repo";
import { idSchema, slugSchema } from "../validations/primitives.schema";

export async function getRegionsService(query: unknown) {
  const parsed = regionsQuerySchema.parse(query);

  return getRegionsRepo(parsed);
}

export async function getRegionOptionsService() {
  return getRegionOptionsRepo();
}

export async function getRegionEditService(id: string) {
  const parsedId = idSchema.parse(id);

  return getRegionEditRepo(parsedId);
}

export async function getRegionDetailService(id: string) {
  const parsedId = idSchema.parse(id);

  return getRegionDetailRepo(parsedId);
}

export async function getRegionLookupService(slug: string) {
  const parsedSlug = slugSchema.parse(slug);

  return getRegionLookupRepo(parsedSlug);
}

export async function createRegionService(input: unknown) {
  const parsed = createRegionSchema.parse(input);

  return createRegionRepo(parsed);
}

export async function updateRegionService(id: string, input: unknown) {
  const parsedId = idSchema.parse(id);
  const parsed = updateRegionSchema.parse(input);

  return updateRegionRepo(parsedId, parsed);
}

export async function precheckCreateRegionService(input: unknown) {
  const parsed = createRegionSchema.parse(input);

  await ensureRegionUniqueRepo({
    name: parsed.name,
  });

  return parsed;
}

export async function precheckUpdateRegionService(id: string, input: unknown) {
  const parsedId = idSchema.parse(id);
  const parsed = updateRegionSchema.parse(input);

  await ensureRegionUniqueRepo({
    name: parsed.name,
    ignoreId: parsedId,
  });

  return parsed;
}

export async function deleteRegionService(id: string) {
  const parsedId = idSchema.parse(id);

  await deleteRegionRepo(parsedId);
}
