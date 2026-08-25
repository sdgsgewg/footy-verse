"use client";

import { useMemo } from "react";
import { getImageUrl } from "@/lib/images/image-url";
import { STORAGE_BUCKETS } from "@/lib/storage";
import {
  NationalityEditResponse,
  UpsertNationalityInput,
} from "@/types/nationality";
import { buildFormData } from "@/lib/forms/buildFormData";
import { nationalityMutationSchema } from "@/lib/validations/nationalities.schema";
import { useEntityForm, useImageField } from "@/hooks/crud";

const createEmptyNationalityForm = (): UpsertNationalityInput => ({
  id: "",

  image: null,
  imageUrl: null,

  name: "",
  fifa_code: "",
  confederation_id: "",
});

function mapNationality(
  nationality: NationalityEditResponse,
): UpsertNationalityInput {
  const { id, image, name, fifaCode, confederationId } = nationality;

  return {
    id,

    image,
    imageUrl: getImageUrl("nationality", STORAGE_BUCKETS.NATIONALITIES, image),

    name,
    fifa_code: fifaCode,
    confederation_id: confederationId ?? "",
  };
}

export function useNationalityForm(nationality?: NationalityEditResponse) {
  const initialValue = useMemo(
    () =>
      nationality ? mapNationality(nationality) : createEmptyNationalityForm(),
    [nationality],
  );

  const {
    imageFile,
    previewUrl,
    updateImage: setImage,
  } = useImageField({
    initialPreviewUrl: initialValue.imageUrl,
  });

  const {
    form,
    updateField,
    errors,
    isDirty,
    canSubmit,
    validate,
    clearFieldError,
  } = useEntityForm({
    initialValue,
    schema: nationalityMutationSchema,

    dirtyFields: ["name", "fifa_code", "confederation_id", "image"],

    requiredFields: ["name", "fifa_code", "confederation_id"],

    additionalDirty: imageFile !== null,
  });

  const updateImage = (file: File) => {
    setImage(file);
    clearFieldError("image");
  };

  const buildPayload = () => {
    return buildFormData({
      values: {
        name: form.name,
        fifa_code: form.fifa_code,
        confederation_id: form.confederation_id,
      },
      existingImage: form.image,
      imageFile,
    });
  };

  return {
    form: {
      ...form,

      imageFile,
      previewUrl,
    },

    isDirty,
    errors,

    updateField,
    updateImage,

    validate,
    canSubmit,
    buildPayload,
  };
}
