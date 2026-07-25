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
};

function mapNationality(
  nationality: NationalityEditResponse,
): UpsertNationalityInput {
  const { id, image, name } = nationality;

  return {
    id,

    image,
    imageUrl: getImageUrl("nationality", STORAGE_BUCKETS.NATIONALITIES, image),
    imageFile: null,
    previewUrl: null,

    name,
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
    const isFilled = form.name.trim().length > 0;

    if (!isFilled) {
      return false;
    }

    if (!isEditing) {
      return form.imageFile != null;
    }

    return (
      form.name !== initialForm.name ||
      form.image !== initialForm.image ||
      form.imageFile != null
    );
  }, [form, initialForm, isEditing]);

  const buildPayload = () => {
    const payload = new FormData();

    payload.append("name", form.name);

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
