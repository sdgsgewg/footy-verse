"use client";

import { useMemo } from "react";
import { getImageUrl } from "@/lib/images/image-url";
import { STORAGE_BUCKETS } from "@/lib/storage";
import { buildFormData } from "@/lib/forms/buildFormData";
import {
  ConfederationEditResponse,
  UpsertConfederationInput,
} from "@/types/confederation";
import { useEntityForm, useImageField } from "@/hooks/crud";
import { confederationMutationSchema } from "@/lib/validations/confederations.schema";

const createEmptyConfederationForm = (): UpsertConfederationInput => ({
  id: "",

  image: null,
  imageUrl: null,

  name: "",
  short_name: "",
  founded: "",
  headquarters: "",
  website: "",
  region_id: "",
});

function mapConfederation(
  confederation: ConfederationEditResponse,
): UpsertConfederationInput {
  const {
    id,
    image,
    name,
    shortName,
    founded,
    headquarters,
    website,
    regionId,
  } = confederation;

  return {
    id,

    image,
    imageUrl: getImageUrl(
      "confederation",
      STORAGE_BUCKETS.CONFEDERATIONS,
      image,
    ),

    name,
    short_name: shortName,
    founded,
    headquarters,
    website,
    region_id: regionId,
  };
}

export function useConfederationForm(
  confederation?: ConfederationEditResponse,
) {
  const initialValue = useMemo(
    () =>
      confederation
        ? mapConfederation(confederation)
        : createEmptyConfederationForm(),
    [confederation],
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
    schema: confederationMutationSchema,

    dirtyFields: [
      "name",
      "short_name",
      "founded",
      "headquarters",
      "website",
      "region_id",
      "image",
    ],

    requiredFields: ["name", "short_name", "region_id"],

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
        short_name: form.short_name,
        founded: form.founded,
        headquarters: form.headquarters,
        website: form.website,
        region_id: form.region_id,
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
