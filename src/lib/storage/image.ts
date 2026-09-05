import {
  renameImage,
  tryDeleteImage,
  tryRenameImage,
  uploadImage,
} from "@/lib/services/storage.service";

import { StorageBucket } from "@/lib/storage";
import { validateImageFile } from "@/lib/validations/image.schema";

export async function uploadImageFromFormData(
  formData: FormData,
  fieldName: string,
  baseName: string,
  bucketName: StorageBucket,
): Promise<string | null> {
  const file = validateImageFile(formData.get(fieldName));

  if (!file) {
    return null;
  }

  return uploadImage(file, baseName, bucketName);
}

export async function withUploadedImage<T>({
  image,
  bucketName,
  operation,
}: {
  image: string | null;
  bucketName: StorageBucket;
  operation: () => Promise<T>;
}): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    await tryDeleteImage(image, bucketName);
    throw error;
  }
}

export async function withUpdatedImage<T>({
  oldImage,
  newImage,
  shouldRename,
  newName,
  bucketName,
  operation,
}: {
  oldImage: string | null;
  newImage: string | null;
  shouldRename: boolean;
  newName: string;
  bucketName: StorageBucket;
  operation: (finalImage: string | null) => Promise<T>;
}): Promise<T> {
  let uploadedImage: string | null = null;
  let renamedImage: {
    oldPath: string;
    newPath: string;
  } | null = null;

  try {
    if (newImage && newImage !== oldImage) {
      uploadedImage = newImage;
    }

    if (shouldRename && oldImage && newImage === oldImage) {
      renamedImage = await renameImage(oldImage, newName, bucketName);
    }

    const finalImage = renamedImage?.newPath ?? newImage ?? oldImage;

    const result = await operation(finalImage);

    if (uploadedImage && oldImage && uploadedImage !== oldImage) {
      await tryDeleteImage(oldImage, bucketName);
    }

    return result;
  } catch (error) {
    if (uploadedImage) {
      await tryDeleteImage(uploadedImage, bucketName);
    }

    if (renamedImage) {
      await tryRenameImage(
        renamedImage.oldPath,
        renamedImage.newPath,
        bucketName,
      );
    }

    throw error;
  }
}
