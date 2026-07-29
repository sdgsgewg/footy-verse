"use client";

import { useMemo, useState } from "react";
import { getImageUrl } from "@/lib/images/image-url";
import { STORAGE_BUCKETS } from "@/lib/storage";
import {
  NationalityEditResponse,
  UpsertNationalityInput,
} from "@/types/nationality";
import { buildFormData } from "@/lib/forms/buildFormData";

const emptyNationalityForm: UpsertNationalityInput = {
  id: "",

  image: null,
  imageUrl: null,
  imageFile: null,
  previewUrl: null,

  name: "",
  fifa_code: "",
  region_id: null,
};

function mapNationality(
  nationality: NationalityEditResponse,
): UpsertNationalityInput {
  const { id, image, name, fifaCode, regionId } = nationality;

  return {
    id,

    image,
    imageUrl: getImageUrl("nationality", STORAGE_BUCKETS.NATIONALITIES, image),
    imageFile: null,
    previewUrl: null,

    name,
    fifa_code: fifaCode,
    region_id: regionId ?? null,
  };
}

export function useNationalityForm(nationality?: NationalityEditResponse) {
  const initialValue = useMemo(
    () => (nationality ? mapNationality(nationality) : emptyNationalityForm),
    [nationality],
  );

  const [form, setForm] = useState(initialValue);

  const initialForm = initialValue;

  const isEditing = nationality != null;

  const canSubmit = useMemo(() => {
    const isFilled =
      form.name.trim().length > 0 && form.fifa_code.trim().length > 0;

    if (!isFilled) {
      return false;
    }

    if (!isEditing) {
      return form.imageFile != null;
    }

    return (
      form.name !== initialForm.name ||
      form.fifa_code !== initialForm.fifa_code ||
      form.region_id !== initialForm.region_id ||
      form.image !== initialForm.image ||
      form.imageFile != null
    );
  }, [form, initialForm, isEditing]);

  const buildPayload = () => {
    return buildFormData({
      values: {
        name: form.name,
        fifa_code: form.fifa_code,
        region_id: form.region_id,
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
