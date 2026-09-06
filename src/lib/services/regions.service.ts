import {
  createRegionSchema,
  regionsQuerySchema,
  updateRegionSchema,
} from "../validations/regions.schema";
import {
  createRegionRepo,
  deleteRegionRepo,
  ensureRegionUniqueRepo,
  getRegionDetailRepo,
  getRegionEditRepo,
  getRegionLookupRepo,
  getRegionOptionsRepo,
  getRegionsRepo,
  updateRegionRepo,
} from "../repositories/regions.repo";
import { idSchema, slugSchema } from "../validations/primitives.schema";
import { ENTITY_CONFIG } from "@/config/entities";
import { NotFoundError } from "../errors/http-error";
import { tryDeleteImage } from "./storage.service";
import {
  uploadImageFromFormData,
  withUpdatedImage,
  withUploadedImage,
} from "../storage/image";

const STORAGE_BUCKET = ENTITY_CONFIG["region"]["storageBucket"];

export async function getRegionsService(query: unknown) {
  const parsed = regionsQuerySchema.parse(query);

  return getRegionsRepo(parsed);
}

export async function getRegionOptionsService() {
  return getRegionOptionsRepo();
}

export async function getRegionEditService(id: string) {
  const parsedId = idSchema.parse(id);

  return getRegionEditRepo(parsedId);
}

export async function getRegionDetailService(id: string) {
  const parsedId = idSchema.parse(id);

  return getRegionDetailRepo(parsedId);
}

export async function getRegionLookupService(slug: string) {
  const parsedSlug = slugSchema.parse(slug);

  return getRegionLookupRepo(parsedSlug);
}

export async function createRegionService(input: unknown, formData: FormData) {
  const parsed = createRegionSchema.parse(input);

  await ensureRegionUniqueRepo({
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
    operation: () => createRegionRepo(parsed),
  });
}

export async function updateRegionService(
  id: string,
  input: unknown,
  formData: FormData,
) {
  const parsedId = idSchema.parse(id);
  const parsed = updateRegionSchema.parse(input);

  await ensureRegionUniqueRepo({
    name: parsed.name,
    ignoreId: parsedId,
  });

  const currentRegion = await getRegionEditRepo(parsedId);

  if (!currentRegion) {
    throw new NotFoundError("Region not found");
  }

  const uploadedImage = await uploadImageFromFormData(
    formData,
    "image",
    parsed.name,
    STORAGE_BUCKET,
  );

  return withUpdatedImage({
    oldImage: currentRegion.image,
    newImage: uploadedImage,
    shouldRename: currentRegion.name !== parsed.name,
    newName: parsed.name,
    bucketName: STORAGE_BUCKET,

    operation: (finalImage) => {
      return updateRegionRepo(parsedId, {
        ...parsed,
        image: finalImage,
      });
    },
  });
}

export async function deleteRegionService(id: string) {
  const parsedId = idSchema.parse(id);

  const region = await getRegionEditRepo(parsedId);

  if (!region) {
    throw new NotFoundError("Region not found");
  }

  await deleteRegionRepo(parsedId);

  await tryDeleteImage(region.image, STORAGE_BUCKET);
}
