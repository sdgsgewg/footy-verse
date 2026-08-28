import {
  createCompetitionScopeRepo,
  deleteCompetitionScopeRepo,
  getCompetitionScopeDetailRepo,
  getCompetitionScopeEditRepo,
  getCompetitionScopeLookupRepo,
  getCompetitionScopeOptionsRepo,
  getCompetitionScopesRepo,
  updateCompetitionScopeRepo,
} from "../repositories/competition-scopes.repo";
import {
  competitionScopesQuerySchema,
  createCompetitionScopeSchema,
  updateCompetitionScopeSchema,
} from "../validations/competition-scopes.schema";
import { idSchema, slugSchema } from "../validations/primitives.schema";

export async function getCompetitionScopesService(query: unknown) {
  const parsed = competitionScopesQuerySchema.parse(query);

  return getCompetitionScopesRepo(parsed);
}

export async function getCompetitionScopeOptionsService() {
  return getCompetitionScopeOptionsRepo();
}

export async function getCompetitionScopeEditService(id: string) {
  const parsedId = idSchema.parse(id);

  return getCompetitionScopeEditRepo(parsedId);
}

export async function getCompetitionScopeDetailService(id: string) {
  const parsedId = idSchema.parse(id);

  return getCompetitionScopeDetailRepo(parsedId);
}

export async function getCompetitionScopeLookupService(slug: string) {
  const parsedSlug = slugSchema.parse(slug);

  return getCompetitionScopeLookupRepo(parsedSlug);
}

export async function createCompetitionScopeService(input: unknown) {
  const parsed = createCompetitionScopeSchema.parse(input);

  return createCompetitionScopeRepo(parsed);
}

export async function updateCompetitionScopeService(
  id: string,
  input: unknown,
) {
  const parsedId = idSchema.parse(id);
  const parsed = updateCompetitionScopeSchema.parse(input);

  return updateCompetitionScopeRepo(parsedId, parsed);
}

export async function deleteCompetitionScopeService(id: string) {
  const parsedId = idSchema.parse(id);

  await deleteCompetitionScopeRepo(parsedId);
}
