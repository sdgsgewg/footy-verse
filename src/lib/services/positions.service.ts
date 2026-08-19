import {
  createPositionRepo,
  deletePositionRepo,
  getPositionDetailRepo,
  getPositionEditRepo,
  getPositionLookupRepo,
  getPositionsRepo,
  reorderPositionsRepo,
  updatePositionRepo,
} from "@/lib/repositories/positions.repo";
import {
  positionsQuerySchema,
  createPositionSchema,
  updatePositionSchema,
  reorderPositionsSchema,
} from "@/lib/validations/positions.schema";
import { idSchema, slugSchema } from "../validations/primitives.schema";

export async function getPositionsService(query: unknown) {
  const parsed = positionsQuerySchema.parse(query);

  return getPositionsRepo(parsed);
}

export async function getPositionEditService(id: string) {
  const parsedId = idSchema.parse(id);

  return getPositionEditRepo(parsedId);
}

export async function getPositionDetailService(id: string) {
  const parsedId = idSchema.parse(id);

  return getPositionDetailRepo(parsedId);
}

export async function getPositionLookupService(slug: string) {
  const parsedSlug = slugSchema.parse(slug);

  return getPositionLookupRepo(parsedSlug);
}

export async function createPositionService(input: unknown) {
  const parsed = createPositionSchema.parse(input);

  return createPositionRepo(parsed);
}

export async function updatePositionService(id: string, input: unknown) {
  const parsedId = idSchema.parse(id);
  const parsed = updatePositionSchema.parse(input);

  return updatePositionRepo(parsedId, parsed);
}

export async function reorderPositionsService(input: unknown) {
  const parsed = reorderPositionsSchema.parse(input);

  return reorderPositionsRepo(parsed);
}

export async function deletePositionService(id: string) {
  const parsedId = idSchema.parse(id);

  await deletePositionRepo(parsedId);
}
