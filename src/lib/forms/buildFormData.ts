export interface BuildFormDataOptions {
  values: Record<string, unknown>;

  existingImage?: string | null;
  imageFile?: File | null;
}

export function buildFormData({
  values,
  existingImage,
  imageFile,
}: BuildFormDataOptions): FormData {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    if (value == null) {
      formData.append(key, "");
      return;
    }

    if (Array.isArray(value) || typeof value === "object") {
      formData.append(key, JSON.stringify(value));
      return;
    }

    formData.append(key, String(value));
  });

  if (existingImage) {
    formData.append("existingImage", existingImage);
  }

  if (imageFile) {
    formData.append("image", imageFile);
  }

  return formData;
}
