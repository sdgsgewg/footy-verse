"use client";

import { useMemo } from "react";
import { getImageUrl } from "@/lib/images/image-url";
import { RegionEditResponse, UpsertRegionInput } from "@/types/region";
import { buildFormData } from "@/lib/forms/buildFormData";
import { regionMutationSchema } from "@/lib/validations/regions.schema";
import { ENTITY_CONFIG } from "@/config/entities";
import { useEntityForm, useImageField } from "@/hooks/crud";

const createEmptyRegionForm = (): UpsertRegionInput => ({
  id: "",

  image: null,
  imageUrl: null,

  name: "",
  region_type: "",
  parent_region_id: null,
});

function mapRegion(region: RegionEditResponse): UpsertRegionInput {
  const { id, image, name, regionType, parentRegionId } = region;

  return {
    id,

    image,
    imageUrl: getImageUrl(
      "region",
      ENTITY_CONFIG["region"]["storageBucket"],
      image,
    ),

    name,
    region_type: regionType,
    parent_region_id: parentRegionId ?? null,
  };
}

export function useRegionForm(region?: RegionEditResponse) {
  const initialValue = useMemo(
    () => (region ? mapRegion(region) : createEmptyRegionForm()),
    [region],
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
    setFieldError,
  } = useEntityForm({
    initialValue,
    schema: regionMutationSchema,

    dirtyFields: ["name", "region_type", "parent_region_id", "image"],

    requiredFields: ["name", "region_type"],

    additionalDirty: imageFile !== null,
  });

  const updateImage = (file: File) => {
    const result = setImage(file);

    if (!result.success) {
      setFieldError("image", result.error ?? "Invalid image.");
      return;
    }

    clearFieldError("image");
  };

  const buildPayload = () => {
    return buildFormData({
      values: {
        name: form.name,
        region_type: form.region_type,
        parent_region_id: form.parent_region_id,
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
