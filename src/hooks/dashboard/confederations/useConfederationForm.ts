"use client";

import { useMemo, useState } from "react";
import { getImageUrl } from "@/lib/images/image-url";
import { STORAGE_BUCKETS } from "@/lib/storage";
import { buildFormData } from "@/lib/forms/buildFormData";
import {
  ConfederationEditResponse,
  UpsertConfederationInput,
} from "@/types/confederation";

const emptyConfederationForm: UpsertConfederationInput = {
  id: "",

  image: null,
  imageUrl: null,
  imageFile: null,
  previewUrl: null,

  name: "",
  short_name: "",
  founded: "",
  headquarters: "",
  website: "",
  region_id: "",
};

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
    imageFile: null,
    previewUrl: null,

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
      confederation ? mapConfederation(confederation) : emptyConfederationForm,
    [confederation],
  );

  const [form, setForm] = useState(initialValue);

  const initialForm = initialValue;

  const isEditing = confederation != null;

  const canSubmit = useMemo(() => {
    const isFilled =
      form.name.trim().length > 0 &&
      form.short_name.trim().length > 0 &&
      form.region_id.trim().length > 0;

    if (!isFilled) {
      return false;
    }

    if (!isEditing) {
      return form.imageFile != null;
    }

    return (
      form.name !== initialForm.name ||
      form.short_name !== initialForm.short_name ||
      form.founded !== initialForm.founded ||
      form.headquarters !== initialForm.headquarters ||
      form.website !== initialForm.website ||
      form.region_id !== initialForm.region_id ||
      form.image !== initialForm.image ||
      form.imageFile != null
    );
  }, [form, initialForm, isEditing]);

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
