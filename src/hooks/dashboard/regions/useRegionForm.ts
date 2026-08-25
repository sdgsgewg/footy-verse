"use client";

import { useMemo, useState } from "react";
import { getImageUrl } from "@/lib/images/image-url";
import { STORAGE_BUCKETS } from "@/lib/storage";
import {
  RegionEditResponse,
  RegionFormField,
  UpsertRegionInput,
} from "@/types/region";
import { buildFormData } from "@/lib/forms/buildFormData";
import { FormErrors } from "@/types/form";
import { regionMutationSchema } from "@/lib/validations/regions.schema";
import { getZodFormErrors } from "@/lib/forms/errors";

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
  const [errors, setErrors] = useState<FormErrors<RegionFormField>>({});

  const initialForm = initialValue;

  const clearFieldError = (field: RegionFormField) => {
    setErrors((prev) => {
      if (!prev[field]) {
        return prev;
      }

      const next = { ...prev };
      delete next[field];

      return next;
    });
  };

  const updateField = <K extends keyof UpsertRegionInput>(
    field: K,
    value: UpsertRegionInput[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (
      field === "name" ||
      field === "region_type" ||
      field === "parent_region_id"
    ) {
      clearFieldError(field);
    }
  };

  const updateImage = (file: File) => {
    setForm((prev) => ({
      ...prev,
      imageFile: file,
      previewUrl: URL.createObjectURL(file),
    }));

    clearFieldError("image");
  };

  const validate = () => {
    const result = regionMutationSchema.safeParse(form);

    if (result.success) {
      setErrors({});
      return true;
    }

    setErrors(getZodFormErrors<RegionFormField>(result.error));

    return false;
  };

  const isDirty = useMemo(
    () =>
      form.name !== initialForm.name ||
      form.region_type !== initialForm.region_type ||
      form.parent_region_id !== initialForm.parent_region_id ||
      form.image !== initialForm.image ||
      form.imageFile != null,
    [form, initialForm],
  );

  const canSubmit = useMemo(() => {
    const isFilled =
      form.name.trim().length > 0 && form.region_type.trim().length > 0;

    return isFilled && isDirty;
  }, [form, isDirty]);

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

  return {
    form,
    isDirty,

    errors,

    updateField,
    updateImage,

    validate,
    canSubmit,
    buildPayload,
  };
}
