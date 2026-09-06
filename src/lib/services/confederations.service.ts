import { ENTITY_CONFIG } from "@/config/entities";
import {
  createConfederationRepo,
  deleteConfederationRepo,
  ensureConfederationUniqueRepo,
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
import {
  uploadImageFromFormData,
  withUpdatedImage,
  withUploadedImage,
} from "../storage/image";
import { NotFoundError } from "../errors/http-error";
import { tryDeleteImage } from "./storage.service";

const STORAGE_BUCKET = ENTITY_CONFIG["confederation"]["storageBucket"];

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

export async function createConfederationService(
  input: unknown,
  formData: FormData,
) {
  const parsed = createConfederationSchema.parse(input);

  await ensureConfederationUniqueRepo({
    name: parsed.name,
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
    operation: () => createConfederationRepo(parsed),
  });
}

export async function updateConfederationService(
  id: string,
  input: unknown,
  formData: FormData,
) {
  const parsedId = idSchema.parse(id);
  const parsed = updateConfederationSchema.parse(input);

  await ensureConfederationUniqueRepo({
    name: parsed.name,
    ignoreId: parsedId,
  });

  const currentConfederation = await getConfederationEditRepo(parsedId);

  if (!currentConfederation) {
    throw new NotFoundError("Confederation not found");
  }

  const uploadedImage = await uploadImageFromFormData(
    formData,
    "image",
    parsed.name,
    STORAGE_BUCKET,
  );

  return withUpdatedImage({
    oldImage: currentConfederation.image,
    newImage: uploadedImage,
    shouldRename: currentConfederation.name !== parsed.name,
    newName: parsed.name,
    bucketName: STORAGE_BUCKET,

    operation: (finalImage) => {
      return updateConfederationRepo(parsedId, {
        ...parsed,
        image: finalImage,
      });
    },
  });
}

export async function deleteConfederationService(id: string) {
  const parsedId = idSchema.parse(id);

  const confederation = await getConfederationEditRepo(parsedId);

  if (!confederation) {
    throw new NotFoundError("Confederation not found");
  }

  await deleteConfederationRepo(parsedId);

  await tryDeleteImage(confederation.image, STORAGE_BUCKET);
}
