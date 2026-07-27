"use client";

import { useMemo, useState } from "react";
import { getImageUrl } from "@/lib/images/image-url";
import { STORAGE_BUCKETS } from "@/lib/storage";
import {
  NationalityEditResponse,
  UpsertNationalityInput,
} from "@/types/nationality";

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
  const { id, image, name, fifaCode, regoinId } = nationality;

  return {
    id,

    image,
    imageUrl: getImageUrl("nationality", STORAGE_BUCKETS.NATIONALITIES, image),
    imageFile: null,
    previewUrl: null,

    name,
    fifa_code: fifaCode,
    region_id: regoinId ?? null,
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
    const payload = new FormData();

    payload.append("name", form.name);
    payload.append("fifa_code", form.fifa_code);
    payload.append("region_id", form.region_id ?? "");

    if (form.image) {
      payload.append("existingImage", form.image);
    }

    if (form.imageFile) {
      payload.append("image", form.imageFile);
    }

    return payload;
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
