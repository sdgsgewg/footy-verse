"use client";

import { useMemo, useState } from "react";
import { getImageUrl } from "@/lib/images/image-url";
import { STORAGE_BUCKETS } from "@/lib/storage";
import { RegionEditResponse, UpsertRegionInput } from "@/types/region";
import { buildFormData } from "@/lib/forms/buildFormData";

const emptyRegionForm: UpsertRegionInput = {
  id: "",

  image: null,
  imageUrl: null,
  imageFile: null,
  previewUrl: null,

  name: "",
  region_type: "",
  parent_region_id: null,
};

function mapRegion(region: RegionEditResponse): UpsertRegionInput {
  const { id, image, name, regionType, parentRegionId } = region;

  return {
    id,

    image,
    imageUrl: getImageUrl("region", STORAGE_BUCKETS.REGIONS, image),
    imageFile: null,
    previewUrl: null,

    name,
    region_type: regionType,
    parent_region_id: parentRegionId ?? null,
  };
}

export function useRegionForm(region?: RegionEditResponse) {
  const initialValue = useMemo(
    () => (region ? mapRegion(region) : emptyRegionForm),
    [region],
  );

  const [form, setForm] = useState(initialValue);

  const initialForm = initialValue;

  const isEditing = region != null;

  const canSubmit = useMemo(() => {
    const isFilled =
      form.name.trim().length > 0 && form.region_type.trim().length > 0;

    if (!isFilled) {
      return false;
    }

    if (!isEditing) {
      return form.imageFile != null;
    }

    return (
      form.name !== initialForm.name ||
      form.region_type !== initialForm.region_type ||
      form.parent_region_id !== initialForm.parent_region_id ||
      form.image !== initialForm.image ||
      form.imageFile != null
    );
  }, [form, initialForm, isEditing]);

  const buildPayload = () => {
    return buildFormData({
      values: {
        name: form.name,
        region_type: form.region_type,
        parent_region_id: form.parent_region_id,
      },
      existingImage: form.image,
      imageFile: form.imageFile,
    });
  };

  const resetForm = () => {
    setForm(initialValue);
  };

  return {
    form,
    setForm,
    initialForm,
    isEditing,
    canSubmit,
    buildPayload,
    resetForm,
  };
}
