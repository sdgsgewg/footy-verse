import {
  createPositionCategoryRepo,
  deletePositionCategoryRepo,
  getPositionCategoriesRepo,
  getPositionCategoryDetailRepo,
  getPositionCategoryEditRepo,
  getPositionCategoryLookupRepo,
  updatePositionCategoryRepo,
} from "../repositories/position-categories.repo";
import {
  createPositionCategorySchema,
  positionCategoriesQuerySchema,
  updatePositionCategorySchema,
} from "../validations/position-categories.schema";
import { idSchema, slugSchema } from "../validations/primitives.schema";

export async function getPositionCategoriesService(query: unknown) {
  const parsed = positionCategoriesQuerySchema.parse(query);

  return getPositionCategoriesRepo(parsed);
}

export async function getPositionCategoryEditService(id: string) {
  const parsedId = idSchema.parse(id);

  return getPositionCategoryEditRepo(parsedId);
}

export async function getPositionCategoryDetailService(id: string) {
  const parsedId = idSchema.parse(id);

  return getPositionCategoryDetailRepo(parsedId);
}

export async function getPositionCategoryLookupService(slug: string) {
  const parsedSlug = slugSchema.parse(slug);

  return getPositionCategoryLookupRepo(parsedSlug);
}

export async function createPositionCategoryService(input: unknown) {
  const parsed = createPositionCategorySchema.parse(input);

  return createPositionCategoryRepo(parsed);
}

export async function updatePositionCategoryService(
  id: string,
  input: unknown,
) {
  const parsedId = idSchema.parse(id);
  const parsed = updatePositionCategorySchema.parse(input);

  return updatePositionCategoryRepo(parsedId, parsed);
}

export async function deletePositionCategoryService(id: string) {
  const parsedId = idSchema.parse(id);

  await deletePositionCategoryRepo(parsedId);
}
