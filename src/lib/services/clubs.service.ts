import {
  createClubRepo,
  deleteClubRepo,
  ensureClubUniqueRepo,
  getClubDetailRepo,
  getClubEditRepo,
  getClubLookupRepo,
  getClubsRepo,
  updateClubRepo,
} from "@/lib/repositories/clubs.repo";
import {
  clubsQuerySchema,
  createClubSchema,
  updateClubSchema,
} from "@/lib/validations/clubs.schema";
import { idSchema, slugSchema } from "../validations/primitives.schema";
import {
  uploadImageFromFormData,
  withUpdatedImage,
  withUploadedImage,
} from "../storage/image";
import { STORAGE_BUCKETS } from "../storage";
import { NotFoundError } from "../errors/http-error";
import { tryDeleteImage } from "./storage.service";

export async function getClubsService(query: unknown) {
  const parsed = clubsQuerySchema.parse(query);

  return getClubsRepo(parsed);
}

export async function getClubEditService(id: string) {
  const parsedId = idSchema.parse(id);

  return getClubEditRepo(parsedId);
}

export async function getClubDetailService(id: string) {
  const parsedId = idSchema.parse(id);

  return getClubDetailRepo(parsedId);
}

export async function getClubLookupService(slug: string) {
  const parsedSlug = slugSchema.parse(slug);

  return getClubLookupRepo(parsedSlug);
}

export async function createClubService(input: unknown, formData: FormData) {
  const parsed = createClubSchema.parse(input);

  await ensureClubUniqueRepo({
    name: parsed.short_name,
  });

  const image = await uploadImageFromFormData(
    formData,
    "image",
    parsed.short_name,
    STORAGE_BUCKETS.CLUBS,
  );

  parsed.image = image;

  return withUploadedImage({
    image,
    bucketName: STORAGE_BUCKETS.CLUBS,
    operation: () => createClubRepo(parsed),
  });
}

export async function updateClubService(
  id: string,
  input: unknown,
  formData: FormData,
) {
  const parsedId = idSchema.parse(id);
  const parsed = updateClubSchema.parse(input);

  await ensureClubUniqueRepo({
    name: parsed.short_name,
    ignoreId: parsedId,
  });

  const currentClub = await getClubEditRepo(parsedId);

  if (!currentClub) {
    throw new NotFoundError("Club not found");
  }

  const uploadedImage = await uploadImageFromFormData(
    formData,
    "image",
    parsed.short_name,
    STORAGE_BUCKETS.CLUBS,
  );

  return withUpdatedImage({
    oldImage: currentClub.image,
    newImage: uploadedImage,
    shouldRename: currentClub.shortName !== parsed.short_name,
    newName: parsed.short_name,
    bucketName: STORAGE_BUCKETS.CLUBS,

    operation: (finalImage) => {
      return updateClubRepo(parsedId, {
        ...parsed,
        image: finalImage,
      });
    },
  });
}

export async function deleteClubService(id: string) {
  const parsedId = idSchema.parse(id);

  const club = await getClubEditRepo(parsedId);

  if (!club) {
    throw new NotFoundError("Club not found");
  }

  await deleteClubRepo(parsedId);

  await tryDeleteImage(club.image, STORAGE_BUCKETS.CLUBS);
}
