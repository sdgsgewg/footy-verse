"use client";

import { useMemo, useState } from "react";
import { ClubEditResponse, ClubFormField, UpsertClubInput } from "@/types/club";
import { getImageUrl } from "@/lib/images/image-url";
import { STORAGE_BUCKETS } from "@/lib/storage";
import { buildFormData } from "@/lib/forms/buildFormData";
import { FormErrors } from "@/types/form";
import { clubMutationSchema } from "@/lib/validations/clubs.schema";
import { getZodFormErrors } from "@/lib/forms/errors";

const emptyClubForm: UpsertClubInput = {
  id: "",

  image: null,
  imageUrl: null,
  imageFile: null,
  previewUrl: null,

  name: "",

  nation_id: "",
};

function mapClub(club: ClubEditResponse): UpsertClubInput {
  const { id, image, name, nationId } = club;

  return {
    id,

    image,
    imageUrl: getImageUrl("club", STORAGE_BUCKETS.CLUBS, image),
    imageFile: null,
    previewUrl: null,

    name,
    nation_id: nationId,
  };
}

export function useClubForm(club?: ClubEditResponse) {
  const initialValue = useMemo(
    () => (club ? mapClub(club) : emptyClubForm),
    [club],
  );

  const [form, setForm] = useState(initialValue);
  const [errors, setErrors] = useState<FormErrors<ClubFormField>>({});

  const initialForm = initialValue;

  const clearFieldError = (field: ClubFormField) => {
    setErrors((prev) => {
      if (!prev[field]) {
        return prev;
      }

      const next = { ...prev };
      delete next[field];

      return next;
    });
  };

  const updateField = <K extends keyof UpsertClubInput>(
    field: K,
    value: UpsertClubInput[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === "name" || field === "nation_id") {
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
    const result = clubMutationSchema.safeParse(form);

    if (result.success) {
      setErrors({});
      return true;
    }

    setErrors(getZodFormErrors<ClubFormField>(result.error));

    return false;
  };

  const isDirty = useMemo(
    () =>
      form.name !== initialForm.name ||
      form.nation_id !== initialForm.nation_id ||
      form.image !== initialForm.image ||
      form.imageFile != null,
    [form, initialForm],
  );

  const canSubmit = useMemo(() => {
    const isFilled =
      form.name.trim().length > 0 && form.nation_id.trim().length > 0;

    return isFilled && isDirty;
  }, [form, isDirty]);

  const buildPayload = () => {
    return buildFormData({
      values: {
        name: form.name,
        nation_id: form.nation_id,
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
