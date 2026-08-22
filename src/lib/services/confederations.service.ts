import {
  createConfederationRepo,
  deleteConfederationRepo,
  getConfederationDetailRepo,
  getConfederationEditRepo,
  getConfederationLookupRepo,
  getConfederationOptionsRepo,
  getConfederationsRepo,
  updateConfederationRepo,
} from "../repositories/confederations.repo";
import {
  confederationsQuerySchema,
  createConfederationSchema,
  updateConfederationSchema,
} from "../validations/confederations.schema";
import { idSchema, slugSchema } from "../validations/primitives.schema";

export async function getConfederationsService(query: unknown) {
  const parsed = confederationsQuerySchema.parse(query);

  return getConfederationsRepo(parsed);
}

export async function getConfederationOptionsService() {
  return getConfederationOptionsRepo();
}

export async function getConfederationEditService(id: string) {
  const parsedId = idSchema.parse(id);

  return getConfederationEditRepo(parsedId);
}

export async function getConfederationDetailService(id: string) {
  const parsedId = idSchema.parse(id);

  return getConfederationDetailRepo(parsedId);
}

export async function getConfederationLookupService(slug: string) {
  const parsedSlug = slugSchema.parse(slug);

  return getConfederationLookupRepo(parsedSlug);
}

export async function createConfederationService(input: unknown) {
  const parsed = createConfederationSchema.parse(input);

  return createConfederationRepo(parsed);
}

export async function updateConfederationService(id: string, input: unknown) {
  const parsedId = idSchema.parse(id);
  const parsed = updateConfederationSchema.parse(input);

  return updateConfederationRepo(parsedId, parsed);
}

export async function deleteConfederationService(id: string) {
  const parsedId = idSchema.parse(id);

  await deleteConfederationRepo(parsedId);
}
