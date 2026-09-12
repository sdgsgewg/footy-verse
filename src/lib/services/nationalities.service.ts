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
} from "@/lib/validations/nationalities/nationalities.schema";
import { idSchema, slugSchema } from "../validations/primitives.schema";
import {
  uploadImageFromFormData,
  withUpdatedImage,
  withUploadedImage,
} from "../storage/image";
import { ENTITY_CONFIG } from "@/config/entities";
import { NotFoundError } from "../errors/http-error";
import { tryDeleteImage } from "./storage.service";

const STORAGE_BUCKET = ENTITY_CONFIG["nationality"]["storageBucket"];

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

export async function createNationalityService(
  input: unknown,
  formData: FormData,
) {
  const parsed = createNationalitySchema.parse(input);

  await ensureNationalityUniqueRepo({
    name: parsed.name,
    fifaCode: parsed.fifa_code,
  });

  const image = await uploadImageFromFormData(
    formData,
    "image",
    parsed.name,
    STORAGE_BUCKET,
  );

  parsed.image = image;

  return withUploadedImage({
    image,
    bucketName: STORAGE_BUCKET,
    operation: () => createNationalityRepo(parsed),
  });
}

export async function updateNationalityService(
  id: string,
  input: unknown,
  formData: FormData,
) {
  const parsedId = idSchema.parse(id);
  const parsed = updateNationalitySchema.parse(input);

  await ensureNationalityUniqueRepo({
    name: parsed.name,
    fifaCode: parsed.fifa_code,
    ignoreId: parsedId,
  });

  const currentNationality = await getNationalityEditRepo(parsedId);

  if (!currentNationality) {
    throw new NotFoundError("Nationality not found");
  }

  const uploadedImage = await uploadImageFromFormData(
    formData,
    "image",
    parsed.name,
    STORAGE_BUCKET,
  );

  return withUpdatedImage({
    oldImage: currentNationality.image,
    newImage: uploadedImage,
    shouldRename: currentNationality.name !== parsed.name,
    newName: parsed.name,
    bucketName: STORAGE_BUCKET,

    operation: (finalImage) => {
      return updateNationalityRepo(parsedId, {
        ...parsed,
        image: finalImage,
      });
    },
  });
}

export async function deleteNationalityService(id: string) {
  const parsedId = idSchema.parse(id);

  const nationality = await getNationalityEditRepo(parsedId);

  if (!nationality) {
    throw new NotFoundError("Nationality not found");
  }

  await deleteNationalityRepo(parsedId);

  await tryDeleteImage(nationality.image, STORAGE_BUCKET);
}
