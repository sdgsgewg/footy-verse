import { renameImage, tryDeleteImage } from "@/lib/services/storage.service";
import { StorageBucket } from "@/lib/storage";

type PrepareUpdatedImageParams = {
  oldName: string;
  newName: string;
  oldImage: string | null;
  newImage: string | null;
  bucket: StorageBucket;
};

/**
 * Prepares the final image path for an updated entity.
 *
 * Rules:
 * - If the entity name changes while the image stays the same,
 *   rename the existing image in storage.
 * - If a new image is uploaded, delete the old one first to comply
 *   with Supabase Storage RLS policies.
 * - Returns the image path that should be stored in the database.
 */
export async function prepareUpdatedImage({
  oldName,
  newName,
  oldImage,
  newImage,
  bucket,
}: PrepareUpdatedImageParams): Promise<string | null> {
  let finalImage = newImage;

  // Name changed but image unchanged → rename storage object.
  if (oldName !== newName && oldImage && oldImage === newImage) {
    finalImage = await renameImage(oldImage, newName, bucket);
  }

  // Image replaced → delete old image before updating DB.
  if (oldImage && oldImage !== newImage) {
    await tryDeleteImage(oldImage, bucket);
  }

  return finalImage;
}

/**
 * Deletes an entity image from storage if it exists.
 */
export async function deleteEntityImage(
  image: string | null,
  bucket: StorageBucket,
): Promise<void> {
  if (!image) return;

  await tryDeleteImage(image, bucket);
}
