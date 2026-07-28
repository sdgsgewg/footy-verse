import {
  createCompetitionCategoryRepo,
  deleteCompetitionCategoryRepo,
  getCompetitionCategoriesRepo,
  getCompetitionCategoryDetailRepo,
  getCompetitionCategoryEditRepo,
  getCompetitionCategoryLookupRepo,
  updateCompetitionCategoryRepo,
} from "../repositories/competition-categories.repo";
import {
  competitionCategoriesQuerySchema,
  createCompetitionCategorySchema,
  updateCompetitionCategorySchema,
} from "../validations/competition-categories.schema";
import { idSchema, slugSchema } from "../validations/primitives.schema";

export async function getCompetitionCategoriesService(query: unknown) {
  const parsed = competitionCategoriesQuerySchema.parse(query);

  return getCompetitionCategoriesRepo(parsed);
}

export async function getCompetitionCategoryEditService(id: string) {
  const parsedId = idSchema.parse(id);

  return getCompetitionCategoryEditRepo(parsedId);
}

export async function getCompetitionCategoryDetailService(id: string) {
  const parsedId = idSchema.parse(id);

  return getCompetitionCategoryDetailRepo(parsedId);
}

export async function getCompetitionCategoryLookupService(slug: string) {
  const parsedSlug = slugSchema.parse(slug);

  return getCompetitionCategoryLookupRepo(parsedSlug);
}

export async function createCompetitionCategoryService(input: unknown) {
  const parsed = createCompetitionCategorySchema.parse(input);

  return createCompetitionCategoryRepo(parsed);
}

export async function updateCompetitionCategoryService(
  id: string,
  input: unknown,
) {
  const parsedId = idSchema.parse(id);
  const parsed = updateCompetitionCategorySchema.parse(input);

  return updateCompetitionCategoryRepo(parsedId, parsed);
}

export async function deleteCompetitionCategoryService(id: string) {
  const parsedId = idSchema.parse(id);

  await deleteCompetitionCategoryRepo(parsedId);
}
