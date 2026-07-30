import { CompetitionListResponse } from "@/types/competition";
import { idSchema, slugSchema } from "../validations/primitives.schema";
import {
  competitionsQuerySchema,
  createCompetitionSchema,
  updateCompetitionSchema,
} from "../validations/competitions.schema";
import {
  createCompetitionRepo,
  deleteCompetitionRepo,
  getCompetitionDetailRepo,
  getCompetitionEditRepo,
  getCompetitionLookupRepo,
  getCompetitionsRepo,
  updateCompetitionRepo,
} from "../repositories/competitions.repo";

export async function getCompetitionsService(
  query: unknown,
): Promise<CompetitionListResponse> {
  const parsed = competitionsQuerySchema.parse(query);

  return getCompetitionsRepo(parsed);
}

export async function getCompetitionEditService(id: string) {
  const parsedId = idSchema.parse(id);

  return getCompetitionEditRepo(parsedId);
}

export async function getCompetitionDetailService(id: string) {
  const parsedId = idSchema.parse(id);

  return getCompetitionDetailRepo(parsedId);
}

export async function getCompetitionLookupService(slug: string) {
  const parsedSlug = slugSchema.parse(slug);

  return getCompetitionLookupRepo(parsedSlug);
}

export async function createCompetitionService(input: unknown) {
  const parsed = createCompetitionSchema.parse(input);

  return createCompetitionRepo(parsed);
}

export async function updateCompetitionService(id: string, input: unknown) {
  const parsedId = idSchema.parse(id);
  const parsed = updateCompetitionSchema.parse(input);

  return updateCompetitionRepo(parsedId, parsed);
}

export async function deleteCompetitionService(id: string) {
  const parsedId = idSchema.parse(id);

  await deleteCompetitionRepo(parsedId);
}
