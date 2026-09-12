import { CompetitionListResponse } from "@/types/competition";
import { idSchema, slugSchema } from "../validations/primitives.schema";
import {
  competitionsQuerySchema,
  createCompetitionSchema,
  updateCompetitionSchema,
} from "../validations/competitions/competitions.schema";
import {
  createCompetitionRepo,
  deleteCompetitionRepo,
  ensureCompetitionUniqueRepo,
  getCompetitionDetailRepo,
  getCompetitionEditRepo,
  getCompetitionLookupRepo,
  getCompetitionsRepo,
  updateCompetitionRepo,
} from "../repositories/competitions.repo";
import { ENTITY_CONFIG } from "@/config/entities";
import {
  uploadImageFromFormData,
  withUpdatedImage,
  withUploadedImage,
} from "../storage/image";
import { NotFoundError } from "../errors/http-error";
import { tryDeleteImage } from "./storage.service";

const STORAGE_BUCKET = ENTITY_CONFIG["competition"]["storageBucket"];

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

export async function createCompetitionService(
  input: unknown,
  formData: FormData,
) {
  const parsed = createCompetitionSchema.parse(input);

  await ensureCompetitionUniqueRepo({
    name: parsed.short_name,
  });

  const image = await uploadImageFromFormData(
    formData,
    "image",
    parsed.short_name,
    STORAGE_BUCKET,
  );

  parsed.image = image;

  return withUploadedImage({
    image,
    bucketName: STORAGE_BUCKET,
    operation: () => createCompetitionRepo(parsed),
  });
}

export async function updateCompetitionService(
  id: string,
  input: unknown,
  formData: FormData,
) {
  const parsedId = idSchema.parse(id);
  const parsed = updateCompetitionSchema.parse(input);

  await ensureCompetitionUniqueRepo({
    name: parsed.name,
    ignoreId: parsedId,
  });

  const currentcomp = await getCompetitionEditRepo(parsedId);

  if (!currentcomp) {
    throw new NotFoundError("Competition not found");
  }

  const uploadedImage = await uploadImageFromFormData(
    formData,
    "image",
    parsed.short_name,
    STORAGE_BUCKET,
  );

  return withUpdatedImage({
    oldImage: currentcomp.image,
    newImage: uploadedImage,
    shouldRename: currentcomp.shortName !== parsed.short_name,
    newName: parsed.short_name,
    bucketName: STORAGE_BUCKET,

    operation: (finalImage) => {
      return updateCompetitionRepo(parsedId, {
        ...parsed,
        image: finalImage,
      });
    },
  });
}

export async function deleteCompetitionService(id: string) {
  const parsedId = idSchema.parse(id);

  const competition = await getCompetitionEditRepo(parsedId);

  if (!competition) {
    throw new NotFoundError("Competition not found");
  }

  await deleteCompetitionRepo(parsedId);

  await tryDeleteImage(competition.image, STORAGE_BUCKET);
}
