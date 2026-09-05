import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const imageSchema = z
  .instanceof(File)
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: "Only .jpg, .png, and .webp formats are supported.",
  })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "Max image size is 5MB.",
  });

export function validateImageFile(
  file: FormDataEntryValue | null,
): File | null {
  if (!(file instanceof File) || file.size === 0) {
    return null;
  }

  return imageSchema.parse(file);
}
