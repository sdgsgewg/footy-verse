import { CompetitionSeasonListItem } from "@/types/competition-season";
import { idSchema, slugSchema } from "../validations/primitives.schema";
import {
  competitionSeasonsQuerySchema,
  createCompetitionSeasonSchema,
  updateCompetitionSeasonSchema,
} from "../validations/competition-seasons.schema";
import {
  createCompetitionSeasonRepo,
  deleteCompetitionSeasonRepo,
  getCompetitionSeasonDetailRepo,
  getCompetitionSeasonEditRepo,
  getCompetitionSeasonLookupRepo,
  getCompetitionSeasonsRepo,
  updateCompetitionSeasonRepo,
} from "../repositories/competition-seasons.repo";

export async function getCompetitionSeasonsService(
  competitionId: string,
  query: unknown,
): Promise<CompetitionSeasonListItem[]> {
  const parsedCompetitionId = idSchema.parse(competitionId);
  const parsed = competitionSeasonsQuerySchema.parse(query);

  return getCompetitionSeasonsRepo(parsedCompetitionId, parsed);
}

export async function getCompetitionSeasonEditService(
  competitionSeasonId: string,
) {
  const parsedId = idSchema.parse(competitionSeasonId);

  return getCompetitionSeasonEditRepo(parsedId);
}

export async function getCompetitionSeasonDetailService(
  competitionSeasonId: string,
) {
  const parsedId = idSchema.parse(competitionSeasonId);

  return getCompetitionSeasonDetailRepo(parsedId);
}

export async function getCompetitionSeasonLookupService(slug: string) {
  const parsedSlug = slugSchema.parse(slug);

  return getCompetitionSeasonLookupRepo(parsedSlug);
}

export async function createCompetitionSeasonService(
  competitionId: string,
  input: unknown,
) {
  const parsedCompetitionId = idSchema.parse(competitionId);
  const parsed = createCompetitionSeasonSchema.parse(input);

  return createCompetitionSeasonRepo(parsedCompetitionId, parsed);
}

export async function updateCompetitionSeasonService(
  competitionSeasonId: string,
  competitionId: string,
  input: unknown,
) {
  const parsedId = idSchema.parse(competitionSeasonId);
  const parsedCompetitionId = idSchema.parse(competitionId);
  const parsed = updateCompetitionSeasonSchema.parse(input);

  return updateCompetitionSeasonRepo(parsedId, parsedCompetitionId, parsed);
}

export async function deleteCompetitionSeasonService(
  competitionSeasonId: string,
) {
  const parsedId = idSchema.parse(competitionSeasonId);

  await deleteCompetitionSeasonRepo(parsedId);
}
